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

import { Dispatch } from "react";
import { FeatureBaseConfig, NormalisedBaseConfig, Styles } from "../../types";
import {
    GetRedirectionURLContext as AuthRecipeModuleGetRedirectionURLContext,
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
} from "../authRecipe/types";

import { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { CountryCode } from "libphonenumber-js";
import { SignInUpHeader } from "./components/themes/signInUp/signInUpHeader";
import { SignInUpFooter } from "./components/themes/signInUp/signInUpFooter";
import { EmailForm } from "./components/themes/signInUp/emailForm";
import { PhoneForm } from "./components/themes/signInUp/phoneForm";
import { UserInputCodeForm } from "./components/themes/signInUp/userInputCodeForm";
import { LinkClickedScreen } from "./components/themes/linkClickedScreen";
import { UserInputCodeFormHeader } from "./components/themes/signInUp/userInputCodeFormHeader";
import { UserInputCodeFormFooter } from "./components/themes/signInUp/userInputCodeFormFooter";
import { LinkSent } from "./components/themes/signInUp/linkSent";
import { CloseTabScreen } from "./components/themes/signInUp/closeTabScreen";
import { EmailOrPhoneForm } from "./components/themes/signInUp/emailOrPhoneForm";

export type PasswordlessUser = {
    id: string;
    email?: string;
    phoneNumber?: string;
    timeJoined: number;
};

export type RecipeInterface = {
    createCode: (
        input: ({ email: string } | { phoneNumber: string }) & {
            config: NormalisedConfig;
        }
    ) => Promise<
        | {
              status: "OK";
              deviceId: string;
              preAuthSessionId: string;
              flowType: "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";
          }
        | { status: "GENERAL_ERROR"; message: string }
    >;
    resendCode: (
        input: { deviceId: string; preAuthSessionId: string } & {
            config: NormalisedConfig;
        }
    ) => Promise<
        | {
              status: "OK" | "RESTART_FLOW_ERROR";
          }
        | { status: "GENERAL_ERROR"; message: string }
    >;

    consumeCode: (
        input: (
            | {
                  userInputCode: string;
                  deviceId: string;
                  preAuthSessionId: string;
              }
            | {
                  preAuthSessionId: string;
                  linkCode: string;
              }
        ) & {
            config: NormalisedConfig;
        }
    ) => Promise<
        | {
              status: "OK";
              createdUser: boolean;
              user: PasswordlessUser;
          }
        | {
              status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
              failedCodeInputAttemptCount: number;
              maximumCodeInputAttempts: number;
          }
        | { status: "GENERAL_ERROR"; message: string }
        | { status: "RESTART_FLOW_ERROR" }
    >;

    doesEmailExist: (input: { email: string; config: NormalisedConfig }) => Promise<boolean>;
    doesPhoneNumberExist: (input: { phoneNumber: string; config: NormalisedConfig }) => Promise<boolean>;

    getLoginAttemptInfo: () =>
        | Promise<
              | undefined
              | {
                    deviceId: string;
                    preAuthSessionId: string;
                    contactInfo: string;
                    contactMethod: "EMAIL" | "PHONE";
                    flowType: "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";
                    lastResend: number;
                    redirectToPath?: string;
                }
          >
        | {
              deviceId: string;
              preAuthSessionId: string;
              contactInfo: string;
              contactMethod: "EMAIL" | "PHONE";
              flowType: "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";
              lastResend: number;
              redirectToPath?: string;
          }
        | undefined;
    setLoginAttemptInfo: (input: {
        deviceId: string;
        preAuthSessionId: string;
        contactInfo: string;
        contactMethod: "EMAIL" | "PHONE";
        flowType: "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";
        lastResend: number;
        redirectToPath?: string;
    }) => Promise<void> | void;
    clearLoginAttemptInfo: () => Promise<void> | void;
};

export type PreAPIHookContext = {
    /*
     * Pre API Hook action.
     */
    action:
        | "PASSWORDLESS_CREATE_CODE"
        | "PASSWORDLESS_CONSUME_CODE"
        | "PASSWORDLESS_RESEND_CODE"
        | "EMAIL_EXISTS"
        | "PHONE_NUMBER_EXISTS";

    /*
     * Request object containing query params, body, headers.
     */
    requestInit: RequestInit;

    /*
     * URL
     */
    url: string;
};

export type GetRedirectionURLContext = AuthRecipeModuleGetRedirectionURLContext;

export type OnHandleEventContext =
    | {
          action: "SUCCESS";
          isNewUser: boolean;
          user: PasswordlessUser;
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
    disableDefaultImplementation?: boolean;
} & NormalisedBaseConfig;

export type NormalisedConfig = {
    validateEmailAddress: (email: string) => Promise<string | undefined> | string | undefined;
    validatePhoneNumber: (phoneNumber: string) => Promise<string | undefined> | string | undefined;

    signInUpFeature: {
        resendEmailOrSMSGapInSeconds: number;
        defaultCountry?: CountryCode;
        guessInternationPhoneNumberFromInputPhoneNumber: (
            inputPhoneNumber: string,
            defaultCountryFromConfig?: CountryCode
        ) => Promise<string | undefined> | string | undefined;

        privacyPolicyLink?: string;
        termsOfServiceLink?: string;

        emailOrPhoneFormStyle: Styles;
        userInputCodeFormStyle: Styles;
        linkSentScreenStyle: Styles;
        closeTabScreenStyle: Styles;

        disableDefaultImplementation?: boolean;
    };
    linkClickedScreenFeature: PasswordlessNormalisedBaseConfig;

    contactMethod: "PHONE" | "EMAIL" | "EMAIL_OR_PHONE";

    override: {
        functions: (originalImplementation: RecipeInterface) => RecipeInterface;
        components: ComponentOverrideMap;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;

export type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;

export type PasswordlessFeatureBaseConfig = {
    disableDefaultImplementation?: boolean;
} & FeatureBaseConfig;

export type SignInUpFeatureConfigInput = {
    disableDefaultImplementation?: boolean;
    resendEmailOrSMSGapInSeconds?: number;

    /*
     * Privacy policy link for the sign-up form.
     */
    privacyPolicyLink?: string;
    /*
     * Terms and conditions link for the sign-up form.
     */
    termsOfServiceLink?: string;

    emailOrPhoneFormStyle?: Styles;
    userInputCodeFormStyle?: Styles;
    linkSentScreenStyle?: Styles;
    closeTabScreenStyle?: Styles;
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
              defaultCountry?: CountryCode;
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
              defaultCountry?: CountryCode;

              guessInternationPhoneNumberFromInputPhoneNumber?: (
                  inputPhoneNumber: string,
                  defaultCountryFromConfig?: CountryCode
              ) => Promise<string | undefined> | string | undefined;
          };
      }
) & {
    override?: {
        functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
        components?: ComponentOverrideMap;
    };
    linkClickedScreenFeature?: PasswordlessFeatureBaseConfig;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;

export type SignInUpProps = {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess?: (result: { createdUser: boolean; user: PasswordlessUser }) => void;
    dispatch: Dispatch<PasswordlessSignInUpAction>;
    featureState: {
        loginAttemptInfo?: LoginAttemptInfo;
        loaded: boolean;
        successInAnotherTab: boolean;
        error: string | undefined;
    };
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

export type SignInUpEmailFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    error: string | undefined;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess?: () => void;
};

export type SignInUpPhoneFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    error: string | undefined;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess?: () => void;
};

export type SignInUpEmailOrPhoneFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    error: string | undefined;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess?: () => void;
};

export type SignInUpUserInputCodeFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    error: string | undefined;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    loginAttemptInfo: LoginAttemptInfo;
    onSuccess?: (result: { createdUser: boolean; user: PasswordlessUser }) => void;
};

export type LinkClickedScreenProps = {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess?: () => void;
};

export type CloseTabScreenProps = {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
};

export type PasswordlessSignInUpAction =
    | {
          type: "load";
          loginAttemptInfo: LoginAttemptInfo | undefined;
          error: string | undefined;
      }
    | {
          type: "startLogin";
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
          error: string | undefined;
      }
    | {
          type: "successInAnotherTab";
      };

export type SignInUpState = {
    error: string | undefined;
    loaded: boolean;
    loginAttemptInfo: LoginAttemptInfo | undefined;
    successInAnotherTab: boolean;
};

export type SignInUpChildProps = Omit<SignInUpProps, "featureState" | "dispatch">;

export type LinkSentThemeProps = {
    clearError: () => void;
    onError: (error: string) => void;
    error: string | undefined;
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
};

export type UserInputCodeFormFooterProps = {
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
};

export type UserInputCodeFormHeaderProps = {
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
};

export type ComponentOverrideMap = {
    PasswordlessSignInUpHeader_Override?: ComponentOverride<typeof SignInUpHeader>;
    PasswordlessSignInUpFooter_Override?: ComponentOverride<typeof SignInUpFooter>;
    PasswordlessEmailForm_Override?: ComponentOverride<typeof EmailForm>;
    PasswordlessPhoneForm_Override?: ComponentOverride<typeof PhoneForm>;
    PasswordlessEmailOrPhoneForm_Override?: ComponentOverride<typeof EmailOrPhoneForm>;

    PasswordlessUserInputCodeFormHeader_Override?: ComponentOverride<typeof UserInputCodeFormHeader>;
    PasswordlessUserInputCodeFormFooter_Override?: ComponentOverride<typeof UserInputCodeFormFooter>;
    PasswordlessUserInputCodeForm_Override?: ComponentOverride<typeof UserInputCodeForm>;

    PasswordlessLinkSent_Override?: ComponentOverride<typeof LinkSent>;

    PasswordlessLinkClickedScreen_Override?: ComponentOverride<typeof LinkClickedScreen>;
    PasswordlessCloseTabScreen_Override?: ComponentOverride<typeof CloseTabScreen>;
};
