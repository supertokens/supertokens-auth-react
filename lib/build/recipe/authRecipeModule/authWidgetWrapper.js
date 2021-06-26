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
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var react_1 = __importStar(require("react"));
var session_1 = require("../session");
var utils_1 = require("../../utils");
/**
 * AuthWidgetWrapper shows the children component only if no session exists,
 * else it calls onSessionAlreadyExists
 */
var AuthWidgetWrapper = function (props) {
    return react_1.default.createElement(
        session_1.SessionAuth,
        {
            requireAuth: false,
            redirectToLogin: function () {
                return undefined;
            },
        },
        react_1.default.createElement(Redirector, __assign({}, props))
    );
};
var Redirector = function (props) {
    var sessionContext = react_1.useContext(session_1.SessionContext);
    var _a = react_1.useState(false),
        alwaysShow = _a[0],
        updateAlwaysShow = _a[1];
    react_1.useEffect(function () {
        // we want to do this just once, so we supply it an empty array.
        // if we supply it with props, sessionContext,
        // then once the user signs in, then this will route the
        // user to the dashboard, as opposed to the sign up / sign in functions.
        if (sessionContext.doesSessionExist) {
            if (props.onSessionAlreadyExists !== undefined) {
                props.onSessionAlreadyExists();
            } else {
                props.authRecipe.config.onHandleEvent({
                    action: "SESSION_ALREADY_EXISTS",
                });
                props.authRecipe.redirect(
                    {
                        action: "SUCCESS",
                        isNewUser: false,
                        redirectToPath: utils_1.getRedirectToPathFromURL(),
                    },
                    props.history
                );
            }
        } else {
            // this means even if a session exists, we will still show the children
            // cause the child component will take care of redirecting etc..
            updateAlwaysShow(true);
        }
    }, []);
    if (sessionContext.doesSessionExist && !alwaysShow) {
        return null;
    } else {
        return react_1.default.createElement(react_1.default.Fragment, null, props.children);
    }
};
exports.default = AuthWidgetWrapper;
//# sourceMappingURL=authWidgetWrapper.js.map
