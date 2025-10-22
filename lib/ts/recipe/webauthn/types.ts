/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import type { ContinueWithPasskeyWithOverride } from "./components/themes/continueWithPasskey";
import type { PasskeyNotSupportedError } from "./components/themes/error/passkeyNotSupportedError";
import type {
    WebauthnMFASignIn,
    WebauthnMFALoadingScreen,
    WebauthnMFASignUp,
    WebauthnMFASignUpConfirmation,
    WebauthnMFAFooter,
} from "./components/themes/mfa";
import type { PasskeyRecoveryEmailSent } from "./components/themes/sendRecoveryEmail/emailSent";
import type {
    WebauthnRecoverAccount,
    WebauthnRecoverAccountForm,
} from "./components/themes/sendRecoveryEmail/recoverAccountForm";
import type { PasskeyConfirmation } from "./components/themes/signUp/confirmation";
import type { ContinueWithoutPasskey } from "./components/themes/signUp/continueWithoutPasskey";
import type { PasskeyFeatureBlock } from "./components/themes/signUp/featureBlocks";
import type { SignUpFormInner } from "./components/themes/signUp/signUpForm";
import type { SignUpSomethingWentWrong } from "./components/themes/signUp/somethingWentWrong";
import type Recipe from "./recipe";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type {
    NormalisedBaseConfig,
    NormalisedGetRedirectionURLContext,
    UserContext,
    WebJSRecipeInterface,
} from "../../types";
import type {
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    UserInput as AuthRecipeModuleUserInput,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    Config as AuthRecipeModuleConfig,
} from "../authRecipe/types";
import type { Dispatch } from "react";
import type React from "react";
import type { RecipeInterface } from "supertokens-web-js/recipe/webauthn";
import type WebJSRecipe from "supertokens-web-js/recipe/webauthn";
import type { User } from "supertokens-web-js/types";

export type GetRedirectionURLContext = NormalisedGetRedirectionURLContext<{
    /*
     * Get Redirection URL Context
     */
    action: "SEND_RECOVERY_EMAIL";
}>;

export type PreAndPostAPIHookAction =
    | "REGISTER_OPTIONS"
    | "SIGN_IN_OPTIONS"
    | "SIGN_UP"
    | "SIGN_IN"
    | "EMAIL_EXISTS"
    | "GENERATE_RECOVER_ACCOUNT_TOKEN"
    | "RECOVER_ACCOUNT"
    | "REGISTER_CREDENTIAL"
    | "REMOVE_CREDENTIAL"
    | "LIST_CREDENTIALS";

export type OnHandleEventContext =
    | {
          action: "SUCCESS";
          isNewRecipeUser: boolean;
          createdNewSession: boolean;
          user: User;
      }
    | {
          action: "GET_EMAIL_EXISTS";
          exists: boolean;
      }
    | {
          action: "REGISTER_CREDENTIAL_OK";
      }
    | {
          action: "AUTHENTICATE_CREDENTIAL_OK";
      }
    | {
          action: "FAILED_TO_REGISTER_USER";
      }
    | AuthRecipeModuleOnHandleEventContext;

export type UserInput = Record<string, unknown> & {
    override?: {
        functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
    };
    signInAndUpFeature?: NormalisedSignInAndUpFormFeatureConfig;
    recoveryFeature?: NormalisedRecoveryFeatureConfig;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type NormalisedSignInAndUpFormFeatureConfig = NormalisedBaseConfig;

export type NormalisedRecoveryFeatureConfig = NormalisedBaseConfig & {
    disableDefaultUI: boolean;
};

export type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFormFeatureConfig;
    recoveryFeature: NormalisedRecoveryFeatureConfig;
    disableDefaultUI?: boolean;

    override: {
        functions: (originalImplementation: RecipeInterface) => RecipeInterface;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type RecipeImplementation = WebJSRecipeInterface<typeof WebJSRecipe>;

export type ComponentOverrideMap = {
    WebauthnContinueWithPasskey_Override?: ComponentOverride<typeof ContinueWithPasskeyWithOverride>;
    WebauthnPasskeyNotSupportedError_Override?: ComponentOverride<typeof PasskeyNotSupportedError>;
    WebauthnPasskeyRecoveryEmailSent_Override?: ComponentOverride<typeof PasskeyRecoveryEmailSent>;
    WebauthnRecoverAccountForm_Override?: ComponentOverride<typeof WebauthnRecoverAccountForm>;
    WebauthnRecoverAccount_Override?: ComponentOverride<typeof WebauthnRecoverAccount>;
    WebauthnPasskeyConfirmation_Override?: ComponentOverride<typeof PasskeyConfirmation>;
    WebauthnPasskeyFeatureBlock_Override?: ComponentOverride<typeof PasskeyFeatureBlock>;
    WebauthnContinueWithoutPasskey_Override?: ComponentOverride<typeof ContinueWithoutPasskey>;
    WebauthnPasskeySignUpForm_Override?: ComponentOverride<typeof SignUpFormInner>;
    WebauthnPasskeySignUpSomethingWentWrong_Override?: ComponentOverride<typeof SignUpSomethingWentWrong>;
    WebauthnMFASignIn_Override?: ComponentOverride<typeof WebauthnMFASignIn>;
    WebauthnMFALoadingScreen_Override?: ComponentOverride<typeof WebauthnMFALoadingScreen>;
    WebauthnMFASignUp_Override?: ComponentOverride<typeof WebauthnMFASignUp>;
    WebauthnMFASignUpConfirmation_Override?: ComponentOverride<typeof WebauthnMFASignUpConfirmation>;
    WebauthnMFAFooter_Override?: ComponentOverride<typeof WebauthnMFAFooter>;
};

export type SignUpThemeBaseProps = {
    clearError: () => void;
    recipeImplementation: RecipeImplementation;
    factorIds: string[];
    config: NormalisedConfig;
    onSuccess: (result: { createdNewRecipeUser: boolean; user: User }) => void;
    onFetchError: (err: Response) => void;
    onError: (err: string) => void;
    error: string | undefined;
    userContext: UserContext;
    resetFactorList: () => void;
    onSignInUpSwitcherClick: () => void;
    showBackButton: boolean;
};

export type SignUpThemeProps = SignUpThemeBaseProps & {
    onRecoverAccountClick: () => void;
};

export type SignInThemeProps = SignUpThemeBaseProps & {
    isPasskeySupported: boolean;
};

export type SignUpFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    onFetchError?: (error: Response) => void;
    error: string | undefined;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    onSuccess?: (result: { createdNewRecipeUser: boolean; user: User }) => void;
    resetFactorList?: () => void;
    showBackButton: boolean;
};

export type RecoverAccountWithTokenProps = {
    userContext?: UserContext | undefined;
    recipe: Recipe;
    useComponentOverrides: () => ComponentOverrideMap;
    children?: React.ReactNode;
};

export type RegisterOptions = Extract<
    Awaited<ReturnType<RecipeImplementation["getRegisterOptions"]>>,
    { status: "OK" }
>;

export enum RecoverAccountScreen {
    ContinueWithPasskey,
    Success,
}

export type RecoverAccountWithTokenThemeProps = {
    config: NormalisedConfig;
    userContext?: UserContext;
    recipeImplementation: RecipeImplementation;
    error: string | undefined;
    clearError: () => void;
    onError: (error: string) => void;
    token: string | null;
    registerOptions: RegisterOptions | null;
    errorMessageLabel: string | null;
    isLoading: boolean;
    activeScreen: RecoverAccountScreen;
    onContinueClick: () => void;
};

export type SendRecoveryEmailFormProps = {
    userContext?: UserContext | undefined;
    recipe: Recipe;
    useComponentOverrides: () => ComponentOverrideMap;
    children?: React.ReactNode;
};

export enum SendRecoveryEmailScreen {
    RecoverAccount,
    RecoverEmailSent,
}

export type SendRecoveryEmailFormThemeProps = {
    config: NormalisedConfig;
    userContext?: UserContext;
    recipeImplementation: RecipeImplementation;
    error: string | undefined;
    clearError: () => void;
    onError: (error: string) => void;
    recoverAccountEmail: string;
    activeScreen: SendRecoveryEmailScreen;
    setActiveScreen: React.Dispatch<React.SetStateAction<SendRecoveryEmailScreen>>;
    onRecoverAccountFormSuccess: (result: { email: string }) => void;
    onRecoverAccountBackClick: () => void;
    onEmailChangeClick: () => void;
};

export type ContinueOnSuccessParams = {
    email: string;
};

export type FeatureBlockDetailProps = {
    title: string;
    subText: string;
    icon: JSX.Element;
};

export type RecoverFormProps = {
    onSuccess: (result: any) => void;
    onBackClick: () => void;
    recipeImplementation: RecipeImplementation;
};

export type ContinueWithPasskeyProps = {
    // Type to indicate what the `Continue with` button is being used for.
    continueTo: "SIGN_UP" | "SIGN_IN";
    continueWithPasskeyClicked: () => void;
    isLoading: boolean;
    recipeImplementation: RecipeImplementation;
    isPasskeySupported: boolean;
};

export type EmailSentProps = {
    email: string;
    onEmailChangeClick: () => void;
};

export type WebAuthnMFAAction =
    | {
          type: "setError";
          accessDenied?: boolean;
          error: string | undefined;
      }
    | {
          type: "load";
          deviceSupported: boolean;
          error: string | undefined;
          email: string | undefined;
          showBackButton: boolean;
          canRegisterPasskey: boolean;
          hasRegisteredPassKey: boolean;
      };

type WebAuthnMFAInitialState = {
    error: undefined;
    loaded: false;
    accessDenied: boolean;
    deviceSupported: boolean;
    showBackButton: boolean;
    canRegisterPasskey: false;
    hasRegisteredPassKey: false;
    email: undefined;
};

type WebAuthnMFALoadedState = {
    error: string | undefined;
    loaded: true;
    accessDenied: boolean;
    deviceSupported: boolean;
    showBackButton: boolean;
    canRegisterPasskey: boolean;
    hasRegisteredPassKey: boolean;
    email: string | undefined;
};

export type WebAuthnMFAState = WebAuthnMFAInitialState | WebAuthnMFALoadedState;

export type WebAuthnMFAProps = {
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    onBackButtonClicked: () => void;
    onSignOutClicked: () => void;
    onSignIn: () => Promise<void>;
    onSignUp: (email: string) => Promise<void>;
    onRecoverAccountClick: () => void;
    userContext?: UserContext;
    featureState: WebAuthnMFAState;
    dispatch: Dispatch<WebAuthnMFAAction>;
};
