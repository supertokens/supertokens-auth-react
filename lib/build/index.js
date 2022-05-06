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
var translationContext_1 = require("./translation/translationContext");
var superTokens_1 = __importDefault(require("./superTokens"));
var cookieHandler_1 = __importDefault(require("./cookieHandler"));
var windowHandler_1 = __importDefault(require("./windowHandler"));
/*
 * API Wrapper exposed to user.
 */
var SuperTokensAPIWrapper = /** @class */ (function () {
    function SuperTokensAPIWrapper() {}
    SuperTokensAPIWrapper.init = function (config) {
        cookieHandler_1.default.init(config.cookieHandler);
        windowHandler_1.default.init(config.windowHandler);
        superTokens_1.default.init(config);
    };
    SuperTokensAPIWrapper.canHandleRoute = function () {
        return superTokens_1.default.canHandleRoute();
    };
    SuperTokensAPIWrapper.getRoutingComponent = function () {
        return superTokens_1.default.getRoutingComponent();
    };
    SuperTokensAPIWrapper.changeLanguage = function (language) {
        return superTokens_1.default.getInstanceOrThrow().changeLanguage(language);
    };
    SuperTokensAPIWrapper.loadTranslation = function (store) {
        return superTokens_1.default.getInstanceOrThrow().loadTranslation(store);
    };
    SuperTokensAPIWrapper.getSuperTokensRoutesForReactRouterDom = function (reactRouterDom) {
        return superTokens_1.default.getSuperTokensRoutesForReactRouterDom(reactRouterDom);
    };
    SuperTokensAPIWrapper.useTranslation = translationContext_1.useTranslation;
    return SuperTokensAPIWrapper;
})();
exports.default = SuperTokensAPIWrapper;
exports.canHandleRoute = SuperTokensAPIWrapper.canHandleRoute;
exports.init = SuperTokensAPIWrapper.init;
exports.changeLanguage = SuperTokensAPIWrapper.changeLanguage;
exports.loadTranslation = SuperTokensAPIWrapper.loadTranslation;
exports.getRoutingComponent = SuperTokensAPIWrapper.getRoutingComponent;
exports.getSuperTokensRoutesForReactRouterDom = superTokens_1.default.getSuperTokensRoutesForReactRouterDom;
var translationContext_2 = require("./translation/translationContext");
exports.useTranslation = translationContext_2.useTranslation;
