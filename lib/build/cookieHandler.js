"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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
var cookieHandling_1 = require("supertokens-website/utils/cookieHandling");
var SuperTokensCookieHandler = /** @class */ (function () {
    function SuperTokensCookieHandler(cookieHandlerInput) {
        var cookieHandlerFunc = function (original) {
            return original;
        };
        if (cookieHandlerInput !== undefined) {
            cookieHandlerFunc = cookieHandlerInput;
        }
        this.cookieHandler = cookieHandlerFunc(cookieHandling_1.defaultCookieHandler);
    }
    SuperTokensCookieHandler.init = function (cookieHandlerInput) {
        if (SuperTokensCookieHandler.instance !== undefined) {
            console.warn("SuperTokensCookieHandler was already initialized");
            return;
        }
        SuperTokensCookieHandler.instance = new SuperTokensCookieHandler(cookieHandlerInput);
    };
    SuperTokensCookieHandler.getInstanceOrThrow = function () {
        if (SuperTokensCookieHandler.instance === undefined) {
            throw new Error("SuperTokensCookieHandler must be initialized before calling this method.");
        }
        return SuperTokensCookieHandler.instance;
    };
    return SuperTokensCookieHandler;
})();
exports.default = SuperTokensCookieHandler;
