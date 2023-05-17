"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var uiEntry = require("./superTokens.js");
var componentOverrideContext = require("./passwordless-shared.js");
var recipe = require("./passwordless-shared2.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("react");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("react/jsx-runtime");
require("supertokens-web-js/lib/build/normalisedURLPath");
require("supertokens-web-js/recipe/thirdparty");
require("supertokens-web-js/recipe/session");
require("react-dom");
require("supertokens-web-js/utils");
require("supertokens-web-js/recipe/passwordless");
require("supertokens-web-js/recipe/passwordless/utils");

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
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return recipe.Passwordless.init(config);
    };
    Wrapper.signOut = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().signOut({
                        userContext: uiEntry.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.createCode = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.createCode(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            recipeImplementation: recipe.Passwordless.getInstanceOrThrow().webJSRecipe,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.resendCode = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.resendCode(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            recipeImplementation: recipe.Passwordless.getInstanceOrThrow().webJSRecipe,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.consumeCode = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.consumeCode(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            recipeImplementation: recipe.Passwordless.getInstanceOrThrow().webJSRecipe,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getLinkCodeFromURL = function (input) {
        return recipe.Passwordless.getInstanceOrThrow().webJSRecipe.getLinkCodeFromURL(
            uiEntry.__assign(uiEntry.__assign({}, input), {
                userContext: uiEntry.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getPreAuthSessionIdFromURL = function (input) {
        return recipe.Passwordless.getInstanceOrThrow().webJSRecipe.getPreAuthSessionIdFromURL(
            uiEntry.__assign(uiEntry.__assign({}, input), {
                userContext: uiEntry.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.doesEmailExist = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().webJSRecipe.doesEmailExist(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.doesPhoneNumberExist = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().webJSRecipe.doesPhoneNumberExist(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getLoginAttemptInfo = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().webJSRecipe.getLoginAttemptInfo(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.setLoginAttemptInfo = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().webJSRecipe.setLoginAttemptInfo(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.clearLoginAttemptInfo = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().webJSRecipe.clearLoginAttemptInfo(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.ComponentsOverrideProvider = componentOverrideContext.Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var createCode = Wrapper.createCode;
var resendCode = Wrapper.resendCode;
var consumeCode = Wrapper.consumeCode;
var getLinkCodeFromURL = Wrapper.getLinkCodeFromURL;
var getPreAuthSessionIdFromURL = Wrapper.getPreAuthSessionIdFromURL;
var doesEmailExist = Wrapper.doesEmailExist;
var doesPhoneNumberExist = Wrapper.doesPhoneNumberExist;
var getLoginAttemptInfo = Wrapper.getLoginAttemptInfo;
var setLoginAttemptInfo = Wrapper.setLoginAttemptInfo;
var clearLoginAttemptInfo = Wrapper.clearLoginAttemptInfo;
var signOut = Wrapper.signOut;
var PasswordlessComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

exports.PasswordlessComponentsOverrideProvider = PasswordlessComponentsOverrideProvider;
exports.clearLoginAttemptInfo = clearLoginAttemptInfo;
exports.consumeCode = consumeCode;
exports.createCode = createCode;
exports.default = Wrapper;
exports.doesEmailExist = doesEmailExist;
exports.doesPhoneNumberExist = doesPhoneNumberExist;
exports.getLinkCodeFromURL = getLinkCodeFromURL;
exports.getLoginAttemptInfo = getLoginAttemptInfo;
exports.getPreAuthSessionIdFromURL = getPreAuthSessionIdFromURL;
exports.init = init;
exports.resendCode = resendCode;
exports.setLoginAttemptInfo = setLoginAttemptInfo;
exports.signOut = signOut;
//# sourceMappingURL=passwordless.js.map
