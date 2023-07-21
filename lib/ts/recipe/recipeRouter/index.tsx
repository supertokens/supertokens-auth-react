import SuperTokens from "../../superTokens";
import Multitenancy from "../multitenancy/recipe";

import type { RecipeFeatureComponentMap } from "../../types";
import type { BaseFeatureComponentMap, ComponentWithRecipeAndMatchingMethod } from "../../types";
import type { GetLoginMethodsResponseNormalized } from "../multitenancy/types";
import type RecipeModule from "../recipeModule";
import type NormalisedURLPath from "supertokens-web-js/lib/build/normalisedURLPath";

export abstract class RecipeRouter {
    private pathsToFeatureComponentWithRecipeIdMap?: BaseFeatureComponentMap;
    public abstract recipeInstance: RecipeModule<any, any, any, any>;
    static getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
        normalisedUrl: NormalisedURLPath,
        preBuiltUIList: RecipeRouter[],
        defaultToStaticList: boolean
    ): ComponentWithRecipeAndMatchingMethod | undefined {
        const path = normalisedUrl.getAsStringDangerous();

        const routeComponents = preBuiltUIList.reduce((components, c) => {
            const routes = c.getPathsToFeatureComponentWithRecipeIdMap();
            for (const [routePath, routeComps] of Object.entries(routes)) {
                if (
                    routePath === path ||
                    new RegExp("^" + routePath.replace(/:\w+/g, "[^/]+").replace(/\/\*/g, "/[^/]+") + "$").test(path)
                ) {
                    components = components.concat(routeComps);
                }
            }
            return components;
        }, [] as ComponentWithRecipeAndMatchingMethod[]);

        const dynamicLoginMethods = Multitenancy.getInstanceOrThrow().getLoadedDynamicLoginMethods();
        const componentMatchingRid = routeComponents.find((c) => c.matches());
        if (SuperTokens.usesDynamicLoginMethods === false || defaultToStaticList) {
            if (routeComponents.length === 0) {
                return undefined;
            } else if (componentMatchingRid !== undefined) {
                return componentMatchingRid;
            } else {
                return routeComponents[0];
            }
        }

        if (dynamicLoginMethods === undefined) {
            throw new Error(
                "Should never come here: dynamic login methods info has not been loaded but recipeRouter rendered"
            );
        }

        // The related ADR: https://supertokens.com/docs/contribute/decisions/multitenancy/0006
        const priorityOrder: { rid: string; includes: (keyof GetLoginMethodsResponseNormalized)[] }[] = [
            { rid: "thirdpartyemailpassword", includes: ["thirdparty", "emailpassword"] },
            { rid: "thirdpartypasswordless", includes: ["thirdparty", "passwordless"] },
            { rid: "emailpassword", includes: ["emailpassword"] },
            { rid: "passwordless", includes: ["passwordless"] },
            { rid: "thirdparty", includes: ["thirdparty"] },
        ];

        if (
            componentMatchingRid && // if we find a component matching by rid
            (!priorityOrder.map((a) => a.rid).includes(componentMatchingRid.recipeID) || // from a non-auth recipe
                dynamicLoginMethods[componentMatchingRid.recipeID as keyof GetLoginMethodsResponseNormalized]
                    ?.enabled === true) // or an enabled auth recipe
        ) {
            return componentMatchingRid;
        }

        const matchingNonAuthComponent = routeComponents.find(
            (comp) => !priorityOrder.map((a) => a.rid).includes(comp.recipeID)
        );

        if (matchingNonAuthComponent) {
            return matchingNonAuthComponent;
        }

        const enabledRecipeCount = Object.keys(dynamicLoginMethods).filter(
            (key) => (dynamicLoginMethods as any)[key].enabled
        ).length;
        // We first try to find an exact match
        for (const { rid, includes } of priorityOrder) {
            if (
                enabledRecipeCount === includes.length &&
                includes.every((subRId) => dynamicLoginMethods[subRId].enabled)
            ) {
                const matchingComp = routeComponents.find((comp) => comp.recipeID === rid);
                if (matchingComp) {
                    return matchingComp;
                }
            }
        }
        // We try to find a partial match
        for (const { rid, includes } of priorityOrder) {
            if (includes.some((subRId) => dynamicLoginMethods[subRId].enabled)) {
                const matchingComp = routeComponents.find((comp) => comp.recipeID === rid);
                if (matchingComp) {
                    return matchingComp;
                }
            }
        }

        return undefined;
    }

    getPathsToFeatureComponentWithRecipeIdMap = (): BaseFeatureComponentMap => {
        // Memoized version of the map.
        if (this.pathsToFeatureComponentWithRecipeIdMap !== undefined) {
            return this.pathsToFeatureComponentWithRecipeIdMap;
        }

        const pathsToFeatureComponentWithRecipeIdMap: BaseFeatureComponentMap = {};
        const features = this.getFeatures();
        const featurePaths = Object.keys(features);
        for (let j = 0; j < featurePaths.length; j++) {
            // If no components yet for this route, initialize empty array.
            const featurePath = featurePaths[j];
            if (pathsToFeatureComponentWithRecipeIdMap[featurePath] === undefined) {
                pathsToFeatureComponentWithRecipeIdMap[featurePath] = [];
            }
            pathsToFeatureComponentWithRecipeIdMap[featurePath].push(features[featurePath]);
        }

        this.pathsToFeatureComponentWithRecipeIdMap = pathsToFeatureComponentWithRecipeIdMap;
        return this.pathsToFeatureComponentWithRecipeIdMap;
    };

    abstract getFeatures(): RecipeFeatureComponentMap;
}
