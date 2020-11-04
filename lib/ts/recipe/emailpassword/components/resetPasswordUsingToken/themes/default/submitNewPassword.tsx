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
import { Component, createRef, Fragment } from "react";
import { NormalisedPalette, SubmitNewPasswordThemeProps, SubmitNewPasswordThemeState } from "../../../../types";

import { CSSInterpolation } from "@emotion/serialize/types";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import FormBase from "../../../library/FormBase";
import { FormRow, Button } from "../../../library";
import { Styles } from "../../../../../../types";

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
            color: palette.colors.textPrimary
        } as CSSInterpolation,

        headerSubTitle: {
            marginTop: "9px",
            marginBottom: "21px"
        } as CSSInterpolation,

        forgotPasswordLink: {
            marginTop: "10px"
        } as CSSInterpolation,

        successMessage: {
            marginTop: "15px",
            marginBottom: "15px"
        } as CSSInterpolation
    };
}

/*
 * Component.
 */

export default class SubmitNewPasswordTheme extends Component<
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
        this.setState({
            hasNewPassword: true
        });
        if (this.props.onSuccess) {
            this.props.onSuccess();
        }
    };

    /*
     * Render.
     */

    render(): JSX.Element {
        const { defaultStyles, palette, callAPI, onSignInClicked } = this.props;
        const styleFromInit = this.props.styleFromInit || {};
        const { formFields, hasNewPassword } = this.state;
        const styles = getStyles(palette);

        if (hasNewPassword === true) {
            return (
                <div className="container" css={[defaultStyles.container, styleFromInit.container]}>
                    <div className="row" css={[defaultStyles.row, styleFromInit.row]}>
                        <div className="headerTitle" css={[styles.headerTitle, styleFromInit.headerTitle]}>
                            Success!
                        </div>
                        <FormRow style={styleFromInit.formRow} key="form-button" defaultStyles={defaultStyles}>
                            <Fragment>
                                <div
                                    className="primaryText successMessage"
                                    css={[
                                        defaultStyles.primaryText,
                                        styleFromInit.primaryText,
                                        styles.successMessage,
                                        styleFromInit.successMessage
                                    ]}>
                                    Your password has been updated successfully
                                </div>
                                <Button
                                    defaultStyles={defaultStyles}
                                    style={styleFromInit.button}
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
                defaultStyles={defaultStyles}
                palette={palette}
                buttonLabel={"Change password"}
                onSuccess={this.onSuccess}
                callAPI={callAPI}
                showLabels={false}
                header={
                    <Fragment>
                        <div className="headerTitle" css={[styles.headerTitle, styleFromInit.headerTitle]}>
                            Change your password
                        </div>
                        <div className="headerSubtitle" css={[styles.headerSubTitle, styleFromInit.headerSubtitle]}>
                            <div
                                className="secondaryText"
                                css={[defaultStyles.secondaryText, styleFromInit.secondaryText]}>
                                Enter a new password below to change your password
                            </div>
                        </div>
                    </Fragment>
                }
            />
        );
    }
}
