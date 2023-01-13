"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var sessionAuth = require("./session-shared.js");
var recipe = require("./emailpassword-shared2.js");
require("react/jsx-runtime");
require("react");
require("./recipe.js");
require("./authRecipe-shared.js");
require("./translationContext.js");
require("./session-shared2.js");
require("./index2.js");
require("./arrowLeftIcon.js");
require("./emailpassword-shared.js");
require("./index.js");
require("./index3.js");
require("react-dom");
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
class Wrapper {
    static init(config) {
        return recipe.EmailPassword.init(config);
    }
    static signOut(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return recipe.EmailPassword.getInstanceOrThrow().signOut({
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            });
        });
    }
    static submitNewPassword(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return recipe.EmailPassword.getInstanceOrThrow().recipeImpl.submitNewPassword(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static sendPasswordResetEmail(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return recipe.EmailPassword.getInstanceOrThrow().recipeImpl.sendPasswordResetEmail(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static signUp(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return recipe.EmailPassword.getInstanceOrThrow().recipeImpl.signUp(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static signIn(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return recipe.EmailPassword.getInstanceOrThrow().recipeImpl.signIn(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static doesEmailExist(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return recipe.EmailPassword.getInstanceOrThrow().recipeImpl.doesEmailExist(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static getResetPasswordTokenFromURL(input) {
        return recipe.EmailPassword.getInstanceOrThrow().recipeImpl.getResetPasswordTokenFromURL(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
}
Wrapper.SignInAndUp = (prop = {}) => recipe.EmailPassword.getInstanceOrThrow().getFeatureComponent("signinup", prop);
Wrapper.SignInAndUpTheme = recipe.SignInAndUpThemeWrapper;
Wrapper.ResetPasswordUsingToken = (prop) =>
    recipe.EmailPassword.getInstanceOrThrow().getFeatureComponent("resetpassword", prop);
Wrapper.ResetPasswordUsingTokenTheme = recipe.ResetPasswordUsingTokenThemeWrapper;
const init = Wrapper.init;
const signOut = Wrapper.signOut;
const submitNewPassword = Wrapper.submitNewPassword;
const sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
const signUp = Wrapper.signUp;
const signIn = Wrapper.signIn;
const doesEmailExist = Wrapper.doesEmailExist;
const SignInAndUp = Wrapper.SignInAndUp;
const getResetPasswordTokenFromURL = Wrapper.getResetPasswordTokenFromURL;
const ResetPasswordUsingToken = Wrapper.ResetPasswordUsingToken;

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
