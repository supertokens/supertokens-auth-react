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
    AuthRecipeModuleGetRedirectionURLContext,
    AuthRecipeModuleOnHandleEventContext,
    AuthRecipeModulePreAPIHookContext,
    AuthRecipeModuleUserInput,
    SignInAndUpState,
    User
} from "../authRecipeModule/types";
import { RecipeModuleConfig } from "../recipeModule/types";
import Provider from "./providers";
import { CustomProviderConfig } from "./providers/types";

export type ThirdPartyUserInput = AuthRecipeModuleUserInput<
    ThirdPartyGetRedirectionURLContext,
    ThirdPartyPreAPIHookContext,
    ThirdPartyOnHandleEventContext
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
    signInAndUpFeature: SignInAndUpFeatureUserInput;
};

export type ThirdPartyConfig = ThirdPartyUserInput &
    RecipeModuleConfig<ThirdPartyGetRedirectionURLContext, ThirdPartyPreAPIHookContext, ThirdPartyOnHandleEventContext>;

export type NormalisedThirdPartyConfig = {
    /*
     * Sign In and Sign Up feature.
     */
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
};

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
    providers: (Provider | CustomProviderConfig)[];
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

export type ThirdPartyGetRedirectionURLContext = AuthRecipeModuleGetRedirectionURLContext;
export type ThirdPartyPreAPIHookContext =
    | AuthRecipeModulePreAPIHookContext
    | {
          /*
           * action
           */
          action: "GET_AUTHORISATION_URL";
      };

export type ThirdPartyOnHandleEventContext = AuthRecipeModuleOnHandleEventContext;

export type SignInAndUpThemeProps = {
    /*
     * Providers
     */
    providers: {
        /*
         * Provider Id
         */
        id: string;

        /*
         * Provider Button
         */
        buttonComponent: JSX.Element;
    }[];

    /*
     * Click on button.
     */
    signInAndUpClick: (id: string) => Promise<string | void>;

    /*
     * Privacy Policy Link.
     */
    privacyPolicyLink?: string;

    /*
     * Terms Of Service Link.
     */
    termsOfServiceLink?: string;

    /*
     * Initial status
     */
    status: "READY" | "LOADING" | "SUCCESSFUL" | "GENERAL_ERROR";
};

export type ThirdPartySignInAndUpThemeState =
    | {
          /*
           * Status
           */
          status: "READY" | "LOADING" | "SUCCESSFUL";
      }
    | {
          /*
           * Status
           */
          status: "GENERAL_ERROR";

          /*
           * Error Message
           */
          generalError: string;
      };

export type SignInAndUpAPIResponse =
    | {
          /*
           * Status.
           */
          status: "OK";

          /*
           * URL.
           */
          createdNewUser: boolean;

          /*
           * User
           */
          user: User;
      }
    | {
          status: "NO_EMAIL_GIVEN_BY_PROVIDER";
      };

export type AuthorisationURLAPIResponse = {
    /*
     * Status.
     */
    status: "OK";

    /*
     * URL.
     */
    url: string;
};

export type ThirdPartySignInAndUpState =
    | SignInAndUpState
    | {
          /*
           * Status.
           */
          status: "GENERAL_ERROR";
      };

export type StateObject = {
    /*
     * State, generated randomly
     */
    state: string;

    /*
     * ExpiresAt
     */
    expiresAt: number;

    /*
     * rid
     */
    rid: string;

    /*
     * Third Party Id
     */
    thirdPartyId: string;
};
