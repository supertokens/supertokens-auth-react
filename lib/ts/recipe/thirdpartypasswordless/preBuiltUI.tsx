import { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import { GetRedirectionURLContext, NormalisedConfig, OnHandleEventContext, PreAndPostAPIHookAction } from "./types";
import { matchRecipeIdUsingQueryParams } from "../../utils";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import SignInAndUpFeature from "./components/features/signInAndUp";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import ThirdPartyPasswordless from "./recipe";
import { PasswordlessPreBuiltUI } from "../passwordless/preBuiltUI";
import { ThirdPartyPreBuiltUI } from "../thirdparty/preBuiltUI";
import { RecipeRouter } from "../recipeRouter";
import SignInUpTheme from "./components/themes/signInUp";
import { PropsWithChildren } from "react";

export class ThirdPartyPasswordlessPreBuiltUI extends RecipeRouter {
    constructor(private readonly recipeInstance: ThirdPartyPasswordless) {
        super();
    }
    static instance: ThirdPartyPasswordlessPreBuiltUI;

    static getInstanceOrInitAndGetInstance(): ThirdPartyPasswordlessPreBuiltUI {
        if (ThirdPartyPasswordlessPreBuiltUI.instance === undefined) {
            const recipeInstance = ThirdPartyPasswordless.getInstanceOrThrow();
            ThirdPartyPasswordlessPreBuiltUI.instance = new ThirdPartyPasswordlessPreBuiltUI(recipeInstance);
        }

        return ThirdPartyPasswordlessPreBuiltUI.instance;
    }
    static canHandleRoute(): boolean {
        return ThirdPartyPasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance().canHandleRoute();
    }
    static getRoutingComponent(): JSX.Element | null {
        return ThirdPartyPasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance().getRoutingComponent();
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

    static getReactRouterDomRoutes(reactRouterDom: any): JSX.Element[] {
        return RecipeRouter.getRecipeRoutes(
            reactRouterDom,
            ThirdPartyPasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance()
        );
    }

    getFeatureComponent = (
        componentName: "signInUp" | "linkClickedScreen" | "signinupcallback",
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any }
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
        } else if (componentName === "linkClickedScreen") {
            if (this.recipeInstance.passwordlessRecipe === undefined) {
                throw new Error(
                    "Embedding this component requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                );
            }
            return PasswordlessPreBuiltUI.getFeatureComponent(componentName, props);
        } else if (componentName === "signinupcallback") {
            if (this.recipeInstance.thirdPartyRecipe === undefined) {
                throw new Error(
                    "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInUpFeature.providers in the configuration."
                );
            }
            return ThirdPartyPreBuiltUI.getFeatureComponent(componentName, props);
        } else {
            throw new Error("Should never come here.");
        }
    };

    getFeatures = (): RecipeFeatureComponentMap => {
        let features: RecipeFeatureComponentMap = {};

        if (this.recipeInstance.passwordlessRecipe !== undefined) {
            features = {
                ...features,
                ...PasswordlessPreBuiltUI.getFeatures(this.recipeInstance.passwordlessRecipe),
            };
        }

        if (this.recipeInstance.thirdPartyRecipe !== undefined) {
            features = {
                ...features,
                ...ThirdPartyPreBuiltUI.getFeatures(this.recipeInstance.thirdPartyRecipe),
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
                component: (prop: any) => this.getFeatureComponent("signInUp", prop),
            };
        }

        return {
            ...features,
        };
    };

    static SignInAndUp = (prop: PropsWithChildren<{ redirectOnSessionExists?: boolean; userContext?: any }> = {}) =>
        this.getFeatureComponent("signInUp", prop);
    static ThirdPartySignInAndUpCallback = (prop?: any) => this.getFeatureComponent("signinupcallback", prop);

    static SignInUpTheme = SignInUpTheme;
    static PasswordlessLinkClicked = (prop?: any) => this.getFeatureComponent("linkClickedScreen", prop);
}
