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

/*
 * Imports.
 */

import * as React from "react";
import SuperTokens from "../superTokens";
import { ComponentWithRecipeId, PathToComponentWithRecipeIdMap } from "../types";
import { getRecipeIdFromSearch } from "../utils";

/*
* SuperTokensRouteWithRecipeId
* Using react-router-dom, we can only match based on the route and not on the combination of path and query params.
* having one route per component would lead to clashes when two components have the same route but different recipeId,
* the first one would always take precedence.
* Hence, the component rendered in the Route is an abstraction that decides which Feature to render based
* on the rId.
* See SuperTokensRouteWithRecipeId below.
*/
export function getSuperTokensRoutesForReactRouterDom (): JSX.Element[] {
	try {
		let pathsToComponentWithRecipeIdMap: PathToComponentWithRecipeIdMap = {};
		SuperTokens.getRecipeList().map(recipe => {
			const features = recipe.getFeatures();
			return Object.keys(features).map(featurePath => {
				const fullPath = `${SuperTokens.getAppInfo().websiteBasePath}${featurePath}`;

				// If no components yet for this route, initialize empty array.
				if(pathsToComponentWithRecipeIdMap[fullPath] === undefined) {
					pathsToComponentWithRecipeIdMap[fullPath] = []
				}

				pathsToComponentWithRecipeIdMap[fullPath].push({
					rid: recipe.getRecipeId(),
					component: features[featurePath]
				})

			})
		});
		return Object.keys(pathsToComponentWithRecipeIdMap).map(path => SuperTokensRouteWithRecipeId(path, pathsToComponentWithRecipeIdMap[path]));
	} catch (e) {
		return [];
	}
	
	
}


function SuperTokensRouteWithRecipeId(path: string, routeComponents: ComponentWithRecipeId[]): JSX.Element {
	const Route = require('react-router-dom').Route;
	const recipeId = getRecipeIdFromSearch(window.location.search);

	// If recipeId provided, try to find a match.
	if (recipeId !== null) {
		for (let i = 0; i < routeComponents.length; i++) {
			if (recipeId === routeComponents[i].rid) {
				return <Route exact key={`st-${path}`} path={path} component={routeComponents[i].component} />;
			}
		}
	}
	
	// Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.
	return <Route exact key={`st-${path}`} path={path} component={routeComponents[0].component} />

}