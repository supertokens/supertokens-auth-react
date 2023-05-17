"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var uiEntry = require("./superTokens.js");
var jsxRuntime = require("react/jsx-runtime");
var sessionAuth = require("./session-shared.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("react");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("supertokens-web-js/lib/build/normalisedURLPath");
require("supertokens-web-js/recipe/thirdparty");
require("supertokens-web-js/recipe/session");
require("react-dom");
require("supertokens-web-js/utils");

var SuperTokensWrapper = function (props) {
    return jsxRuntime.jsx(
        sessionAuth.SessionAuthWrapper,
        uiEntry.__assign({}, props, { requireAuth: false, doRedirection: false, useDefaultAccessDeniedScreen: false })
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
var SuperTokensAPIWrapper = /** @class */ (function () {
    function SuperTokensAPIWrapper() {}
    SuperTokensAPIWrapper.init = function (config) {
        uiEntry.SuperTokens.init(config);
    };
    SuperTokensAPIWrapper.changeLanguage = function (language) {
        return uiEntry.SuperTokens.getInstanceOrThrow().changeLanguage(language);
    };
    SuperTokensAPIWrapper.loadTranslation = function (store) {
        return uiEntry.SuperTokens.getInstanceOrThrow().loadTranslation(store);
    };
    var _a;
    _a = SuperTokensAPIWrapper;
    SuperTokensAPIWrapper.SuperTokensWrapper = SuperTokensWrapper;
    SuperTokensAPIWrapper.redirectToAuth = function (options) {
        return uiEntry.__awaiter(void 0, void 0, void 0, function () {
            var _b;
            return uiEntry.__generator(_a, function (_c) {
                return [
                    2 /*return*/,
                    uiEntry.SuperTokens.getInstanceOrThrow().redirectToAuth(
                        uiEntry.__assign(uiEntry.__assign({}, options), {
                            redirectBack:
                                (_b = options === null || options === void 0 ? void 0 : options.redirectBack) !==
                                    null && _b !== void 0
                                    ? _b
                                    : true,
                        })
                    ),
                ];
            });
        });
    };
    SuperTokensAPIWrapper.useTranslation = uiEntry.useTranslation;
    SuperTokensAPIWrapper.useUserContext = uiEntry.useUserContext;
    return SuperTokensAPIWrapper;
})();
var init = SuperTokensAPIWrapper.init;
var changeLanguage = SuperTokensAPIWrapper.changeLanguage;
var loadTranslation = SuperTokensAPIWrapper.loadTranslation;
var redirectToAuth = SuperTokensAPIWrapper.redirectToAuth;

exports.useTranslation = uiEntry.useTranslation;
exports.useUserContext = uiEntry.useUserContext;
exports.SuperTokensWrapper = SuperTokensWrapper;
exports.changeLanguage = changeLanguage;
exports.default = SuperTokensAPIWrapper;
exports.init = init;
exports.loadTranslation = loadTranslation;
exports.redirectToAuth = redirectToAuth;
//# sourceMappingURL=index.js.map
