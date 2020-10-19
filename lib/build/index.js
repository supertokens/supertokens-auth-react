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
    function SuperTokens(config) {
        this.recipeList = [];
        this.appInfo = {
            appName: config.appInfo.appName,
            apiDomain: utils_1.normaliseUrl(config.appInfo.apiDomain),
            apiBasePath:
                (config.appInfo.apiBasePath !== undefined && utils_1.normalisePath(config.appInfo.apiBasePath)) ||
                constants_1.DEFAULT_API_BASE_PATH,
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
        this.recipeList = config.recipeList;
    }
    /*
     * Instance Methods.
     */
    SuperTokens.prototype.getAppInfo = function() {
        return this.appInfo;
    };
    SuperTokens.prototype.canHandleRoute = function(urlString) {
        var url = new URL(urlString);
        var pathname = utils_1.normalisePath(url.pathname);
        // If pathname doesn't start with websiteBasePath, return false.
        if (!pathname.startsWith(SuperTokens.getAppInfo().websiteBasePath)) {
            return false;
        }
        var rId = utils_1.getRecipeIdFromUrl(urlString);
        return this.recipeList.some(function(recipe) {
            return recipe.canHandleRoute(pathname, rId);
        });
    };
    SuperTokens.prototype.getRoutingComponent = function(urlString) {
        var url = new URL(urlString);
        var pathname = utils_1.normalisePath(url.pathname);
        // If pathname doesn't start with websiteBasePath, return false.
        if (!pathname.startsWith(SuperTokens.getAppInfo().websiteBasePath)) {
            return undefined;
        }
        var rId = utils_1.getRecipeIdFromUrl(urlString);
        var component;
        this.recipeList.find(function(recipe) {
            component = recipe.getRoutingComponent(pathname, rId);
            if (component !== undefined) return true; // exist the loop.
        });
        return component;
    };
    SuperTokens.prototype.getRecipeList = function() {
        return this.recipeList;
    };
    /*
     * Static Methods.
     */
    SuperTokens.init = function(config) {
        if (SuperTokens.instance !== undefined) throw new Error("SuperTokens was already initialized");
        return (SuperTokens.instance = new SuperTokens(config));
    };
    SuperTokens.getInstanceIfDefined = function() {
        if (SuperTokens.instance === undefined)
            throw new Error("SuperTokens must be initialized before calling this method.");
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
    /*
     * Tests methods.
     */
    SuperTokens.reset = function() {
        if (!utils_1.isTest()) {
            return;
        }
        SuperTokens.instance = undefined;
    };
    return SuperTokens;
})();
exports.default = SuperTokens;
exports.canHandleRoute = SuperTokens.canHandleRoute;
exports.init = SuperTokens.init;
exports.getRecipeList = SuperTokens.getRecipeList;
exports.getRoutingComponent = SuperTokens.getRoutingComponent;
