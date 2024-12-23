/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import WebauthnRecipe from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { AuthComponent, FeatureBaseProps, RecipeFeatureComponentMap, UserContext } from "../../types";
export declare class WebauthnPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: WebauthnRecipe;
    static instance?: WebauthnPreBuiltUI;
    languageTranslations: {
        en: {};
    };
    constructor(recipeInstance: WebauthnRecipe);
    static getInstanceOrInitAndGetInstance(): WebauthnPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "sign-up" | "sign-in",
        props: FeatureBaseProps<{
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (_?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "sign-up" | "sign-in",
        props: FeatureBaseProps<{
            userContext?: UserContext;
        }>,
        _?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    getAuthComponents(): AuthComponent[];
    static reset(): void;
}
