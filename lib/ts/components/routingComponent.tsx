import React, { useEffect, useState } from "react";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

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
        return RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
            normalizedPath,
            props.preBuiltUIList
        );
    }, [path, location]); // location dependency needs to be kept in order to get new component on url change

    useEffect(() => {
        const handler = () => {
            if (loadedDynamicLoginMethods === false && componentToRender?.recipeID) {
                const dynamicLoginMethods = Multitenancy.getInstanceOrThrow().getLoadedDynamicLoginMethods();
                let enabled =
                    dynamicLoginMethods?.[componentToRender?.recipeID as keyof GetLoginMethodsResponseNormalized] !==
                    undefined;
                if (enabled === false) {
                    for (const id in dynamicLoginMethods) {
                        if (componentToRender.recipeID.includes(id)) {
                            enabled = true;
                            break;
                        }
                    }
                }
                setLoadedDynamicLoginMethods(enabled);
            }
        };
        SuperTokens.uiController.on("LoginMethodsLoaded", handler);

        () => SuperTokens.uiController.off("LoginMethodsLoaded", handler);
    }, []);

    const history = props.getReactRouterDomWithCustomHistory()?.useHistoryCustom();

    if (componentToRender === undefined || loadedDynamicLoginMethods === false) {
        return null;
    }

    return <componentToRender.component history={history} />;
}
