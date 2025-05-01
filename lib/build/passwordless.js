'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var logger = require('./logger.js');
var superTokens = require('./superTokens.js');
var recipe = require('./passwordless-shared.js');
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
require('supertokens-web-js/recipe/passwordless');
require('./authRecipe-shared2.js');
require('./recipeModule-shared.js');
require('./multifactorauth-shared.js');
require('supertokens-web-js/recipe/session');
require('./oauth2provider-shared.js');
require('supertokens-web-js/recipe/oauth2provider');
require('./multifactorauth-shared2.js');
require('supertokens-web-js/recipe/multifactorauth');
require('supertokens-web-js/utils/sessionClaimValidatorStore');
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
        return recipe.Passwordless.init(config);
    };
    Wrapper.signOut = function (input) {
        return logger.__awaiter(this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                return [2 /*return*/, recipe.Passwordless.getInstanceOrThrow().signOut({
                        userContext: superTokens.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext),
                    })];
            });
        });
    };
    Wrapper.createCode = function (input) {
        return logger.__awaiter(this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                return [2 /*return*/, recipe.Passwordless.getInstanceOrThrow().webJSRecipe.createCode(logger.__assign(logger.__assign({}, input), { userContext: superTokens.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }))];
            });
        });
    };
    Wrapper.resendCode = function (input) {
        return logger.__awaiter(this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                return [2 /*return*/, recipe.Passwordless.getInstanceOrThrow().webJSRecipe.resendCode(logger.__assign(logger.__assign({}, input), { userContext: superTokens.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }))];
            });
        });
    };
    Wrapper.consumeCode = function (input) {
        return logger.__awaiter(this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                return [2 /*return*/, recipe.Passwordless.getInstanceOrThrow().webJSRecipe.consumeCode(logger.__assign(logger.__assign({}, input), { userContext: superTokens.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }))];
            });
        });
    };
    Wrapper.getLinkCodeFromURL = function (input) {
        return recipe.Passwordless.getInstanceOrThrow().webJSRecipe.getLinkCodeFromURL(logger.__assign(logger.__assign({}, input), { userContext: superTokens.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.getPreAuthSessionIdFromURL = function (input) {
        return recipe.Passwordless.getInstanceOrThrow().webJSRecipe.getPreAuthSessionIdFromURL(logger.__assign(logger.__assign({}, input), { userContext: superTokens.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.doesEmailExist = function (input) {
        return logger.__awaiter(this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                return [2 /*return*/, recipe.Passwordless.getInstanceOrThrow().webJSRecipe.doesEmailExist(logger.__assign(logger.__assign({}, input), { userContext: superTokens.getNormalisedUserContext(input.userContext) }))];
            });
        });
    };
    Wrapper.doesPhoneNumberExist = function (input) {
        return logger.__awaiter(this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                return [2 /*return*/, recipe.Passwordless.getInstanceOrThrow().webJSRecipe.doesPhoneNumberExist(logger.__assign(logger.__assign({}, input), { userContext: superTokens.getNormalisedUserContext(input.userContext) }))];
            });
        });
    };
    Wrapper.getLoginAttemptInfo = function (input) {
        return logger.__awaiter(this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                return [2 /*return*/, recipe.Passwordless.getInstanceOrThrow().webJSRecipe.getLoginAttemptInfo(logger.__assign(logger.__assign({}, input), { userContext: superTokens.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }))];
            });
        });
    };
    Wrapper.setLoginAttemptInfo = function (input) {
        return logger.__awaiter(this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                return [2 /*return*/, recipe.Passwordless.getInstanceOrThrow().webJSRecipe.setLoginAttemptInfo(logger.__assign(logger.__assign({}, input), { userContext: superTokens.getNormalisedUserContext(input.userContext) }))];
            });
        });
    };
    Wrapper.clearLoginAttemptInfo = function (input) {
        return logger.__awaiter(this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                return [2 /*return*/, recipe.Passwordless.getInstanceOrThrow().webJSRecipe.clearLoginAttemptInfo(logger.__assign(logger.__assign({}, input), { userContext: superTokens.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }))];
            });
        });
    };
    Wrapper.ComponentsOverrideProvider = recipe.Provider;
    return Wrapper;
}());
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
