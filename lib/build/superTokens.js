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
var __importStar =
    (this && this.__importStar) ||
    function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var React = __importStar(require("react"));
var utils_1 = require("./utils");
var getSuperTokensRoutesForReactRouterDom = require("./components/superTokensRoute")
    .getSuperTokensRoutesForReactRouterDom;
var session_1 = __importDefault(require("./recipe/session/session"));
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
        this.canHandleRoute = function() {
            return _this.getRoutingComponent() !== undefined;
        };
        this.getRoutingComponent = function() {
            var normalisedPath = utils_1.getCurrentNormalisedUrlPath();
            var recipeId = utils_1.getRecipeIdFromSearch(utils_1.getWindowOrThrow().location.search);
            var Component = _this.getMatchingComponentForRouteAndRecipeId(normalisedPath, recipeId);
            if (Component === undefined) {
                return undefined;
            }
            return React.createElement(Component, null);
        };
        this.getPathsToComponentWithRecipeIdMap = function() {
            if (_this.pathsToComponentWithRecipeIdMap !== undefined) {
                return _this.pathsToComponentWithRecipeIdMap;
            }
            var pathsToComponentWithRecipeIdMap = {};
            for (var i = 0; i < _this.getRecipeList().length; i++) {
                var recipe = _this.getRecipeList()[i];
                var features = recipe.getFeatures();
                var featurePaths = Object.keys(features);
                for (var j = 0; j < featurePaths.length; j++) {
                    // If no components yet for this route, initialize empty array.
                    var featurePath = featurePaths[j];
                    if (pathsToComponentWithRecipeIdMap[featurePath] === undefined) {
                        pathsToComponentWithRecipeIdMap[featurePath] = [];
                    }
                    pathsToComponentWithRecipeIdMap[featurePath].push({
                        rid: recipe.recipeId,
                        component: features[featurePath]
                    });
                }
            }
            _this.pathsToComponentWithRecipeIdMap = pathsToComponentWithRecipeIdMap;
            return _this.pathsToComponentWithRecipeIdMap;
        };
        this.getMatchingComponentForRouteAndRecipeId = function(normalisedUrl, recipeId) {
            var path = normalisedUrl.getAsStringDangerous();
            var routeComponents = _this.getPathsToComponentWithRecipeIdMap()[path];
            if (routeComponents === undefined) {
                return undefined;
            }
            // If recipeId provided, try to find a match.
            if (recipeId !== null) {
                for (var i = 0; i < routeComponents.length; i++) {
                    if (recipeId === routeComponents[i].rid) {
                        return routeComponents[i].component;
                    }
                }
            }
            // Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.
            return routeComponents[0].component;
        };
        this.getRecipeList = function() {
            return _this.recipeList;
        };
        this.getDefaultSessionRecipe = function() {
            return _this.getRecipeList().find(function(recipe) {
                return recipe.recipeId === session_1.default.RECIPE_ID;
            });
        };
        this.appInfo = utils_1.normaliseInputAppInfoOrThrowError(config.appInfo);
        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error(
                "Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/starter-guide/frontend"
            );
        }
        this.recipeList = config.recipeList.map(function(recipe) {
            return recipe(_this.appInfo);
        });
    }
    /*
     * Static Methods.
     */
    SuperTokens.init = function(config) {
        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }
        SuperTokens.instance = new SuperTokens(config);
    };
    SuperTokens.getInstanceOrThrow = function() {
        if (SuperTokens.instance === undefined) {
            var error = "SuperTokens must be initialized before calling this method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + constants_1.SSR_ERROR;
            }
            throw new Error(error);
        }
        return SuperTokens.instance;
    };
    SuperTokens.getAppInfo = function() {
        return SuperTokens.getInstanceOrThrow().getAppInfo();
    };
    SuperTokens.canHandleRoute = function() {
        return SuperTokens.getInstanceOrThrow().canHandleRoute();
    };
    SuperTokens.getRoutingComponent = function() {
        return SuperTokens.getInstanceOrThrow().getRoutingComponent();
    };
    SuperTokens.getSuperTokensRoutesForReactRouterDom = function() {
        return getSuperTokensRoutesForReactRouterDom();
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
