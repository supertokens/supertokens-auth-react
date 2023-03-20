import React from "react";

import { RoutingComponent } from "../../components/routingComponent";
import { getSuperTokensRoutesForReactRouterDom } from "../../components/superTokensRoute";
import { getSuperTokensRoutesForReactRouterDomV6 } from "../../components/superTokensRouteV6";
import { getCurrentNormalisedUrlPath } from "../../utils";

import type { RecipeFeatureComponentMap } from "../../types";
import type { BaseFeatureComponentMap, ComponentWithRecipeAndMatchingMethod } from "../../types";
import type NormalisedURLPath from "supertokens-web-js/lib/build/normalisedURLPath";

export abstract class RecipeRouter {
    private pathsToFeatureComponentWithRecipeIdMap?: BaseFeatureComponentMap;

    private static reactRouterDom?: { router: { Route: any }; useHistoryCustom: () => any; useLocation: () => any };
    private static reactRouterDomIsV6: boolean | undefined = undefined;
    private static preBuiltUIList: RecipeRouter[] = [];

    static getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
        normalisedUrl: NormalisedURLPath
    ): ComponentWithRecipeAndMatchingMethod | undefined {
        const path = normalisedUrl.getAsStringDangerous();

        const routeComponents = RecipeRouter.preBuiltUIList.reduce((components, c) => {
            const routes = c.getPathsToFeatureComponentWithRecipeIdMap?.()[path];
            return routes !== undefined ? components.concat(routes) : components;
        }, [] as ComponentWithRecipeAndMatchingMethod[]);

        if (routeComponents === undefined) {
            return undefined;
        }

        const component = routeComponents.find((c) => c.matches());
        if (component !== undefined) {
            return component;
        }

        // Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.
        return routeComponents[0];
    }

    static addPrebuiltUI(instance: RecipeRouter): void {
        if (!RecipeRouter.preBuiltUIList.includes(instance)) {
            RecipeRouter.preBuiltUIList.push(instance);
        }
    }

    static getRecipeRoutes(reactRouterDom: any, instance: RecipeRouter): JSX.Element[] {
        if (!RecipeRouter.preBuiltUIList.includes(instance)) {
            RecipeRouter.preBuiltUIList.push(instance);
        }
        if (reactRouterDom === undefined) {
            throw new Error(
                // eslint-disable-next-line @typescript-eslint/quotes
                'Please use getRecipeRoutes like getRecipeRoutes(require("react-router-dom")) in your render function'
            );
        }
        if (RecipeRouter.reactRouterDomIsV6 === undefined) {
            RecipeRouter.reactRouterDomIsV6 = reactRouterDom.withRouter === undefined;
        }
        if (RecipeRouter.reactRouterDomIsV6) {
            if (RecipeRouter.reactRouterDom === undefined) {
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
                RecipeRouter.reactRouterDom = {
                    router: reactRouterDom,
                    useHistoryCustom: useNavigateHookForRRDV6,
                    useLocation: reactRouterDom.useLocation,
                };
            }

            return getSuperTokensRoutesForReactRouterDomV6(instance);
        }
        if (RecipeRouter.reactRouterDom === undefined) {
            RecipeRouter.reactRouterDom = {
                router: reactRouterDom,
                useHistoryCustom: reactRouterDom.useHistory,
                useLocation: reactRouterDom.useLocation,
            };
        }
        return getSuperTokensRoutesForReactRouterDom(instance);
    }

    /*
     * Instance Methods.
     */
    canHandleRoute = (): boolean => {
        return this.getMatchingComponentForRouteAndRecipeId(getCurrentNormalisedUrlPath()) !== undefined;
    };

    static getReactRouterDomWithCustomHistory = ():
        | { router: { Route: any }; useHistoryCustom: () => any; useLocation: () => any }
        | undefined => {
        return RecipeRouter.reactRouterDom;
    };

    getReactRouterDomWithCustomHistory = ():
        | { router: { Route: any }; useHistoryCustom: () => any; useLocation: () => any }
        | undefined => {
        return RecipeRouter.reactRouterDom;
    };

    getRoutingComponent = (): JSX.Element | null => {
        return (
            <RoutingComponent path={getCurrentNormalisedUrlPath().getAsStringDangerous()} recipeRoutesInstance={this} />
        );
    };

    getPathsToFeatureComponentWithRecipeIdMap = (): BaseFeatureComponentMap => {
        // Memoized version of the map.
        if (this.pathsToFeatureComponentWithRecipeIdMap !== undefined) {
            return this.pathsToFeatureComponentWithRecipeIdMap;
        }

        const pathsToFeatureComponentWithRecipeIdMap: BaseFeatureComponentMap = {};
        const features = this.getFeatures();
        const featurePaths = Object.keys(features);
        for (let j = 0; j < featurePaths.length; j++) {
            // If no components yet for this route, initialize empty array.
            const featurePath = featurePaths[j];
            if (pathsToFeatureComponentWithRecipeIdMap[featurePath] === undefined) {
                pathsToFeatureComponentWithRecipeIdMap[featurePath] = [];
            }

            pathsToFeatureComponentWithRecipeIdMap[featurePath].push(features[featurePath]);
        }

        this.pathsToFeatureComponentWithRecipeIdMap = pathsToFeatureComponentWithRecipeIdMap;
        return this.pathsToFeatureComponentWithRecipeIdMap;
    };

    getMatchingComponentForRouteAndRecipeId = (
        normalisedUrl: NormalisedURLPath
    ): ComponentWithRecipeAndMatchingMethod | undefined => {
        const path = normalisedUrl.getAsStringDangerous();
        const routeComponents = this.getPathsToFeatureComponentWithRecipeIdMap()[path];
        if (routeComponents === undefined) {
            return undefined;
        }

        const component = routeComponents.find((c) => c.matches());
        if (component !== undefined) {
            return component;
        }

        // Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.
        return routeComponents[0];
    };

    abstract getFeatures(): RecipeFeatureComponentMap;
}
