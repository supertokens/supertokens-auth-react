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

export function getSuperTokensRoutesForReactRouterDom(supertokensInstance: SuperTokens): JSX.Element[] {
    const reactRouterDom = supertokensInstance.getReactRouterDom();
    if (reactRouterDom === undefined) {
        return [];
    }

    const Route = reactRouterDom.Route;
    const withRouter: WithRouterType = reactRouterDom.withRouter;
    const pathsToFeatureComponentWithRecipeIdMap = supertokensInstance.getPathsToFeatureComponentWithRecipeIdMap();
    return Object.keys(pathsToFeatureComponentWithRecipeIdMap).map((path) => {
        path = path === "" ? "/" : path;
        return (
            <Route exact key={`st-${path}`} path={path}>
                <SuperTokensRouteWithRecipeId
                    supertokensInstance={supertokensInstance}
                    withRouter={withRouter}
                    path={path}
                />
            </Route>
        );
    });
}

function SuperTokensRouteWithRecipeId({
    supertokensInstance,
    path,
    withRouter,
}: {
    supertokensInstance: SuperTokens;
    path: string;
    withRouter: WithRouterType;
}): JSX.Element | null {
    const normalisedPath = new NormalisedURLPath(path);

    const featureComponentWithRecipeId = supertokensInstance.getMatchingComponentForRouteAndRecipeId(normalisedPath);

    const WithRouterComponent = React.useRef<any>(
        featureComponentWithRecipeId === undefined ? undefined : withRouter(featureComponentWithRecipeId.component)
    );

    if (WithRouterComponent.current === undefined) {
        return null;
    }

    return <WithRouterComponent.current />;
}
