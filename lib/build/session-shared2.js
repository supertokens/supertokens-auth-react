"use strict";

var sessionAuth = require("./session-shared.js");
var index = require("./index2.js");
var React = require("react");
var recipe = require("./recipe.js");

var session = {};

/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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

(function (exports) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;
    __export(index.session);
})(session);

const useSessionContext$1 = () => {
    const ctx = React.useContext(sessionAuth.SessionContext);
    if (ctx.isDefault === true) {
        throw new Error("Cannot use useSessionContext outside auth wrapper components.");
    }
    return ctx;
};

const useClaimValue$1 = (claim) => {
    const ctx = useSessionContext$1();
    if (ctx.loading) {
        return {
            loading: true,
        };
    }
    if (ctx.doesSessionExist === false) {
        return {
            loading: false,
            doesSessionExist: false,
            value: undefined,
        };
    }
    return {
        loading: false,
        doesSessionExist: true,
        value: claim.getValueFromPayload(ctx.accessTokenPayload),
    };
};

var supertokensWebsiteExports = recipe.requireSupertokensWebsite();

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
class SessionAPIWrapper {
    static init(config) {
        return sessionAuth.Session.init(config);
    }
    static getUserId(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return sessionAuth.Session.getInstanceOrThrow().getUserId({
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            });
        });
    }
    static getAccessTokenPayloadSecurely(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return sessionAuth.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            });
        });
    }
    static attemptRefreshingSession() {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return sessionAuth.Session.getInstanceOrThrow().attemptRefreshingSession();
        });
    }
    static doesSessionExist(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return sessionAuth.Session.getInstanceOrThrow().doesSessionExist({
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            });
        });
    }
    /**
     * @deprecated
     */
    static addAxiosInterceptors(axiosInstance, userContext) {
        return sessionAuth.Session.addAxiosInterceptors(
            axiosInstance,
            sessionAuth.getNormalisedUserContext(userContext)
        );
    }
    static signOut(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return sessionAuth.Session.getInstanceOrThrow().signOut({
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            });
        });
    }
    static validateClaims(input) {
        return sessionAuth.Session.getInstanceOrThrow().validateClaims({
            overrideGlobalClaimValidators:
                input === null || input === void 0 ? void 0 : input.overrideGlobalClaimValidators,
            userContext: sessionAuth.getNormalisedUserContext(
                input === null || input === void 0 ? void 0 : input.userContext
            ),
        });
    }
    static getInvalidClaimsFromResponse(input) {
        return sessionAuth.Session.getInstanceOrThrow().getInvalidClaimsFromResponse(input);
    }
    static getClaimValue(input) {
        return sessionAuth.Session.getInstanceOrThrow().getClaimValue({
            claim: input.claim,
            userContext: sessionAuth.getNormalisedUserContext(
                input === null || input === void 0 ? void 0 : input.userContext
            ),
        });
    }
}
SessionAPIWrapper.useSessionContext = useSessionContext$1;
SessionAPIWrapper.useClaimValue = useClaimValue$1;
SessionAPIWrapper.SessionAuth = sessionAuth.SessionAuthWrapper;
const useSessionContext = SessionAPIWrapper.useSessionContext;
const useClaimValue = SessionAPIWrapper.useClaimValue;
const SessionAuth = SessionAPIWrapper.SessionAuth;
const init = SessionAPIWrapper.init;
const getUserId = SessionAPIWrapper.getUserId;
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

exports.SessionAPIWrapper = SessionAPIWrapper;
exports.SessionAuth = SessionAuth;
exports.addAxiosInterceptors = addAxiosInterceptors;
exports.attemptRefreshingSession = attemptRefreshingSession;
exports.doesSessionExist = doesSessionExist;
exports.getAccessTokenPayloadSecurely = getAccessTokenPayloadSecurely;
exports.getClaimValue = getClaimValue;
exports.getInvalidClaimsFromResponse = getInvalidClaimsFromResponse;
exports.getUserId = getUserId;
exports.init = init;
exports.session = session;
exports.signOut = signOut;
exports.supertokensWebsiteExports = supertokensWebsiteExports;
exports.useClaimValue = useClaimValue;
exports.useSessionContext = useSessionContext$1;
exports.useSessionContext$1 = useSessionContext;
exports.validateClaims = validateClaims;
//# sourceMappingURL=session-shared2.js.map
