/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import { EmailVerificationTheme } from "./components/themes/emailVerification";
import EmailVerificationRecipe from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { FeatureBaseProps, RecipeFeatureComponentMap, UserContext } from "../../types";
export declare class EmailVerificationPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: EmailVerificationRecipe;
    static instance?: EmailVerificationPreBuiltUI;
    constructor(recipeInstance: EmailVerificationRecipe);
    static getInstanceOrInitAndGetInstance(): EmailVerificationPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "emailverification",
        props: any,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        _: "emailverification",
        props: FeatureBaseProps<{
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    static reset(): void;
    static EmailVerification: (
        props: FeatureBaseProps<{
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
}
declare const EmailVerification: (
    props: FeatureBaseProps<{
        userContext?: UserContext;
    }>
) => JSX.Element;
export { EmailVerification, EmailVerificationTheme };
