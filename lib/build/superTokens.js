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
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var React = __importStar(require("react"));
var utils_1 = require("./utils");
var superTokensRoute_1 = require("./components/superTokensRoute");
var superTokensRouteV6_1 = require("./components/superTokensRouteV6");
var constants_1 = require("./constants");
/*
 * Class.
 */
var SuperTokens = /** @class */ (function () {
    /*
     * Constructor.
     */
    function SuperTokens(config) {
        var _this = this;
        this.recipeList = [];
        /*
         * Instance Methods.
         */
        this.canHandleRoute = function () {
            return _this.getRoutingComponent() !== undefined;
        };
        this.getRoutingComponent = function () {
            var normalisedPath = utils_1.getCurrentNormalisedUrlPath();
            var FeatureComponentWithRecipeId = _this.getMatchingComponentForRouteAndRecipeId(normalisedPath);
            if (FeatureComponentWithRecipeId === undefined) {
                return undefined;
            }
            return React.createElement(FeatureComponentWithRecipeId.component, null);
        };
        this.getPathsToFeatureComponentWithRecipeIdMap = function () {
            // Memoized version of the map.
            if (_this.pathsToFeatureComponentWithRecipeIdMap !== undefined) {
                return _this.pathsToFeatureComponentWithRecipeIdMap;
            }
            var pathsToFeatureComponentWithRecipeIdMap = {};
            for (var i = 0; i < _this.recipeList.length; i++) {
                var recipe = _this.recipeList[i];
                var features = recipe.getFeatures();
                var featurePaths = Object.keys(features);
                for (var j = 0; j < featurePaths.length; j++) {
                    // If no components yet for this route, initialize empty array.
                    var featurePath = featurePaths[j];
                    if (pathsToFeatureComponentWithRecipeIdMap[featurePath] === undefined) {
                        pathsToFeatureComponentWithRecipeIdMap[featurePath] = [];
                    }
                    pathsToFeatureComponentWithRecipeIdMap[featurePath].push(features[featurePath]);
                }
            }
            _this.pathsToFeatureComponentWithRecipeIdMap = pathsToFeatureComponentWithRecipeIdMap;
            return _this.pathsToFeatureComponentWithRecipeIdMap;
        };
        this.getMatchingComponentForRouteAndRecipeId = function (normalisedUrl) {
            var path = normalisedUrl.getAsStringDangerous();
            var routeComponents = _this.getPathsToFeatureComponentWithRecipeIdMap()[path];
            if (routeComponents === undefined) {
                return undefined;
            }
            var component = routeComponents.find(function (c) {
                return c.matches();
            });
            if (component !== undefined) {
                return component;
            }
            // Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.
            return routeComponents[0];
        };
        this.getReactRouterDom = function () {
            return SuperTokens.reactRouterDom;
        };
        this.appInfo = utils_1.normaliseInputAppInfoOrThrowError(config.appInfo);
        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error(
                "Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }
        this.recipeList = config.recipeList.map(function (recipe) {
            return recipe(_this.appInfo);
        });
    }
    /*
     * Static Methods.
     */
    SuperTokens.init = function (config) {
        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }
        SuperTokens.instance = new SuperTokens(config);
    };
    SuperTokens.getInstanceOrThrow = function () {
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
    SuperTokens.canHandleRoute = function () {
        return SuperTokens.getInstanceOrThrow().canHandleRoute();
    };
    SuperTokens.getRoutingComponent = function () {
        return SuperTokens.getInstanceOrThrow().getRoutingComponent();
    };
    SuperTokens.getSuperTokensRoutesForReactRouterDom = function (reactRouterDom) {
        if (reactRouterDom === undefined) {
            throw new Error(
                // eslint-disable-next-line @typescript-eslint/quotes
                'Please use getSuperTokensRoutesForReactRouterDom like getSuperTokensRoutesForReactRouterDom(require("react-router-dom")) in your render function'
            );
        }
        SuperTokens.reactRouterDom = reactRouterDom;
        if (SuperTokens.reactRouterDomIsV6 === undefined) {
            SuperTokens.reactRouterDomIsV6 = reactRouterDom.withRouter === undefined;
        }
        if (SuperTokens.reactRouterDomIsV6) {
            // this function wraps the react-router-dom v6 useNavigate function in a way
            // that enforces that it runs within a useEffect. The reason we do this is
            // cause of https://github.com/remix-run/react-router/issues/7460
            // which gets shown when visiting a social auth callback url like
            // /auth/callback/github, without a valid code or state. This then
            // doesn't navigate the user to the auth page.
            var useNavigateHookForRRDV6 = function () {
                var navigateHook = reactRouterDom.useNavigate();
                var actualResolve = React.useRef(undefined);
                var toReturn = function (to) {
                    if (actualResolve.current === undefined) {
                        setTimeout(function () {
                            toReturn(to);
                        }, 0);
                    } else {
                        actualResolve.current(to);
                    }
                };
                React.useEffect(
                    function () {
                        function somFunc() {
                            new Promise(function (resolve) {
                                actualResolve.current = resolve;
                            }).then(function (to) {
                                navigateHook(to);
                                somFunc();
                            });
                        }
                        somFunc();
                    },
                    [navigateHook]
                );
                return toReturn;
            };
            SuperTokens.reactRouterDom.useHistoryCustom = useNavigateHookForRRDV6;
            return superTokensRouteV6_1.getSuperTokensRoutesForReactRouterDomV6(SuperTokens.getInstanceOrThrow());
        }
        SuperTokens.reactRouterDom.useHistoryCustom = reactRouterDom.useHistory;
        return superTokensRoute_1.getSuperTokensRoutesForReactRouterDom(SuperTokens.getInstanceOrThrow());
    };
    SuperTokens.prototype.getRecipeOrThrow = function (recipeId) {
        var recipe = this.recipeList.find(function (recipe) {
            return recipe.config.recipeId === recipeId;
        });
        if (recipe === undefined) {
            throw new Error("Missing recipe: " + recipeId);
        }
        return recipe;
    };
    /*
     * Tests methods.
     */
    SuperTokens.reset = function () {
        if (!utils_1.isTest()) {
            return;
        }
        SuperTokens.instance = undefined;
        return;
    };
    SuperTokens.reactRouterDomIsV6 = undefined;
    return SuperTokens;
})();
exports.default = SuperTokens;
