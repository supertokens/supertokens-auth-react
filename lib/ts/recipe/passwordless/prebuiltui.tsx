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
import type { RecipeFeatureComponentMap, FeatureBaseProps, Navigate } from "../../types";
import type { PropsWithChildren } from "react";

export class PasswordlessPreBuiltUI extends RecipeRouter {
    static instance?: PasswordlessPreBuiltUI;
    constructor(public readonly recipeInstance: Passwordless) {
        super();
    }

    // Static methods
    static getInstanceOrInitAndGetInstance(): PasswordlessPreBuiltUI {
        if (PasswordlessPreBuiltUI.instance === undefined) {
            const recipeInstance = Passwordless.getInstanceOrThrow();
            PasswordlessPreBuiltUI.instance = new PasswordlessPreBuiltUI(recipeInstance);
        }

        return PasswordlessPreBuiltUI.instance;
    }
    static getFeatures(
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap {
        return PasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    }
    static getFeatureComponent(
        componentName: "signInUp" | "linkClickedScreen",
        props: FeatureBaseProps<{ redirectOnSessionExists?: boolean; userContext?: any }>,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element {
        return PasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
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
                recipeID: Passwordless.RECIPE_ID,
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
                recipeID: Passwordless.RECIPE_ID,
            };
        }

        return features;
    };
    getFeatureComponent = (
        componentName: "signInUp" | "linkClickedScreen",
        props: FeatureBaseProps<{ redirectOnSessionExists?: boolean; userContext?: any }>,
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
                            navigate={props.navigate}>
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

    static SignInUp = (
        prop: PropsWithChildren<{ redirectOnSessionExists?: boolean; navigate?: Navigate; userContext?: any }> = {}
    ) => this.getFeatureComponent("signInUp", prop);

    static LinkClicked = (prop: FeatureBaseProps<{ userContext?: any }>) =>
        this.getFeatureComponent("linkClickedScreen", prop);

    static SignInUpTheme = SignInUpTheme;
}

const SignInUp = PasswordlessPreBuiltUI.SignInUp;
const LinkClicked = PasswordlessPreBuiltUI.LinkClicked;

export { SignInUp, LinkClicked, SignInUpTheme };
