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

import { Config as RecipeModuleConfig } from "../recipeModule/types";
import RecipeImplementation from "./recipeImplementation";
import { PreAPIHookFunction } from "../../types";

/*
 * Session User InputsConfig Types.
 */

export type UserInput = {
    sessionScope?: string;
    refreshAPICustomHeaders?: any;
    signoutAPICustomHeaders?: any;
    sessionExpiredStatusCode?: number;
    autoAddCredentials?: boolean;
    isInIframe?: boolean;
    override?: {
        functions?: (originalImplementation: RecipeImplementation) => RecipeInterface;
    };
};

export type Config = UserInput & RecipeModuleConfig<unknown, unknown, unknown>;

export type SessionContextType = {
    doesSessionExist: boolean;
    userId: string;
    jwtPayload: any;
};

export interface RecipeInterface {
    getUserId(): Promise<string>;

    getJWTPayloadSecurely(): Promise<any>;

    doesSessionExist(): Promise<boolean>;

    signOut(): Promise<void>;

    saveSessionFromResponse: (context: { requestInit: RequestInit; url: string; response: Response }) => Promise<void>;

    attachSessionToRequest: PreAPIHookFunction;

    handleSessionExpiry: () => Promise<void>;
}
