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

import { RecipeModuleConfig } from "../recipeModule/types";

/*
 * Session User InputsConfig Types.
 */

export type SessionUserInput = {
    /*
     * Session scope defines the domain's range of the session.
     * Example: example.com, .example.com, api.example.com etc...
     */
    sessionScope?: string;

    /*
     * refreshAPICustomHeaders
     */
    refreshAPICustomHeaders?: any;

    /*
     * signoutAPICustomHeaders
     */
    signoutAPICustomHeaders?: any;

    /*
     * sessionExpiredStatusCode
     */
    sessionExpiredStatusCode?: number;

    /*
     * autoAddCredentials
     */
    autoAddCredentials?: boolean;

    isInIframe?: boolean;

    cookieDomain?: string;
};

export type SessionConfig = RecipeModuleConfig<unknown, unknown, unknown> & SessionUserInput;

export type SessionContextType = {
    doesSessionExist: boolean;
    userId: string;
    jwtPayload: any;
};
