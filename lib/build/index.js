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
const utils_1 = require("./utils");
/*
 * Consts.
 */
const apiBasePath = "/auth";
const websiteBasePath = "/auth";
/*
 * Class.
 */
class SuperTokens {
    /*
     * Static methods.
     */
    static init(config) {
        if (SuperTokens.appInfo || SuperTokens.recipeList.length > 0)
            throw new Error("SuperTokens was already initialized");
        SuperTokens.appInfo = {
            appName: config.appInfo.appName,
            apiDomain: utils_1.getUrlFromDomain(config.appInfo.apiDomain),
            apiBasePath: config.appInfo.apiBasePath || apiBasePath,
            websiteDomain: utils_1.getUrlFromDomain(config.appInfo.websiteDomain),
            websiteBasePath:
                (config.appInfo.websiteBasePath && utils_1.cleanPath(config.appInfo.websiteBasePath)) ||
                websiteBasePath,
            logoFullURL: config.appInfo.logoFullURL || undefined
        };
        if (!config.recipeList) throw new Error("No recipeList provided to SuperTokens."); // TODO Add link to appropriate docs.
        SuperTokens.recipeList = config.recipeList;
    }
    static getAppInfo() {
        if (SuperTokens.appInfo === undefined)
            throw new Error("SuperTokens must be initialized before calling this method.");
        return SuperTokens.appInfo;
    }
    static handleRoute(url) {
        return SuperTokens.recipeList.some(recipe => recipe.handleRoute(url));
    }
    static getRoutingComponent(url) {
        // TODO
    }
    static getRecipeList() {
        return SuperTokens.recipeList;
    }
    /*
     * Helpers.
     */
    static prependWebsiteBasePath(path) {
        return `${SuperTokens.getAppInfo().websiteBasePath}${utils_1.cleanPath(path)}`;
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!utils_1.isTest()) return;
        SuperTokens.appInfo = undefined;
        SuperTokens.recipeList.length = 0;
    }
}
SuperTokens.recipeList = [];
exports.default = SuperTokens;
