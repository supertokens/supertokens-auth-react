'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('./utils.js');
var recipe = require('./totp-shared.js');
require('react');
require('supertokens-web-js/utils/cookieHandler');
require('supertokens-web-js/utils/normalisedURLDomain');
require('supertokens-web-js/utils/normalisedURLPath');
require('supertokens-web-js/utils/windowHandler');
require('crypto');
require('./genericComponentOverrideContext.js');
require('react/jsx-runtime');
require('supertokens-web-js/recipe/totp');
require('supertokens-web-js/utils/postSuperTokensInitCallbacks');
require('./multifactorauth-shared2.js');
require('supertokens-web-js/recipe/multifactorauth');
require('supertokens-web-js/utils');
require('supertokens-web-js/utils/sessionClaimValidatorStore');
require('./superTokens.js');
require('supertokens-web-js');
require('supertokens-web-js/recipe/multitenancy');
require('./recipeModule-shared.js');
require('./multifactorauth-shared.js');
require('supertokens-web-js/recipe/session');
require('./oauth2provider-shared.js');
require('supertokens-web-js/recipe/oauth2provider');

/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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
        return recipe.TOTP.init(config);
    };
    Wrapper.createDevice = function (input) {
        return recipe.TOTP.getInstanceOrThrow().webJSRecipe.createDevice(utils.__assign(utils.__assign({}, input), { userContext: utils.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.verifyCode = function (input) {
        return recipe.TOTP.getInstanceOrThrow().webJSRecipe.verifyCode(utils.__assign(utils.__assign({}, input), { userContext: utils.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.verifyDevice = function (input) {
        return recipe.TOTP.getInstanceOrThrow().webJSRecipe.verifyDevice(utils.__assign(utils.__assign({}, input), { userContext: utils.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.removeDevice = function (input) {
        return recipe.TOTP.getInstanceOrThrow().webJSRecipe.removeDevice(utils.__assign(utils.__assign({}, input), { userContext: utils.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.listDevices = function (input) {
        return recipe.TOTP.getInstanceOrThrow().webJSRecipe.listDevices(utils.__assign(utils.__assign({}, input), { userContext: utils.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.ComponentsOverrideProvider = recipe.Provider;
    return Wrapper;
}());
var init = Wrapper.init;
var createDevice = Wrapper.createDevice;
var verifyCode = Wrapper.verifyCode;
var verifyDevice = Wrapper.verifyDevice;
var removeDevice = Wrapper.removeDevice;
var listDevices = Wrapper.listDevices;
var TOTPComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

exports.TOTPComponentsOverrideProvider = TOTPComponentsOverrideProvider;
exports.createDevice = createDevice;
exports.default = Wrapper;
exports.init = init;
exports.listDevices = listDevices;
exports.removeDevice = removeDevice;
exports.verifyCode = verifyCode;
exports.verifyDevice = verifyDevice;
