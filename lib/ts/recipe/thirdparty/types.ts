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
    PreAndPostAPIHookAction as AuthRecipePreAndPostAPIHookAction,
    User,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
    UserInputOverride as AuthRecipeUserInputOverride,
} from "../authRecipeWithEmailVerification/types";
import Provider from "./providers";
import { CustomProviderConfig } from "./providers/types";

import { ComponentOverride } from "../../components/componentOverride/componentOverride";
import { ProvidersForm } from "./components/themes/signInAndUp/providersForm";
import { SignUpFooter } from "./components/themes/signInAndUp/signUpFooter";
import { SignInAndUpCallbackTheme } from "./components/themes/signInAndUpCallback";
import OverrideableBuilder from "supertokens-js-override";
import { StateObject as WebJsStateObject } from "supertokens-web-js/recipe/thirdparty";

export type ComponentOverrideMap = {
    ThirdPartySignUpFooter?: ComponentOverride<typeof SignUpFooter>;
    ThirdPartySignInAndUpProvidersForm?: ComponentOverride<typeof ProvidersForm>;
    ThirdPartySignInAndUpCallbackTheme?: ComponentOverride<typeof SignInAndUpCallbackTheme>;
};

export type UserInput = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    oAuthCallbackScreen?: FeatureBaseConfig;
    // TODO NEMI: Allow overriding of web-js functions that read from query
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
        components?: ComponentOverrideMap;
    } & AuthRecipeUserInputOverride;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookContext, OnHandleEventContext>;

export type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookContext, OnHandleEventContext>;

export type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    oAuthCallbackScreen: FeatureBaseConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
        components: ComponentOverrideMap;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookContext, OnHandleEventContext>;

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

export type PreAndPostAPIHookContext =
    | AuthRecipePreAndPostAPIHookAction
    | "GET_AUTHORISATION_URL"
    | "THIRD_PARTY_SIGN_IN_UP";

export type PreAPIHookContext = {
    action: PreAndPostAPIHookContext;
    requestInit: RequestInit;
    url: string;
    userContext: any;
};

export type OnHandleEventContext =
    | AuthRecipeModuleOnHandleEventContext
    | {
          action: "SUCCESS";
          isNewUser: boolean;
          user: { id: string; email: string };
      };

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
    error?: string;
};

export type StateObject = WebJsStateObject & {
    rid?: string;
};

export type RecipeInterface = {
    getStateAndOtherInfoFromStorage: (input: { userContext: any; config: NormalisedConfig }) => StateObject | undefined;

    setStateAndOtherInfoToStorage: (input: { state: StateObject; config: NormalisedConfig; userContext: any }) => void;

    redirectToThirdPartyLogin: (input: {
        thirdPartyId: string;
        config: NormalisedConfig;
        userContext: any;
    }) => Promise<{ status: "OK" | "ERROR" }>;

    getAuthorisationURLFromBackend: (input: {
        thirdPartyId: string;
        config: NormalisedConfig;
        userContext: any;
    }) => Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;

    signInAndUp: (input: { config: NormalisedConfig; userContext: any }) => Promise<
        | {
              status: "OK";
              user: User;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    >;

    generateStateToSendToOAuthProvider: (input: { userContext: any; config: NormalisedConfig }) => string;

    verifyAndGetStateOrThrowError: (input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: StateObject | undefined;
        config: NormalisedConfig;
        userContext: any;
    }) => Promise<StateObject>;

    getAuthCodeFromURL: (input: { config: NormalisedConfig; userContext: any }) => string;

    getAuthErrorFromURL: (input: { config: NormalisedConfig; userContext: any }) => string | undefined;
};
