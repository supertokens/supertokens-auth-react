import { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import { GetRedirectionURLContext, NormalisedConfig, OnHandleEventContext, PreAndPostAPIHookAction } from "./types";
import { matchRecipeIdUsingQueryParams } from "../../utils";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import SignInAndUpFeature from "./components/features/signInAndUp";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import ThirdPartyEmailPassword from "./recipe";
import { ThirdPartyPreBuiltUI } from "../thirdparty/preBuiltUI";
import { EmailPasswordPreBuiltUI } from "../emailpassword/preBuiltUI";
import { RecipeRouter } from "../recipeRouter";
import { PropsWithChildren } from "react";
import ResetPasswordUsingTokenTheme from "../emailpassword/components/themes/resetPasswordUsingToken";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { SignInAndUpCallbackTheme as ThirdPartySignInAndUpCallbackTheme } from "../thirdparty/components/themes/signInAndUpCallback";

export class ThirdPartyEmailPasswordPreBuiltUI extends RecipeRouter {
    constructor(private readonly recipeInstance: ThirdPartyEmailPassword) {
        super();
    }
    static instance: ThirdPartyEmailPasswordPreBuiltUI;

    static getInstanceOrInitAndGetInstance(): ThirdPartyEmailPasswordPreBuiltUI {
        if (ThirdPartyEmailPasswordPreBuiltUI.instance === undefined) {
            const recipeInstance = ThirdPartyEmailPassword.getInstanceOrThrow();
            ThirdPartyEmailPasswordPreBuiltUI.instance = new ThirdPartyEmailPasswordPreBuiltUI(recipeInstance);
        }

        return ThirdPartyEmailPasswordPreBuiltUI.instance;
    }
    static canHandleRoute(): boolean {
        return ThirdPartyEmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().canHandleRoute();
    }
    static getRoutingComponent(): JSX.Element | null {
        return ThirdPartyEmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getRoutingComponent();
    }
    static getFeatures(): RecipeFeatureComponentMap {
        return ThirdPartyEmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures();
    }
    static getFeatureComponent(
        componentName: "signinup" | "signinupcallback" | "resetpassword",
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any }
    ): JSX.Element {
        return ThirdPartyEmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props
        );
    }
    static getReactRouterDomRoutes(reactRouterDom: any): JSX.Element[] {
        return RecipeRouter.getRecipeRoutes(
            reactRouterDom,
            ThirdPartyEmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance()
        );
    }
    getFeatures = (): RecipeFeatureComponentMap => {
        let features: RecipeFeatureComponentMap = {};

        if (this.recipeInstance.emailPasswordRecipe !== undefined) {
            features = {
                ...features,
                ...EmailPasswordPreBuiltUI.getFeatures(this.recipeInstance.emailPasswordRecipe),
            };
        }

        if (this.recipeInstance.thirdPartyRecipe !== undefined) {
            features = {
                ...features,
                ...ThirdPartyPreBuiltUI.getFeatures(this.recipeInstance.thirdPartyRecipe),
            };
        }

        if (this.recipeInstance.config.signInAndUpFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath("/")
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (prop: any) => this.getFeatureComponent("signinup", prop),
            };
        }

        return features;
    };

    getFeatureComponent = (
        componentName: "signinup" | "signinupcallback" | "resetpassword",
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any }
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
                            <SignInAndUpFeature recipe={this.recipeInstance} {...props} />
                        </AuthWidgetWrapper>
                    </UserContextWrapper>
                );
            } else {
                return (
                    <UserContextWrapper userContext={props.userContext}>
                        <SignInAndUpFeature recipe={this.recipeInstance} {...props} />
                    </UserContextWrapper>
                );
            }
        } else if (componentName === "resetpassword") {
            if (this.recipeInstance.emailPasswordRecipe === undefined) {
                throw new Error("Should not come here...");
            }
            return EmailPasswordPreBuiltUI.getFeatureComponent(componentName, props);
        } else if (componentName === "signinupcallback") {
            if (this.recipeInstance.thirdPartyRecipe === undefined) {
                throw new Error(
                    "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInAndUpFeature.providers in the configuration."
                );
            }
            return ThirdPartyPreBuiltUI.getFeatureComponent(componentName, props);
        } else {
            throw new Error("Should not come here...");
        }
    };

    static ThirdPartySignInAndUpCallback = (prop?: any) => this.getFeatureComponent("signinupcallback", prop);
    static ResetPasswordUsingToken = (prop?: any) => this.getFeatureComponent("resetpassword", prop);
    static SignInAndUp = (prop: PropsWithChildren<{ redirectOnSessionExists?: boolean; userContext?: any }> = {}) =>
        this.getFeatureComponent("signinup", prop);
    static ThirdPartySignInAndUpCallbackTheme = ThirdPartySignInAndUpCallbackTheme;
    static ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenTheme;
    static SignInAndUpTheme = SignInAndUpTheme;
}