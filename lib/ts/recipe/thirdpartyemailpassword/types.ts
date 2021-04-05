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
import { AuthRecipeModuleUserInput } from "../authRecipeModule/types";
import {
    EmailPasswordGetRedirectionURLContext,
    EmailPasswordOnHandleEventContext,
    EmailPasswordPreAPIHookContext,
} from "../emailpassword";
import {
    NormalisedResetPasswordUsingTokenFeatureConfig,
    NormalisedSignInFormFeatureConfig,
    NormalisedSignUpFormFeatureConfig,
    ResetPasswordUsingTokenUserInput,
    SignInFormFeatureUserInput,
    SignUpFormFeatureUserInput,
} from "../emailpassword/types";
import { RecipeModuleConfig } from "../recipeModule/types";
import {
    ThirdPartyGetRedirectionURLContext,
    ThirdPartyOnHandleEventContext,
    ThirdPartyPreAPIHookContext,
} from "../thirdparty";
import Provider from "../thirdparty/providers";
import { CustomProviderConfig } from "../thirdparty/providers/types";

/*
 * Types.
 */
export type ThirdPartyEmailPasswordUserInput = AuthRecipeModuleUserInput<
    ThirdPartyEmailPasswordGetRedirectionURLContext,
    ThirdPartyEmailPasswordPreAPIHookContext,
    ThirdPartyEmailPasswordOnHandleEventContext
> & {
    /*
     * Styling palette.
     */
    palette?: Record<string, string>;

    /*
     * Use shadow Dom root.
     */
    useShadowDom?: boolean;

    /*
     * Sign In and Sign Up feature.
     */
    signInAndUpFeature?: SignInAndUpFeatureUserInput;

    /*
     * Reset password Using Token feature.
     */
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;

    /*
     * Disable Email Password.
     */
    disableEmailPassword?: boolean;
};

export type ThirdPartyEmailPasswordConfig = ThirdPartyEmailPasswordUserInput &
    RecipeModuleConfig<
        ThirdPartyEmailPasswordGetRedirectionURLContext,
        ThirdPartyEmailPasswordPreAPIHookContext,
        ThirdPartyEmailPasswordOnHandleEventContext
    >;

export type NormalisedThirdPartyEmailPasswordConfig = {
    /*
     * Sign In and Sign Up feature.
     */
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;

    /*
     * Reset password Using Token feature.
     */
    resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig;

    /*
     * Disable Email Password.
     */
    disableEmailPassword: boolean;
};

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

export type ThirdPartyEmailPasswordGetRedirectionURLContext =
    | EmailPasswordGetRedirectionURLContext
    | ThirdPartyGetRedirectionURLContext;

export type ThirdPartyEmailPasswordPreAPIHookContext = EmailPasswordPreAPIHookContext | ThirdPartyPreAPIHookContext;

export type ThirdPartyEmailPasswordOnHandleEventContext =
    | ThirdPartyOnHandleEventContext
    | EmailPasswordOnHandleEventContext;

export type ThirdPartyEmailPasswordSignInAndUpThemeProps = {
    /*
     * RecipeId
     */
    recipeId: string;

    /*
     * History provided by react-router
     */
    history?: any;

    /*
     * Default To Sign Up
     */
    defaultToSignUp: boolean;

    /*
     * hideThirdParty
     */
    hideThirdParty?: boolean;

    /*
     * hideEmailPassword
     */
    hideEmailPassword?: boolean;

    /*
     * Raw Palette
     */
    rawPalette: Record<string, string>;

    /*
     * StyleFromInit
     */
    styleFromInit: Styles;
};
