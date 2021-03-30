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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var superTokens_1 = __importDefault(require("./superTokens"));
/*
 * API Wrapper exposed to user.
 */
var SuperTokensAPIWrapper = /** @class */ (function () {
    function SuperTokensAPIWrapper() {}
    SuperTokensAPIWrapper.init = function (config) {
        superTokens_1.default.init(config);
    };
    SuperTokensAPIWrapper.canHandleRoute = function () {
        return superTokens_1.default.canHandleRoute();
    };
    SuperTokensAPIWrapper.getRoutingComponent = function () {
        return superTokens_1.default.getRoutingComponent();
    };
    SuperTokensAPIWrapper.getSuperTokensRoutesForReactRouterDom = function () {
        return superTokens_1.default.getSuperTokensRoutesForReactRouterDom();
    };
    return SuperTokensAPIWrapper;
})();
exports.default = SuperTokensAPIWrapper;
exports.canHandleRoute = SuperTokensAPIWrapper.canHandleRoute;
exports.init = SuperTokensAPIWrapper.init;
exports.getRoutingComponent = SuperTokensAPIWrapper.getRoutingComponent;
exports.getSuperTokensRoutesForReactRouterDom = superTokens_1.default.getSuperTokensRoutesForReactRouterDom;
//# sourceMappingURL=index.js.map
