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
import * as React from "react";
import { PureComponent, createRef, Fragment } from "react";

import { CSSObject } from "@emotion/serialize/types";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Styles } from "../../../../../../types";
import { SubmitNewPasswordThemeProps, SubmitNewPasswordThemeState } from "../../../../types";
import { FormRow, Button } from "../library";
import FormBase from "../library/FormBase";
import { StyleProvider, StyleConsumer } from "../styles/styleContext";
import { NormalisedPalette } from "../types";

/*
 * Styles.
 */

function getStyles(palette: NormalisedPalette): Styles {
    return {
        headerTitle: {
            fontSize: palette.fonts.size[2],
            lineHeight: "40px",
            letterSpacing: "0.58px",
            fontWeight: 600,
            color: palette.colors.textTitle
        } as CSSObject,

        headerSubTitle: {
            marginTop: "9px",
            marginBottom: "21px"
        } as CSSObject,

        forgotPasswordLink: {
            marginTop: "10px"
        } as CSSObject,

        successMessage: {
            marginTop: "15px",
            marginBottom: "15px"
        } as CSSObject
    };
}

/*
 * Component.
 */

export default class SubmitNewPasswordTheme extends PureComponent<
    SubmitNewPasswordThemeProps,
    SubmitNewPasswordThemeState
> {
    /*
     * Constructor.
     */
    constructor(props: SubmitNewPasswordThemeProps) {
        super(props);

        const formFields = props.formFields.map(field => {
            return {
                ...field,
                ref: createRef<HTMLInputElement>(),
                validated: false
            };
        });

        this.state = {
            formFields
        };
    }

    onSuccess = (): void => {
        this.setState(oldState => ({
            ...oldState,
            hasNewPassword: true
        }));

        if (this.props.onSuccess !== undefined) {
            this.props.onSuccess();
        }
    };

    /*
     * Render.
     */

    render(): JSX.Element {
        const { callAPI, onSignInClicked } = this.props;
        const styleFromInit = this.props.styleFromInit !== undefined ? this.props.styleFromInit : {};
        const { formFields, hasNewPassword } = this.state;

        return (
            <StyleProvider styleFromInit={styleFromInit}>
                <StyleConsumer>
                    {styles => {
                        const componentStyles = getStyles(styles.palette);

                        if (hasNewPassword === true) {
                            return (
                                <div className="container" css={styles.container}>
                                    <div className="row" css={styles.row}>
                                        <div
                                            className="headerTitle"
                                            css={[styles.headerTitle, styleFromInit.headerTitle]}>
                                            Success!
                                        </div>
                                        <FormRow key="form-button">
                                            <Fragment>
                                                <div
                                                    className="primaryText successMessage"
                                                    css={[
                                                        styles.primaryText,
                                                        componentStyles.successMessage,
                                                        styles.successMessage
                                                    ]}>
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
                            <FormBase
                                formFields={formFields}
                                buttonLabel={"Change password"}
                                onSuccess={this.onSuccess}
                                callAPI={callAPI}
                                showLabels={false}
                                header={
                                    <Fragment>
                                        <div
                                            className="headerTitle"
                                            css={[componentStyles.headerTitle, styles.headerTitle]}>
                                            Change your password
                                        </div>
                                        <div className="headerSubtitle" css={styles.headerSubTitle}>
                                            <div className="secondaryText" css={styles.secondaryText}>
                                                Enter a new password below to change your password
                                            </div>
                                        </div>
                                    </Fragment>
                                }
                            />
                        );
                    }}
                </StyleConsumer>
            </StyleProvider>
        );
    }
}
