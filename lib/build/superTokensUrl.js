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
var superTokens_1 = require("./superTokens");
var utils_1 = require("./utils");
/*
 * Class.
 */
var SuperTokensUrl = /** @class */ (function() {
    function SuperTokensUrl() {
        this.recipeId = utils_1.getRecipeIdFromSearch(window.location.search);
        this.normalisedPathname = utils_1.removePendingSlashFromPath(window.location.pathname);
        this.matchesBasePath = this.normalisedPathname.startsWith(superTokens_1.default.getAppInfo().websiteBasePath);
        this.normalisedPathnameWithoutWebsiteBasePath = utils_1.getNormalisedRouteWithoutWebsiteBasePath(
            this.normalisedPathname,
            superTokens_1.default.getAppInfo().websiteBasePath
        );
    }
    return SuperTokensUrl;
})();
exports.default = SuperTokensUrl;
