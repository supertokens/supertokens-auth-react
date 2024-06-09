import { isTest } from "../../utils";
import { RecipeRouter } from "../recipeRouter";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import { ResumePageSpinner } from "./components/themes/resumePageSpinner";
import { defaultTranslationsOAuth2 } from "./components/themes/translations";
import OAuth2 from "./recipe";

import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps, UserContext } from "../../types";
import type { AuthComponent } from "../../types";

export class OAuth2PreBuiltUI extends RecipeRouter {
    static instance?: OAuth2PreBuiltUI;

    languageTranslations = defaultTranslationsOAuth2;

    constructor(public readonly recipeInstance: OAuth2) {
        super();
    }

    // Static methods
    static getInstanceOrInitAndGetInstance(): OAuth2PreBuiltUI {
        if (OAuth2PreBuiltUI.instance === undefined) {
            const recipeInstance = OAuth2.getInstanceOrThrow();
            OAuth2PreBuiltUI.instance = new OAuth2PreBuiltUI(recipeInstance);
        }

        return OAuth2PreBuiltUI.instance;
    }
    static getFeatures(
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap {
        return OAuth2PreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    }
    static getFeatureComponent(
        componentName: never,
        props: FeatureBaseProps<{ redirectOnSessionExists?: boolean; userContext?: UserContext }>,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element {
        return OAuth2PreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    }

    // Instance methods
    getFeatures = (
        _useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap => {
        const features: RecipeFeatureComponentMap = {};

        return features;
    };
    getFeatureComponent = (
        _componentName: never,
        _props: FeatureBaseProps<{ redirectOnSessionExists?: boolean; userContext?: UserContext }>,
        _useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        throw new Error("Not implemented.");
    };

    getAuthComponents(): AuthComponent[] {
        return [];
    }

    // For tests
    static reset(): void {
        if (!isTest()) {
            return;
        }

        OAuth2PreBuiltUI.instance = undefined;
        return;
    }

    static ResumePageSpinnerTheme = ResumePageSpinner;
}

export { ResumePageSpinner as ResumePageSpinnerTheme };
