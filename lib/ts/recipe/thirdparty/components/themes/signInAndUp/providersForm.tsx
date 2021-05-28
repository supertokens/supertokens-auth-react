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
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { PureComponent, Fragment } from "react";
import { SOMETHING_WENT_WRONG_ERROR } from "../../../../../constants";
import StyleContext from "../../../../../styles/styleContext";
import { SignInAndUpThemeProps } from "../../../types";
/*
 * Component.
 */

export default class SignInAndUpProvidersForm extends PureComponent<SignInAndUpThemeProps, unknown> {
    static contextType = StyleContext;

    signInClick = async (providerId: string): Promise<void> => {
        try {
            const errorMessage = await this.props.signInAndUpClick(providerId);
            if (errorMessage !== undefined) {
                this.setState(() => ({
                    status: "ERROR",
                    message: errorMessage,
                }));
            }
        } catch (e) {
            this.setState(() => ({
                status: "ERROR",
                message: SOMETHING_WENT_WRONG_ERROR,
            }));
        }
    };

    /*
     * Methods.
     */

    render = (): JSX.Element => {
        const styles = this.context;

        /*
         * Render.
         */
        return (
            <Fragment>
                {this.props.providers.map((provider) => {
                    return (
                        <div
                            key={`provider-${provider.id}`}
                            style={styles.providerContainer}
                            data-supertokens="providerContainer">
                            <span onClick={() => this.signInClick(provider.id)}>{provider.buttonComponent}</span>
                        </div>
                    );
                })}
            </Fragment>
        );
    };
}
