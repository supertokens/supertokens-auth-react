/// <reference types="react" />
import { RecipeFeatureComponentMap } from "../../types";
import { EmailVerificationTheme } from "./components/themes/emailVerification";
import { RecipeRouter } from "../recipeRouter";
import EmailVerification from "./recipe";
export declare class EmailVerificationPreBuiltUI extends RecipeRouter {
    private readonly recipeInstance;
    constructor(recipeInstance: EmailVerification);
    static instance: EmailVerificationPreBuiltUI;
    static getInstanceOrInitAndGetInstance(): EmailVerificationPreBuiltUI;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | null;
    static getFeatures(): RecipeFeatureComponentMap;
    static getFeatureComponent(_: "emailverification", props: any): JSX.Element;
    static getReactRouterDomRoutes(reactRouterDom: any): JSX.Element[];
    getFeatures: () => RecipeFeatureComponentMap;
    getFeatureComponent: (_: "emailverification", props: any) => JSX.Element;
    static EmailVerification: (props?: any) => JSX.Element;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
}
