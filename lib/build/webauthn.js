'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var recipe = require('./webauthn-shared.js');
require('./genericComponentOverrideContext.js');
require('./utils.js');
require('react');
require('supertokens-web-js/lib/build/error');
require('supertokens-web-js/utils/cookieHandler');
require('supertokens-web-js/utils/normalisedURLDomain');
require('supertokens-web-js/utils/normalisedURLPath');
require('supertokens-web-js/utils/windowHandler');
require('crypto');
require('react/jsx-runtime');
require('supertokens-web-js/lib/build/recipe/webauthn');
require('./authRecipe-shared2.js');
require('./recipeModule-shared.js');
require('./superTokens.js');
require('supertokens-web-js');
require('supertokens-web-js/utils/postSuperTokensInitCallbacks');
require('supertokens-web-js/recipe/multitenancy');
require('supertokens-web-js/utils');
require('./multifactorauth-shared.js');
require('supertokens-web-js/recipe/session');
require('./oauth2provider-shared.js');
require('supertokens-web-js/recipe/oauth2provider');
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
        return recipe.Webauthn.init(config);
    };
    Wrapper.getRegisterOptions = function (input) {
        return recipe.Webauthn.getInstanceOrThrow().webJSRecipe.getRegisterOptions(input);
    };
    Wrapper.getSignInOptions = function (input) {
        return recipe.Webauthn.getInstanceOrThrow().webJSRecipe.getSignInOptions(input);
    };
    Wrapper.signUp = function (input) {
        return recipe.Webauthn.getInstanceOrThrow().webJSRecipe.signUp(input);
    };
    Wrapper.signIn = function (input) {
        return recipe.Webauthn.getInstanceOrThrow().webJSRecipe.signIn(input);
    };
    Wrapper.getEmailExists = function (input) {
        return recipe.Webauthn.getInstanceOrThrow().webJSRecipe.getEmailExists(input);
    };
    Wrapper.generateRecoverAccountToken = function (input) {
        return recipe.Webauthn.getInstanceOrThrow().webJSRecipe.generateRecoverAccountToken(input);
    };
    Wrapper.recoverAccount = function (input) {
        return recipe.Webauthn.getInstanceOrThrow().webJSRecipe.recoverAccount(input);
    };
    Wrapper.registerCredential = function (input) {
        return recipe.Webauthn.getInstanceOrThrow().webJSRecipe.registerCredential(input);
    };
    Wrapper.authenticateCredential = function (input) {
        return recipe.Webauthn.getInstanceOrThrow().webJSRecipe.authenticateCredential(input);
    };
    Wrapper.registerCredentialWithSignUp = function (input) {
        return recipe.Webauthn.getInstanceOrThrow().webJSRecipe.registerCredentialWithSignUp(input);
    };
    Wrapper.authenticateCredentialWithSignIn = function (input) {
        return recipe.Webauthn.getInstanceOrThrow().webJSRecipe.authenticateCredentialWithSignIn(input);
    };
    Wrapper.registerCredentialWithRecoverAccount = function (input) {
        return recipe.Webauthn.getInstanceOrThrow().webJSRecipe.registerCredentialWithRecoverAccount(input);
    };
    Wrapper.doesBrowserSupportWebAuthn = function (input) {
        return recipe.Webauthn.getInstanceOrThrow().webJSRecipe.doesBrowserSupportWebAuthn(input);
    };
    Wrapper.ComponentsOverrideProvider = recipe.Provider;
    return Wrapper;
}());
var init = Wrapper.init;
var getRegisterOptions = Wrapper.getRegisterOptions;
var getSignInOptions = Wrapper.getSignInOptions;
var signUp = Wrapper.signUp;
var signIn = Wrapper.signIn;
var getEmailExists = Wrapper.getEmailExists;
var generateRecoverAccountToken = Wrapper.generateRecoverAccountToken;
var recoverAccount = Wrapper.recoverAccount;
var registerCredential = Wrapper.registerCredential;
var authenticateCredential = Wrapper.authenticateCredential;
var registerCredentialWithSignUp = Wrapper.registerCredentialWithSignUp;
var authenticateCredentialWithSignIn = Wrapper.authenticateCredentialWithSignIn;
var registerCredentialWithRecoverAccount = Wrapper.registerCredentialWithRecoverAccount;
var doesBrowserSupportWebAuthn = Wrapper.doesBrowserSupportWebAuthn;
var WebauthnComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

exports.WebauthnComponentsOverrideProvider = WebauthnComponentsOverrideProvider;
exports.authenticateCredential = authenticateCredential;
exports.authenticateCredentialWithSignIn = authenticateCredentialWithSignIn;
exports.default = Wrapper;
exports.doesBrowserSupportWebAuthn = doesBrowserSupportWebAuthn;
exports.generateRecoverAccountToken = generateRecoverAccountToken;
exports.getEmailExists = getEmailExists;
exports.getRegisterOptions = getRegisterOptions;
exports.getSignInOptions = getSignInOptions;
exports.init = init;
exports.recoverAccount = recoverAccount;
exports.registerCredential = registerCredential;
exports.registerCredentialWithRecoverAccount = registerCredentialWithRecoverAccount;
exports.registerCredentialWithSignUp = registerCredentialWithSignUp;
exports.signIn = signIn;
exports.signUp = signUp;
