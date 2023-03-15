import React from "react";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import { RecipeRouter } from "../recipe/recipeRouter";

export function RoutingComponent(props: { recipeRoutesInstance: RecipeRouter; path: string }): JSX.Element | null {
    const path = props.path;
    const location = props.recipeRoutesInstance.getReactRouterDomWithCustomHistory()?.useLocation();
    const componentToRender = React.useMemo(() => {
        // During development, this runs twice so as to warn devs of if there
        // are any side effects that happen here. So in tests, it will result in
        // the console log twice
        return RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(new NormalisedURLPath(path));
    }, [path, location]); // location dependency needs to be kept in order to get new component on url change

    const history = props.recipeRoutesInstance.getReactRouterDomWithCustomHistory()?.useHistoryCustom();

    if (componentToRender === undefined) {
        return null;
    }

    return <componentToRender.component history={history} />;
}
