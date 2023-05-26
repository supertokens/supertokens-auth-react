import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import { SSRSafeWrapper } from "../../components/ssrSafeWrapper";
import { getRecipeFeaturesSSRSafe } from "../../ui/uiutils";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import { RecipeRouter } from "../recipeRouter";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import ResetPasswordUsingTokenFeature from "./components/features/resetPasswordUsingToken";
import SignInAndUpFeature from "./components/features/signInAndUp";
import ResetPasswordUsingTokenTheme from "./components/themes/resetPasswordUsingToken";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { DEFAULT_RESET_PASSWORD_PATH } from "./constants";
import EmailPassword from "./recipe";

import type {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    NormalisedConfig,
} from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import type { PropsWithChildren } from "react";

type ComponentName = "signinup" | "resetpassword";

export class EmailPasswordPreBuiltUI extends RecipeRouter {
    static instance?: EmailPasswordPreBuiltUI;
    constructor(private readonly recipeInstance: EmailPassword) {
        super();
    }

    // Static methods
    static getInstanceOrInitAndGetInstance(): EmailPasswordPreBuiltUI {
        if (EmailPasswordPreBuiltUI.instance === undefined) {
            const recipeInstance = EmailPassword.getInstanceOrThrow();
            EmailPasswordPreBuiltUI.instance = new EmailPasswordPreBuiltUI(recipeInstance);
        }

        return EmailPasswordPreBuiltUI.instance;
    }
    static getFeatures(
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap {
        return getRecipeFeaturesSSRSafe(EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance, (recipeInstance) => {
            return recipeInstance.getFeatures(useComponentOverrides);
        });
    }
    static getFeatureComponent(
        componentName: ComponentName,
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any },
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element {
        return (
            <SSRSafeWrapper<ComponentName, EmailPasswordPreBuiltUI>
                componentName={componentName}
                getRecipe={EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance}
                getFeatureComponent={(componentName, recipeInstance) => {
                    return recipeInstance.getFeatureComponent(componentName, props, useComponentOverrides);
                }}
            />
        );
    }

    // Instance methods
    getFeatures = (
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap => {
        const features: RecipeFeatureComponentMap = {};
        if (this.recipeInstance.config.signInAndUpFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath("/")
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props) => this.getFeatureComponent("signinup", props as any, useComponentOverrides),
            };
        }

        if (this.recipeInstance.config.resetPasswordUsingTokenFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_RESET_PASSWORD_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props) => this.getFeatureComponent("resetpassword", props as any, useComponentOverrides),
            };
        }

        return features;
    };
    getFeatureComponent = (
        componentName: ComponentName,
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any },
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        if (componentName === "signinup") {
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
        } else if (componentName === "resetpassword") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <ResetPasswordUsingTokenFeature
                        recipe={this.recipeInstance}
                        {...props}
                        useComponentOverrides={useComponentOverrides}
                    />
                </UserContextWrapper>
            );
        } else {
            throw new Error("Should never come here.");
        }
    };

    // For tests
    static reset(): void {
        if (!isTest()) {
            return;
        }

        EmailPasswordPreBuiltUI.instance = undefined;
        return;
    }

    static SignInAndUp = (prop: PropsWithChildren<{ redirectOnSessionExists?: boolean; userContext?: any }> = {}) =>
        EmailPasswordPreBuiltUI.getFeatureComponent("signinup", prop);
    static ResetPasswordUsingToken = (prop?: any) => EmailPasswordPreBuiltUI.getFeatureComponent("resetpassword", prop);

    static ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenTheme;
    static SignInAndUpTheme = SignInAndUpTheme;
}

const SignInAndUp = EmailPasswordPreBuiltUI.SignInAndUp;
const ResetPasswordUsingToken = EmailPasswordPreBuiltUI.ResetPasswordUsingToken;

export { SignInAndUp, ResetPasswordUsingToken, ResetPasswordUsingTokenTheme, SignInAndUpTheme };
