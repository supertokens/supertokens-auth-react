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

import type { ContinueWithPasswordlessTheme } from "./components/themes/continueWithPasswordless";
import type { LinkClickedScreen } from "./components/themes/linkClickedScreen";
import type { LinkSent } from "./components/themes/linkSent";
import type { LoadingScreen } from "./components/themes/mfa/loadingScreen";
import type { MFAFooter } from "./components/themes/mfa/mfaFooter";
import type { MFAHeader } from "./components/themes/mfa/mfaHeader";
import type { MFAOTPFooter } from "./components/themes/mfa/mfaOTPFooter";
import type { MFAOTPHeader } from "./components/themes/mfa/mfaOTPHeader";
import type { EmailForm } from "./components/themes/signInUp/emailForm";
import type { EmailOrPhoneForm } from "./components/themes/signInUp/emailOrPhoneForm";
import type { PhoneForm } from "./components/themes/signInUp/phoneForm";
import type { UserInputCodeFormFooter } from "./components/themes/userInputCodeForm/userInputCodeFormFooter";
import type { UserInputCodeFormHeader } from "./components/themes/userInputCodeForm/userInputCodeFormHeader";
import type { UserInputCodeFormScreen } from "./components/themes/userInputCodeForm/userInputCodeFormScreen";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type {
    APIFormField,
    FeatureBaseConfig,
    NormalisedBaseConfig,
    UserContext,
    WebJSRecipeInterface,
} from "../../types";
import type {
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
} from "../authRecipe/types";
import type { FormBaseAPIResponse } from "../emailpassword/types";
import type { Dispatch } from "react";
import type WebJSRecipe from "supertokens-web-js/recipe/passwordless";
import type { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import type { User } from "supertokens-web-js/types";

export type PreAndPostAPIHookAction =
    | "PASSWORDLESS_CREATE_CODE"
    | "PASSWORDLESS_CONSUME_CODE"
    | "PASSWORDLESS_RESEND_CODE"
    | "EMAIL_EXISTS"
    | "PHONE_NUMBER_EXISTS";

export type PreAPIHookContext = {
    /*
     * Pre API Hook action.
     */
    action: PreAndPostAPIHookAction;

    /*
     * Request object containing query params, body, headers.
     */
    requestInit: RequestInit;

    /*
     * URL
     */
    url: string;
};

// The redirection callback will never be called for passwordless
export type GetRedirectionURLContext = never;

export type OnHandleEventContext =
    | {
          rid: "passwordless";
          action: "SUCCESS";
          isNewRecipeUser: boolean;
          createdNewSession: boolean;
          user: User;
      }
    | {
          action: "PASSWORDLESS_RESTART_FLOW";
      }
    | {
          action: "PASSWORDLESS_CODE_SENT";
          isResend: boolean;
      }
    | AuthRecipeModuleOnHandleEventContext;

export type PasswordlessNormalisedBaseConfig = {
    disableDefaultUI?: boolean;
} & NormalisedBaseConfig;

export type NormalisedConfig = {
    validateEmailAddress: (email: string) => Promise<string | undefined> | string | undefined;
    validatePhoneNumber: (phoneNumber: string) => Promise<string | undefined> | string | undefined;

    signInUpFeature: {
        resendEmailOrSMSGapInSeconds: number;
        defaultCountry?: string;

        defaultToEmail: boolean;
        emailOrPhoneFormStyle: string;
        userInputCodeFormStyle: string;
        linkSentScreenStyle: string;

        disableDefaultUI?: boolean;
    };
    linkClickedScreenFeature: PasswordlessNormalisedBaseConfig;
    mfaFeature: PasswordlessNormalisedBaseConfig;

    contactMethod: "PHONE" | "EMAIL" | "EMAIL_OR_PHONE";

    override: {
        functions: (originalImplementation: RecipeInterface) => RecipeInterface;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type PasswordlessFeatureBaseConfig = {
    disableDefaultUI?: boolean;
} & FeatureBaseConfig;

export type SignInUpFeatureConfigInput = {
    disableDefaultUI?: boolean;
    resendEmailOrSMSGapInSeconds?: number;

    emailOrPhoneFormStyle?: string;
    userInputCodeFormStyle?: string;
    linkSentScreenStyle?: string;
};

export type UserInput = (
    | {
          contactMethod: "EMAIL";

          validateEmailAddress?: (email: string) => Promise<string | undefined> | string | undefined;

          signInUpFeature?: SignInUpFeatureConfigInput;
      }
    | {
          contactMethod: "PHONE";

          validatePhoneNumber?: (phoneNumber: string) => Promise<string | undefined> | string | undefined;

          signInUpFeature?: SignInUpFeatureConfigInput & {
              /*
               * Must be a two-letter ISO country code (e.g.: "US")
               */
              defaultCountry?: string;
          };
      }
    | {
          contactMethod: "EMAIL_OR_PHONE";

          validateEmailAddress?: (email: string) => Promise<string | undefined> | string | undefined;
          validatePhoneNumber?: (phoneNumber: string) => Promise<string | undefined> | string | undefined;

          signInUpFeature?: SignInUpFeatureConfigInput & {
              /*
               * Must be a two-letter ISO country code (e.g.: "US")
               */
              defaultCountry?: string;
              defaultToEmail?: boolean;
          };
      }
) & {
    override?: {
        functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
    };
    linkClickedScreenFeature?: PasswordlessFeatureBaseConfig;
    mfaFeature?: PasswordlessFeatureBaseConfig;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type MFAProps = {
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    contactMethod: "EMAIL" | "PHONE";
    onBackButtonClicked: () => void;
    onSignOutClicked: () => void;
    onSuccess?: () => void;
    onFetchError: (err: Response) => void;
    dispatch: Dispatch<MFAAction>;
    featureState: {
        canChangeEmail: boolean;
        loginAttemptInfo?: LoginAttemptInfo;
        loaded: boolean;
        showBackButton: boolean;
        showAccessDenied: boolean;
        error: string | undefined;
    };
    userContext?: UserContext;
};
export type SignInUpProps = {
    recipeImplementation: RecipeImplementation;
    factorIds: string[];
    config: NormalisedConfig;
    onSuccess?: (result: { createdNewRecipeUser: boolean; user: User }) => void;
    onFetchError: (err: Response) => void;
    onError: (err: string) => void;
    error: string | undefined;
    clearError: () => void;
    userContext: UserContext;
};
export type LoginAttemptInfo = {
    deviceId: string;
    preAuthSessionId: string;
    contactInfo: string;
    contactMethod: "EMAIL" | "PHONE";
    lastResend: number;
    redirectToPath?: string;
    flowType: "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";
};

/**
 * When calling getLoginAttemptInfo/setLoginAttemptInfo from web-js we use generics to get
 * access to properties in local storage that web-js does not set by default.
 * This allows us to strongly type the response while keeping it dynamic.
 *
 * In the context of auth-react this type indicates all the additional properties we need.
 */
export type AdditionalLoginAttemptInfoProperties = {
    contactInfo: string;
    contactMethod: "EMAIL" | "PHONE";
    lastResend: number;
    redirectToPath?: string;
};

export type RecipeImplementation = WebJSRecipeInterface<typeof WebJSRecipe>;

export type SignInUpEmailFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    onFetchError: (error: Response) => void;
    error: string | undefined;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    onSuccess?: () => void;
};

export type SignInUpPhoneFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    onFetchError: (error: Response) => void;
    error: string | undefined;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    onSuccess?: () => void;
};

export type SignInUpEmailOrPhoneFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    onFetchError: (error: Response) => void;
    error: string | undefined;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    onSuccess?: () => void;
};

export type SignInUpUserInputCodeFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    onFetchError: (error: Response) => void;
    error: string | undefined;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    loginAttemptInfo: LoginAttemptInfo;
    onSuccess?: (result: { createdNewRecipeUser: boolean; user: User }) => void;
};

export type LinkClickedScreenProps = {
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    requireUserInteraction: boolean;
    consumeCode: () => void;
    onSuccess?: () => void;
};

export type SignInUpEPComboEmailOrPhoneFormProps = {
    showPasswordField: boolean;
    showContinueWithPasswordlessLink: boolean;
    clearError: () => void;
    isPhoneNumber: boolean;
    setIsPhoneNumber: (isPhone: boolean) => void;
    onContactInfoSubmit: (contactInfo: string) => Promise<FormBaseAPIResponse<unknown>>;
    onPasswordSubmit: (formFields: APIFormField[]) => Promise<FormBaseAPIResponse<unknown>>;
    onContinueWithPasswordlessClick: (contactInfo: string) => Promise<void>;
    onSuccess: (
        result:
            | { status: "OK"; user: User; createdNewRecipeUser: boolean; isEmailPassword: true }
            | { status: "OK"; isEmailPassword: false | undefined }
    ) => void;
    onError: (error: string) => void;
    onFetchError: (error: Response) => void;
    error: string | undefined;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
};

export type SignInUpEPComboEmailFormProps = {
    showPasswordField: boolean;
    showContinueWithPasswordlessLink: boolean;
    clearError: () => void;
    onContactInfoSubmit: (contactInfo: string) => Promise<FormBaseAPIResponse<unknown>>;
    onPasswordSubmit: (formFields: APIFormField[]) => Promise<FormBaseAPIResponse<unknown>>;
    onContinueWithPasswordlessClick: (contactInfo: string) => Promise<void>;
    onSuccess: (
        result:
            | { status: "OK"; user: User; createdNewRecipeUser: boolean; isEmailPassword: true }
            | { status: "OK"; isEmailPassword: false | undefined }
    ) => void;
    onError: (error: string) => void;
    onFetchError: (error: Response) => void;
    error: string | undefined;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
};

export type MFAAction =
    | {
          type: "load";
          loginAttemptInfo: LoginAttemptInfo | undefined;
          canChangeEmail: boolean;
          showAccessDenied: boolean;
          showBackButton: boolean;
          error: string | undefined;
          callingCreateCode: boolean;
      }
    | {
          type: "startVerify";
          loginAttemptInfo: LoginAttemptInfo;
      }
    | {
          type: "resendCode";
          timestamp: number;
      }
    | {
          type: "restartFlow";
          error: string | undefined;
      }
    | {
          type: "setError";
          showAccessDenied: boolean;
          error: string | undefined;
      };

export type MFAState = {
    showAccessDenied: boolean;
    error: string | undefined;
    loaded: boolean;
    showBackButton: boolean;
    loginAttemptInfo: LoginAttemptInfo | undefined;
    canChangeEmail: boolean;
};

export type SignInUpChildProps = SignInUpProps;
export type SignInUpEPComboChildProps = Omit<SignInUpProps, "onSuccess"> & {
    isPhoneNumber: boolean;
    setIsPhoneNumber: (isPhone: boolean) => void;
    showPasswordField: boolean;
    showContinueWithPasswordlessLink: boolean;
    onContactInfoSubmit: (contactInfo: string) => Promise<FormBaseAPIResponse<unknown>>;
    onPasswordSubmit: (formFields: APIFormField[]) => Promise<FormBaseAPIResponse<unknown>>;
    onContinueWithPasswordlessClick: (contactInfo: string) => Promise<void>;
    onSuccess: (
        result:
            | { status: "OK"; user: User; createdNewRecipeUser: boolean; isEmailPassword: true }
            | { status: "OK"; isEmailPassword: false | undefined }
    ) => void;
};
export type LinkSentChildProps = LinkSentThemeProps;
export type MFAChildProps = Omit<MFAProps, "featureState" | "dispatch">;

export type LinkSentThemeProps = {
    clearError: () => void;
    onError: (error: string) => void;
    error: string | undefined;
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
};

export type UserInputCodeFormFooterProps = {
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
};

export type UserInputCodeFormHeaderProps = {
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
};

export type MFAFooterProps = {
    canChangeEmail: boolean;
    onSignOutClicked: () => void;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
};

export type MFAOTPFooterProps = {
    canChangeEmail: boolean;
    onSignOutClicked: () => void;
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
};

export type MFAHeaderProps = {
    contactMethod: "EMAIL" | "PHONE";
    showBackButton: boolean;
    onBackButtonClicked: () => void;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
};

export type MFAOTPHeaderProps = {
    canChangeEmail: boolean;
    showBackButton: boolean;
    onBackButtonClicked: () => void;
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
};

export type ComponentOverrideMap = {
    PasswordlessEmailForm_Override?: ComponentOverride<typeof EmailForm>;
    PasswordlessPhoneForm_Override?: ComponentOverride<typeof PhoneForm>;
    PasswordlessEmailOrPhoneForm_Override?: ComponentOverride<typeof EmailOrPhoneForm>;

    PasswordlessUserInputCodeFormHeader_Override?: ComponentOverride<typeof UserInputCodeFormHeader>;
    PasswordlessUserInputCodeFormFooter_Override?: ComponentOverride<typeof UserInputCodeFormFooter>;
    PasswordlessUserInputCodeForm_Override?: ComponentOverride<typeof UserInputCodeFormScreen>;

    PasswordlessLinkSent_Override?: ComponentOverride<typeof LinkSent>;

    PasswordlessLinkClickedScreen_Override?: ComponentOverride<typeof LinkClickedScreen>;
    PasswordlessContinueWithPasswordless_Override?: ComponentOverride<typeof ContinueWithPasswordlessTheme>;

    PasswordlessMFAHeader_Override?: ComponentOverride<typeof MFAHeader>;
    PasswordlessMFAFooter_Override?: ComponentOverride<typeof MFAFooter>;
    PasswordlessMFAOTPHeader_Override?: ComponentOverride<typeof MFAOTPHeader>;
    PasswordlessMFAOTPFooter_Override?: ComponentOverride<typeof MFAOTPFooter>;
    PasswordlessMFAOTPLoadingScreen_Override?: ComponentOverride<typeof LoadingScreen>;
};
