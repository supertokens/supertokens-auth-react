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

import Session from "./recipe";
import { RecipeInterface } from "supertokens-website";
import SessionAuthWrapper from "./sessionAuth";
import useSessionContextFunc from "./useSessionContext";
import { InputType } from "./types";
import SessionContext from "./sessionContext";

export default class SessionAPIWrapper {
    static useSessionContext = useSessionContextFunc;

    static SessionAuth = SessionAuthWrapper;

    static init(config?: InputType) {
        return Session.init(config);
    }

    static getUserId(): Promise<string> {
        return Session.getInstanceOrThrow().getUserId();
    }

    static async getJWTPayloadSecurely(): Promise<any> {
        return Session.getInstanceOrThrow().getJWTPayloadSecurely();
    }

    static async attemptRefreshingSession(): Promise<boolean> {
        return Session.getInstanceOrThrow().attemptRefreshingSession();
    }

    static doesSessionExist(): Promise<boolean> {
        return Session.getInstanceOrThrow().doesSessionExist();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static addAxiosInterceptors(axiosInstance: any): void {
        return Session.addAxiosInterceptors(axiosInstance);
    }

    static signOut(): Promise<void> {
        return Session.getInstanceOrThrow().signOut();
    }
}

const useSessionContext = SessionAPIWrapper.useSessionContext;
const SessionAuth = SessionAPIWrapper.SessionAuth;
const init = SessionAPIWrapper.init;
const getUserId = SessionAPIWrapper.getUserId;
const getJWTPayloadSecurely = SessionAPIWrapper.getJWTPayloadSecurely;
const attemptRefreshingSession = SessionAPIWrapper.attemptRefreshingSession;
const doesSessionExist = SessionAPIWrapper.doesSessionExist;
const addAxiosInterceptors = SessionAPIWrapper.addAxiosInterceptors;
const signOut = SessionAPIWrapper.signOut;

export {
    useSessionContext,
    SessionAuth,
    init,
    getUserId,
    getJWTPayloadSecurely,
    attemptRefreshingSession,
    doesSessionExist,
    addAxiosInterceptors,
    signOut,
    RecipeInterface,
    InputType,
    SessionContext,
};
