'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var logger = require('./logger.js');
var superTokens = require('./superTokens.js');
var componentOverrideContext = require('./emailpassword-shared2.js');
var recipe = require('./emailpassword-shared3.js');
require('supertokens-web-js');
require('supertokens-web-js/utils/cookieHandler');
require('supertokens-web-js/utils/postSuperTokensInitCallbacks');
require('supertokens-web-js/utils/windowHandler');
require('supertokens-web-js/recipe/multitenancy');
require('supertokens-web-js/utils');
require('react');
require('supertokens-web-js/utils/normalisedURLDomain');
require('supertokens-web-js/utils/normalisedURLPath');
require('./genericComponentOverrideContext.js');
require('react/jsx-runtime');
require('supertokens-web-js/recipe/emailpassword');
require('./authRecipe-shared2.js');
require('./recipeModule-shared.js');
require('./multifactorauth-shared.js');
require('supertokens-web-js/recipe/session');
require('./oauth2provider-shared.js');
require('supertokens-web-js/recipe/oauth2provider');
require('./emailpassword-shared4.js');
require('./authRecipe-shared.js');

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
    function Wrapper() {
    }
    Wrapper.init = function (config) {
        return recipe.EmailPassword.init(config);
    };
    Wrapper.signOut = function (input) {
        return logger.__awaiter(this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                return [2 /*return*/, recipe.EmailPassword.getInstanceOrThrow().signOut({
                        userContext: superTokens.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext),
                    })];
            });
        });
    };
    Wrapper.submitNewPassword = function (input) {
        return logger.__awaiter(this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                return [2 /*return*/, recipe.EmailPassword.getInstanceOrThrow().webJSRecipe.submitNewPassword(logger.__assign(logger.__assign({}, input), { userContext: superTokens.getNormalisedUserContext(input.userContext) }))];
            });
        });
    };
    Wrapper.sendPasswordResetEmail = function (input) {
        return logger.__awaiter(this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                return [2 /*return*/, recipe.EmailPassword.getInstanceOrThrow().webJSRecipe.sendPasswordResetEmail(logger.__assign(logger.__assign({}, input), { userContext: superTokens.getNormalisedUserContext(input.userContext) }))];
            });
        });
    };
    Wrapper.signUp = function (input) {
        return logger.__awaiter(this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                return [2 /*return*/, recipe.EmailPassword.getInstanceOrThrow().webJSRecipe.signUp(logger.__assign(logger.__assign({}, input), { userContext: superTokens.getNormalisedUserContext(input.userContext) }))];
            });
        });
    };
    Wrapper.signIn = function (input) {
        return logger.__awaiter(this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                return [2 /*return*/, recipe.EmailPassword.getInstanceOrThrow().webJSRecipe.signIn(logger.__assign(logger.__assign({}, input), { userContext: superTokens.getNormalisedUserContext(input.userContext) }))];
            });
        });
    };
    Wrapper.doesEmailExist = function (input) {
        return logger.__awaiter(this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                return [2 /*return*/, recipe.EmailPassword.getInstanceOrThrow().webJSRecipe.doesEmailExist(logger.__assign(logger.__assign({}, input), { userContext: superTokens.getNormalisedUserContext(input.userContext) }))];
            });
        });
    };
    Wrapper.getResetPasswordTokenFromURL = function (input) {
        return recipe.EmailPassword.getInstanceOrThrow().webJSRecipe.getResetPasswordTokenFromURL(logger.__assign(logger.__assign({}, input), { userContext: superTokens.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.ComponentsOverrideProvider = componentOverrideContext.Provider;
    return Wrapper;
}());
var init = Wrapper.init;
var signOut = Wrapper.signOut;
var submitNewPassword = Wrapper.submitNewPassword;
var sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
var signUp = Wrapper.signUp;
var signIn = Wrapper.signIn;
var doesEmailExist = Wrapper.doesEmailExist;
var getResetPasswordTokenFromURL = Wrapper.getResetPasswordTokenFromURL;
var EmailPasswordComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

exports.EmailPasswordComponentsOverrideProvider = EmailPasswordComponentsOverrideProvider;
exports.default = Wrapper;
exports.doesEmailExist = doesEmailExist;
exports.getResetPasswordTokenFromURL = getResetPasswordTokenFromURL;
exports.init = init;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
exports.signIn = signIn;
exports.signOut = signOut;
exports.signUp = signUp;
exports.submitNewPassword = submitNewPassword;
