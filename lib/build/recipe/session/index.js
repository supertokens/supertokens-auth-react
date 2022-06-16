"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionContext =
    exports.signOut =
    exports.addAxiosInterceptors =
    exports.doesSessionExist =
    exports.attemptRefreshingSession =
    exports.getAccessTokenPayloadSecurely =
    exports.getUserId =
    exports.init =
    exports.SessionAuth =
    exports.useSessionContext =
        void 0;
var tslib_1 = require("tslib");
var recipe_1 = tslib_1.__importDefault(require("./recipe"));
var sessionAuth_1 = tslib_1.__importDefault(require("./sessionAuth"));
var useSessionContext_1 = tslib_1.__importDefault(require("./useSessionContext"));
var sessionContext_1 = tslib_1.__importDefault(require("./sessionContext"));
exports.SessionContext = sessionContext_1.default;
var utils_1 = require("../../utils");
var SessionAPIWrapper = /** @class */ (function () {
    function SessionAPIWrapper() {}
    SessionAPIWrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    SessionAPIWrapper.getUserId = function (input) {
        return recipe_1.default.getInstanceOrThrow().getUserId({
            userContext: (0, utils_1.getNormalisedUserContext)(
                input === null || input === void 0 ? void 0 : input.userContext
            ),
        });
    };
    SessionAPIWrapper.getAccessTokenPayloadSecurely = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                        userContext: (0, utils_1.getNormalisedUserContext)(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    SessionAPIWrapper.attemptRefreshingSession = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, recipe_1.default.getInstanceOrThrow().attemptRefreshingSession()];
            });
        });
    };
    SessionAPIWrapper.doesSessionExist = function (input) {
        return recipe_1.default.getInstanceOrThrow().doesSessionExist({
            userContext: (0, utils_1.getNormalisedUserContext)(
                input === null || input === void 0 ? void 0 : input.userContext
            ),
        });
    };
    SessionAPIWrapper.addAxiosInterceptors = function (axiosInstance, userContext) {
        return recipe_1.default.addAxiosInterceptors(axiosInstance, (0, utils_1.getNormalisedUserContext)(userContext));
    };
    SessionAPIWrapper.signOut = function (input) {
        return recipe_1.default.getInstanceOrThrow().signOut({
            userContext: (0, utils_1.getNormalisedUserContext)(
                input === null || input === void 0 ? void 0 : input.userContext
            ),
        });
    };
    SessionAPIWrapper.useSessionContext = useSessionContext_1.default;
    SessionAPIWrapper.SessionAuth = sessionAuth_1.default;
    return SessionAPIWrapper;
})();
exports.default = SessionAPIWrapper;
var useSessionContext = SessionAPIWrapper.useSessionContext;
exports.useSessionContext = useSessionContext;
var SessionAuth = SessionAPIWrapper.SessionAuth;
exports.SessionAuth = SessionAuth;
var init = SessionAPIWrapper.init;
exports.init = init;
var getUserId = SessionAPIWrapper.getUserId;
exports.getUserId = getUserId;
var getAccessTokenPayloadSecurely = SessionAPIWrapper.getAccessTokenPayloadSecurely;
exports.getAccessTokenPayloadSecurely = getAccessTokenPayloadSecurely;
var attemptRefreshingSession = SessionAPIWrapper.attemptRefreshingSession;
exports.attemptRefreshingSession = attemptRefreshingSession;
var doesSessionExist = SessionAPIWrapper.doesSessionExist;
exports.doesSessionExist = doesSessionExist;
var addAxiosInterceptors = SessionAPIWrapper.addAxiosInterceptors;
exports.addAxiosInterceptors = addAxiosInterceptors;
var signOut = SessionAPIWrapper.signOut;
exports.signOut = signOut;
