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
exports.normaliseThirdPartyEmailPasswordConfig = void 0;
var utils_1 = require("../authRecipe/utils");
/*
 * Methods.
 */
function normaliseThirdPartyEmailPasswordConfig(config) {
    var disableEmailPassword = config.disableEmailPassword === true;
    if (
        disableEmailPassword &&
        (config.signInAndUpFeature === undefined ||
            config.signInAndUpFeature.providers === undefined ||
            config.signInAndUpFeature.providers.length === 0)
    ) {
        throw new Error("You need to enable either email password or third party providers login.");
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
    var signInAndUpFeature = normaliseSignInUpFeatureConfig(config.signInAndUpFeature);
    return __assign(__assign({}, (0, utils_1.normaliseAuthRecipe)(config)), {
        signInAndUpFeature: signInAndUpFeature,
        oAuthCallbackScreen: config.oAuthCallbackScreen,
        resetPasswordUsingTokenFeature: config.resetPasswordUsingTokenFeature,
        disableEmailPassword: disableEmailPassword,
        override: override,
    });
}
exports.normaliseThirdPartyEmailPasswordConfig = normaliseThirdPartyEmailPasswordConfig;
function normaliseSignInUpFeatureConfig(config) {
    var disableDefaultUI =
        config === undefined || config.disableDefaultUI === undefined ? false : config.disableDefaultUI;
    var defaultToSignUp = config === undefined || config.defaultToSignUp === undefined ? false : config.defaultToSignUp;
    return __assign(__assign({}, config), {
        disableDefaultUI: disableDefaultUI,
        defaultToSignUp: defaultToSignUp,
        style: config === undefined || config.style === undefined ? {} : config.style,
    });
}
