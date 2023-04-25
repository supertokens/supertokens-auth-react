"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var superTokens = require("./superTokens.js");
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
require("./genericComponentOverrideContext.js");
require("react/jsx-runtime");
require("supertokens-web-js/recipe/passwordless");
require("./authRecipe-shared.js");
require("./session-shared2.js");
require("supertokens-web-js/recipe/session");
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
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().signOut({
                        userContext: superTokens.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.createCode = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.createCode(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            recipeImplementation: recipe.Passwordless.getInstanceOrThrow().webJSRecipe,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.resendCode = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.resendCode(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            recipeImplementation: recipe.Passwordless.getInstanceOrThrow().webJSRecipe,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.consumeCode = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.consumeCode(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            recipeImplementation: recipe.Passwordless.getInstanceOrThrow().webJSRecipe,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getLinkCodeFromURL = function (input) {
        return recipe.Passwordless.getInstanceOrThrow().webJSRecipe.getLinkCodeFromURL(
            superTokens.__assign(superTokens.__assign({}, input), {
                userContext: superTokens.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getPreAuthSessionIdFromURL = function (input) {
        return recipe.Passwordless.getInstanceOrThrow().webJSRecipe.getPreAuthSessionIdFromURL(
            superTokens.__assign(superTokens.__assign({}, input), {
                userContext: superTokens.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.doesEmailExist = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().webJSRecipe.doesEmailExist(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.doesPhoneNumberExist = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().webJSRecipe.doesPhoneNumberExist(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getLoginAttemptInfo = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().webJSRecipe.getLoginAttemptInfo(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.setLoginAttemptInfo = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().webJSRecipe.setLoginAttemptInfo(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.clearLoginAttemptInfo = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().webJSRecipe.clearLoginAttemptInfo(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(
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
