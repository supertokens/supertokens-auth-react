import React, { useEffect, useState } from "react";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import { redirectToAuth } from "..";
import Multitenancy from "../recipe/multitenancy/recipe";
import { RecipeRouter } from "../recipe/recipeRouter";
import SuperTokens from "../superTokens";

import type { ReactRouterDomWithCustomHistory } from "../ui/types";

export function RoutingComponent(props: {
    getReactRouterDomWithCustomHistory: () => ReactRouterDomWithCustomHistory | undefined;
    preBuiltUIList: RecipeRouter[];
    path: string;
}): JSX.Element | null {
    const [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods] = useState(
        SuperTokens.usesDynamicLoginMethods === false ||
            Multitenancy.getInstanceOrThrow().getLoadedDynamicLoginMethods() !== undefined
    );
    const path = props.path;
    const location = props.getReactRouterDomWithCustomHistory()?.useLocation();
    const componentToRender = React.useMemo(() => {
        const normalizedPath = new NormalisedURLPath(path);
        // During development, this runs twice so as to warn devs of if there
        // are any side effects that happen here. So in tests, it will result in
        // the console log twice
        if (loadedDynamicLoginMethods) {
            return RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
                normalizedPath,
                props.preBuiltUIList,
                false
            );
        }
        return undefined;
        // location dependency needs to be kept in order to get new component on url change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, location, loadedDynamicLoginMethods, props.preBuiltUIList]);

    useEffect(() => {
        const handler = () => {
            setLoadedDynamicLoginMethods(true);
        };
        SuperTokens.uiController.on("LoginMethodsLoaded", handler);

        () => SuperTokens.uiController.off("LoginMethodsLoaded", handler);
    }, []);

    const history = props.getReactRouterDomWithCustomHistory()?.useHistoryCustom();

    useEffect(() => {
        if (
            SuperTokens.usesDynamicLoginMethods === false &&
            loadedDynamicLoginMethods === true &&
            componentToRender === undefined
        ) {
            void redirectToAuth({ history, redirectBack: false }).catch(console.error);
        }
    }, [history, loadedDynamicLoginMethods, componentToRender]);

    if (componentToRender === undefined || loadedDynamicLoginMethods === false) {
        return null;
    }

    return <componentToRender.component history={history} />;
}
