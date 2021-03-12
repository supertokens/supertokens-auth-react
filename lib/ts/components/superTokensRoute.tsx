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

/*
 * Component.
 */

export function getSuperTokensRoutesForReactRouterDom(): JSX.Element[] {
    const reactRouterDom = SuperTokens.getInstanceOrThrow().getReactRouterDom();
    if (reactRouterDom === undefined) {
        return [];
    }

    const Route = reactRouterDom.Route;
    const withRouter: WithRouterType = reactRouterDom.withRouter;
    const pathsToFeatureComponentWithRecipeIdMap = SuperTokens.getInstanceOrThrow().getPathsToFeatureComponentWithRecipeIdMap();
    return Object.keys(pathsToFeatureComponentWithRecipeIdMap).map((path) => {
        return (
            <Route exact key={`st-${path}`} path={path}>
                <SuperTokensRouteWithRecipeId withRouter={withRouter} path={path} />
            </Route>
        );
    });
}

function SuperTokensRouteWithRecipeId({
    path,
    withRouter,
}: {
    path: string;
    withRouter: WithRouterType;
}): JSX.Element | null {
    const normalisedPath = new NormalisedURLPath(path);
    const featureComponentWithRecipeId = SuperTokens.getInstanceOrThrow().getMatchingComponentForRouteAndRecipeId(
        normalisedPath
    );

    if (featureComponentWithRecipeId === undefined) {
        return null;
    }

    const WithRouterComponent = withRouter(featureComponentWithRecipeId.component);
    return <WithRouterComponent recipeId={featureComponentWithRecipeId.rid} />;
}
