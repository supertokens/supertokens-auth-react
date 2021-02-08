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
import { EmailVerificationUserInput, NormalisedEmailVerificationConfig } from "../emailverification/types";
import { RecipeModuleConfig, RecipeModuleHooks } from "../recipeModule/types";

/*
 * Types.
 */
export type User = {
    /*
     * User id.
     */
    id: string;

    /*
     * User email.
     */
    email: string;
};

export type AuthRecipeModuleConfig<T, S, R> = AuthRecipeModuleUserInput<T, S, R> & RecipeModuleConfig<T, S, R>;

export type AuthRecipeModuleUserInput<T, S, R> = RecipeModuleHooks<T, S, R> & {
    /*
     * Use shadow Dom root.
     */
    useShadowDom?: boolean;

    /*
     * Styling palette.
     */
    palette?: Record<string, string>;

    /*
     * Email Verification configs.
     */
    emailVerificationFeature?: EmailVerificationUserInput;
};

export type NormalisedAuthRecipeConfig = {
    /*
     * Use shadow Dom root.
     */
    useShadowDom: boolean;

    /*
     * Styling palette.
     */
    palette: Record<string, string>;

    /*
     * Normalised Email Verification configs.
     */
    emailVerificationFeature: NormalisedEmailVerificationConfig;
};

export type AuthRecipeModuleGetRedirectionURLContext =
    | {
          /*
           * Get Redirection URL Context
           */
          action: "SUCCESS";

          /*
           * Redirect To Path represents the intended path the user wanted to access.
           */
          redirectToPath?: string;
      }
    | {
          /*
           * Get Redirection URL Context
           */
          action: "SIGN_IN_AND_UP" | "VERIFY_EMAIL";
      };

export type AuthRecipeModulePreAPIHookContext = {
    /*
     * Pre API Hook action.
     */
    action: "VERIFY_EMAIL" | "SEND_VERIFY_EMAIL" | "IS_EMAIL_VERIFIED" | "SIGN_OUT";

    /*
     * Request object containing query params, body, headers.
     */
    requestInit: RequestInit;
};

export type AuthRecipeModuleOnHandleEventContext =
    | {
          /*
           * On Handle Event actions
           */
          action: "SESSION_ALREADY_EXISTS" | "VERIFY_EMAIL_SENT" | "EMAIL_VERIFIED_SUCCESSFUL";
      }
    | {
          /*
           * Sign In success.
           */
          action: "SIGN_IN_COMPLETE";
          /*
           * User returned from API.
           */
          user: { id: string; email: string };
      };

export type SignInAndUpState =
    | {
          status: "LOADING" | "READY";
      }
    | {
          status: "SUCCESSFUL";
          user: User;
      };
