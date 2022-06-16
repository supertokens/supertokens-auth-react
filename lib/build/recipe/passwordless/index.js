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
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectToAuth =
    exports.signOut =
    exports.doesPhoneNumberExist =
    exports.doesEmailExist =
    exports.consumeCode =
    exports.resendCode =
    exports.createCode =
    exports.init =
    exports.LinkClicked =
    exports.SignInUpTheme =
    exports.SignInUp =
    exports.PasswordlessAuth =
        void 0;
var tslib_1 = require("tslib");
var recipe_1 = tslib_1.__importDefault(require("./recipe"));
var passwordlessAuth_1 = tslib_1.__importDefault(require("./passwordlessAuth"));
exports.PasswordlessAuth = passwordlessAuth_1.default;
var signInUp_1 = tslib_1.__importDefault(require("./components/themes/signInUp"));
var utils_1 = require("../../utils");
var UtilFunctions = tslib_1.__importStar(require("./utils"));
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    Wrapper.signOut = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, recipe_1.default.getInstanceOrThrow().signOut()];
            });
        });
    };
    // have backwards compatibility to allow input as "signin" | "signup"
    Wrapper.redirectToAuth = function (input) {
        if (input === undefined || typeof input === "string") {
            return recipe_1.default.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input);
        } else {
            if (input.redirectBack === false || input.redirectBack === undefined) {
                return recipe_1.default.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input.show);
            } else {
                return recipe_1.default.getInstanceOrThrow().redirectToAuthWithRedirectToPath(input.show);
            }
        }
    };
    Wrapper.createCode = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    UtilFunctions.createCode(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            recipeImplementation: recipe_1.default.getInstanceOrThrow().recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.resendCode = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    UtilFunctions.resendCode(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            recipeImplementation: recipe_1.default.getInstanceOrThrow().recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.consumeCode = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    UtilFunctions.consumeCode(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            recipeImplementation: recipe_1.default.getInstanceOrThrow().recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.doesEmailExist = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.doesEmailExist(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
            })
        );
    };
    Wrapper.doesPhoneNumberExist = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.doesPhoneNumberExist(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
            })
        );
    };
    Wrapper.PasswordlessAuth = passwordlessAuth_1.default;
    Wrapper.SignInUp = function (prop) {
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("signInUp", prop);
    };
    Wrapper.SignInUpTheme = signInUp_1.default;
    Wrapper.LinkClicked = function (prop) {
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("linkClickedScreen", prop);
    };
    return Wrapper;
})();
exports.default = Wrapper;
var init = Wrapper.init;
exports.init = init;
var createCode = Wrapper.createCode;
exports.createCode = createCode;
var resendCode = Wrapper.resendCode;
exports.resendCode = resendCode;
var consumeCode = Wrapper.consumeCode;
exports.consumeCode = consumeCode;
var doesEmailExist = Wrapper.doesEmailExist;
exports.doesEmailExist = doesEmailExist;
var doesPhoneNumberExist = Wrapper.doesPhoneNumberExist;
exports.doesPhoneNumberExist = doesPhoneNumberExist;
var signOut = Wrapper.signOut;
exports.signOut = signOut;
var redirectToAuth = Wrapper.redirectToAuth;
exports.redirectToAuth = redirectToAuth;
var SignInUp = Wrapper.SignInUp;
exports.SignInUp = SignInUp;
var SignInUpTheme = Wrapper.SignInUpTheme;
exports.SignInUpTheme = SignInUpTheme;
var LinkClicked = Wrapper.LinkClicked;
exports.LinkClicked = LinkClicked;
