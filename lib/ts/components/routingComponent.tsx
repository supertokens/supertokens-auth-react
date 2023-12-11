import React, { useEffect, useState } from "react";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import { redirectToAuth, useUserContext } from "..";
import DynamicLoginMethodsSpinner from "../recipe/multitenancy/components/features/dynamicLoginMethodsSpinner";
import Multitenancy from "../recipe/multitenancy/recipe";
import { RecipeRouter } from "../recipe/recipeRouter";
import SuperTokens from "../superTokens";

import type { GetLoginMethodsResponseNormalized } from "../recipe/multitenancy/types";
import type { ReactRouterDomWithCustomHistory } from "../ui/types";

export function RoutingComponent(props: {
    getReactRouterDomWithCustomHistory: () => ReactRouterDomWithCustomHistory | undefined;
    preBuiltUIList: RecipeRouter[];
    path: string;
}): JSX.Element | null {
    const userContext = useUserContext();
    const [error, setError] = useState<any>(undefined);
    const [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods] = useState<
        GetLoginMethodsResponseNormalized | undefined
    >(undefined);
    const navigate = props.getReactRouterDomWithCustomHistory()?.useHistoryCustom();
    const path = props.path;

    const location = props.getReactRouterDomWithCustomHistory()?.useLocation();
    const componentToRender = React.useMemo(() => {
        const normalizedPath = new NormalisedURLPath(path);
        // During development, this runs twice so as to warn devs of if there
        // are any side effects that happen here. So in tests, it will result in
        // the console log twice
        if (loadedDynamicLoginMethods !== undefined || SuperTokens.usesDynamicLoginMethods === false) {
            const result = RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
                normalizedPath,
                props.preBuiltUIList,
                false,
                loadedDynamicLoginMethods
            );
            if (result === undefined && SuperTokens.usesDynamicLoginMethods === true) {
                void redirectToAuth({ navigate, redirectBack: false });
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
        Multitenancy.getInstanceOrThrow()
            .getCurrentDynamicLoginMethods({ userContext })
            .then(
                (loginMethods) => setLoadedDynamicLoginMethods(loginMethods),
                (err) => setError(err)
            );
    }, [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods]);

    if (error) {
        throw error;
    }

    if (SuperTokens.usesDynamicLoginMethods && loadedDynamicLoginMethods === undefined) {
        return <DynamicLoginMethodsSpinner />;
    }

    if (
        componentToRender === undefined ||
        (loadedDynamicLoginMethods === undefined && SuperTokens.usesDynamicLoginMethods)
    ) {
        return null;
    }

    return <componentToRender.component navigate={navigate} />;
}
