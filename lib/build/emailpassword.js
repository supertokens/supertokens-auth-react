"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var assets = require("./assets.js");
var recipe = require("./emailpassword-shared2.js");
var authRecipe = require("./authRecipe-shared.js");
require("react/jsx-runtime");
require("./emailpassword-shared3.js");
require("react");
require("./emailpassword-shared.js");
require("./index.js");
require("./translationContext.js");
require("./querier.js");
require("react-dom");
require("./SuperTokensBranding.js");
require("./emailverification-shared.js");

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
        return recipe.EmailPassword.init(config);
    };
    Wrapper.signOut = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.EmailPassword.getInstanceOrThrow().signOut({
                        userContext: authRecipe.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.submitNewPassword = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.EmailPassword.getInstanceOrThrow().recipeImpl.submitNewPassword(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.sendPasswordResetEmail = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.EmailPassword.getInstanceOrThrow().recipeImpl.sendPasswordResetEmail(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.signUp = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.EmailPassword.getInstanceOrThrow().recipeImpl.signUp(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.signIn = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.EmailPassword.getInstanceOrThrow().recipeImpl.signIn(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.doesEmailExist = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.EmailPassword.getInstanceOrThrow().recipeImpl.doesEmailExist(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getResetPasswordTokenFromURL = function (input) {
        return recipe.EmailPassword.getInstanceOrThrow().recipeImpl.getResetPasswordTokenFromURL(
            assets.__assign(assets.__assign({}, input), {
                userContext: authRecipe.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.SignInAndUp = function (prop) {
        if (prop === void 0) {
            prop = {};
        }
        return recipe.EmailPassword.getInstanceOrThrow().getFeatureComponent("signinup", prop);
    };
    Wrapper.SignInAndUpTheme = recipe.SignInAndUpThemeWrapper;
    Wrapper.ResetPasswordUsingToken = function (prop) {
        return recipe.EmailPassword.getInstanceOrThrow().getFeatureComponent("resetpassword", prop);
    };
    Wrapper.ResetPasswordUsingTokenTheme = recipe.ResetPasswordUsingTokenThemeWrapper;
    return Wrapper;
})();
var init = Wrapper.init;
var signOut = Wrapper.signOut;
var submitNewPassword = Wrapper.submitNewPassword;
var sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
var signUp = Wrapper.signUp;
var signIn = Wrapper.signIn;
var doesEmailExist = Wrapper.doesEmailExist;
var SignInAndUp = Wrapper.SignInAndUp;
var getResetPasswordTokenFromURL = Wrapper.getResetPasswordTokenFromURL;
var ResetPasswordUsingToken = Wrapper.ResetPasswordUsingToken;

exports.ResetPasswordUsingTokenTheme = recipe.ResetPasswordUsingTokenThemeWrapper;
exports.SignInAndUpTheme = recipe.SignInAndUpThemeWrapper;
exports.ResetPasswordUsingToken = ResetPasswordUsingToken;
exports.SignInAndUp = SignInAndUp;
exports.default = Wrapper;
exports.doesEmailExist = doesEmailExist;
exports.getResetPasswordTokenFromURL = getResetPasswordTokenFromURL;
exports.init = init;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
exports.signIn = signIn;
exports.signOut = signOut;
exports.signUp = signUp;
exports.submitNewPassword = submitNewPassword;
//# sourceMappingURL=emailpassword.js.map
