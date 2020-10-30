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
import { createRef, FormEvent, useCallback, useState } from "react";
import { NormalisedPalette, SignInThemeProps } from "../../../../types";
import { API_RESPONSE_STATUS, MANDATORY_FORM_FIELDS_ID_ARRAY } from "../../../../../../constants";
import { Button, FormRow, Input, InputError, Label } from "../../../library";
import { APIFormField } from "../../../../../../types";
import { CSSInterpolation } from "@emotion/serialize/types/index";

/** @jsx jsx */
import { jsx } from "@emotion/core";

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

export default function SignInTheme(props: SignInThemeProps) {
    /*
     * Props.
     */
    const { callAPI, onSuccess, signUpClicked, forgotPasswordClick, defaultStyles, palette } = props;
    let styleFromInit = props.styleFromInit || {};
    const styles = getStyles(palette);
    /*
     * States.
     */
    const [formFields, setFormFields] = useState(
        props.formFields.map(field => {
            return {
                ...field,
                ref: createRef<HTMLInputElement>(),
                validated: false
            };
        })
    );

    const [generalError, setGeneralError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /*
     * Methods.
     */

    const onSignIn = async () => {
        // Set isLoading to true.
        setIsLoading(true);

        // Get the fields values from form.
        const fields = formFields.map(field => {
            return {
                id: field.id,
                value: field.ref.current !== null ? field.ref.current.value : ""
            };
        });

        // Call Sign In API.
        const result = await callAPI(fields);

        // Set isLoading to false.
        setIsLoading(false);

        // If successfully logged in.
        if (result.status === API_RESPONSE_STATUS.OK) {
            // TODO: Show result in UI?

            // Call onSuccess if exist.
            if (onSuccess !== undefined) {
                onSuccess();
            }
        }

        // If general error, or wrong credentials error.
        if (
            result.status === API_RESPONSE_STATUS.GENERAL_ERROR ||
            result.status === API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR
        ) {
            // Update general error message state.
            setGeneralError(result.message);
        }

        // If field error.
        if (result.status === API_RESPONSE_STATUS.FIELD_ERROR) {
            const errorFields = result.fields;

            // Update formFields state with errors.
            setFormFields(
                formFields.map(field => {
                    for (let i = 0; i < errorFields.length; i++) {
                        if (field.id === errorFields[i].id) {
                            field.error = errorFields[i].error;
                        }
                        // Indicate to inputs that the valeu was submitted for validation.
                        field.validated = true;
                    }
                    return field;
                })
            );
        }
    };

    const handleInputChange = useCallback(
        async (field: APIFormField) => {
            for (let i = 0; i < formFields.length; i++) {
                if (field.id === formFields[i].id) {
                    // remove error on input change.
                    formFields[i].error = undefined;
                    formFields[i].validated = false;
                }
            }

            // Delay the error update to prevent UI glitches.
            setTimeout(() => setFormFields([...formFields]), 300);
        },
        [formFields, setFormFields]
    );

    /*
     * Event Handlers.
     */
    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSignIn();
    };

    /*
     * Render.
     */
    return (
        <div className="container" css={[defaultStyles.container, styleFromInit.container]}>
            <div className="row" css={[defaultStyles.row, styleFromInit.row]}>
                <div className="headerTitle" css={[styles.headerTitle, styleFromInit.headerTitle]}>
                    Sign In
                </div>
                <div className="headerSubtitle" css={[styles.headerSubTitle, styleFromInit.headerSubtitle]}>
                    <div className="secondaryText" css={[defaultStyles.secondaryText, styleFromInit.secondaryText]}>
                        Not registered yet?
                        <span className="link" onClick={signUpClicked} css={[defaultStyles.link, styleFromInit.link]}>
                            Sign Up
                        </span>
                    </div>
                </div>

                <div className="divider" css={[defaultStyles.divider, styleFromInit.divider]}></div>

                {generalError && (
                    <div className="generalError" css={[defaultStyles.generalError, styleFromInit.generalError]}>
                        {generalError}
                    </div>
                )}
                <form autoComplete="off" noValidate onSubmit={onFormSubmit}>
                    {formFields.map(field => {
                        let type = "text";
                        // If email or password, replace field type.
                        if (MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id)) {
                            type = field.id;
                        }
                        return (
                            <FormRow style={styleFromInit.formRow} key={field.id} defaultStyles={defaultStyles}>
                                <>
                                    <Label
                                        style={styleFromInit.label}
                                        value={field.label}
                                        defaultStyles={defaultStyles}
                                    />

                                    <Input
                                        style={styleFromInit.input}
                                        errorStyle={styleFromInit.inputError}
                                        adornmentStyle={styleFromInit.inputAdornment}
                                        type={type}
                                        name={field.id}
                                        placeholder={field.placeholder}
                                        ref={field.ref}
                                        onChange={handleInputChange}
                                        hasError={field.error !== undefined}
                                        validated={field.validated}
                                        defaultStyles={defaultStyles}
                                        palette={palette}
                                    />

                                    {field.error && (
                                        <InputError
                                            style={styleFromInit.inputErrorMessage}
                                            error={field.error}
                                            defaultStyles={defaultStyles}
                                        />
                                    )}
                                </>
                            </FormRow>
                        );
                    })}

                    <FormRow style={styleFromInit.formRow} key="signin-button" defaultStyles={defaultStyles}>
                        <>
                            <Button
                                defaultStyles={defaultStyles}
                                style={styleFromInit.button}
                                disabled={isLoading}
                                isLoading={isLoading}
                                type="submit"
                                label="SIGN IN"
                            />
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
                        </>
                    </FormRow>
                </form>
            </div>
        </div>
    );
}
