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

import { FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import {
    GetRedirectionURLContext as AuthRecipeModuleGetRedirectionURLContext,
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    PreAPIHookContext as AuthRecipeModulePreAPIHookContext,
    User,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
    UserInputOverride as AuthRecipeUserInputOverride,
} from "../authRecipeModule/types";
import Provider from "./providers";
import { CustomProviderConfig } from "./providers/types";

import { ComponentOverride } from "../../components/componentOverride/componentOverride";
import { ProvidersForm } from "./components/themes/signInAndUp/providersForm";
import { SignUpFooter } from "./components/themes/signInAndUp/signUpFooter";
import { SignInAndUpCallbackTheme } from "./components/themes/signInAndUpCallback";

export type ComponentOverrideMap = {
    ThirdPartySignUpFooter?: ComponentOverride<typeof SignUpFooter>;
    ThirdPartySignInAndUpProvidersForm?: ComponentOverride<typeof ProvidersForm>;
    ThirdPartySignInAndUpCallbackTheme?: ComponentOverride<typeof SignInAndUpCallbackTheme>;
};

export type UserInput = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    override?: {
        functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
        components?: ComponentOverrideMap;
    } & AuthRecipeUserInputOverride;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;

export type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;

export type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    override: {
        functions: (originalImplementation: RecipeInterface) => RecipeInterface;
        components: ComponentOverrideMap;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;

export type SignInAndUpFeatureUserInput = FeatureBaseConfig & {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation?: boolean;

    /*
     * Privacy policy link for sign up form.
     */
    privacyPolicyLink?: string;

    /*
     * Terms and conditions link for sign up form.
     */
    termsOfServiceLink?: string;

    /*
     * Providers
     */
    providers?: (Provider | CustomProviderConfig)[];
};

export type NormalisedSignInAndUpFeatureConfig = NormalisedBaseConfig & {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation: boolean;

    /*
     * Privacy policy link for sign up form.
     */
    privacyPolicyLink?: string;

    /*
     * Terms and conditions link for sign up form.
     */
    termsOfServiceLink?: string;

    /*
     * Providers
     */
    providers: Provider[];
};

export type GetRedirectionURLContext = AuthRecipeModuleGetRedirectionURLContext;

export type PreAPIHookContext =
    | AuthRecipeModulePreAPIHookContext
    | {
          action: "GET_AUTHORISATION_URL";
          requestInit: RequestInit;
          url: string;
      }
    | {
          action: "THIRD_PARTY_SIGN_IN_UP";
          requestInit: RequestInit;
          url: string;
      };

export type OnHandleEventContext = AuthRecipeModuleOnHandleEventContext;

export type SignInAndUpThemeProps = {
    providers: {
        id: string;
        buttonComponent: JSX.Element;
    }[];
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    error: string | undefined;
};

export type ThirdPartySignInAndUpState = {
    status: "LOADING" | "READY";
    error?: string;
};

export type StateObject = {
    state?: string;
    rid?: string;
    thirdPartyId?: string;
    redirectToPath?: string;
};

export interface RecipeInterface {
    getOAuthState(): StateObject | undefined;

    setOAuthState(state: StateObject): void;

    redirectToThirdPartyLogin: (input: {
        thirdPartyId: string;
        config: NormalisedConfig;
        state?: StateObject;
    }) => Promise<{ status: "OK" | "ERROR" }>;

    getOAuthAuthorisationURL: (input: { thirdPartyId: string; config: NormalisedConfig }) => Promise<string>;

    signInAndUp: (input: { thirdPartyId: string; config: NormalisedConfig }) => Promise<
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
}
