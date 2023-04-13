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

    private thirdPartyPreBuiltUI: ThirdPartyPreBuiltUI | undefined;
    private passwordlessPreBuiltUI: PasswordlessPreBuiltUI | undefined;

    constructor(private readonly recipeInstance: ThirdPartyPasswordless) {
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
        componentName: "signInUp" | "linkClickedScreen" | "signinupcallback",
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any },
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
            (this.recipeInstance.config.passwordlessUserInput !== undefined &&
                this.recipeInstance.config.passwordlessUserInput.signInUpFeature?.disableDefaultUI !== true) ||
            (this.recipeInstance.config.thirdpartyUserInput !== undefined &&
                this.recipeInstance.config.thirdpartyUserInput.signInAndUpFeature?.disableDefaultUI !== true)
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

const SignInAndUp = ThirdPartyPasswordlessPreBuiltUI.SignInAndUp;
const ThirdPartySignInAndUpCallback = ThirdPartyPasswordlessPreBuiltUI.ThirdPartySignInAndUpCallback;
const PasswordlessLinkClicked = ThirdPartyPasswordlessPreBuiltUI.PasswordlessLinkClicked;

export { SignInAndUp, ThirdPartySignInAndUpCallback, PasswordlessLinkClicked, SignInUpTheme };
