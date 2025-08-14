"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var componentOverrideContext = require("./webauthn-shared.js");
require("./genericComponentOverrideContext.js");
require("react/jsx-runtime");
require("react");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("supertokens-web-js/lib/build/error");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("supertokens-web-js/lib/build/recipe/webauthn");
require("./authRecipe-shared2.js");
require("./recipeModule-shared.js");
require("./multifactorauth-shared.js");
require("supertokens-web-js/recipe/session");
require("./oauth2provider-shared.js");
require("supertokens-web-js/recipe/oauth2provider");
require("./multifactorauth-shared2.js");
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./authRecipe-shared.js");

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
        return componentOverrideContext.Webauthn.init(config);
    };
    Wrapper.getRegisterOptions = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.getRegisterOptions(input);
    };
    Wrapper.getSignInOptions = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.getSignInOptions(input);
    };
    Wrapper.signUp = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.signUp(input);
    };
    Wrapper.signIn = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.signIn(input);
    };
    Wrapper.getEmailExists = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.getEmailExists(input);
    };
    Wrapper.generateRecoverAccountToken = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.generateRecoverAccountToken(input);
    };
    Wrapper.recoverAccount = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.recoverAccount(input);
    };
    Wrapper.createCredential = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.createCredential(input);
    };
    Wrapper.authenticateCredential = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.authenticateCredential(input);
    };
    Wrapper.registerCredentialWithSignUp = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.registerCredentialWithSignUp(input);
    };
    Wrapper.authenticateCredentialWithSignIn = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.authenticateCredentialWithSignIn(
            input
        );
    };
    Wrapper.registerCredentialWithRecoverAccount = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.registerCredentialWithRecoverAccount(
            input
        );
    };
    Wrapper.listCredentials = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.listCredentials(input);
    };
    Wrapper.removeCredential = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.removeCredential(input);
    };
    Wrapper.createAndRegisterCredentialForSessionUser = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.createAndRegisterCredentialForSessionUser(
            input
        );
    };
    Wrapper.registerCredential = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.registerCredential(input);
    };
    Wrapper.doesBrowserSupportWebAuthn = function (input) {
        return componentOverrideContext.Webauthn.getInstanceOrThrow().webJSRecipe.doesBrowserSupportWebAuthn(input);
    };
    Wrapper.ComponentsOverrideProvider = componentOverrideContext.Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var getRegisterOptions = Wrapper.getRegisterOptions;
var getSignInOptions = Wrapper.getSignInOptions;
var signUp = Wrapper.signUp;
var signIn = Wrapper.signIn;
var getEmailExists = Wrapper.getEmailExists;
var generateRecoverAccountToken = Wrapper.generateRecoverAccountToken;
var recoverAccount = Wrapper.recoverAccount;
var createCredential = Wrapper.createCredential;
var authenticateCredential = Wrapper.authenticateCredential;
var registerCredentialWithSignUp = Wrapper.registerCredentialWithSignUp;
var authenticateCredentialWithSignIn = Wrapper.authenticateCredentialWithSignIn;
var registerCredentialWithRecoverAccount = Wrapper.registerCredentialWithRecoverAccount;
var createAndRegisterCredentialForSessionUser = Wrapper.createAndRegisterCredentialForSessionUser;
var listCredentials = Wrapper.listCredentials;
var removeCredential = Wrapper.removeCredential;
var registerCredential = Wrapper.registerCredential;
var doesBrowserSupportWebAuthn = Wrapper.doesBrowserSupportWebAuthn;
var WebauthnComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

exports.WebauthnComponentsOverrideProvider = WebauthnComponentsOverrideProvider;
exports.authenticateCredential = authenticateCredential;
exports.authenticateCredentialWithSignIn = authenticateCredentialWithSignIn;
exports.createAndRegisterCredentialForSessionUser = createAndRegisterCredentialForSessionUser;
exports.createCredential = createCredential;
exports.default = Wrapper;
exports.doesBrowserSupportWebAuthn = doesBrowserSupportWebAuthn;
exports.generateRecoverAccountToken = generateRecoverAccountToken;
exports.getEmailExists = getEmailExists;
exports.getRegisterOptions = getRegisterOptions;
exports.getSignInOptions = getSignInOptions;
exports.init = init;
exports.listCredentials = listCredentials;
exports.recoverAccount = recoverAccount;
exports.registerCredential = registerCredential;
exports.registerCredentialWithRecoverAccount = registerCredentialWithRecoverAccount;
exports.registerCredentialWithSignUp = registerCredentialWithSignUp;
exports.removeCredential = removeCredential;
exports.signIn = signIn;
exports.signUp = signUp;
