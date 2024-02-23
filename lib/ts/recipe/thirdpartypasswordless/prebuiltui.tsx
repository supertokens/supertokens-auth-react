import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import { PasswordlessPreBuiltUI } from "../passwordless/prebuiltui";
import { RecipeRouter } from "../recipeRouter";
import { SessionAuth } from "../session";
import { ThirdPartyPreBuiltUI } from "../thirdparty/prebuiltui";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import SignInAndUpFeature from "./components/features/signInAndUp";
import SignInUpTheme from "./components/themes/signInUp";
import ThirdPartyPasswordless from "./recipe";

import type {
    GetRedirectionURLContext,
    NormalisedConfig,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
} from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps, UserContext } from "../../types";

export class ThirdPartyPasswordlessPreBuiltUI extends RecipeRouter {
    static instance?: ThirdPartyPasswordlessPreBuiltUI;

    private thirdPartyPreBuiltUI: ThirdPartyPreBuiltUI | undefined;
    private passwordlessPreBuiltUI: PasswordlessPreBuiltUI | undefined;

    constructor(public readonly recipeInstance: ThirdPartyPasswordless) {
        super();
        const { thirdPartyRecipe, passwordlessRecipe } = recipeInstance;
        if (thirdPartyRecipe !== undefined) {
            this.thirdPartyPreBuiltUI = new ThirdPartyPreBuiltUI(thirdPartyRecipe);
        }
        if (passwordlessRecipe !== undefined) {
            this.passwordlessPreBuiltUI = new PasswordlessPreBuiltUI(passwordlessRecipe);
        }
    }

    // Static methods
    static getInstanceOrInitAndGetInstance(): ThirdPartyPasswordlessPreBuiltUI {
        if (ThirdPartyPasswordlessPreBuiltUI.instance === undefined) {
            const recipeInstance = ThirdPartyPasswordless.getInstanceOrThrow();
            ThirdPartyPasswordlessPreBuiltUI.instance = new ThirdPartyPasswordlessPreBuiltUI(recipeInstance);
        }

        return ThirdPartyPasswordlessPreBuiltUI.instance;
    }
    static getFeatures(
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap {
        return ThirdPartyPasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    }
    static getFeatureComponent(
        componentName: "signInUp" | "linkClickedScreen" | "signinupcallback" | "otp-phone" | "otp-email",
        props: FeatureBaseProps<{ redirectOnSessionExists?: boolean; userContext?: UserContext }>,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element {
        return ThirdPartyPasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    }

    // Instance methods
    getFeatureComponent = (
        componentName: "signInUp" | "linkClickedScreen" | "signinupcallback" | "otp-phone" | "otp-email",
        props: FeatureBaseProps<{ redirectOnSessionExists?: boolean; userContext?: UserContext }>,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        if (componentName === "signInUp") {
            if (props.redirectOnSessionExists !== false) {
                return (
                    <UserContextWrapper userContext={props.userContext}>
                        <AuthWidgetWrapper<
                            GetRedirectionURLContext,
                            PreAndPostAPIHookAction,
                            OnHandleEventContext,
                            NormalisedConfig
                        >
                            authRecipe={this.recipeInstance}
                            navigate={props.navigate}>
                            <SignInAndUpFeature
                                recipe={this.recipeInstance}
                                {...props}
                                useComponentOverrides={useComponentOverrides}
                            />
                        </AuthWidgetWrapper>
                    </UserContextWrapper>
                );
            } else {
                return (
                    <UserContextWrapper userContext={props.userContext}>
                        <SessionAuth requireAuth={false} doRedirection={false}>
                            <SignInAndUpFeature
                                recipe={this.recipeInstance}
                                {...props}
                                useComponentOverrides={useComponentOverrides}
                            />
                        </SessionAuth>
                    </UserContextWrapper>
                );
            }
        } else if (
            "linkClickedScreen" === componentName ||
            "otp-phone" === componentName ||
            "otp-email" === componentName
        ) {
            if (this.passwordlessPreBuiltUI === undefined) {
                throw new Error(
                    "Embedding this component requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                );
            }
            return this.passwordlessPreBuiltUI.getFeatureComponent(componentName, props, useComponentOverrides);
        } else if (componentName === "signinupcallback") {
            if (this.thirdPartyPreBuiltUI === undefined) {
                throw new Error(
                    "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInUpFeature.providers in the configuration."
                );
            }
            return this.thirdPartyPreBuiltUI.getFeatureComponent(componentName, props, useComponentOverrides);
        } else {
            throw new Error("Should never come here.");
        }
    };
    getFeatures = (
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap => {
        let features: RecipeFeatureComponentMap = {};

        if (this.passwordlessPreBuiltUI !== undefined) {
            features = {
                ...features,
                ...this.passwordlessPreBuiltUI.getFeatures(useComponentOverrides),
            };
        }

        if (this.thirdPartyPreBuiltUI !== undefined) {
            features = {
                ...features,
                ...this.thirdPartyPreBuiltUI.getFeatures(useComponentOverrides),
            };
        }

        if (
            (this.recipeInstance.config.passwordlessConfig !== undefined &&
                this.recipeInstance.config.passwordlessConfig.signInUpFeature?.disableDefaultUI !== true) ||
            (this.recipeInstance.config.thirdpartyConfig !== undefined &&
                this.recipeInstance.config.thirdpartyConfig.signInAndUpFeature?.disableDefaultUI !== true)
        ) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath("/")
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (prop: any) => this.getFeatureComponent("signInUp", prop, useComponentOverrides),
                recipeID: ThirdPartyPasswordless.RECIPE_ID,
            };
        }

        return {
            ...features,
        };
    };

    // For tests
    static reset(): void {
        if (!isTest()) {
            return;
        }

        ThirdPartyPasswordlessPreBuiltUI.instance = undefined;
        return;
    }

    static SignInAndUp = (
        prop: FeatureBaseProps<{ redirectOnSessionExists?: boolean; userContext?: UserContext }> = {}
    ) => this.getFeatureComponent("signInUp", prop);
    static ThirdPartySignInAndUpCallback = (prop: FeatureBaseProps<{ userContext?: UserContext }>) =>
        this.getFeatureComponent("signinupcallback", prop);

    static SignInUpTheme = SignInUpTheme;
    static PasswordlessLinkClicked = (prop: FeatureBaseProps<{ userContext?: UserContext }>) =>
        this.getFeatureComponent("linkClickedScreen", prop);
    static MfaOtpPhone = (prop: FeatureBaseProps<{ userContext?: UserContext }>) =>
        this.getFeatureComponent("otp-phone", prop);
    static MfaOtpEmail = (prop: FeatureBaseProps<{ userContext?: UserContext }>) =>
        this.getFeatureComponent("otp-email", prop);
    static MFAOTPTheme = PasswordlessPreBuiltUI.MFAOTPTheme;
}

const SignInAndUp = ThirdPartyPasswordlessPreBuiltUI.SignInAndUp;
const ThirdPartySignInAndUpCallback = ThirdPartyPasswordlessPreBuiltUI.ThirdPartySignInAndUpCallback;
const PasswordlessLinkClicked = ThirdPartyPasswordlessPreBuiltUI.PasswordlessLinkClicked;
const MfaOtpPhone = PasswordlessPreBuiltUI.MfaOtpPhone;
const MfaOtpEmail = PasswordlessPreBuiltUI.MfaOtpEmail;
const MfaOtpTheme = PasswordlessPreBuiltUI.MFAOTPTheme;

export {
    SignInAndUp,
    ThirdPartySignInAndUpCallback,
    PasswordlessLinkClicked,
    SignInUpTheme,
    MfaOtpPhone,
    MfaOtpEmail,
    MfaOtpTheme,
};
