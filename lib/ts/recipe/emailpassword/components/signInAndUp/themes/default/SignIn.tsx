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
import { Component, createRef, FormEvent } from "react";
import { NormalisedPalette, FormBaseState, SignInThemeProps } from "../../../../types";
import { API_RESPONSE_STATUS, MANDATORY_FORM_FIELDS_ID_ARRAY } from "../../../../../../constants";
import { Button, FormRow, Input, InputError, Label } from "../../../library";
import { APIFormField } from "../../../../../../types";
import { CSSInterpolation } from "@emotion/serialize/types/index";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import FormBase from "./FormBase";

/*
 * Styles.
 */

function getStyles(palette: NormalisedPalette): any {
    return {
        headerTitle: {
            fontSize: palette.fonts.size[2],
            lineHeight: "40px",
            letterSpacing: "0.58px",
            fontWeight: 800,
            color: palette.colors.textPrimary
        } as CSSInterpolation,

        headerSubTitle: {
            marginTop: "9px",
            marginBottom: "21px"
        } as CSSInterpolation,

        forgotPasswordLink: {
            marginTop: "10px"
        } as CSSInterpolation
    };
}

/*
 * Component.
 */

export default class SignInTheme extends Component<SignInThemeProps, FormBaseState> {
    /*
     * Constructor.
     */
    constructor(props: SignInThemeProps) {
        super(props);

        const formFields = props.formFields.map(field => {
            return {
                ...field,
                ref: createRef<HTMLInputElement>(),
                validated: false
            };
        });

        this.state = {
            formFields,
            generalError: undefined,
            isLoading: false
        };
    }

    /*
     * Render.
     */

    render() {
        const { signUpClicked, forgotPasswordClick, defaultStyles, palette, onSuccess, callAPI } = this.props;
        let styleFromInit = this.props.styleFromInit || {};
        const { generalError, formFields, isLoading } = this.state;
        const styles = getStyles(palette);

        return (
            <FormBase
                header={
                    <>
                        <div className="headerTitle" css={[styles.headerTitle, styleFromInit.headerTitle]}>
                            Sign In
                        </div>
                        <div className="headerSubtitle" css={[styles.headerSubTitle, styleFromInit.headerSubtitle]}>
                            <div
                                className="secondaryText"
                                css={[defaultStyles.secondaryText, styleFromInit.secondaryText]}>
                                Not registered yet?
                                <span
                                    className="link"
                                    onClick={signUpClicked}
                                    css={[defaultStyles.link, styleFromInit.link]}>
                                    Sign Up
                                </span>
                            </div>
                        </div>
                    </>
                }
                footer={
                    <div
                        className="link secondaryText forgotPasswordLink"
                        css={[
                            defaultStyles.link,
                            defaultStyles.secondaryText,
                            styles.forgotPasswordLink,
                            styleFromInit.link,
                            styleFromInit.secondaryText,
                            styleFromInit.forgotPasswordLink
                        ]}
                        onClick={forgotPasswordClick}>
                        Forgot password?
                    </div>
                }
                formFields={formFields}
                generalError={generalError}
                defaultStyles={defaultStyles}
                palette={palette}
                isLoading={isLoading}
                buttonLabel={"SIGN IN"}
                onSuccess={onSuccess}
                callAPI={callAPI}
            />
        );
    }
}
