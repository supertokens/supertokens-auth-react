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
var __extends =
    (this && this.__extends) ||
    (function() {
        var extendStatics = function(d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                        d.__proto__ = b;
                    }) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function(d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var react_1 = require("react");
var supertokens_1 = require("./supertokens");
var react_router_dom_1 = require("react-router-dom");
/*
 * Component.
 */
var SuperTokensRoute = /** @class */ (function(_super) {
    __extends(SuperTokensRoute, _super);
    function SuperTokensRoute() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    SuperTokensRoute.prototype.render = function() {
        return react_1.default.createElement(
            react_1.Fragment,
            null,
            supertokens_1.default.getRecipeList().map(function(recipe) {
                var features = recipe.getFeatures();
                return Object.keys(features).map(function(featurePath) {
                    var fullPath = "" + supertokens_1.default.getAppInfo().websiteBasePath + featurePath;
                    // if (!feature.disableDefaultRoute) { //TODO
                    return react_1.default.createElement(react_router_dom_1.Route, {
                        path: fullPath,
                        component: features[featurePath]
                    });
                });
            })
        );
    };
    return SuperTokensRoute;
})(react_1.Component);
exports.default = SuperTokensRoute;
