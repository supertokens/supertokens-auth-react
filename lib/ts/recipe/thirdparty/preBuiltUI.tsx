import { RecipeRouter } from "../recipeRouter";
import ThirdParty from "./recipe";
import { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import { GetRedirectionURLContext, NormalisedConfig, PreAndPostAPIHookAction, OnHandleEventContext } from "./types";
import { matchRecipeIdUsingQueryParams } from "../../utils";
import { matchRecipeIdUsingState } from "./utils";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import SignInAndUpFeature from "./components/features/signInAndUp";
import SignInAndUpCallbackFeature from "./components/features/signInAndUpCallback";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import { PropsWithChildren } from "react";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { SignInAndUpCallbackTheme } from "./components/themes/signInAndUpCallback";

export class ThirdPartyPreBuiltUI extends RecipeRouter {
    constructor(private readonly recipeInstance: ThirdParty) {
        super();
    }
    static instance: ThirdPartyPreBuiltUI;

    static getInstanceOrInitAndGetInstance(recipeInstance?: ThirdParty): ThirdPartyPreBuiltUI {
        if (ThirdPartyPreBuiltUI.instance === undefined) {
            const instance = recipeInstance ?? ThirdParty.getInstanceOrThrow();
            ThirdPartyPreBuiltUI.instance = new ThirdPartyPreBuiltUI(instance);
        }

        return ThirdPartyPreBuiltUI.instance;
    }
    static canHandleRoute(): boolean {
        return ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().canHandleRoute();
    }
    static getRoutingComponent(): JSX.Element | null {
        return ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getRoutingComponent();
    }
    static getFeatures(recipeInstance?: ThirdParty): RecipeFeatureComponentMap {
        return ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance(recipeInstance).getFeatures();
    }
    static getFeatureComponent(
        componentName: "signinup" | "signinupcallback",
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any }
    ): JSX.Element {
        return ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(componentName, props);
    }

    static getReactRouterDomRoutes(reactRouterDom: any): JSX.Element[] {
        return RecipeRouter.getRecipeRoutes(reactRouterDom, ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance());
    }

    getFeatures = (): RecipeFeatureComponentMap => {
        const features: RecipeFeatureComponentMap = {};
        if (this.recipeInstance.config.signInAndUpFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath("/")
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (prop: any) => this.getFeatureComponent("signinup", prop),
            };
        }

        // Add callback route for each provider.
        this.recipeInstance.config.signInAndUpFeature.providers.forEach((provider) => {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(`/callback/${provider.id}`)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: () => matchRecipeIdUsingState(this.recipeInstance, {}),
                component: (prop: any) => this.getFeatureComponent("signinupcallback", prop),
            };
        });

        return features;
    };

    getFeatureComponent = (
        componentName: "signinup" | "signinupcallback",
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
        } else if (componentName === "signinupcallback") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <SignInAndUpCallbackFeature recipe={this.recipeInstance} {...props} />
                </UserContextWrapper>
            );
        } else {
            throw new Error("Should never come here");
        }
    };

    static SignInAndUp = (prop: PropsWithChildren<{ redirectOnSessionExists?: boolean; userContext?: any }> = {}) =>
        ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("signinup", prop);
    static SignInAndUpCallback = (prop?: any) =>
        ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("signinupcallback", prop);
    static SignInAndUpTheme = SignInAndUpTheme;
    static SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
}
