import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import { RecipeRouter } from "../recipeRouter";
import { SessionAuth } from "../session";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import { default as MFATOTPFeature } from "./components/features/mfa";
import MFATOTPTheme from "./components/themes/mfa";
import { DEFAULT_TOTP_PATH } from "./constants";
import MultiFactorAuthRecipe from "./recipe";

import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap } from "../../types";

export class MultiFactorAuthPreBuiltUI extends RecipeRouter {
    static instance?: MultiFactorAuthPreBuiltUI;
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
        componentName: "mfaTOTP",
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
        if (this.recipeInstance.config.totpMFAScreen.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_TOTP_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props: any) => this.getFeatureComponent("mfaTOTP", props, useComponentOverrides),
                recipeID: MultiFactorAuthRecipe.RECIPE_ID,
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

    // For tests
    static reset(): void {
        if (!isTest()) {
            return;
        }

        MultiFactorAuthPreBuiltUI.instance = undefined;
        return;
    }

    static MFATOTP = (props?: any): JSX.Element =>
        MultiFactorAuthPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("mfaTOTP", props);
    static MFATOTPTheme = MFATOTPTheme;
}

const MFATOTP = MultiFactorAuthPreBuiltUI.MFATOTP;

export { MFATOTP, MFATOTPTheme };
