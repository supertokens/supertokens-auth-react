import React from "react";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import { RecipeRouter } from "../recipe/recipeRouter";

import type { ReactRouterDom } from "../prebuiltui/types";

export function RoutingComponent(props: {
    getReactRouterDomWithCustomHistory: () => ReactRouterDom | undefined;
    preBuiltUIList: RecipeRouter[];
    path: string;
}): JSX.Element | null {
    const path = props.path;
    const location = props.getReactRouterDomWithCustomHistory()?.useLocation();
    const normalizedPath = new NormalisedURLPath(path);
    const componentToRender = React.useMemo(() => {
        // During development, this runs twice so as to warn devs of if there
        // are any side effects that happen here. So in tests, it will result in
        // the console log twice
        return RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
            normalizedPath,
            props.preBuiltUIList
        );
    }, [path, location]); // location dependency needs to be kept in order to get new component on url change

    const history = props.getReactRouterDomWithCustomHistory()?.useHistoryCustom();

    if (componentToRender === undefined) {
        return null;
    }

    return <componentToRender.component history={history} />;
}
