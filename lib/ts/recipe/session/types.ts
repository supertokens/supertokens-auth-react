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

import type { ClaimValidationError } from "supertokens-web-js/recipe/session";
import type { UserInput as WebJSInputType, RecipeEvent } from "supertokens-web-js/recipe/session/types";

export type RecipeEventWithSessionContext = RecipeEvent & { sessionContext: SessionContextUpdate };

export type InputType = WebJSInputType & {
    onHandleEvent?: (event: RecipeEventWithSessionContext) => void;
};

export type SessionContextUpdate = {
    doesSessionExist: boolean;
    userId: string;
    accessTokenPayload: any;
};

export type LoadedSessionContext = {
    loading: false;
    invalidClaims: ClaimValidationError[];
} & SessionContextUpdate;

export type SessionContextType =
    | LoadedSessionContext
    | {
          loading: true;
      };
