import { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import { GetRedirectionURLContext, NormalisedConfig, OnHandleEventContext, PreAndPostAPIHookAction } from "./types";
import { matchRecipeIdUsingQueryParams } from "../../utils";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import SignInAndUpFeature from "./components/features/signInAndUp";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import ThirdPartyPasswordless from "./recipe";
import { PasswordlessPreBuiltUIRoutes } from "../passwordless/preBuiltUI";
import { ThirdPartyPreBuiltUIRoutes } from "../thirdparty/preBuiltUI";
import { RecipeRoutes } from "../recipeRoutes";
import SignInUpTheme from "./components/themes/signInUp";
import { PropsWithChildren } from "react";

export class ThirdPartyPasswordlessPreBuiltUIRoutes extends RecipeRoutes {
    constructor(private readonly recipeInstance: ThirdPartyPasswordless) {
        super();
    }
    static instance: ThirdPartyPasswordlessPreBuiltUIRoutes;

    static init(recipeInstance: ThirdPartyPasswordless): void {
        ThirdPartyPasswordlessPreBuiltUIRoutes.instance = new ThirdPartyPasswordlessPreBuiltUIRoutes(recipeInstance);
    }
    static getInstanceOrInitAndGetInstance(): ThirdPartyPasswordlessPreBuiltUIRoutes {
        if (ThirdPartyPasswordlessPreBuiltUIRoutes.instance === undefined) {
            const recipeInstance = ThirdPartyPasswordless.getInstanceOrThrow();
            ThirdPartyPasswordlessPreBuiltUIRoutes.init(recipeInstance);
        }

        return ThirdPartyPasswordlessPreBuiltUIRoutes.instance;
    }
    static canHandleRoute(): boolean {
        return ThirdPartyPasswordlessPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().canHandleRoute();
    }
    static getRoutingComponent(): JSX.Element | null {
        return ThirdPartyPasswordlessPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().getRoutingComponent();
    }
    static getFeatures(): RecipeFeatureComponentMap {
        return ThirdPartyPasswordlessPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().getFeatures();
    }
    static getFeatureComponent(
        componentName: "signInUp" | "linkClickedScreen" | "signinupcallback",
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any }
    ): JSX.Element {
        return ThirdPartyPasswordlessPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props
        );
    }

    static getRoutes(reactRouterDom: any): JSX.Element[] {
        return super.getRoutes(
            reactRouterDom,
            ThirdPartyPasswordlessPreBuiltUIRoutes.getInstanceOrInitAndGetInstance()
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
            return PasswordlessPreBuiltUIRoutes.getFeatureComponent(componentName, props);
        } else if (componentName === "signinupcallback") {
            if (this.recipeInstance.thirdPartyRecipe === undefined) {
                throw new Error(
                    "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInUpFeature.providers in the configuration."
                );
            }
            return ThirdPartyPreBuiltUIRoutes.getFeatureComponent(componentName, props);
        } else {
            throw new Error("Should never come here.");
        }
    };

    getFeatures = (): RecipeFeatureComponentMap => {
        let features: RecipeFeatureComponentMap = {};

        if (this.recipeInstance.passwordlessRecipe !== undefined) {
            features = {
                ...features,
                ...PasswordlessPreBuiltUIRoutes.getFeatures(this.recipeInstance.passwordlessRecipe),
            };
        }

        if (this.recipeInstance.thirdPartyRecipe !== undefined) {
            features = {
                ...features,
                ...ThirdPartyPreBuiltUIRoutes.getFeatures(this.recipeInstance.thirdPartyRecipe),
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
