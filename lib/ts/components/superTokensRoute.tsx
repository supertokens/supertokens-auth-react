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

/*
 * Imports.
 */

import * as React from "react";
import NormalisedURLPath from "../normalisedURLPath";
import SuperTokens from "../superTokens";
import { WithRouterType } from "../types";
import { getRecipeIdFromSearch, getWindowOrThrow } from "../utils";

/*
 * Component.
 */

export function getSuperTokensRoutesForReactRouterDom(): JSX.Element[] {
    try {
        // eslint-disable-next-line
        const ReactRouterDom = require("react-router-dom");
        const Route = ReactRouterDom.Route;
        const withRouter: WithRouterType = ReactRouterDom.withRouter;
        const pathsToComponentWithRecipeIdMap = SuperTokens.getInstanceOrThrow().getPathsToComponentWithRecipeIdMap();

        return Object.keys(pathsToComponentWithRecipeIdMap).map(path => {
            return (
                <Route exact key={`st-${path}`} path={path}>
                    <SuperTokensRouteWithRecipeId withRouter={withRouter} path={path} />
                </Route>
            );
        });
    } catch (e) {
        // If react-router-dom is absent from dependencies, return [];
        return [];
    }
}

function SuperTokensRouteWithRecipeId({
    path,
    withRouter
}: {
    path: string;
    withRouter: WithRouterType;
}): JSX.Element | null {
    const recipeId = getRecipeIdFromSearch(getWindowOrThrow().location.search);
    const normalisedPath = new NormalisedURLPath(path);

    const Component = SuperTokens.getInstanceOrThrow().getMatchingComponentForRouteAndRecipeId(
        normalisedPath,
        recipeId
    );
    if (Component === undefined) {
        return null;
    }

    const WithRouterComponent = withRouter(Component);

    return <WithRouterComponent />;
}
