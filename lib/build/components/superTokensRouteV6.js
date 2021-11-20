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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var React = __importStar(require("react"));
var normalisedURLPath_1 = __importDefault(require("../normalisedURLPath"));
/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDomV6(supertokensInstance) {
    var reactRouterDom = supertokensInstance.getReactRouterDom();
    if (reactRouterDom === undefined) {
        return [];
    }
    var Route = reactRouterDom.Route;
    var pathsToFeatureComponentWithRecipeIdMap = supertokensInstance.getPathsToFeatureComponentWithRecipeIdMap();
    return Object.keys(pathsToFeatureComponentWithRecipeIdMap).map(function (path) {
        path = path === "" ? "/" : path;
        return React.createElement(Route, {
            key: "st-" + path,
            path: path,
            element: React.createElement(SuperTokensRouteWithRecipeId, {
                supertokensInstance: supertokensInstance,
                path: path,
            }),
        });
    });
}
exports.getSuperTokensRoutesForReactRouterDomV6 = getSuperTokensRoutesForReactRouterDomV6;
function SuperTokensRouteWithRecipeId(_a) {
    var supertokensInstance = _a.supertokensInstance,
        path = _a.path;
    var history = supertokensInstance.getReactRouterDom().useNavigate();
    var normalisedPath = new normalisedURLPath_1.default(path);
    var featureComponentWithRecipeId = supertokensInstance.getMatchingComponentForRouteAndRecipeId(normalisedPath);
    if (featureComponentWithRecipeId === undefined) {
        return null;
    }
    return React.createElement(featureComponentWithRecipeId.component, { history: history });
}
