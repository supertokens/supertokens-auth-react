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

import {
    BooleanClaim,
    ClaimValidationResult,
    PrimitiveArrayClaim,
    PrimitiveClaim,
    RecipeInterface,
    SessionClaim,
} from "supertokens-web-js/recipe/session";
import { ClaimValidationError, SessionClaimValidator } from "supertokens-web-js/recipe/session";

import { getNormalisedUserContext } from "../../utils";

import Session from "./recipe";
import SessionAuthWrapper from "./sessionAuth";
import SessionContext from "./sessionContext";
import { InputType, SessionContextType } from "./types";
import { useClaimValue as useClaimValueFunc } from "./useClaimValue";
import useSessionContextFunc from "./useSessionContext";

export default class SessionAPIWrapper {
    static useSessionContext = useSessionContextFunc;
    static useClaimValue = useClaimValueFunc;

    static SessionAuth = SessionAuthWrapper;

    static init(config?: InputType) {
        return Session.init(config);
    }

    static async getUserId(input?: { userContext?: any }): Promise<string> {
        return Session.getInstanceOrThrow().getUserId({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async getAccessToken(input?: { userContext?: any }): Promise<string | undefined> {
        return Session.getInstanceOrThrow().getAccessToken({
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

    /**
     * @deprecated
     */
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
        userContext?: any;
    }): Promise<ClaimValidationError[]> | ClaimValidationError[] {
        return Session.getInstanceOrThrow().validateClaims({
            overrideGlobalClaimValidators: input?.overrideGlobalClaimValidators,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getInvalidClaimsFromResponse(input: {
        response: { data: any } | Response;
        userContext: any;
    }): Promise<ClaimValidationError[]> {
        return Session.getInstanceOrThrow().getInvalidClaimsFromResponse(input);
    }

    static getClaimValue(input: { claim: SessionClaim<unknown>; userContext?: any }): Promise<unknown> {
        return Session.getInstanceOrThrow().getClaimValue({
            claim: input.claim,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }
}

const useSessionContext = SessionAPIWrapper.useSessionContext;
const useClaimValue = SessionAPIWrapper.useClaimValue;
const SessionAuth = SessionAPIWrapper.SessionAuth;
const init = SessionAPIWrapper.init;
const getUserId = SessionAPIWrapper.getUserId;
const getAccessToken = SessionAPIWrapper.getAccessToken;
const getAccessTokenPayloadSecurely = SessionAPIWrapper.getAccessTokenPayloadSecurely;
const attemptRefreshingSession = SessionAPIWrapper.attemptRefreshingSession;
const doesSessionExist = SessionAPIWrapper.doesSessionExist;
/**
 * @deprecated
 */
const addAxiosInterceptors = SessionAPIWrapper.addAxiosInterceptors;
const signOut = SessionAPIWrapper.signOut;
const validateClaims = SessionAPIWrapper.validateClaims;
const getInvalidClaimsFromResponse = SessionAPIWrapper.getInvalidClaimsFromResponse;
const getClaimValue = SessionAPIWrapper.getClaimValue;

export {
    useSessionContext,
    useClaimValue,
    SessionAuth,
    init,
    getUserId,
    getAccessToken,
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
    BooleanClaim,
    ClaimValidationError,
    ClaimValidationResult,
    PrimitiveArrayClaim,
    PrimitiveClaim,
    SessionClaimValidator,
    SessionClaim,
    getClaimValue,
};
