/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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
import React, { PureComponent, Fragment } from "react";
import StyleContext from "../../../styles/styleContext";

import { SignInThemeProps } from "../../../../types";

/** @jsx jsx */
import { jsx } from "@emotion/react";

import FormBase from "../../../library/formBase";

/*
 * Component.
 */

export default class SignInTheme extends PureComponent<SignInThemeProps> {
    static contextType = StyleContext;

    /*
     * Render.
     */

    render(): JSX.Element {
        const styles = this.context;

        const { signUpClicked, forgotPasswordClick, onSuccess, signInAPI } = this.props;
        const { formFields } = this.props;

        return (
            <FormBase
                formFields={formFields}
                buttonLabel={"SIGN IN"}
                onSuccess={onSuccess}
                callAPI={signInAPI}
                showLabels={true}
                header={
                    <Fragment>
                        <div data-supertokens="headerTitle" css={styles.headerTitle}>
                            Sign In
                        </div>
                        <div data-supertokens="headerSubtitle" css={styles.headerSubtitle}>
                            <div data-supertokens="secondaryText" css={styles.secondaryText}>
                                Not registered yet?
                                <span data-supertokens="link" onClick={signUpClicked} css={styles.link}>
                                    Sign Up
                                </span>
                            </div>
                        </div>
                        <div data-supertokens="divider" css={styles.divider}></div>
                    </Fragment>
                }
                footer={
                    <div
                        data-supertokens="link secondaryText forgotPasswordLink"
                        css={[styles.link, styles.secondaryText, styles.forgotPasswordLink]}
                        onClick={forgotPasswordClick}>
                        Forgot password?
                    </div>
                }
            />
        );
    }
}
