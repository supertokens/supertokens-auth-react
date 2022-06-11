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
var tslib_1 = require("tslib");
/*
 * Imports.
 */
var React = tslib_1.__importStar(require("react"));
var react_1 = require("react");
var recipe_1 = tslib_1.__importDefault(require("./recipe"));
var sessionAuth_1 = tslib_1.__importDefault(require("../session/sessionAuth"));
var emailVerificationAuth_1 = tslib_1.__importDefault(require("../emailverification/emailVerificationAuth"));
var superTokens_1 = tslib_1.__importDefault(require("../../superTokens"));
var userContextWrapper_1 = tslib_1.__importDefault(require("../../usercontext/userContextWrapper"));
function ThirdPartyPasswordlessAuth(props) {
    var emailVerification = React.createElement(
        emailVerificationAuth_1.default,
        { recipe: props.recipe.emailVerification, history: props.history },
        props.children
    );
    if (props.requireAuth === false) {
        return React.createElement(
            sessionAuth_1.default,
            { onSessionExpired: props.onSessionExpired },
            emailVerification
        );
    }
    return React.createElement(
        sessionAuth_1.default,
        {
            redirectToLogin: function () {
                void recipe_1.default.getInstanceOrThrow().redirectToAuthWithRedirectToPath(undefined, props.history);
            },
            requireAuth: true,
            onSessionExpired: props.onSessionExpired,
        },
        emailVerification
    );
}
var ThirdPartyPasswordlessAuthMemo = react_1.memo(ThirdPartyPasswordlessAuth);
var ThirdPartyPasswordlessAuthWrapper = function (_a) {
    var children = _a.children,
        requireAuth = _a.requireAuth,
        onSessionExpired = _a.onSessionExpired,
        userContext = _a.userContext;
    var routerInfo = superTokens_1.default.getInstanceOrThrow().getReactRouterDomWithCustomHistory();
    var history = routerInfo === undefined ? undefined : routerInfo.useHistoryCustom();
    return React.createElement(
        userContextWrapper_1.default,
        { userContext: userContext },
        React.createElement(
            ThirdPartyPasswordlessAuthMemo,
            {
                history: history,
                onSessionExpired: onSessionExpired,
                requireAuth: requireAuth,
                recipe: recipe_1.default.getInstanceOrThrow(),
            },
            children
        )
    );
};
exports.default = ThirdPartyPasswordlessAuthWrapper;
