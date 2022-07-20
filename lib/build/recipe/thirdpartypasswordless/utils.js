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
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.normaliseThirdPartyPasswordlessConfig = void 0;
var utils_1 = require("../authRecipe/utils");
function normaliseThirdPartyPasswordlessConfig(config) {
    var _a;
    var disablePasswordless = config.disablePasswordless === true;
    var disableThirdParty =
        config.signInUpFeature === undefined ||
        config.signInUpFeature.providers === undefined ||
        config.signInUpFeature.providers.length === 0;
    if (disablePasswordless && disableThirdParty) {
        throw new Error("You need to enable either passwordless or third party providers login.");
    }
    var override = __assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
            components: {},
        },
        config.override
    );
    var thirdPartyProviderAndEmailOrPhoneFormStyle =
        ((_a = config === null || config === void 0 ? void 0 : config.signInUpFeature) === null || _a === void 0
            ? void 0
            : _a.thirdPartyProviderAndEmailOrPhoneFormStyle) === undefined
            ? {}
            : config === null || config === void 0
            ? void 0
            : config.signInUpFeature.thirdPartyProviderAndEmailOrPhoneFormStyle;
    return __assign(__assign({}, (0, utils_1.normaliseAuthRecipe)(config)), {
        thirdPartyProviderAndEmailOrPhoneFormStyle: thirdPartyProviderAndEmailOrPhoneFormStyle,
        thirdpartyUserInput: disableThirdParty
            ? undefined
            : {
                  getRedirectionURL: config.getRedirectionURL,
                  style: config.style,
                  onHandleEvent: config.onHandleEvent,
                  palette: config.palette,
                  preAPIHook: config.preAPIHook,
                  signInAndUpFeature: __assign(__assign({}, config.signInUpFeature), {
                      style: thirdPartyProviderAndEmailOrPhoneFormStyle,
                  }),
                  oAuthCallbackScreen: config.oAuthCallbackScreen,
                  useShadowDom: config.useShadowDom,
                  override: {
                      components: override.components,
                  },
              },
        passwordlessUserInput: disablePasswordless
            ? undefined
            : {
                  contactMethod: config.contactMethod,
                  style: config.style,
                  validateEmailAddress: "validateEmailAddress" in config ? config.validateEmailAddress : undefined,
                  validatePhoneNumber: "validatePhoneNumber" in config ? config.validatePhoneNumber : undefined,
                  getRedirectionURL: config.getRedirectionURL,
                  onHandleEvent: config.onHandleEvent,
                  palette: config.palette,
                  preAPIHook: config.preAPIHook,
                  useShadowDom: config.useShadowDom,
                  signInUpFeature: __assign(__assign({}, config.signInUpFeature), {
                      emailOrPhoneFormStyle: thirdPartyProviderAndEmailOrPhoneFormStyle,
                  }),
                  linkClickedScreenFeature: config.linkClickedScreenFeature,
                  override: {
                      components: override.components,
                  },
              },
        override: override,
    });
}
exports.normaliseThirdPartyPasswordlessConfig = normaliseThirdPartyPasswordlessConfig;
