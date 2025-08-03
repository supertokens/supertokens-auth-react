import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import { RecipeRouter } from "../recipeRouter";
import { SessionAuth } from "../session";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import { default as MFATOTPFeature } from "./components/features/mfa";
import MFATOTPTheme from "./components/themes/mfa";
import { defaultTranslationsTOTP } from "./components/themes/translations";
import { DEFAULT_TOTP_PATH } from "./constants";
import TOTPRecipe from "./recipe";

import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { FeatureBaseProps, RecipeFeatureComponentMap, UserContext } from "../../types";
import type { AuthComponent } from "../../types";

export class TOTPPreBuiltUI extends RecipeRouter {
    static instance?: TOTPPreBuiltUI;
    languageTranslations = defaultTranslationsTOTP;
    static languageTranslations = defaultTranslationsTOTP;

    constructor(public readonly recipeInstance: TOTPRecipe) {
        super();
    }

    // Static methods
    static getInstanceOrInitAndGetInstance(): TOTPPreBuiltUI {
        if (TOTPPreBuiltUI.instance === undefined) {
            const recipeInstance = TOTPRecipe.getInstanceOrThrow();
            TOTPPreBuiltUI.instance = new TOTPPreBuiltUI(recipeInstance);
        }

        return TOTPPreBuiltUI.instance;
    }
    static getFeatures(
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap {
        return TOTPPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    }
    static getFeatureComponent(
        componentName: "mfaTOTP",
        props: any,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element {
        return TOTPPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
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
        if (this.recipeInstance.config.totpMFAScreen.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_TOTP_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props: any) => this.getFeatureComponent("mfaTOTP", props, useComponentOverrides),
                recipeID: TOTPRecipe.RECIPE_ID,
            };
        }
        return features;
    };
    getFeatureComponent = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _: "mfaTOTP",
        props: any,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        return (
            <UserContextWrapper userContext={props.userContext}>
                <SessionAuth overrideGlobalClaimValidators={() => []}>
                    <MFATOTPFeature
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

        TOTPPreBuiltUI.instance = undefined;
        return;
    }

    static MFATOTP = (props: FeatureBaseProps<{ userContext?: UserContext }>): JSX.Element =>
        TOTPPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("mfaTOTP", props);
    static MFATOTPTheme = MFATOTPTheme;
}

const MFATOTP = TOTPPreBuiltUI.MFATOTP;

export { MFATOTP, MFATOTPTheme };
