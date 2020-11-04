/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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
import { CreateRecipeFunction } from "../../types";

import Session from "./session";
import { SessionUserInput } from "./types";

/*
 * Class.
 */
export default class SessionAPIWrapper {
    static init(config: SessionUserInput): CreateRecipeFunction {
        return Session.init(config);
    }

    static getRefreshURLDomain(): string {
        return Session.getRefreshURLDomain();
    }

    static getUserId(): string {
        return Session.getUserId();
    }

    static async getJWTPayloadSecurely(): Promise<any> {
        return Session.getJWTPayloadSecurely();
    }

    static async attemptRefreshingSession(): Promise<boolean> {
        return Session.attemptRefreshingSession();
    }

    static doesSessionExist(): boolean {
        return Session.doesSessionExist();
    }
}
export const init = SessionAPIWrapper.init;
export const getRefreshURLDomain = SessionAPIWrapper.getRefreshURLDomain;
export const getUserId = SessionAPIWrapper.getUserId;
export const getJWTPayloadSecurely = SessionAPIWrapper.getJWTPayloadSecurely;
export const attemptRefreshingSession = SessionAPIWrapper.attemptRefreshingSession;
export const doesSessionExist = SessionAPIWrapper.doesSessionExist;

export { SessionAPIWrapper };
