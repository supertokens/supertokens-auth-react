import React, { useEffect, useState } from "react";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import { redirectToAuth, useTranslation, useUserContext } from "..";
import AuthPageWrapper from "../recipe/authRecipe/components/feature/authPage/authPage";
import DynamicLoginMethodsSpinner from "../recipe/multitenancy/components/features/dynamicLoginMethodsSpinner";
import Multitenancy from "../recipe/multitenancy/recipe";
import { RecipeRouter } from "../recipe/recipeRouter";
import { AccessDeniedScreen } from "../recipe/session/prebuiltui";
import SuperTokens from "../superTokens";

import type { GetLoginMethodsResponseNormalized } from "../recipe/multitenancy/types";
import type { ReactRouterDomWithCustomHistory } from "../ui/types";

export function RoutingComponent(props: {
    getReactRouterDomWithCustomHistory: () => ReactRouterDomWithCustomHistory | undefined;
    preBuiltUIList: RecipeRouter[];
    path: string;
}): JSX.Element | null {
    const userContext = useUserContext();
    const t = useTranslation();
    const [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods] = useState<
        GetLoginMethodsResponseNormalized | undefined
    >(undefined);
    const [errMsg, setErrMsg] = useState<string | undefined>(undefined);
    const navigate = props.getReactRouterDomWithCustomHistory()?.useHistoryCustom();
    const path = props.path;
    const isAuthPage = path === SuperTokens.getInstanceOrThrow().appInfo.websiteBasePath.getAsStringDangerous();

    const location = props.getReactRouterDomWithCustomHistory()?.useLocation();
    const componentToRender = React.useMemo(() => {
        if (isAuthPage) {
            return;
        }
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
        // Don't make the API call if we already have an error or the methods
        if (errMsg !== undefined || loadedDynamicLoginMethods) {
            return;
        }
        Multitenancy.getInstanceOrThrow()
            .getCurrentDynamicLoginMethods({ userContext })
            .then(
                (loginMethods) => setLoadedDynamicLoginMethods(loginMethods),
                (err) => {
                    const translatedMessage = t("TENANT_LOGIN_METHODS_ERROR");
                    let message = `${translatedMessage}: ${err.message}`;
                    if (err.status === 500) {
                        message = t("AUTH_PAGE_TENTANT_ERROR");
                    }
                    setErrMsg(message);
                }
            );
    }, [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods, errMsg]);

    if (errMsg !== undefined) {
        return <AccessDeniedScreen error={errMsg} />;
    }

    if (isAuthPage) {
        return (
            <AuthPageWrapper
                preBuiltUIList={props.preBuiltUIList}
                navigate={navigate}
                useSignUpStateFromQueryString={true}
            />
        );
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
