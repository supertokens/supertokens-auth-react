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

/*
 * Component.
 */

export function getSuperTokensRoutesForReactRouterDomV6(supertokensInstance: SuperTokens): JSX.Element[] {
    const reactRouterDom = supertokensInstance.getReactRouterDom();
    if (reactRouterDom === undefined) {
        return [];
    }

    const Route = reactRouterDom.Route;
    const pathsToFeatureComponentWithRecipeIdMap = supertokensInstance.getPathsToFeatureComponentWithRecipeIdMap();
    return Object.keys(pathsToFeatureComponentWithRecipeIdMap).map((path) => {
        path = path === "" ? "/" : path;
        return (
            <Route
                key={`st-${path}`}
                path={path}
                element={<SuperTokensRouteWithRecipeId supertokensInstance={supertokensInstance} path={path} />}
            />
        );
    });
}

function SuperTokensRouteWithRecipeId({
    supertokensInstance,
    path,
}: {
    supertokensInstance: SuperTokens;
    path: string;
}): JSX.Element | null {
    const history = supertokensInstance.getReactRouterDom()?.useHistoryCustom();
    const normalisedPath = new NormalisedURLPath(path);

    const featureComponentWithRecipeId = supertokensInstance.getMatchingComponentForRouteAndRecipeId(normalisedPath);

    if (featureComponentWithRecipeId === undefined) {
        return null;
    }

    return <featureComponentWithRecipeId.component history={history} />;
}
