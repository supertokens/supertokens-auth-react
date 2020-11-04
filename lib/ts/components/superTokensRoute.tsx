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
import { ReactComponentClass } from "../types";
import { getRecipeIdFromSearch } from "../utils";

/*
 * Component.
 */

export function getSuperTokensRoutesForReactRouterDom(): JSX.Element[] {
    try {
        const Route = require("react-router-dom").Route;
        const pathsToComponentWithRecipeIdMap = SuperTokens.getPathsToComponentWithRecipeIdMap();
        return (
            Object.keys(pathsToComponentWithRecipeIdMap)
                /*
                 *  Sort by path length to make sure a shorter path doesn't take precedence
                 * i.e. /auth/reset-password comes before /auth/
                 */
                .sort(path => -path.length)
                .map(path => <SuperTokensRouteWithRecipeId Route={Route} key={`st-${path}`} path={path} />)
        );
    } catch (e) {
        // If react-router-dom is absent from dependencies, return [];
        return [];
    }
}

function SuperTokensRouteWithRecipeId({
    path,
    Route
}: {
    path: string;
    Route: new () => React.Component<{ exact: unknown; path: string; component?: ReactComponentClass }>;
}): JSX.Element {
    const recipeId = getRecipeIdFromSearch(window.location.search);
    const component = SuperTokens.getMatchingComponentForRouteAndRecipeId(path, recipeId);
    return <Route exact key={`st-${path}`} path={path} component={component} />;
}
