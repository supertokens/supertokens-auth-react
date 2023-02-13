import { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import { GetRedirectionURLContext, OnHandleEventContext, PreAndPostAPIHookAction, NormalisedConfig } from "./types";
import { matchRecipeIdUsingQueryParams } from "../../utils";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import { DEFAULT_RESET_PASSWORD_PATH } from "./constants";
import SignInAndUpFeature from "./components/features/signInAndUp";
import ResetPasswordUsingTokenFeature from "./components/features/resetPasswordUsingToken";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import EmailPassword from "./recipe";
import { RecipeRoutes } from "../recipeRoutes";
import { PropsWithChildren } from "react";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import ResetPasswordUsingTokenTheme from "./components/themes/resetPasswordUsingToken";

export class EmailPasswordPreBuiltUIRoutes extends RecipeRoutes {
    private constructor(private readonly recipeInstance: EmailPassword) {
        super();
    }
    static instance: EmailPasswordPreBuiltUIRoutes;

    static init(recipeInstance: EmailPassword): void {
        EmailPasswordPreBuiltUIRoutes.instance = new EmailPasswordPreBuiltUIRoutes(recipeInstance);
    }
    static getInstanceOrInitAndGetInstance(recipeInstance?: EmailPassword): EmailPasswordPreBuiltUIRoutes {
        if (EmailPasswordPreBuiltUIRoutes.instance === undefined) {
            const instance = recipeInstance ?? EmailPassword.getInstanceOrThrow();
            EmailPasswordPreBuiltUIRoutes.init(instance);
        }

        return EmailPasswordPreBuiltUIRoutes.instance;
    }
    static canHandleRoute(): boolean {
        return EmailPasswordPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().canHandleRoute();
    }
    static getRoutingComponent(): JSX.Element | null {
        return EmailPasswordPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().getRoutingComponent();
    }
    static getFeatures(recipeInstance?: EmailPassword): RecipeFeatureComponentMap {
        return EmailPasswordPreBuiltUIRoutes.getInstanceOrInitAndGetInstance(recipeInstance).getFeatures();
    }
    static getFeatureComponent(
        componentName: "signinup" | "resetpassword",
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any }
    ): JSX.Element {
        return EmailPasswordPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props
        );
    }
    static getRoutes(reactRouterDom: any): JSX.Element[] {
        return super.getRoutes(reactRouterDom, EmailPasswordPreBuiltUIRoutes.getInstanceOrInitAndGetInstance());
    }

    getFeatures = (): RecipeFeatureComponentMap => {
        const features: RecipeFeatureComponentMap = {};
        if (this.recipeInstance.config.signInAndUpFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath("/")
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props) => this.getFeatureComponent("signinup", props as any),
            };
        }

        if (this.recipeInstance.config.resetPasswordUsingTokenFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_RESET_PASSWORD_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props) => this.getFeatureComponent("resetpassword", props as any),
            };
        }

        return features;
    };

    getFeatureComponent = (
        componentName: "signinup" | "resetpassword",
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any }
    ): JSX.Element => {
        const instance = EmailPassword.getInstanceOrThrow();
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
                            authRecipe={instance}
                            history={props.history}>
                            <SignInAndUpFeature recipe={instance} {...props} />
                        </AuthWidgetWrapper>
                    </UserContextWrapper>
                );
            } else {
                return (
                    <UserContextWrapper userContext={props.userContext}>
                        <SignInAndUpFeature recipe={instance} {...props} />
                    </UserContextWrapper>
                );
            }
        } else if (componentName === "resetpassword") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <ResetPasswordUsingTokenFeature recipe={instance} {...props} />
                </UserContextWrapper>
            );
        } else {
            throw new Error("Should never come here.");
        }
    };

    static SignInAndUp = (prop: PropsWithChildren<{ redirectOnSessionExists?: boolean; userContext?: any }> = {}) =>
        EmailPasswordPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().getFeatureComponent("signinup", prop);
    static ResetPasswordUsingToken = (prop?: any) =>
        EmailPasswordPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().getFeatureComponent("resetpassword", prop);

    static ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenTheme;
    static SignInAndUpTheme = SignInAndUpTheme;
}
