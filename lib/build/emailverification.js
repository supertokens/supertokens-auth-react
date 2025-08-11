'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('./utils.js');
var recipe = require('./emailverification-shared.js');
require('react');
require('supertokens-web-js/lib/build/error');
require('supertokens-web-js/utils/cookieHandler');
require('supertokens-web-js/utils/normalisedURLDomain');
require('supertokens-web-js/utils/normalisedURLPath');
require('supertokens-web-js/utils/windowHandler');
require('crypto');
require('./genericComponentOverrideContext.js');
require('react/jsx-runtime');
require('supertokens-web-js/recipe/emailverification');
require('supertokens-web-js/utils/postSuperTokensInitCallbacks');
require('supertokens-web-js/utils/sessionClaimValidatorStore');
require('./recipeModule-shared.js');
require('./superTokens.js');
require('supertokens-web-js');
require('supertokens-web-js/recipe/multitenancy');
require('supertokens-web-js/utils');

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
        return recipe.EmailVerification.init(config);
    };
    Wrapper.isEmailVerified = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [2 /*return*/, recipe.EmailVerification.getInstanceOrThrow().webJSRecipe.isEmailVerified(utils.__assign(utils.__assign({}, input), { userContext: utils.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }))];
            });
        });
    };
    Wrapper.verifyEmail = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [2 /*return*/, recipe.EmailVerification.getInstanceOrThrow().webJSRecipe.verifyEmail(utils.__assign(utils.__assign({}, input), { userContext: utils.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }))];
            });
        });
    };
    Wrapper.sendVerificationEmail = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [2 /*return*/, recipe.EmailVerification.getInstanceOrThrow().webJSRecipe.sendVerificationEmail(utils.__assign(utils.__assign({}, input), { userContext: utils.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }))];
            });
        });
    };
    Wrapper.getEmailVerificationTokenFromURL = function (input) {
        return recipe.EmailVerification.getInstanceOrThrow().webJSRecipe.getEmailVerificationTokenFromURL(utils.__assign(utils.__assign({}, input), { userContext: utils.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.EmailVerificationClaim = recipe.EmailVerification.EmailVerificationClaim;
    Wrapper.ComponentsOverrideProvider = recipe.Provider;
    return Wrapper;
}());
var init = Wrapper.init;
var isEmailVerified = Wrapper.isEmailVerified;
var verifyEmail = Wrapper.verifyEmail;
var sendVerificationEmail = Wrapper.sendVerificationEmail;
var getEmailVerificationTokenFromURL = Wrapper.getEmailVerificationTokenFromURL;
var EmailVerificationComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;
var EmailVerificationClaim = recipe.EmailVerification.EmailVerificationClaim;

exports.EmailVerificationClaim = EmailVerificationClaim;
exports.EmailVerificationComponentsOverrideProvider = EmailVerificationComponentsOverrideProvider;
exports.default = Wrapper;
exports.getEmailVerificationTokenFromURL = getEmailVerificationTokenFromURL;
exports.init = init;
exports.isEmailVerified = isEmailVerified;
exports.sendVerificationEmail = sendVerificationEmail;
exports.verifyEmail = verifyEmail;
