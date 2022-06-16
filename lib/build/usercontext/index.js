"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserContextProvider = exports.useUserContext = exports.UserContextContext = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
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
var react_1 = tslib_1.__importStar(require("react"));
var utils_1 = require("../utils");
exports.UserContextContext = react_1.default.createContext(undefined);
var useUserContext = function () {
    return react_1.default.useContext(exports.UserContextContext);
};
exports.useUserContext = useUserContext;
var UserContextProvider = function (_a) {
    var children = _a.children,
        userContext = _a.userContext;
    var currentUserContext = (0, react_1.useState)((0, utils_1.getNormalisedUserContext)(userContext))[0];
    return (0, jsx_runtime_1.jsx)(
        exports.UserContextContext.Provider,
        tslib_1.__assign({ value: currentUserContext }, { children: children })
    );
};
exports.UserContextProvider = UserContextProvider;
