"use strict";
/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var utils_1 = require("./utils");
var constants_1 = require("./constants");
/*
 * Class.
 */
var SuperTokens = /** @class */ (function() {
    function SuperTokens() {}
    /*
     * Static methods.
     */
    SuperTokens.init = function(config) {
        if (SuperTokens.appInfo || SuperTokens.recipeList.length > 0) {
            throw new Error("SuperTokens was already initialized");
        }
        SuperTokens.appInfo = {
            appName: config.appInfo.appName,
            apiDomain: utils_1.normaliseUrl(config.appInfo.apiDomain),
            apiBasePath: config.appInfo.apiBasePath || constants_1.DEFAULT_API_BASE_PATH,
            websiteDomain: utils_1.normaliseUrl(config.appInfo.websiteDomain),
            websiteBasePath:
                (config.appInfo.websiteBasePath !== undefined &&
                    utils_1.normalisePath(config.appInfo.websiteBasePath)) ||
                constants_1.DEFAULT_WEBSITE_BASE_PATH,
            logoFullURL: config.appInfo.logoFullURL || undefined
        };
        if (config.recipeList === undefined) {
            throw new Error("No recipeList provided to SuperTokens."); // TODO Add link to appropriate docs.
        }
        SuperTokens.recipeList = config.recipeList;
    };
    SuperTokens.getAppInfo = function() {
        if (SuperTokens.appInfo === undefined) {
            throw new Error("SuperTokens must be initialized before calling this method.");
        }
        return SuperTokens.appInfo;
    };
    SuperTokens.canHandleRoute = function(url) {
        return SuperTokens.recipeList.some(function(recipe) {
            return recipe.canHandleRoute(url);
        });
    };
    SuperTokens.getRoutingComponent = function(url) {
        // TODO
    };
    SuperTokens.getRecipeList = function() {
        return SuperTokens.recipeList;
    };
    /*
     * Tests methods.
     */
    SuperTokens.reset = function() {
        if (!utils_1.isTest()) {
            return;
        }
        SuperTokens.appInfo = undefined;
        SuperTokens.recipeList.length = 0;
    };
    SuperTokens.recipeList = [];
    return SuperTokens;
})();
exports.default = SuperTokens;
