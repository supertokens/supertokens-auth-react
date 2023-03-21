/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import { EmailVerificationTheme } from "./components/themes/emailVerification";
import EmailVerificationRecipe from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap } from "../../types";
export declare class EmailVerificationPreBuiltUI extends RecipeRouter {
    private readonly recipeInstance;
    constructor(recipeInstance: EmailVerificationRecipe);
    static instance?: EmailVerificationPreBuiltUI;
    static getInstanceOrInitAndGetInstance(): EmailVerificationPreBuiltUI;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | null;
    static getFeatures(): RecipeFeatureComponentMap;
    static getFeatureComponent(_: "emailverification", props: any): JSX.Element;
    static getReactRouterDomRoutes(reactRouterDom: any): JSX.Element[];
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        _: "emailverification",
        props: any,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    static reset(): void;
    static EmailVerification: (props?: any) => JSX.Element;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
}
declare const EmailVerification: (props?: any) => JSX.Element;
export { EmailVerification, EmailVerificationTheme };
