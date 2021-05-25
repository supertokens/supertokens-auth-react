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
} from "../authRecipeModule/types";
import Provider from "./providers";
import { CustomProviderConfig } from "./providers/types";

export type UserInput = {
    signInAndUpFeature: SignInAndUpFeatureUserInput;
};

export type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;

export type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
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

export type GetRedirectionURLContext =
    | AuthRecipeModuleGetRedirectionURLContext
    | {
          /*
           * action
           */
          action: "GET_REDIRECT_URL";

          /*
           * Provider Id
           */
          provider: Provider;
      };

export type PreAPIHookContext =
    | AuthRecipeModulePreAPIHookContext
    | {
          /*
           * action
           */
          action: "GET_AUTHORISATION_URL";

          /*
           * Request object containing query params, body, headers.
           */
          requestInit: RequestInit;

          /*
           * URL
           */
          url: string;
      };

export type OnHandleEventContext = AuthRecipeModuleOnHandleEventContext;

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
} & (
    | {
          status: "READY" | "LOADING" | "SUCCESSFUL" | "GENERAL_ERROR";
      }
    | {
          status: "CUSTOM_ERROR";
          error: string;
      }
);

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
          status: "ERROR";

          /*
           * Error Message
           */
          message: string;
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
      }
    | {
          status: "FIELD_ERROR";
          error: string;
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
    | {
          status: "LOADING" | "READY" | "GENERAL_ERROR";
      }
    | {
          status: "SUCCESSFUL";
          user: User;
      }
    | {
          status: "CUSTOM_ERROR";
          error: string;
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

    redirectToPath: string | undefined;
};
