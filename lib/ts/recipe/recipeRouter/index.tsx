import SuperTokens from "../../superTokens";
import Multitenancy from "../multitenancy/recipe";

import type { RecipeFeatureComponentMap } from "../../types";
import type { BaseFeatureComponentMap, ComponentWithRecipeAndMatchingMethod } from "../../types";
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

        if (routeComponents.length === 0) {
            return undefined;
        }

        const dynamicLoginMethods =
            SuperTokens.usesDynamicLoginMethods === true
                ? Multitenancy.getInstanceOrThrow().getLoadedDynamicLoginMethods()
                : undefined;
        if (SuperTokens.usesDynamicLoginMethods && dynamicLoginMethods === undefined) {
            return;
        }

        const possiblyEnabledRecipes = {
            thirdpartyemailpassword: {
                enabled: dynamicLoginMethods?.["thirdparty"].enabled || dynamicLoginMethods?.["emailpassword"].enabled,
            },
            thirdpartypasswordless: {
                enabled: dynamicLoginMethods?.["thirdparty"].enabled && dynamicLoginMethods["passwordless"].enabled,
            },
            ...dynamicLoginMethods,
        };
        const componentMatchingRid = routeComponents.find((c) => c.matches());
        if (
            componentMatchingRid &&
            possiblyEnabledRecipes[componentMatchingRid.recipeID as keyof typeof possiblyEnabledRecipes]?.enabled ===
                true
        ) {
            return componentMatchingRid;
        }
        for (const id in possiblyEnabledRecipes) {
            const matching = routeComponents.find((c) => c.recipeID === id);
            if (
                matching !== undefined &&
                dynamicLoginMethods !== undefined &&
                possiblyEnabledRecipes[id as keyof typeof possiblyEnabledRecipes]?.enabled === true
            ) {
                return matching;
            }
        }

        // Otherwise, If no recipe Id provided, or if no recipe id matches, throw since no there are no enabled recipes on the backend to handle the actions
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
