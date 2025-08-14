import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import { FactorIds } from "../multifactorauth";
import { RecipeRouter } from "../recipeRouter";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import ResetPasswordUsingTokenFeature from "./components/features/resetPasswordUsingToken";
import SignInFeature from "./components/features/signin";
import SignUpFeature from "./components/features/signup";
import ResetPasswordUsingTokenThemeWrapper from "./components/themes/resetPasswordUsingToken";
import { defaultTranslationsEmailPassword } from "./components/themes/translations";
import { DEFAULT_RESET_PASSWORD_PATH } from "./constants";
import EmailPassword from "./recipe";

import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps, UserContext } from "../../types";
import type { AuthComponent } from "../../types";

export class EmailPasswordPreBuiltUI extends RecipeRouter {
    static instance?: EmailPasswordPreBuiltUI;
    languageTranslations = defaultTranslationsEmailPassword;
    static languageTranslations = defaultTranslationsEmailPassword;

    constructor(public readonly recipeInstance: EmailPassword) {
        super();
    }

    // Static methods
    static getInstanceOrInitAndGetInstance(): EmailPasswordPreBuiltUI {
        if (EmailPasswordPreBuiltUI.instance === undefined) {
            const recipeInstance = EmailPassword.getInstanceOrThrow();
            EmailPasswordPreBuiltUI.instance = new EmailPasswordPreBuiltUI(recipeInstance);
        }

        return EmailPasswordPreBuiltUI.instance;
    }
    static getFeatures(
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap {
        return EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    }
    static getFeatureComponent(
        componentName: "resetpassword",
        props: FeatureBaseProps<{ redirectOnSessionExists?: boolean; userContext?: UserContext }>,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element {
        return EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
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
        if (this.recipeInstance.config.resetPasswordUsingTokenFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_RESET_PASSWORD_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props) => this.getFeatureComponent("resetpassword", props as any, useComponentOverrides),
                recipeID: EmailPassword.RECIPE_ID,
            };
        }

        return features;
    };
    getFeatureComponent = (
        componentName: "resetpassword",
        props: FeatureBaseProps<{ redirectOnSessionExists?: boolean; userContext?: UserContext }>,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        if (componentName === "resetpassword") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <ResetPasswordUsingTokenFeature
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

    getAuthComponents(): AuthComponent[] {
        return [
            {
                factorIds: [FactorIds.EMAILPASSWORD],
                displayOrder: 2,
                type: "SIGN_UP",
                component: (props) => (
                    <SignUpFeature
                        key="emailpassword-sign-up"
                        recipe={this.recipeInstance}
                        useComponentOverrides={useRecipeComponentOverrideContext}
                        {...props}
                    />
                ),
            },
            {
                factorIds: [FactorIds.EMAILPASSWORD],
                displayOrder: 2,
                type: "SIGN_IN",
                component: (props) => (
                    <SignInFeature
                        key="emailpassword-sign-in"
                        recipe={this.recipeInstance}
                        useComponentOverrides={useRecipeComponentOverrideContext}
                        {...props}
                    />
                ),
            },
        ];
    }
    public requiresSignUpPage = true;

    // For tests
    static reset(): void {
        if (!isTest()) {
            return;
        }

        EmailPasswordPreBuiltUI.instance = undefined;
        return;
    }

    static ResetPasswordUsingToken = (prop: FeatureBaseProps<{ userContext?: UserContext }>) =>
        EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("resetpassword", prop);

    static ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenThemeWrapper;
}

const ResetPasswordUsingToken = EmailPasswordPreBuiltUI.ResetPasswordUsingToken;

export { ResetPasswordUsingToken, ResetPasswordUsingTokenThemeWrapper as ResetPasswordUsingTokenTheme };
