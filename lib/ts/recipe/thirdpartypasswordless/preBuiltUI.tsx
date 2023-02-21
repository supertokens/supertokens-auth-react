import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import UserContextWrapper from "../../usercontext/userContextWrapper";
import { matchRecipeIdUsingQueryParams } from "../../utils";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import { PasswordlessPreBuiltUI } from "../passwordless/preBuiltUI";
import { RecipeRouter } from "../recipeRouter";
import { ThirdPartyPreBuiltUI } from "../thirdparty/preBuiltUI";

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

    getFeatures = (
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap => {
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
                component: (prop: any) => this.getFeatureComponent("signInUp", prop, useComponentOverrides),
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

const canHandleRoute = ThirdPartyPasswordlessPreBuiltUI.canHandleRoute;
const getRoutingComponent = ThirdPartyPasswordlessPreBuiltUI.getRoutingComponent;
const getFeatures = ThirdPartyPasswordlessPreBuiltUI.getFeatures;
const getFeatureComponent = ThirdPartyPasswordlessPreBuiltUI.getFeatureComponent;
const getReactRouterDomRoutes = ThirdPartyPasswordlessPreBuiltUI.getReactRouterDomRoutes;
const SignInAndUp = ThirdPartyPasswordlessPreBuiltUI.SignInAndUp;
const ThirdPartySignInAndUpCallback = ThirdPartyPasswordlessPreBuiltUI.ThirdPartySignInAndUpCallback;
const PasswordlessLinkClicked = ThirdPartyPasswordlessPreBuiltUI.PasswordlessLinkClicked;

export {
    canHandleRoute,
    getRoutingComponent,
    getFeatures,
    getFeatureComponent,
    getReactRouterDomRoutes,
    SignInAndUp,
    ThirdPartySignInAndUpCallback,
    PasswordlessLinkClicked,
    SignInUpTheme,
};
