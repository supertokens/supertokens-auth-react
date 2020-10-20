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

import React, {Component, Fragment} from "react";
import SuperTokens from "../superTokens";
import {Route} from "react-router-dom";

/*
 * Component.
 */
export default class SuperTokensRoute extends Component {
	render () {
		return (
			<Fragment>
				{
					SuperTokens.getRecipeList().map(recipe => {
						const features = recipe.getFeatures();
						return Object.keys(features).map(featurePath => {
							const fullPath = `${SuperTokens.getAppInfo().websiteBasePath}${featurePath}`;
							// if (!feature.disableDefaultRoute) { //TODO
							return <Route path={fullPath} component={features[featurePath]} />
						});
					})
				}
			</Fragment>
		)
	} 
}
