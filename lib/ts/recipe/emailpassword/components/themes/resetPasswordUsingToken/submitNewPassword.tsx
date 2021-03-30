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
import StyleContext from "../../../../../styles/styleContext";

import { SubmitNewPasswordThemeProps, SubmitNewPasswordThemeState } from "../../../types";
import { FormRow, Button } from "../../library";
import FormBase from "../../library/formBase";

/*
 * Component.
 */

export default class SubmitNewPasswordTheme extends PureComponent<
    SubmitNewPasswordThemeProps,
    SubmitNewPasswordThemeState
> {
    static contextType = StyleContext;

    /*
     * Constructor.
     */
    constructor(props: SubmitNewPasswordThemeProps) {
        super(props);
        this.state = {
            status: "READY",
        };
    }

    onSuccess = (): void => {
        this.setState(() => ({
            status: "SUCCESS",
        }));
        this.props.onSuccess();
    };

    /*
     * Render.
     */

    render(): JSX.Element {
        const styles = this.context;
        const { submitNewPasswordAPI, formFields, onSignInClicked } = this.props;
        const { status } = this.state;

        if (status === "SUCCESS") {
            return (
                <div data-supertokens="container" css={styles.container}>
                    <div data-supertokens="row" css={styles.row}>
                        <div data-supertokens="headerTitle" css={styles.headerTitle}>
                            Success!
                        </div>
                        <FormRow key="form-button">
                            <Fragment>
                                <div
                                    data-supertokens="primaryText submitNewPasswordSuccessMessage"
                                    css={[styles.primaryText, styles.submitNewPasswordSuccessMessage]}>
                                    Your password has been updated successfully
                                </div>
                                <Button
                                    disabled={false}
                                    isLoading={false}
                                    type="button"
                                    onClick={onSignInClicked}
                                    label={"SIGN IN"}
                                />
                            </Fragment>
                        </FormRow>
                    </div>
                </div>
            );
        }

        return (
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row" css={styles.row}>
                    <FormBase
                        formFields={formFields}
                        buttonLabel={"Change password"}
                        onSuccess={this.onSuccess}
                        validateOnBlur={true}
                        callAPI={submitNewPasswordAPI}
                        showLabels={true}
                        header={
                            <Fragment>
                                <div data-supertokens="headerTitle" css={styles.headerTitle}>
                                    Change your password
                                </div>
                                <div data-supertokens="headerSubtitle" css={styles.headerSubtitle}>
                                    <div data-supertokens="secondaryText" css={styles.secondaryText}>
                                        Enter a new password below to change your password
                                    </div>
                                </div>
                            </Fragment>
                        }
                    />
                </div>
            </div>
        );
    }
}
