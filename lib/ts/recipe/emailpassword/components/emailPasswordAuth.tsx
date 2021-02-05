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

import EmailPassword from "../emailPassword";
import { FeatureBaseProps, ReactComponentClass, WithRouterType } from "../../../types";
import SessionAuth from "../../session/sessionAuth";
import EmailVerificationAuth from "../../emailverification/emailVerificationAuth";

/*
 * Component.
 */

class EmailPasswordAuth extends PureComponent<FeatureBaseProps> {
    /*
     * Render.
     */
    render = (): JSX.Element | null => {
        return (
            <SessionAuth recipeId={EmailPassword.getInstanceOrThrow().recipeId} history={this.props.history}>
                <EmailVerificationAuth
                    recipeId={EmailPassword.getInstanceOrThrow().recipeId}
                    history={this.props.history}>
                    {this.props.children}
                </EmailVerificationAuth>
            </SessionAuth>
        );
    };
}

export default (function(): ReactComponentClass {
    try {
        // eslint-disable-next-line
        const withRouter: WithRouterType = require("react-router-dom").withRouter;
        return withRouter(EmailPasswordAuth);
    } catch (e) {
        return EmailPasswordAuth;
    }
})();
