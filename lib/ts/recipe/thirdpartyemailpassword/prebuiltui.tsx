import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import UserContextWrapper from "../../usercontext/userContextWrapper";
import { getNormalisedUserContext, isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import ResetPasswordUsingTokenTheme from "../emailpassword/components/themes/resetPasswordUsingToken";
import { EmailPasswordPreBuiltUI } from "../emailpassword/prebuiltui";
import { RecipeRouter } from "../recipeRouter";
import { SignInAndUpCallbackTheme as ThirdPartySignInAndUpCallbackTheme } from "../thirdparty/components/themes/signInAndUpCallback";
import { ThirdPartyPreBuiltUI } from "../thirdparty/prebuiltui";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import SignInAndUpFeature from "./components/features/signInAndUp";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import ThirdPartyEmailPassword from "./recipe";

import type {
    GetRedirectionURLContext,
    NormalisedConfig,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
} from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps, UserContext } from "../../types";

export class ThirdPartyEmailPasswordPreBuiltUI extends RecipeRouter {
    static instance?: ThirdPartyEmailPasswordPreBuiltUI;

    private thirdPartyPreBuiltUI: ThirdPartyPreBuiltUI | undefined;
    private emailPasswordPreBuiltUI: EmailPasswordPreBuiltUI | undefined;

    constructor(public readonly recipeInstance: ThirdPartyEmailPassword) {
        super();
        const { thirdPartyRecipe, emailPasswordRecipe } = recipeInstance;
        if (thirdPartyRecipe !== undefined) {
            this.thirdPartyPreBuiltUI = new ThirdPartyPreBuiltUI(thirdPartyRecipe);
        }
        if (emailPasswordRecipe !== undefined) {
            this.emailPasswordPreBuiltUI = new EmailPasswordPreBuiltUI(emailPasswordRecipe);
        }
    }

    // Static methods
    static getInstanceOrInitAndGetInstance(): ThirdPartyEmailPasswordPreBuiltUI {
        if (ThirdPartyEmailPasswordPreBuiltUI.instance === undefined) {
            const recipeInstance = ThirdPartyEmailPassword.getInstanceOrThrow();
            ThirdPartyEmailPasswordPreBuiltUI.instance = new ThirdPartyEmailPasswordPreBuiltUI(recipeInstance);
        }

        return ThirdPartyEmailPasswordPreBuiltUI.instance;
    }
    static getFeatures(
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap {
        return ThirdPartyEmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    }
    static getFeatureComponent(
        componentName: "signinup" | "signinupcallback" | "resetpassword",
        props: FeatureBaseProps<{ redirectOnSessionExists?: boolean; userContext: UserContext }>,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element {
        return ThirdPartyEmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    }

    // Instance methods
    getFeatures = (
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap => {
        let features: RecipeFeatureComponentMap = {};

        if (this.emailPasswordPreBuiltUI !== undefined) {
            features = {
                ...features,
                ...this.emailPasswordPreBuiltUI.getFeatures(useComponentOverrides),
            };
        }

        if (this.thirdPartyPreBuiltUI !== undefined) {
            features = {
                ...features,
                ...this.thirdPartyPreBuiltUI.getFeatures(useComponentOverrides),
            };
        }

        if (this.recipeInstance.config.signInAndUpFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath("/")
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (prop: any) => this.getFeatureComponent("signinup", prop, useComponentOverrides),
                recipeID: ThirdPartyEmailPassword.RECIPE_ID,
            };
        }

        return features;
    };
    getFeatureComponent = (
        componentName: "signinup" | "signinupcallback" | "resetpassword",
        props: FeatureBaseProps<{ redirectOnSessionExists?: boolean; userContext: UserContext }>,
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
                            navigate={props.navigate}>
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
        } else if (componentName === "resetpassword") {
            if (this.emailPasswordPreBuiltUI === undefined) {
                throw new Error("Should not come here...");
            }
            return this.emailPasswordPreBuiltUI.getFeatureComponent(componentName, props, useComponentOverrides);
        } else if (componentName === "signinupcallback") {
            if (this.thirdPartyPreBuiltUI === undefined) {
                throw new Error(
                    "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInAndUpFeature.providers in the configuration."
                );
            }
            return this.thirdPartyPreBuiltUI.getFeatureComponent(componentName, props, useComponentOverrides);
        } else {
            throw new Error("Should not come here...");
        }
    };

    // For tests
    static reset(): void {
        if (!isTest()) {
            return;
        }

        ThirdPartyEmailPasswordPreBuiltUI.instance = undefined;
        return;
    }

    static ThirdPartySignInAndUpCallback = (prop: FeatureBaseProps<{ userContext?: UserContext }>) => {
        const userContext = getNormalisedUserContext(prop.userContext);
        return this.getFeatureComponent("signinupcallback", { ...prop, userContext });
    };
    static ResetPasswordUsingToken = (prop: FeatureBaseProps<{ userContext?: UserContext }>) => {
        const userContext = getNormalisedUserContext(prop.userContext);
        return this.getFeatureComponent("resetpassword", { ...prop, userContext });
    };
    static SignInAndUp = (
        prop: FeatureBaseProps<{ redirectOnSessionExists?: boolean; userContext?: UserContext }> = {}
    ) => {
        const userContext = getNormalisedUserContext(prop.userContext);
        return this.getFeatureComponent("signinup", { ...prop, userContext });
    };
    static ThirdPartySignInAndUpCallbackTheme = ThirdPartySignInAndUpCallbackTheme;
    static ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenTheme;
    static SignInAndUpTheme = SignInAndUpTheme;
}

const ThirdPartySignInAndUpCallback = ThirdPartyEmailPasswordPreBuiltUI.ThirdPartySignInAndUpCallback;
const ResetPasswordUsingToken = ThirdPartyEmailPasswordPreBuiltUI.ResetPasswordUsingToken;
const SignInAndUp = ThirdPartyEmailPasswordPreBuiltUI.SignInAndUp;

export {
    ThirdPartySignInAndUpCallback,
    ResetPasswordUsingToken,
    SignInAndUp,
    ThirdPartySignInAndUpCallbackTheme,
    ResetPasswordUsingTokenTheme,
    SignInAndUpTheme,
};
