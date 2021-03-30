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
import { SignInAndUpThemeProps, ThirdPartySignInAndUpThemeState } from "../../../types";
/*
 * Component.
 */

export default class SignInAndUpProvidersForm extends PureComponent<
    SignInAndUpThemeProps,
    ThirdPartySignInAndUpThemeState
> {
    static contextType = StyleContext;

    /*
     * Constructor
     */
    constructor(props: SignInAndUpThemeProps) {
        super(props);
        if (this.props.status === "GENERAL_ERROR") {
            this.state = {
                status: this.props.status,
                generalError: SOMETHING_WENT_WRONG_ERROR,
            };
        } else {
            this.state = {
                status: this.props.status,
            };
        }
    }

    signInClick = async (providerId: string): Promise<void> => {
        try {
            const generalError = await this.props.signInAndUpClick(providerId);
            if (generalError !== undefined) {
                this.setState(() => ({
                    status: "GENERAL_ERROR",
                    generalError,
                }));
            }
        } catch (e) {
            this.setState(() => ({
                status: "GENERAL_ERROR",
                generalError: SOMETHING_WENT_WRONG_ERROR,
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
                {this.state.status === "GENERAL_ERROR" && (
                    <div data-supertokens="generalError" css={styles.generalError}>
                        {this.state.generalError}
                    </div>
                )}
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
