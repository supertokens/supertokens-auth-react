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
import AuthRecipeModule from "../authRecipeModule";
import SuperTokens from "../../superTokens";

/*
 * Component.
 */

export default class EmailVerificationAuth<T, S, R, N> extends PureComponent<FeatureBaseProps> {
    /*
     * Methods.
     */
    getRecipeInstanceOrThrow = (): AuthRecipeModule<T, S, R, N> => {
        if (this.props.recipeId === undefined) {
            throw new Error("No recipeId props given to EmailVerificationAuth component");
        }

        const recipe = SuperTokens.getInstanceOrThrow().getRecipeOrThrow<T, S, R>(this.props.recipeId);
        if (recipe instanceof AuthRecipeModule === false) {
            throw new Error(
                `${recipe.recipeId} must be an instance of AuthRecipeModule to use EmailVerificationAuth component.`
            );
        }

        return recipe as AuthRecipeModule<T, S, R, N>;
    };

    isEmailVerifiedAPI = async (): Promise<boolean> => {
        try {
            return await this.getRecipeInstanceOrThrow().isEmailVerified();
        } catch (e) {
            // In case of API failure, continue, do not break the application.
            return true;
        }
    };

    async componentDidMount(): Promise<void> {
        // If email verification mode is off or optional, return.
        if (this.getRecipeInstanceOrThrow().isEmailVerificationRequired() === false) {
            return;
        }
        // Otherwise, make sure that the email is valid, otherwise, redirect to email validation screen.
        const isEmailVerified = await this.isEmailVerifiedAPI();
        if (isEmailVerified === false) {
            return await this.getRecipeInstanceOrThrow().redirect(
                ({ action: "VERIFY_EMAIL" } as unknown) as T,
                this.props.history
            );
        }
    }

    /*
     * Render.
     */
    render = (): JSX.Element | null => {
        return this.props.children as ReactElement<any>;
    };
}
