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
import { defaultStyles, palette } from "../../../../styles/styles";
import { FormFieldState, SignUpThemeProps } from "../../../../types";
import { API_RESPONSE_STATUS, MANDATORY_FORM_FIELDS_ID_ARRAY } from "../../../../../../constants";
import { Button, FormRow, Input, InputError, Label } from "../../../library";
import { APIFormField } from "../../../../../../types";
import { CSSInterpolation } from "@emotion/serialize/types/index";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import { openExternalLink } from "../../../../../../utils";

/*
 * Styles.
 */
const styles = {
    headerTitle: {
        fontSize: palette.fonts.size[2],
        lineHeight: "40px",
        letterSpacing: "0.58px",
        fontWeight: 800,
        color: palette.colors.primary
    } as CSSInterpolation,

    headerSubTitle: {
        marginTop: "9px",
        marginBottom: "21px"
    } as CSSInterpolation
};

/*
 * Component.
 */

export default function SignUpTheme(props: SignUpThemeProps) {
    /*
     * Props.
     */
    const { callAPI, privacyPolicyLink, termsAndConditionsLink, onSuccess, signInClicked } = props;
    let styleFromInit = props.styleFromInit || {};

    /*
     * States.
     */
    const emailPasswordOnly = props.formFields.length === 2;
    const [formFields, setFormFields] = useState<FormFieldState[]>(
        props.formFields.map(field => {
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
        })
    );

    const [isLoading, setIsLoading] = useState(false);

    /*
     * Methods.
     */
    const onSignUp = async () => {
        // Set isLoading to true.
        setIsLoading(true);

        // Get the fields values from form.
        const fields = formFields.map(field => {
            return {
                id: field.id,
                value: field.ref.current !== null ? field.ref.current.value : ""
            };
        });

        // Call Sign Up API.
        const result = await callAPI(fields);

        // Set isLoading to false.
        setIsLoading(false);

        // If successfully logged in.
        if (result.status === API_RESPONSE_STATUS.OK) {
            // TODO: Show result in UI?

            // If onSuccess if exist, sleep for 2seconds and call it.
            if (onSuccess !== undefined) {
                setTimeout(() => onSuccess(), 2000);
            }
        }

        // If field error.
        if (result.status === API_RESPONSE_STATUS.FIELD_ERROR && result.fields !== undefined) {
            const errorFields = result.fields;
            // Update formFields state with errors.
            setFormFields(
                formFields.map(field => {
                    for (let i = 0; i < errorFields.length; i++) {
                        if (field.id === errorFields[i].id) {
                            field.error = errorFields[i].error;
                        }
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

            // Slightly delay the error update to prevent UI glitches.
            setTimeout(() => setFormFields([...formFields]), 300);
        },
        [formFields, setFormFields]
    );

    /*
     * Event Handlers.
     */
    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSignUp();
    };

    /*
     * Render.
     */
    return (
        <div css={[defaultStyles.container, styleFromInit.container]}>
            <div css={[defaultStyles.row, styleFromInit.row]}>
                <div css={[styles.headerTitle, styleFromInit.headerTitle]}>Sign Up</div>
                <div css={[styles.headerSubTitle, styleFromInit.headerSubtitle]}>
                    <div css={[defaultStyles.secondaryText, styleFromInit.secondaryText]}>
                        Already have an account?
                        <span onClick={signInClicked} css={[defaultStyles.link, styleFromInit.link]}>
                            Sign In
                        </span>
                    </div>
                </div>

                <div css={[defaultStyles.divider, styleFromInit.divider]}></div>

                <form autoComplete="off" noValidate onSubmit={onFormSubmit}>
                    {formFields.map(field => {
                        let type = "text";
                        // If email or password, replace field type.
                        if (MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id)) {
                            type = field.id;
                        }
                        return (
                            <FormRow style={{}} key={field.id}>
                                <>
                                    <Label
                                        style={styleFromInit.label}
                                        value={field.label}
                                        showIsRequired={field.showIsRequired}
                                    />
                                    <Input
                                        style={styleFromInit.input}
                                        errorStyle={styleFromInit.inputError}
                                        type={type}
                                        name={field.id}
                                        placeholder={field.placeholder}
                                        ref={field.ref}
                                        onChange={handleInputChange}
                                        hasError={field.error !== undefined}
                                        validated={field.validated}
                                    />
                                    {field.error && (
                                        <InputError style={styleFromInit.inputErrorMessage} error={field.error} />
                                    )}
                                </>
                            </FormRow>
                        );
                    })}

                    <FormRow style={styleFromInit.formRow} key="signin-button">
                        <Button
                            style={styleFromInit.button}
                            disabled={isLoading}
                            isLoading={isLoading}
                            type="submit"
                            label="SIGN UP"
                        />
                    </FormRow>

                    <div css={[defaultStyles.secondaryText, styleFromInit.secondaryText]}>
                        By signin up, you agree to our
                        <span
                            css={[defaultStyles.link, styleFromInit.link]}
                            onClick={() => openExternalLink(termsAndConditionsLink)}>
                            Terms of Service
                        </span>
                        and
                        <span
                            css={[defaultStyles.link, styleFromInit.link]}
                            onClick={() => openExternalLink(privacyPolicyLink)}>
                            Privacy Policy
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
