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
import { FeatureBaseConfig, NormalisedBaseConfig, Styles } from "../../types";
import {
    GetRedirectionURLContext as EmailPasswordGetRedirectionURLContext,
    OnHandleEventContext as EmailPasswordOnHandleEventContext,
    PreAPIHookContext as EmailPasswordPreAPIHookContext,
} from "../emailpassword";
import {
    NormalisedResetPasswordUsingTokenFeatureConfig,
    NormalisedSignInFormFeatureConfig,
    NormalisedSignUpFormFeatureConfig,
    ResetPasswordUsingTokenUserInput,
    SignInFormFeatureUserInput,
    SignUpFormFeatureUserInput,
    NormalisedConfig as EPConfig,
} from "../emailpassword/types";
import {
    GetRedirectionURLContext as ThirdPartyGetRedirectionURLContext,
    OnHandleEventContext as ThirdPartyOnHandleEventContext,
    PreAPIHookContext as ThirdPartyPreAPIHookContext,
} from "../thirdparty";
import { NormalisedConfig as TPConfig, StateObject } from "../thirdparty/types";
import Provider from "../thirdparty/providers";
import { CustomProviderConfig } from "../thirdparty/providers/types";
import {
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
    User,
} from "../authRecipeModule/types";
import EPRecipe from "../emailpassword/recipe";
import TPRecipe from "../thirdparty/recipe";
import RecipeImplementation from "./recipeImplementation";

export type UserInput = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
    disableEmailPassword?: boolean;
    override?: {
        functions?: (originalImplementation: RecipeImplementation) => RecipeInterface;
    };
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;

export type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;

export type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig;
    disableEmailPassword: boolean;
    override: {
        functions: (originalImplementation: RecipeImplementation) => RecipeInterface;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;

export type SignInAndUpFeatureUserInput = FeatureBaseConfig & {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation?: boolean;

    /*
     * Should default to Sign up form.
     */
    defaultToSignUp?: boolean;

    /*
     * SignUp form config.
     */

    signUpForm?: SignUpFormFeatureUserInput;

    /*
     * SignIn form config.
     */

    signInForm?: SignInFormFeatureUserInput;

    /*
     * Providers
     */
    providers: (Provider | CustomProviderConfig)[];
};

export type NormalisedSignInAndUpFeatureConfig = NormalisedBaseConfig & {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation: boolean;

    /*
     * Providers
     */
    providers: Provider[];

    /*
     * Default to sign up form.
     */
    defaultToSignUp: boolean;

    /*
     * SignUp form config.
     */
    signUpForm: NormalisedSignUpFormFeatureConfig;

    /*
     * SignIn form config.
     */
    signInForm: NormalisedSignInFormFeatureConfig;
};

export type GetRedirectionURLContext = EmailPasswordGetRedirectionURLContext | ThirdPartyGetRedirectionURLContext;

export type PreAPIHookContext = EmailPasswordPreAPIHookContext | ThirdPartyPreAPIHookContext;

export type OnHandleEventContext = ThirdPartyOnHandleEventContext | EmailPasswordOnHandleEventContext;

export type ThirdPartyEmailPasswordSignInAndUpThemeProps = {
    history?: any;
    defaultToSignUp: boolean;
    hideThirdParty?: boolean;
    hideEmailPassword?: boolean;
    rawPalette: Record<string, string>;
    styleFromInit: Styles;
    emailPasswordRecipe: EPRecipe;
    thirdPartyRecipe: TPRecipe;
};

export type SignInAndUpInput =
    | {
          type: "emailpassword";
          isSignIn: boolean;
          formFields: {
              id: string;
              value: string;
          }[];
          config: EPConfig;
      }
    | {
          type: "thirdparty";
          thirdPartyId: string;
          config: TPConfig;
      };

export type SignInAndUpOutput =
    | {
          type: "emailpassword" | "thirdparty";
          status: "OK";
          user: User;
          createdNewUser: boolean;
      }
    | {
          type: "emailpassword";
          status: "FIELD_ERROR";
          formFields: {
              id: string;
              error: string;
          }[];
      }
    | {
          type: "emailpassword";
          status: "WRONG_CREDENTIALS_ERROR";
      }
    | {
          type: "thirdparty";
          status: "NO_EMAIL_GIVEN_BY_PROVIDER" | "GENERAL_ERROR";
      }
    | {
          type: "thirdparty";
          status: "FIELD_ERROR";
          error: string;
      };

export interface RecipeInterface {
    submitNewPassword: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        token: string;
        config: EPConfig;
    }) => Promise<
        | {
              status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
          }
    >;

    sendPasswordResetEmail: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: EPConfig;
    }) => Promise<
        | {
              status: "OK";
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
          }
    >;

    doesEmailExist: (input: { email: string; config: EPConfig }) => Promise<boolean>;

    getOAuthAuthorisationURL: (input: { thirdPartyId: string; config: TPConfig }) => Promise<string>;

    signInAndUp: (input: SignInAndUpInput) => Promise<SignInAndUpOutput>;

    getOAuthState(): StateObject | undefined;

    setOAuthState(state: StateObject): void;

    redirectToThirdPartyLogin: (input: {
        thirdPartyId: string;
        config: TPConfig;
        state?: StateObject;
    }) => Promise<{ status: "OK" | "ERROR" }>;
}
