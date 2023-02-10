import React from "react";
import NormalisedURLPath from "supertokens-web-js/lib/build/normalisedURLPath";
import { RoutingComponent } from "../../components/routingComponent";
import { getSuperTokensRoutesForReactRouterDom } from "../../components/superTokensRoute";
import { getSuperTokensRoutesForReactRouterDomV6 } from "../../components/superTokensRouteV6";
import { BaseFeatureComponentMap, ComponentWithRecipeAndMatchingMethod } from "../../types";
import { getCurrentNormalisedUrlPath } from "../../utils";
import RecipeModule from "../recipeModule";

export class RecipeRoutes {
    private pathsToFeatureComponentWithRecipeIdMap?: BaseFeatureComponentMap;

    constructor(private readonly recipe: RecipeModule<unknown, unknown, unknown, any>) {}

    private static reactRouterDom?: { router: { Route: any }; useHistoryCustom: () => any };
    private static reactRouterDomIsV6: boolean | undefined = undefined;

    static getRoutes(reactRouterDom: any, instance: RecipeRoutes): JSX.Element[] {
        if (reactRouterDom === undefined) {
            throw new Error(
                // eslint-disable-next-line @typescript-eslint/quotes
                'Please use getSuperTokensRoutesForReactRouterDom like getSuperTokensRoutesForReactRouterDom(require("react-router-dom")) in your render function'
            );
        }
        RecipeRoutes.reactRouterDom = reactRouterDom;
        if (RecipeRoutes.reactRouterDomIsV6 === undefined) {
            RecipeRoutes.reactRouterDomIsV6 = reactRouterDom.withRouter === undefined;
        }
        if (RecipeRoutes.reactRouterDomIsV6) {
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
            RecipeRoutes.reactRouterDom = {
                router: reactRouterDom,
                useHistoryCustom: useNavigateHookForRRDV6,
            };

            return getSuperTokensRoutesForReactRouterDomV6(instance);
        }
        RecipeRoutes.reactRouterDom = {
            router: reactRouterDom,
            useHistoryCustom: reactRouterDom.useHistory,
        };
        return getSuperTokensRoutesForReactRouterDom(instance);
    }

    /*
     * Instance Methods.
     */
    canHandleRoute = (): boolean => {
        return this.getMatchingComponentForRouteAndRecipeId(getCurrentNormalisedUrlPath()) !== undefined;
    };

    getReactRouterDomWithCustomHistory = (): { router: { Route: any }; useHistoryCustom: () => any } | undefined => {
        return RecipeRoutes.reactRouterDom;
    };

    getRoutingComponent = (): JSX.Element | null => {
        return (
            <RoutingComponent path={getCurrentNormalisedUrlPath().getAsStringDangerous()} supertokensInstance={this} />
        );
    };

    getPathsToFeatureComponentWithRecipeIdMap = (): BaseFeatureComponentMap => {
        // Memoized version of the map.
        if (this.pathsToFeatureComponentWithRecipeIdMap !== undefined) {
            return this.pathsToFeatureComponentWithRecipeIdMap;
        }

        const pathsToFeatureComponentWithRecipeIdMap: BaseFeatureComponentMap = {};
        const features = this.recipe.getFeatures();
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
}
