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
    const history = props.getReactRouterDomWithCustomHistory()?.useHistoryCustom();
    const path = props.path;

    const location = props.getReactRouterDomWithCustomHistory()?.useLocation();
    const componentToRender = React.useMemo(() => {
        const normalizedPath = new NormalisedURLPath(path);
        // During development, this runs twice so as to warn devs of if there
        // are any side effects that happen here. So in tests, it will result in
        // the console log twice
        if (loadedDynamicLoginMethods) {
            const result = RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
                normalizedPath,
                props.preBuiltUIList,
                false
            );
            if (result === undefined && SuperTokens.usesDynamicLoginMethods === true) {
                void redirectToAuth({ history, redirectBack: false });
            }
            return result;
        }
        return undefined;
        // location dependency needs to be kept in order to get new component on url change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, location, loadedDynamicLoginMethods, props.preBuiltUIList]);

    useEffect(() => {
        if (loadedDynamicLoginMethods) {
            return;
        }

        if (Multitenancy.getInstanceOrThrow().getLoadedDynamicLoginMethods() !== undefined) {
            setLoadedDynamicLoginMethods(true);
            return;
        }

        const handler = () => {
            setLoadedDynamicLoginMethods(true);
        };
        SuperTokens.uiController.on("LoginMethodsLoaded", handler);

        () => SuperTokens.uiController.off("LoginMethodsLoaded", handler);
    }, [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods]);

    if (componentToRender === undefined || loadedDynamicLoginMethods === false) {
        return null;
    }

    return <componentToRender.component history={history} />;
}
