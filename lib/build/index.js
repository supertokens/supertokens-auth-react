"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var sessionAuth = require("./session-shared.js");
var translationContext = require("./translationContext.js");
var jsxRuntime = require("react/jsx-runtime");
require("react");
require("./recipe.js");

const SuperTokensWrapper = (props) => {
    return jsxRuntime.jsx(
        sessionAuth.SessionAuthWrapper,
        Object.assign({}, props, { requireAuth: false, doRedirection: false })
    );
};

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
/*
 * API Wrapper exposed to user.
 */
class SuperTokensAPIWrapper {
    static init(config) {
        sessionAuth.SuperTokens.init(config);
    }
    static canHandleRoute() {
        return sessionAuth.SuperTokens.canHandleRoute();
    }
    static getRoutingComponent() {
        return sessionAuth.SuperTokens.getRoutingComponent();
    }
    static changeLanguage(language) {
        return sessionAuth.SuperTokens.getInstanceOrThrow().changeLanguage(language);
    }
    static loadTranslation(store) {
        return sessionAuth.SuperTokens.getInstanceOrThrow().loadTranslation(store);
    }
    static getSuperTokensRoutesForReactRouterDom(reactRouterDom) {
        return sessionAuth.SuperTokens.getSuperTokensRoutesForReactRouterDom(reactRouterDom);
    }
}
SuperTokensAPIWrapper.SuperTokensWrapper = SuperTokensWrapper;
SuperTokensAPIWrapper.redirectToAuth = (options) =>
    sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
        var _b;
        return sessionAuth.SuperTokens.getInstanceOrThrow().redirectToAuth(
            Object.assign(Object.assign({}, options), {
                redirectBack:
                    (_b = options === null || options === void 0 ? void 0 : options.redirectBack) !== null &&
                    _b !== void 0
                        ? _b
                        : true,
            })
        );
    });
SuperTokensAPIWrapper.useTranslation = translationContext.useTranslation;
SuperTokensAPIWrapper.useUserContext = sessionAuth.useUserContext;
const canHandleRoute = SuperTokensAPIWrapper.canHandleRoute;
const init = SuperTokensAPIWrapper.init;
const changeLanguage = SuperTokensAPIWrapper.changeLanguage;
const loadTranslation = SuperTokensAPIWrapper.loadTranslation;
const getRoutingComponent = SuperTokensAPIWrapper.getRoutingComponent;
const getSuperTokensRoutesForReactRouterDom = SuperTokensAPIWrapper.getSuperTokensRoutesForReactRouterDom;
const redirectToAuth = SuperTokensAPIWrapper.redirectToAuth;

exports.useUserContext = sessionAuth.useUserContext;
exports.useTranslation = translationContext.useTranslation;
exports.SuperTokensWrapper = SuperTokensWrapper;
exports.canHandleRoute = canHandleRoute;
exports.changeLanguage = changeLanguage;
exports.default = SuperTokensAPIWrapper;
exports.getRoutingComponent = getRoutingComponent;
exports.getSuperTokensRoutesForReactRouterDom = getSuperTokensRoutesForReactRouterDom;
exports.init = init;
exports.loadTranslation = loadTranslation;
exports.redirectToAuth = redirectToAuth;
//# sourceMappingURL=index.js.map
