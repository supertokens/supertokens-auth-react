import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import { RecipeRouter } from "../recipeRouter";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import LinkClickedScreen from "./components/features/linkClickedScreen";
import SignInUpFeature from "./components/features/signInAndUp";
import SignInUpTheme from "./components/themes/signInUp";
import Passwordless from "./recipe";

import type {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    NormalisedConfig,
} from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import type { PropsWithChildren } from "react";

export class PasswordlessPreBuiltUI extends RecipeRouter {
    static instance?: PasswordlessPreBuiltUI;
    constructor(private readonly recipeInstance: Passwordless) {
        super();
    }

    // Static methods
    static getInstanceOrInitAndGetInstance(recipeInstance?: Passwordless): PasswordlessPreBuiltUI {
        if (PasswordlessPreBuiltUI.instance === undefined) {
            const instance = recipeInstance ?? Passwordless.getInstanceOrThrow();
            PasswordlessPreBuiltUI.instance = new PasswordlessPreBuiltUI(instance);
        }

        return PasswordlessPreBuiltUI.instance;
    }
    static getFeatures(
        recipeInstance?: Passwordless,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap {
        return PasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance(recipeInstance).getFeatures(
            useComponentOverrides
        );
    }
    static getFeatureComponent(
        componentName: "signInUp" | "linkClickedScreen",
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any },
        recipeInstance?: Passwordless
    ): JSX.Element {
        return PasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance(recipeInstance).getFeatureComponent(
            componentName,
            props
        );
    }

    // Instance methods
    getFeatures = (
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap => {
        const features: RecipeFeatureComponentMap = {};
        if (this.recipeInstance.config.signInUpFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath("/")
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props) => this.getFeatureComponent("signInUp", props as any, useComponentOverrides),
            };
        }
        if (this.recipeInstance.config.linkClickedScreenFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath("/verify")
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props) =>
                    this.getFeatureComponent("linkClickedScreen", props as any, useComponentOverrides),
            };
        }

        return features;
    };
    getFeatureComponent = (
        componentName: "signInUp" | "linkClickedScreen",
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
                            <SignInUpFeature
                                recipe={this.recipeInstance}
                                useComponentOverrides={useComponentOverrides}
                                {...props}
                            />
                        </AuthWidgetWrapper>
                    </UserContextWrapper>
                );
            } else {
                return (
                    <UserContextWrapper userContext={props.userContext}>
                        <SignInUpFeature
                            recipe={this.recipeInstance}
                            useComponentOverrides={useComponentOverrides}
                            {...props}
                        />
                    </UserContextWrapper>
                );
            }
        }
        if (componentName === "linkClickedScreen") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <LinkClickedScreen
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

        PasswordlessPreBuiltUI.instance = undefined;
        return;
    }

    static SignInUp = (prop: PropsWithChildren<{ redirectOnSessionExists?: boolean; userContext?: any }> = {}) =>
        this.getFeatureComponent("signInUp", prop);

    static LinkClicked = (prop?: any) => this.getFeatureComponent("linkClickedScreen", prop);

    static SignInUpTheme = SignInUpTheme;
}

const _getFeatures = PasswordlessPreBuiltUI.getFeatures;
const _getFeatureComponent = PasswordlessPreBuiltUI.getFeatureComponent;
const SignInUp = PasswordlessPreBuiltUI.SignInUp;
const LinkClicked = PasswordlessPreBuiltUI.LinkClicked;

export { _getFeatures, _getFeatureComponent, SignInUp, LinkClicked, SignInUpTheme };
