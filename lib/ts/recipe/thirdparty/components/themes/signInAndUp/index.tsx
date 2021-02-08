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
import * as React from "react";
import { PureComponent, Fragment } from "react";
import { SOMETHING_WENT_WRONG_ERROR } from "../../../../../constants";
import StyleContext from "../../../../../styles/styleContext";
import SignUpFooter from "../../../../emailpassword/components/themes/signInAndUp/signUpFooter";
import { SignInAndUpThemeProps, ThirdPartySignInAndUpThemeState } from "../../../types";
import { ThemeBase } from "../themeBase";
/*
 * Component.
 */

class SignInAndUpTheme extends PureComponent<SignInAndUpThemeProps, ThirdPartySignInAndUpThemeState> {
    static contextType = StyleContext;

    /*
     * Constructor
     */
    constructor(props: SignInAndUpThemeProps) {
        super(props);
        if (this.props.status === "GENERAL_ERROR") {
            this.state = {
                status: this.props.status,
                generalError: SOMETHING_WENT_WRONG_ERROR
            };
        } else {
            this.state = {
                status: this.props.status
            };
        }
    }

    signInClick = async (providerId: string): Promise<void> => {
        try {
            const generalError = await this.props.signInAndUpClick(providerId);
            if (generalError !== undefined) {
                this.setState(() => ({
                    status: "GENERAL_ERROR",
                    generalError
                }));
            }
        } catch (e) {
            this.setState(() => ({
                status: "GENERAL_ERROR",
                generalError: SOMETHING_WENT_WRONG_ERROR
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
                <div data-supertokens="container" css={styles.container}>
                    <div data-supertokens="row" css={styles.row}>
                        <div data-supertokens="headerTitle" css={styles.headerTitle}>
                            Sign Up / Sign In
                        </div>
                        <div data-supertokens="divider" css={styles.divider}></div>
                        {this.state.status === "GENERAL_ERROR" && (
                            <div data-supertokens="generalError" css={styles.generalError}>
                                {this.state.generalError}
                            </div>
                        )}
                        {this.props.providers.map(provider => {
                            return (
                                <div
                                    key={`provider-${provider.id}`}
                                    style={styles.providerContainer}
                                    data-supertokens="providerContainer">
                                    <span onClick={() => this.signInClick(provider.id)}>
                                        {provider.buttonComponent}
                                    </span>
                                </div>
                            );
                        })}
                        <SignUpFooter
                            privacyPolicyLink={this.props.privacyPolicyLink}
                            termsOfServiceLink={this.props.termsOfServiceLink}
                        />
                    </div>
                </div>
            </Fragment>
        );
    };
}

function SignInAndUpThemeWrapper(props: SignInAndUpThemeProps): JSX.Element {
    return (
        <ThemeBase>
            <SignInAndUpTheme {...props} />
        </ThemeBase>
    );
}

export default SignInAndUpThemeWrapper;
