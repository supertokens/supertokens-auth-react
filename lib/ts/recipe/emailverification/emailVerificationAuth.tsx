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
import { PureComponent, ReactElement } from "react";

import { FeatureBaseProps } from "../../types";
import Recipe from "./recipe";

export default class EmailVerificationAuth extends PureComponent<FeatureBaseProps & { recipe: Recipe }> {
    async componentDidMount(): Promise<void> {
        // If email verification mode is off or optional, return.
        if (this.props.recipe.config.mode !== "REQUIRED") {
            return;
        }
        // Otherwise, make sure that the email is valid, otherwise, redirect to email validation screen.
        const isEmailVerified = await this.props.recipe.isEmailVerified();
        if (isEmailVerified === false) {
            return await this.props.recipe.redirect({ action: "VERIFY_EMAIL" }, this.props.history);
        }
    }

    render = (): JSX.Element | null => {
        return this.props.children as ReactElement<any>;
    };
}
