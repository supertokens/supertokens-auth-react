import React from "react";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import { RecipeRouter } from "../recipe/recipeRouter";
import { getQueryParams } from "../utils";

import type { ComponentWithRecipeAndMatchingMethod } from "../types";

export function RoutingComponent(props: { recipeRoutesInstance: RecipeRouter; path: string }): JSX.Element | null {
    const path = props.path;
    const location = props.recipeRoutesInstance.getReactRouterDomWithCustomHistory()?.useLocation();
    const rid = getQueryParams("rid");
    const normalizedPath = new NormalisedURLPath(path);
    const componentToRender = React.useMemo(() => {
        // During development, this runs twice so as to warn devs of if there
        // are any side effects that happen here. So in tests, it will result in
        // the console log twice
        return RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(normalizedPath);
    }, [path, location]); // location dependency needs to be kept in order to get new component on url change

    const history = props.recipeRoutesInstance.getReactRouterDomWithCustomHistory()?.useHistoryCustom();

    // If history is undefined that would mean we are not using react-router-dom and have to handle edge cases
    if (history === undefined) {
        // if rid is present in the url but the recipe we are trying to get RoutingComponent for is not the first
        // in the array that means previous preBuiltUIRecipe already returned its route
        if (typeof rid !== "string" && RecipeRouter.preBuiltUIList.indexOf(props.recipeRoutesInstance) > 0) {
            return null;
        }
        if (typeof rid === "string") {
            const matchedRoute: {
                route: ComponentWithRecipeAndMatchingMethod | null;
                recipe: RecipeRouter | null;
            } = {
                route: null,
                recipe: null,
            };
            RecipeRouter.preBuiltUIList.forEach((c) => {
                const routes = c.getPathsToFeatureComponentWithRecipeIdMap?.()[normalizedPath.getAsStringDangerous()];
                const matchingRoute = routes.find((c) => c.matches());
                if (matchingRoute !== undefined && matchedRoute.route === null) {
                    matchedRoute.recipe = c;
                    matchedRoute.route = matchingRoute;
                }
            });
            // we check if any preBuiltUIRecipe matches the rid if any does match we make sure that
            // it is from the same recipe we are getting RoutingComponent for otherwise we don't want to return
            // component(route) that does not belong to current recipe (props.recipeRoutesInstance)
            if (matchedRoute.route !== null && matchedRoute.recipe !== props.recipeRoutesInstance) {
                return null;
            }
        }
    }
    if (componentToRender === undefined) {
        return null;
    }

    return <componentToRender.component history={history} />;
}
