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
import { RecipeInterface } from "supertokens-web-js/recipe/session";
import SessionAuthWrapper from "./sessionAuth";
import useSessionContextFunc from "./useSessionContext";
import { InputType, SessionContextType } from "./types";
import SessionContext from "./sessionContext";
import { getNormalisedUserContext } from "../../utils";
import { ClaimValidationError, SessionClaimValidator } from "supertokens-website";

export default class SessionAPIWrapper {
    static useSessionContext = useSessionContextFunc;

    static SessionAuth = SessionAuthWrapper;

    static init(config?: InputType) {
        return Session.init(config);
    }

    static async getUserId(input?: { userContext?: any }): Promise<string> {
        return Session.getInstanceOrThrow().getUserId({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async getAccessTokenPayloadSecurely(input?: { userContext?: any }): Promise<any> {
        return Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async attemptRefreshingSession(): Promise<boolean> {
        return Session.getInstanceOrThrow().attemptRefreshingSession();
    }

    static async doesSessionExist(input?: { userContext?: any }): Promise<boolean> {
        return Session.getInstanceOrThrow().doesSessionExist({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static addAxiosInterceptors(axiosInstance: any, userContext?: any): void {
        return Session.addAxiosInterceptors(axiosInstance, getNormalisedUserContext(userContext));
    }

    static async signOut(input?: { userContext?: any }): Promise<void> {
        return Session.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static validateClaims(input: {
        overrideGlobalClaimValidators?: (
            globalClaimValidators: SessionClaimValidator[],
            userContext: any
        ) => SessionClaimValidator[];
        userContext: any;
    }): Promise<ClaimValidationError[]> | ClaimValidationError[] {
        return Session.getInstanceOrThrow().validateClaims(input);
    }

    static getInvalidClaimsFromResponse(input: {
        response: { data: any } | Response;
        userContext: any;
    }): Promise<ClaimValidationError[]> {
        return Session.getInstanceOrThrow().getInvalidClaimsFromResponse(input);
    }
}

const useSessionContext = SessionAPIWrapper.useSessionContext;
const SessionAuth = SessionAPIWrapper.SessionAuth;
const init = SessionAPIWrapper.init;
const getUserId = SessionAPIWrapper.getUserId;
const getAccessTokenPayloadSecurely = SessionAPIWrapper.getAccessTokenPayloadSecurely;
const attemptRefreshingSession = SessionAPIWrapper.attemptRefreshingSession;
const doesSessionExist = SessionAPIWrapper.doesSessionExist;
const addAxiosInterceptors = SessionAPIWrapper.addAxiosInterceptors;
const signOut = SessionAPIWrapper.signOut;
const validateClaims = SessionAPIWrapper.validateClaims;
const getInvalidClaimsFromResponse = SessionAPIWrapper.getInvalidClaimsFromResponse;

export {
    useSessionContext,
    SessionAuth,
    init,
    getUserId,
    getAccessTokenPayloadSecurely,
    attemptRefreshingSession,
    doesSessionExist,
    addAxiosInterceptors,
    signOut,
    validateClaims,
    getInvalidClaimsFromResponse,
    RecipeInterface,
    InputType,
    SessionContext,
    SessionContextType,
};
