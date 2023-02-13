import { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import { GetRedirectionURLContext, OnHandleEventContext, PreAndPostAPIHookAction, NormalisedConfig } from "./types";
import { matchRecipeIdUsingQueryParams } from "../../utils";
import SignInUpFeature from "./components/features/signInAndUp";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import LinkClickedScreen from "./components/features/linkClickedScreen";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import Passwordless from "./recipe";
import { RecipeRoutes } from "../recipeRoutes";
import { PropsWithChildren } from "react";
import SignInUpTheme from "./components/themes/signInUp";

export class PasswordlessPreBuiltUIRoutes extends RecipeRoutes {
    constructor(private readonly recipeInstance: Passwordless) {
        super();
    }
    static instance: PasswordlessPreBuiltUIRoutes;

    static init(recipeInstance: Passwordless): void {
        PasswordlessPreBuiltUIRoutes.instance = new PasswordlessPreBuiltUIRoutes(recipeInstance);
    }
    static getInstanceOrInitAndGetInstance(recipeInstance?: Passwordless): PasswordlessPreBuiltUIRoutes {
        if (PasswordlessPreBuiltUIRoutes.instance === undefined) {
            const instance = recipeInstance ?? Passwordless.getInstanceOrThrow();
            PasswordlessPreBuiltUIRoutes.init(instance);
        }

        return PasswordlessPreBuiltUIRoutes.instance;
    }

    static canHandleRoute(): boolean {
        return PasswordlessPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().canHandleRoute();
    }
    static getRoutingComponent(): JSX.Element | null {
        return PasswordlessPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().getRoutingComponent();
    }
    static getFeatures(recipeInstance?: Passwordless): RecipeFeatureComponentMap {
        return PasswordlessPreBuiltUIRoutes.getInstanceOrInitAndGetInstance(recipeInstance).getFeatures();
    }
    static getFeatureComponent(
        componentName: "signInUp" | "linkClickedScreen",
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any }
    ): JSX.Element {
        return PasswordlessPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().getFeatureComponent(componentName, props);
    }
    static getRoutes(reactRouterDom: any): JSX.Element[] {
        return super.getRoutes(reactRouterDom, PasswordlessPreBuiltUIRoutes.getInstanceOrInitAndGetInstance());
    }

    getFeatures = (): RecipeFeatureComponentMap => {
        const features: RecipeFeatureComponentMap = {};
        if (this.recipeInstance.config.signInUpFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath("/")
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props) => this.getFeatureComponent("signInUp", props as any),
            };
        }
        if (this.recipeInstance.config.linkClickedScreenFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath("/verify")
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props) => this.getFeatureComponent("linkClickedScreen", props as any),
            };
        }

        return features;
    };

    getFeatureComponent = (
        componentName: "signInUp" | "linkClickedScreen",
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
                            <SignInUpFeature recipe={this.recipeInstance} {...props} />
                        </AuthWidgetWrapper>
                    </UserContextWrapper>
                );
            } else {
                return (
                    <UserContextWrapper userContext={props.userContext}>
                        <SignInUpFeature recipe={this.recipeInstance} {...props} />
                    </UserContextWrapper>
                );
            }
        }
        if (componentName === "linkClickedScreen") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <LinkClickedScreen recipe={this.recipeInstance} {...props} />
                </UserContextWrapper>
            );
        } else {
            throw new Error("Should never come here.");
        }
    };

    static SignInUp = (prop: PropsWithChildren<{ redirectOnSessionExists?: boolean; userContext?: any }> = {}) =>
        this.getFeatureComponent("signInUp", prop);

    static LinkClicked = (prop?: any) => this.getFeatureComponent("linkClickedScreen", prop);

    static SignInUpTheme = SignInUpTheme;
}
