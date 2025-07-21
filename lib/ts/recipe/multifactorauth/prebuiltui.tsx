import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import { RecipeRouter } from "../recipeRouter";
import { SessionAuth } from "../session";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import { default as FactorChooserFeature } from "./components/features/factorChooser";
import FactorChooserThemeWrapper from "./components/themes/factorChooser";
import { defaultTranslationsMultiFactorAuth } from "./components/themes/translations";
import { DEFAULT_FACTOR_CHOOSER_PATH } from "./constants";
import MultiFactorAuthRecipe from "./recipe";

import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { FeatureBaseProps, RecipeFeatureComponentMap, UserContext } from "../../types";
import type { AuthComponent } from "../../types";

export class MultiFactorAuthPreBuiltUI extends RecipeRouter {
    static instance?: MultiFactorAuthPreBuiltUI;
    languageTranslations = defaultTranslationsMultiFactorAuth;
    static languageTranslations = defaultTranslationsMultiFactorAuth;

    constructor(public readonly recipeInstance: MultiFactorAuthRecipe) {
        super();
    }

    // Static methods
    static getInstanceOrInitAndGetInstance(): MultiFactorAuthPreBuiltUI {
        if (MultiFactorAuthPreBuiltUI.instance === undefined) {
            const recipeInstance = MultiFactorAuthRecipe.getInstanceOrThrow();
            MultiFactorAuthPreBuiltUI.instance = new MultiFactorAuthPreBuiltUI(recipeInstance);
        }

        return MultiFactorAuthPreBuiltUI.instance;
    }
    static getFeatures(
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap {
        return MultiFactorAuthPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    }
    static getFeatureComponent(
        componentName: "factorchooser",
        props: any,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element {
        return MultiFactorAuthPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    }

    // Instance methods
    getFeatures = (
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap => {
        const features: RecipeFeatureComponentMap = {};
        if (this.recipeInstance.config.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_FACTOR_CHOOSER_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props: any) => this.getFeatureComponent("factorchooser", props, useComponentOverrides),
                recipeID: MultiFactorAuthRecipe.RECIPE_ID,
            };
        }
        return features;
    };
    getFeatureComponent = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _: "factorchooser",
        props: any,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        return (
            <UserContextWrapper userContext={props.userContext}>
                <SessionAuth overrideGlobalClaimValidators={() => []}>
                    <FactorChooserFeature
                        recipe={this.recipeInstance}
                        useComponentOverrides={useComponentOverrides}
                        {...props}
                    />
                </SessionAuth>
            </UserContextWrapper>
        );
    };

    getAuthComponents(): AuthComponent[] {
        return [];
    }

    // For tests
    static reset(): void {
        if (!isTest()) {
            return;
        }

        MultiFactorAuthPreBuiltUI.instance = undefined;
        return;
    }

    static FactorChooser = (props: FeatureBaseProps<{ userContext?: UserContext }>): JSX.Element =>
        MultiFactorAuthPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("factorchooser", props);
    static FactorChooserTheme = FactorChooserThemeWrapper;
}

const FactorChooser = MultiFactorAuthPreBuiltUI.FactorChooser;

export { FactorChooser, FactorChooserThemeWrapper as FactorChooserTheme };
