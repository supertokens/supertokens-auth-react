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

        const component = routeComponents.find((c) => c.matches());
        if (component !== undefined) {
            return component;
        }
        // Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.
        return routeComponents[0];
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
