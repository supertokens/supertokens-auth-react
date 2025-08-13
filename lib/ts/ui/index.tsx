import React from "react";

import { RoutingComponent } from "../components/routingComponent";
import { getSuperTokensRoutesForReactRouterDom as getSuperTokensRoutesForLegacyReactRouterDom } from "../components/superTokensRoute";
import { getSuperTokensRoutesForReactRouterDomV6 } from "../components/superTokensRouteV6";
import { AuthRecipeComponentsOverrideContextProvider } from "../recipe/authRecipe/componentOverrideContext";
import AuthPageWrapper from "../recipe/authRecipe/components/feature/authPage/authPage";
import { AuthPageTheme } from "../recipe/authRecipe/components/theme/authPage";
import { AuthPageComponentList } from "../recipe/authRecipe/components/theme/authPage/authPageComponentList";
import { AuthPageFooter } from "../recipe/authRecipe/components/theme/authPage/authPageFooter";
import { AuthPageHeader } from "../recipe/authRecipe/components/theme/authPage/authPageHeader";
import { RecipeRouter } from "../recipe/recipeRouter";
import SuperTokens from "../superTokens";
import { defaultTranslationsCommon } from "../translation/translations";
import { getCurrentNormalisedUrlPath } from "../utils";

import type { PreBuiltRecipes, ReactRouterDomWithCustomHistory } from "./types";
import type { AuthPageProps } from "../recipe/authRecipe/components/feature/authPage/authPage";
import type { AuthPageThemeProps } from "../recipe/authRecipe/types";
import type { PropsWithChildren } from "react";

class UI {
    private static reactRouterDom: ReactRouterDomWithCustomHistory;
    private static reactRouterDomIsV6?: boolean;

    static languageTranslations = defaultTranslationsCommon;

    static getSuperTokensRoutesForReactRouterDom(
        reactRouterDom: any,
        preBuiltUiClassList: PreBuiltRecipes = [],
        basePath?: string
    ): JSX.Element[] {
        if (reactRouterDom === undefined || preBuiltUiClassList.length === 0) {
            throw new Error(
                // eslint-disable-next-line @typescript-eslint/quotes
                'Please use getSuperTokensRoutesForReactRouterDom like getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [EmailPasswordPreBuiltUI]) in your render function'
            );
        }
        const recipeList = preBuiltUiClassList.map((r) => r.getInstanceOrInitAndGetInstance());
        if (UI.reactRouterDomIsV6 === undefined) {
            UI.reactRouterDomIsV6 = reactRouterDom.withRouter === undefined;
        }
        if (UI.reactRouterDomIsV6) {
            if (UI.reactRouterDom === undefined) {
                // this function wraps the react-router-dom v6 useNavigate function in a way
                // that enforces that it runs within a useEffect. The reason we do this is
                // cause of https://github.com/remix-run/react-router/issues/7460
                // which gets shown when visiting a social auth callback url like
                // /auth/callback/github, without a valid code or state. This then
                // doesn't navigate the user to the auth page.
                const useNavigateHookForRRDV6 = function (): any {
                    const navigateHook = reactRouterDom.useNavigate();
                    const [to, setTo] = React.useState(undefined);
                    React.useEffect(() => {
                        if (to !== undefined) {
                            setTo(undefined);
                            navigateHook(to);
                        }
                    }, [to, navigateHook, setTo]);
                    return setTo;
                };
                UI.reactRouterDom = {
                    router: reactRouterDom,
                    useHistoryCustom: useNavigateHookForRRDV6,
                    useLocation: reactRouterDom.useLocation,
                };
            }

            return getSuperTokensRoutesForReactRouterDomV6({
                getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
                recipeList,
                basePath,
            });
        }
        if (UI.reactRouterDom === undefined) {
            UI.reactRouterDom = {
                router: reactRouterDom,
                useHistoryCustom: reactRouterDom.useHistory,
                useLocation: reactRouterDom.useLocation,
            };
        }
        return getSuperTokensRoutesForLegacyReactRouterDom({
            getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
            recipeList,
            basePath,
        });
    }

    static getReactRouterDomWithCustomHistory = (): ReactRouterDomWithCustomHistory | undefined => {
        return UI.reactRouterDom;
    };

    static canHandleRoute(preBuiltUiClassList: PreBuiltRecipes): boolean {
        const recipeList = preBuiltUiClassList.map((r) => r.getInstanceOrInitAndGetInstance());
        const path = getCurrentNormalisedUrlPath().getAsStringDangerous();
        const isAuthPage = path === SuperTokens.getInstanceOrThrow().appInfo.websiteBasePath.getAsStringDangerous();

        if (isAuthPage) {
            return !SuperTokens.getInstanceOrThrow().disableAuthRoute;
        }

        return (
            RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
                getCurrentNormalisedUrlPath(),
                recipeList,
                true
            ) !== undefined
        );
    }

    static getRoutingComponent(preBuiltUiClassList: PreBuiltRecipes): JSX.Element {
        const recipeList = preBuiltUiClassList.map((r) => r.getInstanceOrInitAndGetInstance());
        return (
            <RoutingComponent
                getReactRouterDomWithCustomHistory={UI.getReactRouterDomWithCustomHistory}
                path={getCurrentNormalisedUrlPath().getAsStringDangerous()}
                preBuiltUIList={recipeList}
            />
        );
    }
    static AuthPage = (
        props: PropsWithChildren<
            Omit<AuthPageProps, "preBuiltUIList"> & {
                preBuiltUIList: PreBuiltRecipes;
            }
        >
    ) => (
        <AuthPageWrapper
            {...props}
            preBuiltUIList={props.preBuiltUIList.map((r) => r.getInstanceOrInitAndGetInstance())}
        />
    );

    static AuthPageTheme = AuthPageTheme;
    static AuthPageFooter = AuthPageFooter;
    static AuthPageHeader = AuthPageHeader;
    static AuthPageComponentList = AuthPageComponentList;

    static AuthRecipeComponentsOverrideContextProvider = AuthRecipeComponentsOverrideContextProvider;
}

const languageTranslations = UI.languageTranslations;
const getSuperTokensRoutesForReactRouterDom = UI.getSuperTokensRoutesForReactRouterDom;
const canHandleRoute = UI.canHandleRoute;
const getRoutingComponent = UI.getRoutingComponent;
const AuthPage = UI.AuthPage;

export default UI;
export {
    languageTranslations,
    getSuperTokensRoutesForReactRouterDom,
    canHandleRoute,
    getRoutingComponent,
    AuthPage,
    AuthPageTheme,
    AuthPageFooter,
    AuthPageHeader,
    AuthPageComponentList,
    AuthRecipeComponentsOverrideContextProvider,
    AuthPageThemeProps,
};
