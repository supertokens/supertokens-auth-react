import React from "react";
import { AuthRecipeComponentsOverrideContextProvider } from "../recipe/authRecipe/componentOverrideContext";
import type { PreBuiltRecipes, ReactRouterDomWithCustomHistory } from "./types";
import type { Navigate, UserContext } from "../types";
import type { PropsWithChildren } from "react";
declare class UI {
    private static reactRouterDom;
    private static reactRouterDomIsV6?;
    static getSuperTokensRoutesForReactRouterDom(
        reactRouterDom: any,
        preBuiltUiClassList?: PreBuiltRecipes,
        basePath?: string
    ): JSX.Element[];
    static getReactRouterDomWithCustomHistory: () => ReactRouterDomWithCustomHistory | undefined;
    static canHandleRoute(preBuiltUiClassList: PreBuiltRecipes): boolean;
    static getRoutingComponent(preBuiltUiClassList: PreBuiltRecipes): JSX.Element;
    static AuthPage: (
        props: PropsWithChildren<{
            redirectOnSessionExists?: boolean;
            onSessionAlreadyExists?: () => void;
            preBuiltUIList: PreBuiltRecipes;
            factors?: string[];
            isSignUp?: boolean;
            navigate?: Navigate;
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static AuthRecipeComponentsOverrideContextProvider: React.FC<
        React.PropsWithChildren<{
            components: import("../recipe/authRecipe/types").ComponentOverrideMap;
        }>
    >;
}
declare const getSuperTokensRoutesForReactRouterDom: typeof UI.getSuperTokensRoutesForReactRouterDom;
declare const canHandleRoute: typeof UI.canHandleRoute;
declare const getRoutingComponent: typeof UI.getRoutingComponent;
declare const AuthPage: (
    props: PropsWithChildren<{
        redirectOnSessionExists?: boolean;
        onSessionAlreadyExists?: () => void;
        preBuiltUIList: PreBuiltRecipes;
        factors?: string[];
        isSignUp?: boolean;
        navigate?: Navigate;
        userContext?: UserContext;
    }>
) => JSX.Element;
export default UI;
export {
    getSuperTokensRoutesForReactRouterDom,
    canHandleRoute,
    getRoutingComponent,
    AuthPage,
    AuthRecipeComponentsOverrideContextProvider,
};
