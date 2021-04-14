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
import React from "react";

import { getWindowOrThrow } from "supertokens-website/lib/build/utils";
import { FeatureBaseProps } from "../../types";
import AuthRecipeModule from "../authRecipeModule";
import SuperTokens from "../../superTokens";
import { isAuthRecipeModule } from "../authRecipeModule/utils";
import SessionContext from "./sessionContext";
import { getUserId } from "./";

/*
 * Component.
 */

export default class SessionAuth<T, S, R, N> extends React.PureComponent<
    FeatureBaseProps & { requireAuth?: boolean },
    { status: "LOADING" } | { status: "READY"; userId: string }
> {
    /*
     * Constructor.
     */
    constructor(props: FeatureBaseProps) {
        super(props);
        this.state = {
            status: "LOADING",
        };
    }

    /*
     * Methods.
     */
    getRecipeInstanceOrThrow = (): AuthRecipeModule<T, S, R, N> => {
        if (this.props.recipeId === undefined) {
            throw new Error("No recipeId props given to SessionAuth component");
        }

        const recipe = SuperTokens.getInstanceOrThrow().getRecipeOrThrow(this.props.recipeId);
        if (isAuthRecipeModule<T, S, R, N>(recipe)) {
            return recipe;
        }

        throw new Error(`${recipe.recipeId} must be an instance of AuthRecipeModule to use SessionAuth component.`);
    };

    async componentDidMount(): Promise<void> {
        const sessionExists = await this.getRecipeInstanceOrThrow().doesSessionExist();
        if (sessionExists === false) {
            const redirectToPath = getWindowOrThrow().location.pathname;
            return await this.getRecipeInstanceOrThrow().redirect(
                ({ action: "SIGN_IN_AND_UP" } as unknown) as T,
                this.props.history,
                {
                    redirectToPath,
                }
            );
        }

        const userId = await getUserId();

        // Update status to ready.
        this.setState((oldState) => {
            return {
                ...oldState,
                status: "READY",
                userId,
            };
        });
    }

    /*
     * Render.
     */
    render = (): JSX.Element | null => {
        if (this.state.status === "LOADING") {
            return null;
        }

        return (
            <SessionContext.Provider value={{ userId: this.state.userId, doesSessionExist: true }}>
                {this.props.children}
            </SessionContext.Provider>
        );
    };
}
