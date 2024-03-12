/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import FactorChooserTheme from "./components/themes/factorChooser";
import MultiFactorAuthRecipe from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { FeatureBaseProps, RecipeFeatureComponentMap, UserContext } from "../../types";
export declare class MultiFactorAuthPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: MultiFactorAuthRecipe;
    static instance?: MultiFactorAuthPreBuiltUI;
    constructor(recipeInstance: MultiFactorAuthRecipe);
    static getInstanceOrInitAndGetInstance(): MultiFactorAuthPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "factorchooser",
        props: any,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        _: "factorchooser",
        props: any,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    static reset(): void;
    static FactorChooser: (
        props: FeatureBaseProps<{
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static FactorChooserTheme: typeof FactorChooserTheme;
}
declare const FactorChooser: (
    props: FeatureBaseProps<{
        userContext?: UserContext;
    }>
) => JSX.Element;
export { FactorChooser, FactorChooserTheme };
