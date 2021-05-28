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
var utils_1 = require("../emailpassword/utils");
var utils_2 = require("../thirdparty/utils");
var utils_3 = require("../authRecipeModule/utils");
/*
 * Methods.
 */
function normaliseThirdPartyEmailPasswordConfig(config) {
    var thirdPartyUserInput = castToThirdPartyConfig(config);
    var emailPasswordUserInput = castToEmailPasswordConfig(config);
    var emailPasswordConfig = utils_1.normaliseEmailPasswordConfig(emailPasswordUserInput);
    var thirdPartyConfig = utils_2.normaliseThirdPartyConfig(thirdPartyUserInput, true);
    var disableEmailPassword = config.disableEmailPassword === true;
    if (disableEmailPassword && thirdPartyConfig.signInAndUpFeature.providers.length === 0) {
        throw new Error("You need to enable either email password or third party providers login.");
    }
    var override = {
        functions: function (originalImplementation) {
            return originalImplementation;
        },
    };
    if (config !== undefined && config.override !== undefined) {
        if (config.override.functions !== undefined) {
            override = __assign({}, override, { functions: config.override.functions });
        }
    }
    return __assign({}, utils_3.normaliseAuthRecipeModuleConfig(config), {
        signInAndUpFeature: __assign({}, thirdPartyConfig.signInAndUpFeature, emailPasswordConfig.signInAndUpFeature),
        resetPasswordUsingTokenFeature: emailPasswordConfig.resetPasswordUsingTokenFeature,
        disableEmailPassword: disableEmailPassword,
        override: override,
    });
}
exports.normaliseThirdPartyEmailPasswordConfig = normaliseThirdPartyEmailPasswordConfig;
function castToEmailPasswordConfig(config) {
    return config;
}
function castToThirdPartyConfig(config) {
    if (config.signInAndUpFeature === undefined) {
        config.signInAndUpFeature = {
            providers: [],
        };
    }
    if (config.signInAndUpFeature.providers === undefined) {
        config.signInAndUpFeature.providers = [];
    }
    return config;
}
//# sourceMappingURL=utils.js.map
