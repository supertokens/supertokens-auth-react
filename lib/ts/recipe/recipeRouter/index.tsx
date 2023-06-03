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
        preBuiltUIList: RecipeRouter[]
    ): ComponentWithRecipeAndMatchingMethod | undefined {
        const path = normalisedUrl.getAsStringDangerous();

        const routeComponents = preBuiltUIList.reduce((components, c) => {
            const routes = c.getPathsToFeatureComponentWithRecipeIdMap?.()[path];
            return routes !== undefined ? components.concat(routes) : components;
        }, [] as ComponentWithRecipeAndMatchingMethod[]);

        const componentMatchingRid = routeComponents.find((c) => c.matches());
        if (SuperTokens.usesDynamicLoginMethods === false) {
            if (routeComponents.length === 0) {
                return undefined;
            } else if (componentMatchingRid !== undefined) {
                return componentMatchingRid;
            } else {
                return routeComponents[0];
            }
        }

        const dynamicLoginMethods = Multitenancy.getInstanceOrThrow().getLoadedDynamicLoginMethods();
        if (dynamicLoginMethods === undefined) {
            throw new Error(
                "Should never come here: dynamic login methods info has not been loaded but recipeRouter rendered"
            );
        }

        if (
            componentMatchingRid &&
            dynamicLoginMethods[componentMatchingRid.recipeID as keyof GetLoginMethodsResponseNormalized]?.enabled ===
                true
        ) {
            return componentMatchingRid;
        }

        // The related ADR: https://supertokens.com/docs/contribute/decisions/multitenancy/0006
        const priorityOrder: { rid: string; includes: (keyof GetLoginMethodsResponseNormalized)[] }[] = [
            { rid: "thirdpartyemailpassword", includes: ["thirdparty", "emailpassword"] },
            { rid: "thirdpartypasswordless", includes: ["thirdparty", "passwordless"] },
            { rid: "emailpassword", includes: ["emailpassword"] },
            { rid: "passwordless", includes: ["passwordless"] },
            { rid: "thirdparty", includes: ["thirdparty"] },
        ];
        // We first try to find an exact match
        for (const { rid, includes } of priorityOrder) {
            if (includes.every((subRId) => dynamicLoginMethods[subRId].enabled)) {
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

        // Otherwise, we throw since no there are is no overlap between recipes enabled on the FE and BE
        throw new Error("We found no enabled recipes handling the current route");
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
