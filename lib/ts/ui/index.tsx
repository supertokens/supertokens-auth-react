import React from "react";

import { RoutingComponent } from "../components/routingComponent";
import { getSuperTokensRoutesForReactRouterDom } from "../components/superTokensRoute";
import { getSuperTokensRoutesForReactRouterDomV6 } from "../components/superTokensRouteV6";
import { getCurrentNormalisedUrlPath } from "../utils";

import type { PreBuiltRecipes, ReactRouterDom } from "./types";

export default class UI {
    private static reactRouterDom: ReactRouterDom;
    private static reactRouterDomIsV6?: boolean;

    static getSuperTokensReactRouterDomRoutes(
        reactRouterDom: any,
        preBuiltUiClassList: PreBuiltRecipes
    ): JSX.Element[] {
        if (reactRouterDom === undefined) {
            throw new Error(
                // eslint-disable-next-line @typescript-eslint/quotes
                'Please use getRecipeRoutes like getRecipeRoutes(require("react-router-dom")) in your render function'
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
            });
        }
        if (UI.reactRouterDom === undefined) {
            UI.reactRouterDom = {
                router: reactRouterDom,
                useHistoryCustom: reactRouterDom.useHistory,
                useLocation: reactRouterDom.useLocation,
            };
        }
        return getSuperTokensRoutesForReactRouterDom({
            getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
            recipeList,
        });
    }

    static getReactRouterDomWithCustomHistory = (): ReactRouterDom | undefined => {
        return UI.reactRouterDom;
    };

    static canHandleRoute(preBuiltUiClassList: PreBuiltRecipes): boolean {
        const recipeList = preBuiltUiClassList.map((r) => r.getInstanceOrInitAndGetInstance());
        return recipeList.some((r) => r.canHandleRoute());
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
}

const getSuperTokensReactRouterDomRoutes = UI.getSuperTokensReactRouterDomRoutes;
const canHandleRoute = UI.canHandleRoute;
const getRoutingComponent = UI.getRoutingComponent;

export { getSuperTokensReactRouterDomRoutes, canHandleRoute, getRoutingComponent };
