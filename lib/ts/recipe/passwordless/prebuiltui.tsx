import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import EmailPassword from "../emailpassword/recipe";
import { FactorIds } from "../multifactorauth";
import { RecipeRouter } from "../recipeRouter";
import { SessionAuth } from "../session";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import ContinueWithPasswordlessFeature from "./components/features/continueWithPasswordless";
import LinkClickedScreen from "./components/features/linkClickedScreen";
import LinkSentFeature from "./components/features/linkSent";
import MFAFeature from "./components/features/mfa";
import SignInUpFeature from "./components/features/signInAndUp";
import SignInUpEPComboFeature from "./components/features/signInAndUpEPCombo";
import UserInputCodeFeature from "./components/features/userInputCode";
import MFAThemeWrapper from "./components/themes/mfa";
import { defaultTranslationsPasswordless } from "./components/themes/translations";
import Passwordless from "./recipe";
import { checkAdditionalLoginAttemptInfoProperties } from "./utils";

import type { AdditionalLoginAttemptInfoProperties, LoginAttemptInfo } from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type {
    RecipeFeatureComponentMap,
    FeatureBaseProps,
    Navigate,
    UserContext,
    PartialAuthComponentProps,
} from "../../types";
import type { AuthComponent } from "../../types";

export class PasswordlessPreBuiltUI extends RecipeRouter {
    static instance?: PasswordlessPreBuiltUI;
    languageTranslations = defaultTranslationsPasswordless;
    static languageTranslations = defaultTranslationsPasswordless;

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
        componentName: "linkClickedScreen" | "otp-phone" | "otp-email",
        props: FeatureBaseProps<{ redirectOnSessionExists?: boolean; userContext?: UserContext }>,
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
        if (this.recipeInstance.config.mfaFeature.disableDefaultUI !== true) {
            const normalisedFullPathPhone = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath("/mfa/otp-phone")
            );
            features[normalisedFullPathPhone.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props) => this.getFeatureComponent("otp-phone", props as any, useComponentOverrides),
                recipeID: Passwordless.RECIPE_ID,
            };
            const normalisedFullPathEmail = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath("/mfa/otp-email")
            );
            features[normalisedFullPathEmail.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props) => this.getFeatureComponent("otp-email", props as any, useComponentOverrides),
                recipeID: Passwordless.RECIPE_ID,
            };
        }

        return features;
    };
    getFeatureComponent = (
        componentName: "linkClickedScreen" | "otp-phone" | "otp-email",
        props: FeatureBaseProps<{ redirectOnSessionExists?: boolean; userContext?: UserContext }>,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        if (componentName === "linkClickedScreen") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <SessionAuth requireAuth={false} doRedirection={false}>
                        <LinkClickedScreen
                            recipe={this.recipeInstance}
                            {...props}
                            useComponentOverrides={useComponentOverrides}
                        />
                    </SessionAuth>
                </UserContextWrapper>
            );
        }
        if (componentName === "otp-email") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <SessionAuth overrideGlobalClaimValidators={() => []}>
                        <MFAFeature
                            recipe={this.recipeInstance}
                            useComponentOverrides={useComponentOverrides}
                            contactMethod="EMAIL"
                            flowType="USER_INPUT_CODE"
                            {...props}
                        />
                    </SessionAuth>
                </UserContextWrapper>
            );
        }
        if (componentName === "otp-phone") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <SessionAuth overrideGlobalClaimValidators={() => []}>
                        <MFAFeature
                            recipe={this.recipeInstance}
                            useComponentOverrides={useComponentOverrides}
                            contactMethod="PHONE"
                            flowType="USER_INPUT_CODE"
                            {...props}
                        />
                    </SessionAuth>
                </UserContextWrapper>
            );
        }
        throw new Error("Should never come here.");
    };

    getAuthComponents(): AuthComponent<LoginAttemptInfo>[] {
        const factorCombos = getAllFactorChoices([
            FactorIds.LINK_EMAIL,
            FactorIds.LINK_PHONE,
            FactorIds.OTP_EMAIL,
            FactorIds.OTP_PHONE,
        ]);

        const res: AuthComponent<LoginAttemptInfo>[] = [
            {
                type: "FULL_PAGE",
                async preloadInfoAndRunChecks(firstFactors, userContext) {
                    // This should be de-duplicated somehow, maybe creating a union of the two pages?
                    let loginAttemptInfo =
                        await Passwordless.getInstanceOrThrow().webJSRecipe.getLoginAttemptInfo<AdditionalLoginAttemptInfoProperties>(
                            {
                                userContext,
                            }
                        );
                    if (loginAttemptInfo !== undefined) {
                        if (
                            loginAttemptInfo.contactMethod === "PHONE" &&
                            !firstFactors.includes(FactorIds.OTP_PHONE) &&
                            !firstFactors.includes(FactorIds.LINK_PHONE)
                        ) {
                            await Passwordless.getInstanceOrThrow().webJSRecipe?.clearLoginAttemptInfo({ userContext });
                            loginAttemptInfo = undefined;
                        } else if (
                            loginAttemptInfo.contactMethod === "EMAIL" &&
                            !firstFactors.includes(FactorIds.OTP_EMAIL) &&
                            !firstFactors.includes(FactorIds.LINK_EMAIL)
                        ) {
                            await Passwordless.getInstanceOrThrow().webJSRecipe?.clearLoginAttemptInfo({ userContext });
                            loginAttemptInfo = undefined;
                        } else if (!checkAdditionalLoginAttemptInfoProperties(loginAttemptInfo)) {
                            // If these properties are not set, it means that the user likely started logging in
                            // using a custom UI and then switched to the pre-built UI. In that case, we should clear
                            // the login attempt info so that the user is prompted to login again, since the pre-built UI
                            // requires these properties to be set in order to show the correct UI.
                            await Passwordless.getInstanceOrThrow().webJSRecipe?.clearLoginAttemptInfo({ userContext });
                            loginAttemptInfo = undefined;
                        }
                    }

                    if (loginAttemptInfo === undefined || loginAttemptInfo.flowType !== "MAGIC_LINK") {
                        return {
                            shouldDisplay: false,
                        };
                    }
                    return {
                        shouldDisplay: true,
                        preloadInfo: loginAttemptInfo,
                    };
                },
                component: ({ preloadInfo, ...props }) => (
                    <LinkSentFeature
                        key="linkSentFullPage"
                        {...props}
                        recipe={this.recipeInstance}
                        useComponentOverrides={useRecipeComponentOverrideContext}
                        loginAttemptInfo={preloadInfo}
                    />
                ),
            },
            {
                type: "FULL_PAGE",
                async preloadInfoAndRunChecks(firstFactors, userContext) {
                    let loginAttemptInfo =
                        await Passwordless.getInstanceOrThrow().webJSRecipe.getLoginAttemptInfo<AdditionalLoginAttemptInfoProperties>(
                            {
                                userContext,
                            }
                        );
                    if (loginAttemptInfo !== undefined) {
                        if (
                            loginAttemptInfo.contactMethod === "PHONE" &&
                            !firstFactors.includes(FactorIds.OTP_PHONE) &&
                            !firstFactors.includes(FactorIds.LINK_PHONE)
                        ) {
                            await Passwordless.getInstanceOrThrow().webJSRecipe?.clearLoginAttemptInfo({ userContext });
                            loginAttemptInfo = undefined;
                        } else if (
                            loginAttemptInfo.contactMethod === "EMAIL" &&
                            !firstFactors.includes(FactorIds.OTP_EMAIL) &&
                            !firstFactors.includes(FactorIds.LINK_EMAIL)
                        ) {
                            await Passwordless.getInstanceOrThrow().webJSRecipe?.clearLoginAttemptInfo({ userContext });
                            loginAttemptInfo = undefined;
                        } else if (!checkAdditionalLoginAttemptInfoProperties(loginAttemptInfo)) {
                            // If these properties are not set, it means that the user likely started logging in
                            // using a custom UI and then switched to the pre-built UI. In that case, we should clear
                            // the login attempt info so that the user is prompted to login again, since the pre-built UI
                            // requires these properties to be set in order to show the correct UI.
                            await Passwordless.getInstanceOrThrow().webJSRecipe?.clearLoginAttemptInfo({ userContext });
                            loginAttemptInfo = undefined;
                        }
                    }
                    if (loginAttemptInfo === undefined || loginAttemptInfo.flowType === "MAGIC_LINK") {
                        return {
                            shouldDisplay: false,
                        };
                    }
                    return {
                        shouldDisplay: true,
                        preloadInfo: loginAttemptInfo,
                    };
                },
                component: ({ preloadInfo, ...props }) => (
                    <UserInputCodeFeature
                        key="userInputCodeFullPage"
                        {...props}
                        recipe={this.recipeInstance}
                        useComponentOverrides={useRecipeComponentOverrideContext}
                        loginAttemptInfo={preloadInfo}
                    />
                ),
            },
            ...factorCombos.map((factors) => ({
                type: "SIGN_IN" as const,
                factorIds: factors,
                displayOrder: 3,
                component: (props: PartialAuthComponentProps) => (
                    <SignInUpFeature
                        {...props}
                        key={factors.join("|")}
                        recipe={this.recipeInstance}
                        useComponentOverrides={useRecipeComponentOverrideContext}
                        factorIds={factors}
                    />
                ),
            })),
            ...factorCombos.map((factors) => ({
                type: "SIGN_UP" as const,
                factorIds: factors,
                displayOrder: 3,
                component: (props: PartialAuthComponentProps) => (
                    <ContinueWithPasswordlessFeature
                        key={factors.join("|")}
                        {...props}
                        recipe={this.recipeInstance}
                        factorIds={factors}
                        useComponentOverrides={useRecipeComponentOverrideContext}
                    />
                ),
            })),
        ];

        // We only do this and check if we should add this component
        // because it provides a better error message if EP is not initialized, but requested
        try {
            EmailPassword.getInstanceOrThrow();
            res.push(
                ...factorCombos
                    .map((combo) => [FactorIds.EMAILPASSWORD, ...combo])
                    .map((factors) => ({
                        type: "SIGN_IN" as const,
                        factorIds: factors,
                        displayOrder: 3,
                        component: (props: PartialAuthComponentProps) => (
                            <SignInUpEPComboFeature
                                {...props}
                                key={factors.join("|")}
                                recipe={this.recipeInstance}
                                useComponentOverrides={useRecipeComponentOverrideContext}
                                factorIds={factors}
                            />
                        ),
                    }))
            );
        } catch {
            // EP was not initialized, so not adding the combo component is OK
        }

        return res;
    }

    // For tests
    static reset(): void {
        if (!isTest()) {
            return;
        }

        PasswordlessPreBuiltUI.instance = undefined;
        return;
    }

    static LinkClicked = (props: FeatureBaseProps<{ navigate?: Navigate; userContext?: UserContext }>) =>
        this.getFeatureComponent("linkClickedScreen", props);
    static MfaOtpPhone = (props: FeatureBaseProps<{ navigate?: Navigate; userContext?: UserContext }>) =>
        this.getFeatureComponent("otp-phone", props);
    static MfaOtpEmail = (props: FeatureBaseProps<{ navigate?: Navigate; userContext?: UserContext }>) =>
        this.getFeatureComponent("otp-email", props);
    static MFAOTPTheme = MFAThemeWrapper;
}

const LinkClicked = PasswordlessPreBuiltUI.LinkClicked;
const MfaOtpPhone = PasswordlessPreBuiltUI.MfaOtpPhone;
const MfaOtpEmail = PasswordlessPreBuiltUI.MfaOtpEmail;

export { LinkClicked, MfaOtpPhone, MfaOtpEmail, MFAThemeWrapper as MFAOTPTheme };

function getAllChoices(choices: string[]): string[][] {
    if (choices.length === 0) {
        return [[]];
    }
    const subChoices = getAllChoices(choices.slice(1));
    return [...subChoices, ...subChoices.map((a) => [choices[0], ...a])];
}

function getAllFactorChoices(factorIds: string[]) {
    return getAllChoices(factorIds)
        .sort((a, b) => a.length - b.length)
        .slice(1);
}
