import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import { PasswordlessPreBuiltUI } from "../passwordless/prebuiltui";
import { RecipeRouter } from "../recipeRouter";
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
import type { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import type { PropsWithChildren } from "react";

export class ThirdPartyPasswordlessPreBuiltUI extends RecipeRouter {
    static instance?: ThirdPartyPasswordlessPreBuiltUI;
    constructor(private readonly recipeInstance: ThirdPartyPasswordless) {
        super();
    }

    // Static methods
    static getInstanceOrInitAndGetInstance(): ThirdPartyPasswordlessPreBuiltUI {
        if (ThirdPartyPasswordlessPreBuiltUI.instance === undefined) {
            const recipeInstance = ThirdPartyPasswordless.getInstanceOrThrow();
            ThirdPartyPasswordlessPreBuiltUI.instance = new ThirdPartyPasswordlessPreBuiltUI(recipeInstance);
        }

        return ThirdPartyPasswordlessPreBuiltUI.instance;
    }
    static getFeatures(): RecipeFeatureComponentMap {
        return ThirdPartyPasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures();
    }
    static getFeatureComponent(
        componentName: "signInUp" | "linkClickedScreen" | "signinupcallback",
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any }
    ): JSX.Element {
        return ThirdPartyPasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props
        );
    }

    // Instance methods
    getFeatureComponent = (
        componentName: "signInUp" | "linkClickedScreen" | "signinupcallback",
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any },
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
                            history={props.history}>
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
                        <SignInAndUpFeature
                            recipe={this.recipeInstance}
                            {...props}
                            useComponentOverrides={useComponentOverrides}
                        />
                    </UserContextWrapper>
                );
            }
        } else if (componentName === "linkClickedScreen") {
            if (this.recipeInstance.passwordlessRecipe === undefined) {
                throw new Error(
                    "Embedding this component requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                );
            }
            return PasswordlessPreBuiltUI.getFeatureComponent(
                componentName,
                props,
                this.recipeInstance.passwordlessRecipe
            );
        } else if (componentName === "signinupcallback") {
            if (this.recipeInstance.thirdPartyRecipe === undefined) {
                throw new Error(
                    "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInUpFeature.providers in the configuration."
                );
            }
            return ThirdPartyPreBuiltUI.getFeatureComponent(
                componentName,
                props,
                useComponentOverrides,
                this.recipeInstance.thirdPartyRecipe
            );
        } else {
            throw new Error("Should never come here.");
        }
    };
    getFeatures = (
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap => {
        let features: RecipeFeatureComponentMap = {};

        if (this.recipeInstance.passwordlessRecipe !== undefined) {
            features = {
                ...features,
                ...PasswordlessPreBuiltUI.getFeatures(this.recipeInstance.passwordlessRecipe, useComponentOverrides),
            };
        }

        if (this.recipeInstance.thirdPartyRecipe !== undefined) {
            features = {
                ...features,
                ...ThirdPartyPreBuiltUI.getFeatures(this.recipeInstance.thirdPartyRecipe, useComponentOverrides),
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

    static SignInAndUp = (prop: PropsWithChildren<{ redirectOnSessionExists?: boolean; userContext?: any }> = {}) =>
        this.getFeatureComponent("signInUp", prop);
    static ThirdPartySignInAndUpCallback = (prop?: any) => this.getFeatureComponent("signinupcallback", prop);

    static SignInUpTheme = SignInUpTheme;
    static PasswordlessLinkClicked = (prop?: any) => this.getFeatureComponent("linkClickedScreen", prop);
}

const _getFeatures = ThirdPartyPasswordlessPreBuiltUI.getFeatures;
const _getFeatureComponent = ThirdPartyPasswordlessPreBuiltUI.getFeatureComponent;
const SignInAndUp = ThirdPartyPasswordlessPreBuiltUI.SignInAndUp;
const ThirdPartySignInAndUpCallback = ThirdPartyPasswordlessPreBuiltUI.ThirdPartySignInAndUpCallback;
const PasswordlessLinkClicked = ThirdPartyPasswordlessPreBuiltUI.PasswordlessLinkClicked;

export {
    _getFeatures,
    _getFeatureComponent,
    SignInAndUp,
    ThirdPartySignInAndUpCallback,
    PasswordlessLinkClicked,
    SignInUpTheme,
};
