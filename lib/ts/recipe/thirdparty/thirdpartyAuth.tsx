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
import { PureComponent } from "react";

import ThirdParty from "./thirdparty";
import { FeatureBaseProps } from "../../types";
import SessionAuth from "../session/sessionAuth";
import EmailVerificationAuth from "../emailverification/emailVerificationAuth";
import SuperTokens from "../../superTokens";

/*
 * Component.
 */

class ThirdPartyAuth extends PureComponent<FeatureBaseProps & { requireAuth?: boolean }> {
    /*
     * Render.
     */
    render = (): JSX.Element | null => {
        return (
            <SessionAuth
                requireAuth={this.props.requireAuth === undefined || this.props.requireAuth}
                recipeId={ThirdParty.getInstanceOrThrow().recipeId}
                history={this.props.history}>
                <EmailVerificationAuth recipeId={ThirdParty.getInstanceOrThrow().recipeId} history={this.props.history}>
                    {this.props.children}
                </EmailVerificationAuth>
            </SessionAuth>
        );
    };
}

export default function ThirdPartyAuthWrapper({
    children,
    requireAuth,
}: {
    children: JSX.Element;
    requireAuth?: boolean;
}): JSX.Element {
    const reactRouterDom = SuperTokens.getInstanceOrThrow().getReactRouterDom();
    if (reactRouterDom === undefined) {
        return (
            <ThirdPartyAuth requireAuth={requireAuth} recipeId={ThirdParty.getInstanceOrThrow().recipeId}>
                {children}
            </ThirdPartyAuth>
        );
    }

    const Component = reactRouterDom.withRouter(ThirdPartyAuth);
    return (
        <Component requireAuth={requireAuth} recipeId={ThirdParty.getInstanceOrThrow().recipeId}>
            {children}
        </Component>
    );
}
