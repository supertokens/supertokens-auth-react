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
var normalisedURLPath_1 = __importDefault(require("../normalisedURLPath"));
var superTokens_1 = __importDefault(require("../superTokens"));
var utils_1 = require("../utils");
/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDom() {
    try {
        // eslint-disable-next-line
        var ReactRouterDom = require("react-router-dom");
        var Route_1 = ReactRouterDom.Route;
        var withRouter_1 = ReactRouterDom.withRouter;
        var pathsToComponentWithRecipeIdMap = superTokens_1.default
            .getInstanceOrThrow()
            .getPathsToComponentWithRecipeIdMap();
        return Object.keys(pathsToComponentWithRecipeIdMap).map(function(path) {
            return React.createElement(
                Route_1,
                { exact: true, key: "st-" + path, path: path },
                React.createElement(SuperTokensRouteWithRecipeId, { withRouter: withRouter_1, path: path })
            );
        });
    } catch (e) {
        // If react-router-dom is absent from dependencies, return [];
        return [];
    }
}
exports.getSuperTokensRoutesForReactRouterDom = getSuperTokensRoutesForReactRouterDom;
function SuperTokensRouteWithRecipeId(_a) {
    var path = _a.path,
        withRouter = _a.withRouter;
    var recipeId = utils_1.getRecipeIdFromSearch(utils_1.getWindowOrThrow().location.search);
    var normalisedPath = new normalisedURLPath_1.default(path);
    var componentWithRecipeId = superTokens_1.default
        .getInstanceOrThrow()
        .getMatchingComponentForRouteAndRecipeId(normalisedPath, recipeId);
    if (componentWithRecipeId === undefined) {
        return null;
    }
    var WithRouterComponent = withRouter(componentWithRecipeId.component);
    return React.createElement(WithRouterComponent, { recipeId: componentWithRecipeId.rid });
}
