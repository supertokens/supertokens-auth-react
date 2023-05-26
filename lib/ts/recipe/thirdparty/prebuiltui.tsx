import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import { SSRSafeWrapper } from "../../components/ssrSafeWrapper";
import { getRecipeFeaturesSSRSafe } from "../../ui/uiutils";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import { RecipeRouter } from "../recipeRouter";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import SignInAndUpFeature from "./components/features/signInAndUp";
import SignInAndUpCallbackFeature from "./components/features/signInAndUpCallback";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { SignInAndUpCallbackTheme } from "./components/themes/signInAndUpCallback";
import ThirdParty from "./recipe";
import { matchRecipeIdUsingState } from "./utils";

import type {
    GetRedirectionURLContext,
    NormalisedConfig,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
} from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import type { PropsWithChildren } from "react";

type ComponentName = "signinup" | "signinupcallback";

export class ThirdPartyPreBuiltUI extends RecipeRouter {
    static instance?: ThirdPartyPreBuiltUI;
    constructor(private readonly recipeInstance: ThirdParty) {
        super();
    }

    // Static methods
    static getInstanceOrInitAndGetInstance(): ThirdPartyPreBuiltUI {
        if (ThirdPartyPreBuiltUI.instance === undefined) {
            const recipeInstace = ThirdParty.getInstanceOrThrow();
            ThirdPartyPreBuiltUI.instance = new ThirdPartyPreBuiltUI(recipeInstace);
        }

        return ThirdPartyPreBuiltUI.instance;
    }
    static getFeatures(
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap {
        return getRecipeFeaturesSSRSafe(ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance, (recipeInstance) => {
            return recipeInstance.getFeatures(useComponentOverrides);
        });
    }
    static getFeatureComponent(
        componentName: ComponentName,
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any },
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element {
        return (
            <SSRSafeWrapper<ComponentName, ThirdPartyPreBuiltUI>
                getRecipe={ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance}
                componentName={componentName}
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
                component: (prop: any) => this.getFeatureComponent("signinup", prop, useComponentOverrides),
            };
        }

        // Add callback route for each provider.
        this.recipeInstance.config.signInAndUpFeature.providers.forEach((provider) => {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(`/callback/${provider.id}`)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: () => matchRecipeIdUsingState(this.recipeInstance, {}),
                component: (prop: any) => this.getFeatureComponent("signinupcallback", prop, useComponentOverrides),
            };
        });

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
        } else if (componentName === "signinupcallback") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <SignInAndUpCallbackFeature
                        recipe={this.recipeInstance}
                        {...props}
                        useComponentOverrides={useComponentOverrides}
                    />
                </UserContextWrapper>
            );
        } else {
            throw new Error("Should never come here");
        }
    };

    // For tests
    static reset(): void {
        if (!isTest()) {
            return;
        }

        ThirdPartyPreBuiltUI.instance = undefined;
        return;
    }

    static SignInAndUp = (prop: PropsWithChildren<{ redirectOnSessionExists?: boolean; userContext?: any }> = {}) =>
        ThirdPartyPreBuiltUI.getFeatureComponent("signinup", prop);
    static SignInAndUpCallback = (prop?: any) => ThirdPartyPreBuiltUI.getFeatureComponent("signinupcallback", prop);
    static SignInAndUpTheme = SignInAndUpTheme;
    static SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
}

const SignInAndUp = ThirdPartyPreBuiltUI.SignInAndUp;
const SignInAndUpCallback = ThirdPartyPreBuiltUI.SignInAndUpCallback;

export { SignInAndUp, SignInAndUpCallback, SignInAndUpCallbackTheme, SignInAndUpTheme };
