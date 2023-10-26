/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import MFATOTPTheme from "./components/themes/mfa";
import TOTPRecipe from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap } from "../../types";
export declare class TOTPPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: TOTPRecipe;
    static instance?: TOTPPreBuiltUI;
    constructor(recipeInstance: TOTPRecipe);
    static getInstanceOrInitAndGetInstance(): TOTPPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "mfaTOTP",
        props: any,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        _: "mfaTOTP",
        props: any,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    static reset(): void;
    static MFATOTP: (props?: any) => JSX.Element;
    static MFATOTPTheme: typeof MFATOTPTheme;
}
declare const MFATOTP: (props?: any) => JSX.Element;
export { MFATOTP, MFATOTPTheme };
