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
import { FormFieldState, NormalisedPalette, SignUpThemeProps } from "../../../../types";
import { CSSObject } from "@emotion/serialize/types/index";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import { openExternalLink } from "../../../../../../utils";
import FormBase from "../../../library/FormBase";

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
            color: palette.colors.textTitle
        } as CSSObject,

        headerSubTitle: {
            marginTop: "9px",
            marginBottom: "21px"
        } as CSSObject,

        privacyPolicyAndTermsAndConditions: {
            marginTop: "10px"
        } as CSSObject
    };
}

/*
 * Component.
 */

export default class SignUpTheme extends PureComponent<SignUpThemeProps, { formFields: FormFieldState[] }> {
    /*
     * Constructor.
     */
    constructor(props: SignUpThemeProps) {
        super(props);

        const emailPasswordOnly = props.formFields.length === 2;
        const formFields = props.formFields.map(field => {
            return {
                ...field,
                ref: createRef<HTMLInputElement>(),
                validated: false,
                showIsRequired: (() => {
                    // If email and password only, do not show required indicator (*).
                    if (emailPasswordOnly) {
                        return false;
                    }
                    // Otherwise, show for all non optional fields (including email and password).
                    return field.optional === false;
                })()
            };
        });

        this.state = {
            formFields
        };
    }

    /*
     * Render.
     */
    render(): JSX.Element {
        const {
            privacyPolicyLink,
            termsAndConditionsLink,
            signInClicked,
            defaultStyles,
            palette,
            onSuccess,
            callAPI
        } = this.props;
        const { formFields } = this.state;
        const styleFromInit = this.props.styleFromInit !== undefined ? this.props.styleFromInit : {};
        const styles = getStyles(palette);

        return (
            <FormBase
                formFields={formFields}
                defaultStyles={defaultStyles}
                palette={palette}
                buttonLabel={"SIGN UP"}
                onSuccess={onSuccess}
                callAPI={callAPI}
                showLabels={true}
                header={
                    <Fragment>
                        <div className="headerTitle" css={[styles.headerTitle, styleFromInit.headerTitle]}>
                            Sign Up
                        </div>
                        <div className="headerSubtitle" css={[styles.headerSubTitle, styleFromInit.headerSubtitle]}>
                            <div
                                className="secondaryText"
                                css={[defaultStyles.secondaryText, styleFromInit.secondaryText]}>
                                Already have an account?
                                <span
                                    className="link"
                                    onClick={signInClicked}
                                    css={[defaultStyles.link, styleFromInit.link]}>
                                    Sign In
                                </span>
                            </div>
                        </div>
                        <div className="divider" css={[defaultStyles.divider, styleFromInit.divider]}></div>
                    </Fragment>
                }
                footer={
                    <div
                        className="privacyPolicyAndTermsAndConditions secondaryText"
                        css={[
                            defaultStyles.secondaryText,
                            styles.privacyPolicyAndTermsAndConditions,
                            styleFromInit.secondaryText,
                            styleFromInit.privacyPolicyAndTermsAndConditions
                        ]}>
                        By signin up, you agree to our
                        <span
                            className="link"
                            css={[defaultStyles.link, styleFromInit.link]}
                            onClick={() => openExternalLink(termsAndConditionsLink)}>
                            Terms of Service
                        </span>
                        and
                        <span
                            className="link"
                            css={[defaultStyles.link, styleFromInit.link]}
                            onClick={() => openExternalLink(privacyPolicyLink)}>
                            Privacy Policy
                        </span>
                    </div>
                }
            />
        );
    }
}
