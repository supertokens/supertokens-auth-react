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
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var React = __importStar(require("react"));
var react_1 = require("react");
var superTokens_1 = __importDefault(require("../../superTokens"));
var sessionAuth_1 = __importDefault(require("../session/sessionAuth"));
var recipe_1 = __importDefault(require("./recipe"));
function PasswordlessAuth(props) {
    if (props.requireAuth === false) {
        return React.createElement(sessionAuth_1.default, { onSessionExpired: props.onSessionExpired }, props.children);
    }
    return React.createElement(
        sessionAuth_1.default,
        {
            redirectToLogin: function () {
                return recipe_1.default.getInstanceOrThrow().redirectToAuthWithRedirectToPath(undefined, props.history);
            },
            requireAuth: true,
            onSessionExpired: props.onSessionExpired,
        },
        props.children
    );
}
var PasswordlessAuthMemo = react_1.memo(PasswordlessAuth);
function PasswordlessAuthWrapper(_a) {
    var children = _a.children,
        requireAuth = _a.requireAuth,
        onSessionExpired = _a.onSessionExpired;
    var routerInfo = superTokens_1.default.getInstanceOrThrow().getReactRouterDomWithCustomHistory();
    var history = routerInfo === undefined ? undefined : routerInfo.useHistoryCustom();
    return React.createElement(
        PasswordlessAuthMemo,
        {
            history: history,
            onSessionExpired: onSessionExpired,
            requireAuth: requireAuth,
            recipe: recipe_1.default.getInstanceOrThrow(),
        },
        children
    );
}
exports.default = PasswordlessAuthWrapper;
