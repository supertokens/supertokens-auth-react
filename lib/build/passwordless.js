"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var session = require("./session-shared.js");
var recipe = require("./passwordless-shared.js");
require("react/jsx-runtime");
require("react");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/utils/normalisedURLPath");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/lib/build/normalisedURLPath");
require("supertokens-web-js/recipe/session/recipe");
require("react-dom");
require("supertokens-web-js/recipe/session");
require("supertokens-web-js/utils");
require("./index2.js");
require("./authRecipe-shared.js");
require("supertokens-web-js/utils/error");
require("supertokens-web-js/recipe/passwordless/utils");
require("./spinnerIcon.js");
require("./emailpassword-shared.js");
require("./index.js");
require("./checkedRoundIcon.js");
require("./emailpassword-shared3.js");
require("supertokens-web-js/recipe/passwordless/recipeImplementation");

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
        return session.__awaiter(this, void 0, void 0, function () {
            return session.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().signOut({
                        userContext: session.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.createCode = function (input) {
        return session.__awaiter(this, void 0, void 0, function () {
            return session.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.createCode(
                        session.__assign(session.__assign({}, input), {
                            recipeImplementation: recipe.Passwordless.getInstanceOrThrow().recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.resendCode = function (input) {
        return session.__awaiter(this, void 0, void 0, function () {
            return session.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.resendCode(
                        session.__assign(session.__assign({}, input), {
                            recipeImplementation: recipe.Passwordless.getInstanceOrThrow().recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.consumeCode = function (input) {
        return session.__awaiter(this, void 0, void 0, function () {
            return session.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.consumeCode(
                        session.__assign(session.__assign({}, input), {
                            recipeImplementation: recipe.Passwordless.getInstanceOrThrow().recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getLinkCodeFromURL = function (input) {
        return recipe.Passwordless.getInstanceOrThrow().recipeImpl.getLinkCodeFromURL(
            session.__assign(session.__assign({}, input), {
                userContext: session.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getPreAuthSessionIdFromURL = function (input) {
        return recipe.Passwordless.getInstanceOrThrow().recipeImpl.getPreAuthSessionIdFromURL(
            session.__assign(session.__assign({}, input), {
                userContext: session.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.doesEmailExist = function (input) {
        return session.__awaiter(this, void 0, void 0, function () {
            return session.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().recipeImpl.doesEmailExist(
                        session.__assign(session.__assign({}, input), {
                            userContext: session.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.doesPhoneNumberExist = function (input) {
        return session.__awaiter(this, void 0, void 0, function () {
            return session.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().recipeImpl.doesPhoneNumberExist(
                        session.__assign(session.__assign({}, input), {
                            userContext: session.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getLoginAttemptInfo = function (input) {
        return session.__awaiter(this, void 0, void 0, function () {
            return session.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().recipeImpl.getLoginAttemptInfo(
                        session.__assign(session.__assign({}, input), {
                            userContext: session.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.setLoginAttemptInfo = function (input) {
        return session.__awaiter(this, void 0, void 0, function () {
            return session.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().recipeImpl.setLoginAttemptInfo(
                        session.__assign(session.__assign({}, input), {
                            userContext: session.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.clearLoginAttemptInfo = function (input) {
        return session.__awaiter(this, void 0, void 0, function () {
            return session.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Passwordless.getInstanceOrThrow().recipeImpl.clearLoginAttemptInfo(
                        session.__assign(session.__assign({}, input), {
                            userContext: session.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.SignInUp = function (prop) {
        if (prop === void 0) {
            prop = {};
        }
        return recipe.Passwordless.getInstanceOrThrow().getFeatureComponent("signInUp", prop);
    };
    Wrapper.SignInUpTheme = recipe.SignInUpThemeWrapper;
    Wrapper.LinkClicked = function (prop) {
        return recipe.Passwordless.getInstanceOrThrow().getFeatureComponent("linkClickedScreen", prop);
    };
    Wrapper.ComponentsOverrideProvider = recipe.Provider;
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
var SignInUp = Wrapper.SignInUp;
var SignInUpTheme = Wrapper.SignInUpTheme;
var LinkClicked = Wrapper.LinkClicked;
var PasswordlessComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

exports.LinkClicked = LinkClicked;
exports.PasswordlessComponentsOverrideProvider = PasswordlessComponentsOverrideProvider;
exports.SignInUp = SignInUp;
exports.SignInUpTheme = SignInUpTheme;
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
