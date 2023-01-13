"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var sessionAuth = require("./session-shared.js");
var recipe = require("./passwordless-shared.js");
require("react/jsx-runtime");
require("react");
require("./recipe.js");
require("./authRecipe-shared.js");
require("./translationContext.js");
require("./session-shared2.js");
require("./index2.js");
require("./utils.js");
require("./index3.js");
require("react-dom");
require("./arrowLeftIcon.js");
require("./emailpassword-shared.js");
require("./index.js");
require("./spinnerIcon.js");

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
class Wrapper {
    static init(config) {
        return recipe.Passwordless.init(config);
    }
    static signOut(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return recipe.Passwordless.getInstanceOrThrow().signOut({
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            });
        });
    }
    static createCode(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return recipe.createCode(
                Object.assign(Object.assign({}, input), {
                    recipeImplementation: recipe.Passwordless.getInstanceOrThrow().recipeImpl,
                })
            );
        });
    }
    static resendCode(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return recipe.resendCode(
                Object.assign(Object.assign({}, input), {
                    recipeImplementation: recipe.Passwordless.getInstanceOrThrow().recipeImpl,
                })
            );
        });
    }
    static consumeCode(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return recipe.consumeCode(
                Object.assign(Object.assign({}, input), {
                    recipeImplementation: recipe.Passwordless.getInstanceOrThrow().recipeImpl,
                })
            );
        });
    }
    static getLinkCodeFromURL(input) {
        return recipe.Passwordless.getInstanceOrThrow().recipeImpl.getLinkCodeFromURL(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static getPreAuthSessionIdFromURL(input) {
        return recipe.Passwordless.getInstanceOrThrow().recipeImpl.getPreAuthSessionIdFromURL(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static doesEmailExist(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return recipe.Passwordless.getInstanceOrThrow().recipeImpl.doesEmailExist(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static doesPhoneNumberExist(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return recipe.Passwordless.getInstanceOrThrow().recipeImpl.doesPhoneNumberExist(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static getLoginAttemptInfo(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return recipe.Passwordless.getInstanceOrThrow().recipeImpl.getLoginAttemptInfo(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        });
    }
    static setLoginAttemptInfo(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return recipe.Passwordless.getInstanceOrThrow().recipeImpl.setLoginAttemptInfo(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static clearLoginAttemptInfo(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return recipe.Passwordless.getInstanceOrThrow().recipeImpl.clearLoginAttemptInfo(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        });
    }
}
Wrapper.SignInUp = (prop = {}) => recipe.Passwordless.getInstanceOrThrow().getFeatureComponent("signInUp", prop);
Wrapper.SignInUpTheme = recipe.SignInUpThemeWrapper;
Wrapper.LinkClicked = (prop) => recipe.Passwordless.getInstanceOrThrow().getFeatureComponent("linkClickedScreen", prop);
const init = Wrapper.init;
const createCode = Wrapper.createCode;
const resendCode = Wrapper.resendCode;
const consumeCode = Wrapper.consumeCode;
const getLinkCodeFromURL = Wrapper.getLinkCodeFromURL;
const getPreAuthSessionIdFromURL = Wrapper.getPreAuthSessionIdFromURL;
const doesEmailExist = Wrapper.doesEmailExist;
const doesPhoneNumberExist = Wrapper.doesPhoneNumberExist;
const getLoginAttemptInfo = Wrapper.getLoginAttemptInfo;
const setLoginAttemptInfo = Wrapper.setLoginAttemptInfo;
const clearLoginAttemptInfo = Wrapper.clearLoginAttemptInfo;
const signOut = Wrapper.signOut;
const SignInUp = Wrapper.SignInUp;
const SignInUpTheme = Wrapper.SignInUpTheme;
const LinkClicked = Wrapper.LinkClicked;

exports.LinkClicked = LinkClicked;
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
