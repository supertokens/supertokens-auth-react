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
import { NormalisedPalette, EnterEmailThemeProps, EnterEmailThemeState } from "../../../../types";
import { CSSObject } from "@emotion/serialize/types";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import FormBase from "../../../library/FormBase";
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
            color: palette.colors.textTitle
        } as CSSObject,

        headerSubTitle: {
            marginTop: "9px",
            marginBottom: "21px"
        } as CSSObject,

        successMessage: {
            marginBottom: "15px"
        } as CSSObject
    };
}

/*
 * Component.
 */

export default class EnterEmailTheme extends PureComponent<EnterEmailThemeProps, EnterEmailThemeState> {
    /*
     * Constructor.
     */
    constructor(props: EnterEmailThemeProps) {
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

    /*
     * Methods.
     */

    onSuccess = (): void => {
        this.setState(() => ({
            emailSent: true
        }));
        if (this.props.onSuccess) {
            this.props.onSuccess();
        }
    };

    resend = (): void => {
        this.setState(() => ({
            emailSent: false
        }));
    };

    /*
     * Render.
     */
    render(): JSX.Element {
        const { defaultStyles, palette, callAPI } = this.props;
        const { formFields, emailSent } = this.state;
        const styleFromInit = this.props.styleFromInit !== undefined ? this.props.styleFromInit : {};
        const styles = getStyles(palette);

        // If email sent, show success UI.
        if (emailSent === true) {
            return (
                <div className="container" css={[defaultStyles.container, styleFromInit.container]}>
                    <div className="row" css={[defaultStyles.row, styleFromInit.row]}>
                        <div
                            className="primaryText successMessage"
                            css={[
                                defaultStyles.primaryText,
                                styleFromInit.primaryText,
                                styles.successMessage,
                                styleFromInit.successMessage
                            ]}>
                            You will receive a password recovery link at your email address in a few minutes.{" "}
                            <span className="link" css={[defaultStyles.link, styleFromInit.link]} onClick={this.resend}>
                                Resend
                            </span>
                        </div>
                    </div>
                </div>
            );
        }

        // Otherwise, return Form.
        return (
            <FormBase
                formFields={formFields}
                defaultStyles={defaultStyles}
                palette={palette}
                buttonLabel={"Email me"}
                onSuccess={this.onSuccess}
                callAPI={callAPI}
                showLabels={false}
                header={
                    <Fragment>
                        <div className="headerTitle" css={[styles.headerTitle, styleFromInit.headerTitle]}>
                            Reset your password
                        </div>
                        <div className="headerSubtitle" css={[styles.headerSubTitle, styleFromInit.headerSubtitle]}>
                            <div
                                className="secondaryText"
                                css={[defaultStyles.secondaryText, styleFromInit.secondaryText]}>
                                We will send you an email to reset your password
                            </div>
                        </div>
                    </Fragment>
                }
            />
        );
    }
}
