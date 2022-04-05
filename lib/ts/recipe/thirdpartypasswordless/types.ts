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
    PasswordlessFeatureBaseConfig,
    PasswordlessSignInUpAction,
    SignInUpFeatureConfigInput as PwlessSignInUpFeatureConfigInput,
    SignInUpChildProps as PwlessChildProps,
    SignInUpState as PWlessSignInUpState,
    PreAndPostAPIHookAction as PasswordlessPreAndPostAPIHookAction,
} from "../passwordless/types";
import {
    GetRedirectionURLContext as ThirdPartyGetRedirectionURLContext,
    OnHandleEventContext as ThirdPartyOnHandleEventContext,
    PreAPIHookContext as ThirdPartyPreAPIHookContext,
} from "../thirdparty";
import {
    StateObject,
    ThirdPartySignInAndUpState,
    ThirdPartySignInUpActions,
    ThirdPartySignInUpChildProps,
    UserInput as TPUserInput,
    PreAndPostAPIHookAction as ThirdPartyPreAndPostAPIHookAction,
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
import { PasswordlessUser, RecipeFunctionOptions } from "supertokens-web-js/recipe/passwordless";
import { PasswordlessFlowType } from "supertokens-web-js/lib/build/recipe/passwordless/types";
import { UserType } from "supertokens-web-js/lib/build/recipe/authRecipeWithEmailVerification/types";

// This defines a new type by renaming a single K property to L and as optional
// If we upgrade to typescript 4.1> this could just keep the optionality of the original (with the as keyword)
type WithRenamedOptionalProp<T, K extends keyof T, L extends string> = Omit<T, K> & {
    [P in L]?: T[K];
};

export type ComponentOverrideMap = Omit<PasswordlessOverrideMap, "PasswordlessSignInUpHeader_Override"> &
    Omit<ThirdPartyOverrideMap, "ThirdPartySignUpFooter_Override" | "ThirdPartySignUpHeader_Override"> & {
        ThirdPartyPasswordlessHeader_Override?: ComponentOverride<typeof Header>;
    };

export type SignInUpFeatureConfigInput = WithRenamedOptionalProp<
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
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

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
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type GetRedirectionURLContext = PasswordlessGetRedirectionURLContext | ThirdPartyGetRedirectionURLContext;

export type PreAndPostAPIHookAction = ThirdPartyPreAndPostAPIHookAction | PasswordlessPreAndPostAPIHookAction;

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
        input:
            | { email: string; userContext: any; options?: RecipeFunctionOptions }
            | { phoneNumber: string; userContext: any; options?: RecipeFunctionOptions }
    ) => Promise<{
        status: "OK";
        deviceId: string;
        preAuthSessionId: string;
        flowType: PasswordlessFlowType;
        fetchResponse: Response;
    }>;

    resendCode: (input: {
        userContext: any;
        deviceId: string;
        preAuthSessionId: string;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }>;

    consumeCode: (
        input:
            | {
                  userInputCode: string;
                  deviceId: string;
                  preAuthSessionId: string;
                  userContext: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  preAuthSessionId: string;
                  linkCode: string;
                  userContext: any;
                  options?: RecipeFunctionOptions;
              }
    ) => Promise<
        | {
              status: "OK";
              createdUser: boolean;
              user: PasswordlessUser;
              fetchResponse: Response;
          }
        | {
              status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
              failedCodeInputAttemptCount: number;
              maximumCodeInputAttempts: number;
              fetchResponse: Response;
          }
        | { status: "RESTART_FLOW_ERROR"; fetchResponse: Response }
    >;

    getPasswordlessLinkCodeFromURL: (input: { userContext: any }) => string;

    getPasswordlessPreAuthSessionIdFromURL: (input: { userContext: any }) => string;

    doesPasswordlessUserEmailExist: (input: {
        email: string;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;

    doesPasswordlessUserPhoneNumberExist: (input: {
        phoneNumber: string;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;

    // getPasswordlessLoginAttemptInfo: () =>
    //     | Promise<
    //           | undefined
    //           | {
    //                 deviceId: string;
    //                 preAuthSessionId: string;
    //                 contactInfo: string;
    //                 contactMethod: "EMAIL" | "PHONE";
    //                 flowType: "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";
    //                 lastResend: number;
    //                 redirectToPath?: string;
    //             }
    //       >
    //     | {
    //           deviceId: string;
    //           preAuthSessionId: string;
    //           contactInfo: string;
    //           contactMethod: "EMAIL" | "PHONE";
    //           flowType: "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";
    //           lastResend: number;
    //           redirectToPath?: string;
    //       }
    //     | undefined;

    getPasswordlessLoginAttemptInfo: <CustomLoginAttemptInfoProperties>(input: { userContext: any }) =>
        | Promise<
              | undefined
              | ({
                    deviceId: string;
                    preAuthSessionId: string;
                    flowType: PasswordlessFlowType;
                } & CustomLoginAttemptInfoProperties)
          >
        | ({
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          } & CustomLoginAttemptInfoProperties)
        | undefined;

    // setPasswordlessLoginAttemptInfo: (input: {
    //     deviceId: string;
    //     preAuthSessionId: string;
    //     contactInfo: string;
    //     contactMethod: "EMAIL" | "PHONE";
    //     flowType: "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";
    //     lastResend: number;
    //     redirectToPath?: string;
    // }) => Promise<void> | void;

    setPasswordlessLoginAttemptInfo: <CustomStateProperties>(input: {
        attemptInfo: {
            deviceId: string;
            preAuthSessionId: string;
            flowType: PasswordlessFlowType;
        } & CustomStateProperties;
        userContext: any;
    }) => Promise<void> | void;

    clearPasswordlessLoginAttemptInfo: (input: { userContext: any }) => Promise<void> | void;

    getAuthorisationURLFromBackend: (input: {
        providerId: string;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;

    thirdPartySignInAndUp: (input: { userContext: any; options?: RecipeFunctionOptions }) => Promise<
        | {
              status: "OK";
              user: UserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    >;

    getStateAndOtherInfoFromStorage: <CustomStateProperties>(input: {
        userContext: any;
    }) => (StateObject & CustomStateProperties) | undefined;

    setStateAndOtherInfoToStorage: <CustomStateProperties>(input: {
        state: StateObject & CustomStateProperties;
        userContext: any;
    }) => void;

    getAuthorizationURLWithQueryParamsAndSetState: (input: {
        providerId: string;
        authorisationURL: string;
        userContext: any;
        providerClientId?: string;
        options?: RecipeFunctionOptions;
    }) => Promise<string>;

    generateStateToSendToOAuthProvider: (input: { userContext: any }) => string;

    verifyAndGetStateOrThrowError: <CustomStateProperties>(input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
        userContext: any;
    }) => Promise<StateObject & CustomStateProperties>;

    getAuthCodeFromURL: (input: { userContext: any }) => string;

    getAuthErrorFromURL: (input: { userContext: any }) => string | undefined;

    getAuthStateFromURL: (input: { userContext: any }) => string;
};
