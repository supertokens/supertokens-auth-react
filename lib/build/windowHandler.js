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
var windowHandling_1 = require("supertokens-website/utils/windowHandling");
var SuperTokensWindowHandler = /** @class */ (function () {
    function SuperTokensWindowHandler(windowHandlerInput) {
        var windowHandlerFunc = function (original) {
            return original;
        };
        if (windowHandlerInput !== undefined) {
            windowHandlerFunc = windowHandlerInput;
        }
        this.windowHandler = windowHandlerFunc(windowHandling_1.defaultWindowHandler);
    }
    SuperTokensWindowHandler.init = function (windowHandlerInput) {
        if (SuperTokensWindowHandler.instance !== undefined) {
            console.warn("SuperTokensWindowHandler was already initialized");
            return;
        }
        SuperTokensWindowHandler.instance = new SuperTokensWindowHandler(windowHandlerInput);
    };
    SuperTokensWindowHandler.getInstanceOrThrow = function () {
        if (SuperTokensWindowHandler.instance === undefined) {
            throw new Error("SuperTokensWindowHandler must be initialized before calling this method.");
        }
        return SuperTokensWindowHandler.instance;
    };
    return SuperTokensWindowHandler;
})();
exports.default = SuperTokensWindowHandler;
