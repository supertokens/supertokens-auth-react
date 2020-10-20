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
var constants_1 = require("./constants");
var superTokensUrl_1 = require("./helpers/superTokensUrl");
var utils_1 = require("./helpers/utils");
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
        this.canHandleRoute = function() {
            var url = new superTokensUrl_1.default();
            // If pathname doesn't start with websiteBasePath, return false.
            if (!url.matchesBasePath) {
                return false;
            }
            return _this.recipeList.some(function(recipe) {
                return recipe.canHandleRoute(url);
            });
        };
        this.getRoutingComponent = function() {
            var url = new superTokensUrl_1.default();
            // If pathname doesn't start with websiteBasePath, return false.
            if (!url.matchesBasePath) {
                return undefined;
            }
            var component;
            for (var i = 0; i < _this.recipeList.length; i++) {
                component = _this.recipeList[i].getRoutingComponent(url);
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
            apiDomain: superTokensUrl_1.default.normaliseUrlOrThrowError(config.appInfo.apiDomain),
            websiteDomain: superTokensUrl_1.default.normaliseUrlOrThrowError(config.appInfo.websiteDomain),
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
    SuperTokens.canHandleRoute = function() {
        return SuperTokens.getInstanceIfDefined().canHandleRoute();
    };
    SuperTokens.getRoutingComponent = function() {
        return SuperTokens.getInstanceIfDefined().getRoutingComponent();
    };
    SuperTokens.getRecipeList = function() {
        return SuperTokens.getInstanceIfDefined().getRecipeList();
    };
    SuperTokens.getNormalisedBasePathOrDefault = function(defaultPath, path) {
        if (path !== undefined) {
            return superTokensUrl_1.default.normalisePath(path);
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
