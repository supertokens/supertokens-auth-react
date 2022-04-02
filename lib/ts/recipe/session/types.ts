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

import { RecipeInterface } from "supertokens-website";
import OverrideableBuilder from "supertokens-js-override";
import { Awaitable } from "../../types";

export type RecipeEvent =
    | {
          action: "SIGN_OUT" | "REFRESH_SESSION" | "SESSION_CREATED" | "TOKEN_UPDATED";
      }
    | {
          action: "UNAUTHORISED";
          sessionExpiredOrRevoked: boolean;
      }
    | {
          action: "MISSING_CLAIM";
          claimId: string;
      };

export type RecipeEventWithSessionContext = RecipeEvent & { sessionContext: SessionContextType };

export type InputType = {
    apiDomain?: string;
    apiBasePath?: string;
    sessionScope?: string;
    sessionExpiredStatusCode?: number;
    autoAddCredentials?: boolean;
    isInIframe?: boolean;
    cookieDomain?: string;
    preAPIHook?: (context: {
        action: "SIGN_OUT" | "REFRESH_SESSION";
        requestInit: RequestInit;
        url: string;
    }) => Promise<{ url: string; requestInit: RequestInit }>;
    onHandleEvent?: (event: RecipeEvent) => void;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};

export type SessionContextType = {
    doesSessionExist: boolean;
    userId: string;
    accessTokenPayload: any;
};

export abstract class SessionClaim<T> {
    constructor(public readonly id: string) {}

    /**
     * Makes an API call that will refresh the claim in the token.
     */
    abstract refresh(userContext: any): Awaitable<T | undefined>;

    /**
     * Decides if we need to refresh the claim value before checking the payload with `isClaimValid`.
     * E.g.: if the information in the payload is expired, or is not sufficient for this check.
     */
    abstract shouldRefresh(accessTokenPayload: any, userContext: any): Awaitable<boolean>;

    /**
     * Decides if the claim is valid based on the accessTokenPayload object (and not checking DB or anything else)
     */
    abstract isValid(accessTokenPayload: any, userContext: any): Awaitable<boolean>;
}
