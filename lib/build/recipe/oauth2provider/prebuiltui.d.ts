/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import OAuth2ProviderRecipe from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { FeatureBaseProps, RecipeFeatureComponentMap, UserContext } from "../../types";
import type { AuthComponent } from "../../types";
export declare class OAuth2ProviderPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: OAuth2ProviderRecipe;
    static instance?: OAuth2ProviderPreBuiltUI;
    languageTranslations: {
        en: {};
    };
    constructor(recipeInstance: OAuth2ProviderRecipe);
    static getInstanceOrInitAndGetInstance(): OAuth2ProviderPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "try-refresh-page",
        props: any,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        _: "try-refresh-page",
        props: FeatureBaseProps<{
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    getAuthComponents(): AuthComponent[];
    static reset(): void;
    static TryRefreshPage: (
        props: FeatureBaseProps<{
            userContext?: UserContext;
        }>
    ) => JSX.Element;
}
declare const TryRefreshPage: (
    props: FeatureBaseProps<{
        userContext?: UserContext;
    }>
) => JSX.Element;
export { TryRefreshPage };
