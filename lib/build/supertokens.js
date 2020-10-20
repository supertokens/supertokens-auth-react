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
    /*
     * Constructor.
     */
    function SuperTokens(config) {
        var _this = this;
        this.recipeList = [];
        /*
         * Instance Methods.
         */
        this.getAppInfo = function() {
            return _this.appInfo;
        };
        this.canHandleRoute = function(urlString) {
            var url = new URL(urlString);
            var pathname = utils_1.normalisePath(url.pathname);
            // If pathname doesn't start with websiteBasePath, return false.
            if (!pathname.startsWith(SuperTokens.getAppInfo().websiteBasePath)) {
                return false;
            }
            var rId = utils_1.getRecipeIdFromUrl(urlString);
            return _this.recipeList.some(function(recipe) {
                return recipe.canHandleRoute(pathname, rId);
            });
        };
        this.getRoutingComponent = function(urlString) {
            var url = new URL(urlString);
            var pathname = utils_1.normalisePath(url.pathname);
            // If pathname doesn't start with websiteBasePath, return false.
            if (!pathname.startsWith(SuperTokens.getAppInfo().websiteBasePath)) {
                return undefined;
            }
            var rId = utils_1.getRecipeIdFromUrl(urlString);
            var component;
            for (var i = 0; i < _this.recipeList.length; i++) {
                component = _this.recipeList[i].getRoutingComponent(pathname, rId);
                if (component !== undefined) {
                    break;
                }
            }
            return component;
        };
        this.getRecipeList = function() {
            return _this.recipeList;
        };
        this.appInfo = {
            appName: config.appInfo.appName,
            apiDomain: utils_1.normaliseUrlOrThrowError(config.appInfo.apiDomain),
            websiteDomain: utils_1.normaliseUrlOrThrowError(config.appInfo.websiteDomain),
            apiBasePath: SuperTokens.getNormalisedBasePathOrDefault(
                constants_1.DEFAULT_API_BASE_PATH,
                config.appInfo.apiBasePath
            ),
            websiteBasePath: SuperTokens.getNormalisedBasePathOrDefault(
                constants_1.DEFAULT_WEBSITE_BASE_PATH,
                config.appInfo.websiteBasePath
            ),
            logoFullURL: config.appInfo.logoFullURL || undefined
        };
        if (config.recipeList === undefined) {
            throw new Error("No recipeList provided to SuperTokens."); // TODO Add link to appropriate docs.
        }
        this.recipeList = config.recipeList;
    }
    /*
     * Static Methods.
     */
    SuperTokens.init = function(config) {
        if (SuperTokens.instance !== undefined) {
            throw new Error("SuperTokens was already initialized");
        }
        SuperTokens.instance = new SuperTokens(config);
    };
    SuperTokens.getInstanceIfDefined = function() {
        if (SuperTokens.instance === undefined) {
            throw new Error("SuperTokens must be initialized before calling this method.");
        }
        return SuperTokens.instance;
    };
    SuperTokens.getAppInfo = function() {
        return SuperTokens.getInstanceIfDefined().getAppInfo();
    };
    SuperTokens.canHandleRoute = function(url) {
        return SuperTokens.getInstanceIfDefined().canHandleRoute(url);
    };
    SuperTokens.getRoutingComponent = function(url) {
        return SuperTokens.getInstanceIfDefined().getRoutingComponent(url);
    };
    SuperTokens.getRecipeList = function() {
        return SuperTokens.getInstanceIfDefined().getRecipeList();
    };
    SuperTokens.getNormalisedBasePathOrDefault = function(defaultPath, path) {
        if (path !== undefined) {
            return utils_1.normalisePath(path);
        } else {
            return defaultPath;
        }
    };
    /*
     * Tests methods.
     */
    SuperTokens.reset = function() {
        if (!utils_1.isTest()) {
            return;
        }
        SuperTokens.instance = undefined;
        return;
    };
    return SuperTokens;
})();
exports.default = SuperTokens;
