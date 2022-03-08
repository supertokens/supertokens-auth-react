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

/*
 * Imports.
 */
import { FeatureBaseConfig, Styles } from "../../types";
import {
    GetRedirectionURLContext as PasswordlessGetRedirectionURLContext,
    OnHandleEventContext as PasswordlessOnHandleEventContext,
    PreAPIHookContext as PasswordlessPreAPIHookContext,
} from "../passwordless";
import {
    UserInput as PwlessUserInput,
    NormalisedConfig as PasswordlessConfig,
    PasswordlessFeatureBaseConfig,
    PasswordlessSignInUpAction,
    PasswordlessUser,
    SignInUpFeatureConfigInput as PwlessSignInUpFeatureConfigInput,
    SignInUpChildProps as PwlessChildProps,
    SignInUpState as PWlessSignInUpState,
} from "../passwordless/types";
import {
    GetRedirectionURLContext as ThirdPartyGetRedirectionURLContext,
    OnHandleEventContext as ThirdPartyOnHandleEventContext,
    PreAPIHookContext as ThirdPartyPreAPIHookContext,
} from "../thirdparty";
import {
    NormalisedConfig as TPConfig,
    StateObject,
    ThirdPartySignInAndUpState,
    ThirdPartySignInUpActions,
    ThirdPartySignInUpChildProps,
    UserInput as TPUserInput,
} from "../thirdparty/types";
import Provider from "../thirdparty/providers";
import { CustomProviderConfig } from "../thirdparty/providers/types";
import {
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
    UserInputOverride as AuthRecipeUserInputOverride,
} from "../authRecipeWithEmailVerification/types";
import PWlessRecipe from "../passwordless/recipe";
import TPRecipe from "../thirdparty/recipe";
import OverrideableBuilder from "supertokens-js-override";

import { ComponentOverride } from "../../components/componentOverride/componentOverride";
import { ComponentOverrideMap as PasswordlessOverrideMap } from "../passwordless/types";
import { ComponentOverrideMap as ThirdPartyOverrideMap } from "../thirdparty/types";
import { Header } from "./components/themes/signInUp/header";
import { CountryCode } from "libphonenumber-js";
import { Dispatch } from "react";
import { SignInUpScreens } from "../passwordless/components/themes/signInUp";
import { User } from "../authRecipe/types";

type WithRenamedProp<T, K extends keyof T, L extends string> = Omit<T, K> & {
    [P in L]: T[K];
};

export type ComponentOverrideMap = Omit<PasswordlessOverrideMap, "PasswordlessSignInUpHeader_Override"> &
    Omit<ThirdPartyOverrideMap, "ThirdPartySignUpFooter_Override" | "ThirdPartySignUpHeader_Override"> & {
        ThirdPartyPasswordlessHeader_Override?: ComponentOverride<typeof Header>;
    };

export type SignInUpFeatureConfigInput = WithRenamedProp<
    PwlessSignInUpFeatureConfigInput,
    "emailOrPhoneFormStyle",
    "thirdPartyProviderAndEmailOrPhoneFormStyle"
> & {
    providers?: (Provider | CustomProviderConfig)[];
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
              defaultCountry?: CountryCode;
              guessInternationPhoneNumberFromInputPhoneNumber?: (
                  inputPhoneNumber: string,
                  defaultCountryFromConfig?: CountryCode
              ) => Promise<string | undefined> | string | undefined;
          };
      }
) & {
    override?: {
        functions?: (
            originalImplementation: TPPWlessRecipeInterface,
            builder?: OverrideableBuilder<TPPWlessRecipeInterface>
        ) => TPPWlessRecipeInterface;
        components?: ComponentOverrideMap;
    } & AuthRecipeUserInputOverride;
    linkClickedScreenFeature?: PasswordlessFeatureBaseConfig;
    oAuthCallbackScreen?: FeatureBaseConfig;
    disablePasswordless?: boolean;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;

export type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;

export type NormalisedConfig = {
    passwordlessUserInput: PwlessUserInput | undefined;
    thirdpartyUserInput: TPUserInput | undefined;

    thirdPartyProviderAndEmailOrPhoneFormStyle: Styles | undefined;

    override: {
        functions: (
            originalImplementation: TPPWlessRecipeInterface,
            builder?: OverrideableBuilder<TPPWlessRecipeInterface>
        ) => TPPWlessRecipeInterface;
        components: ComponentOverrideMap;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;

export type GetRedirectionURLContext = PasswordlessGetRedirectionURLContext | ThirdPartyGetRedirectionURLContext;

export type PreAPIHookContext = PasswordlessPreAPIHookContext | ThirdPartyPreAPIHookContext;

export type OnHandleEventContext = PasswordlessOnHandleEventContext | ThirdPartyOnHandleEventContext;

export type ThirdPartyPasswordlessSignInAndUpThemeProps = {
    config: NormalisedConfig;
    history?: any;
    commonState: {
        error: string | undefined;
    };

    passwordlessRecipe?: PWlessRecipe;
    pwlessState: PWlessSignInUpState;
    pwlessDispatch: Dispatch<PasswordlessSignInUpAction>;
    pwlessChildProps?: PwlessChildProps;

    thirdPartyRecipe?: TPRecipe;
    tpState: ThirdPartySignInAndUpState;
    tpDispatch: Dispatch<ThirdPartySignInUpActions>;
    tpChildProps?: ThirdPartySignInUpChildProps;
};

export type ThirdPartyPasswordlessSignInAndUpThemePropsWithActiveScreen = {
    config: NormalisedConfig;
    history?: any;
    commonState: {
        error: string | undefined;
    };
    thirdPartyRecipe?: TPRecipe;
    tpState: ThirdPartySignInAndUpState;
    tpDispatch: Dispatch<ThirdPartySignInUpActions>;
    tpChildProps?: ThirdPartySignInUpChildProps;
} & (
    | {
          activeScreen: undefined;
          passwordlessRecipe: undefined;
          pwlessState: PWlessSignInUpState;
          pwlessDispatch: Dispatch<PasswordlessSignInUpAction>;
          pwlessChildProps: undefined;
      }
    | {
          activeScreen: SignInUpScreens;
          passwordlessRecipe: PWlessRecipe;
          pwlessState: PWlessSignInUpState;
          pwlessDispatch: Dispatch<PasswordlessSignInUpAction>;
          pwlessChildProps: PwlessChildProps;
      }
);

export type TPPWlessRecipeInterface = {
    createCode: (
        input: ({ email: string } | { phoneNumber: string }) & {
            config: PasswordlessConfig;
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
            config: PasswordlessConfig;
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
            config: PasswordlessConfig;
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

    doesPasswordlessUserEmailExist: (input: { email: string; config: PasswordlessConfig }) => Promise<boolean>;
    doesPasswordlessUserPhoneNumberExist: (input: {
        phoneNumber: string;
        config: PasswordlessConfig;
    }) => Promise<boolean>;

    getPasswordlessLoginAttemptInfo: () =>
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
    setPasswordlessLoginAttemptInfo: (input: {
        deviceId: string;
        preAuthSessionId: string;
        contactInfo: string;
        contactMethod: "EMAIL" | "PHONE";
        flowType: "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";
        lastResend: number;
        redirectToPath?: string;
    }) => Promise<void> | void;
    clearLoginAttemptInfo: () => Promise<void> | void;

    getOAuthAuthorisationURL: (input: { thirdPartyId: string; config: TPConfig }) => Promise<string>;

    thirdPartySignInAndUp: (input: { thirdPartyId: string; config: TPConfig }) => Promise<
        | {
              status: "OK";
              user: User;
              createdNewUser: boolean;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER" | "GENERAL_ERROR";
          }
        | {
              status: "FIELD_ERROR";
              error: string;
          }
    >;

    getOAuthState(): StateObject | undefined;

    setOAuthState(state: StateObject): void;

    redirectToThirdPartyLogin: (input: {
        thirdPartyId: string;
        config: TPConfig;
        state?: StateObject;
    }) => Promise<{ status: "OK" | "ERROR" }>;
};
