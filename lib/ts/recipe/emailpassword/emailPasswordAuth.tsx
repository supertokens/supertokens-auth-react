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

import EmailPassword from "./recipe";
import { FeatureBaseProps } from "../../types";
import SessionAuth from "../session/sessionAuth";
import EmailVerificationAuth from "../emailverification/emailVerificationAuth";
import SuperTokens from "../../superTokens";
import Recipe from "./recipe";

type Props = FeatureBaseProps & {
    recipe: Recipe;
    requireAuth?: boolean;
    onSessionExpired?: () => void;
};

class EmailPasswordAuth extends PureComponent<Props> {
    /*
     * Render.
     */
    render = (): JSX.Element | null => {
        const emailVerification = (
            <EmailVerificationAuth recipe={this.props.recipe.emailVerification} history={this.props.history}>
                {this.props.children}
            </EmailVerificationAuth>
        );

        if (this.props.requireAuth === false) {
            return <SessionAuth onSessionExpired={this.props.onSessionExpired}>{emailVerification}</SessionAuth>;
        }

        return (
            <SessionAuth
                redirectToLogin={() =>
                    EmailPassword.getInstanceOrThrow().redirectToAuthWithRedirectToPath(undefined, this.props.history)
                }
                requireAuth={true}
                onSessionExpired={this.props.onSessionExpired}>
                {emailVerification}
            </SessionAuth>
        );
    };
}

export default function EmailPasswordAuthWrapper({
    children,
    requireAuth,
    onSessionExpired,
}: {
    children: JSX.Element;
    requireAuth?: boolean;
    onSessionExpired?: () => void;
}): JSX.Element {
    const reactRouterDom = SuperTokens.getInstanceOrThrow().getReactRouterDom();
    const history = reactRouterDom === undefined ? undefined : reactRouterDom.useHistoryCustom();

    return (
        <EmailPasswordAuth
            history={history}
            onSessionExpired={onSessionExpired}
            requireAuth={requireAuth}
            recipe={EmailPassword.getInstanceOrThrow()}>
            {children}
        </EmailPasswordAuth>
    );
}
