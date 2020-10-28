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
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {defaultStyles, palette} from '../../../styles/styles';
import { SignInThemeProps } from "../types";
import { API_RESPONSE_STATUS, MANDATORY_FORM_FIELDS_ID_ARRAY } from "../../../constants";
import { Button, FormRow, Input, InputError, Label } from "../../../components";
import { APIFormField } from "../../../types";
import { CSSInterpolation } from "@emotion/serialize/types/index";

/** @jsx jsx */
import { jsx } from '@emotion/core';

/*
 * Component.
 */
export default function SignInTheme(props: SignInThemeProps) {
    /*
     * Props.
     */
    const {callAPI, onSuccess, signUpClicked, forgotPasswordClick} = props;
    let styleFromInit = props.styleFromInit || {};
    /*
     * States.
     */
    const [formFields, setFormFields] = useState(props.formFields.map(field => {
        return {
            ...field,
            ref: useRef<HTMLInputElement>(null)
        }
    }));

    const [isLoading, setIsLoading] = useState(false);

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
                value: (field.ref.current !== null) ? field.ref.current.value : ""
            }
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

        //If field error.
        if (result.status === API_RESPONSE_STATUS.FIELD_ERROR && result.fields !== undefined) {
            const errorFields = result.fields;
            // Update formFields state with errors.
            setFormFields(
                formFields.map(field => {
                    for (let i = 0; i < errorFields.length; i++) {
                        if (field.id === errorFields[i].id) {
                            field.error = errorFields[i].error;
                        }
                    }
                    return field;
                })
            );
        }
    }

    const handleInputChange = useCallback(
        async (field: APIFormField) => {
            for (let i = 0; i < formFields.length; i++) {
                if (field.id === formFields[i].id) {
                    // remove error on input change.
                    formFields[i].error = undefined;
                }
            }

            // Delay the error update to prevent UI glitches.
            setTimeout(
                () => setFormFields([...formFields])
            , 300);
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
        <div css={[defaultStyles.container, styleFromInit.container]} >
            <div css={[defaultStyles.row, styleFromInit.row]}>
                
                <div css={[styles.headerTitle, styleFromInit.headerTitle]} >Sign In</div>
                <div css={[styles.headerSubTitle, styleFromInit.headerSubtitle]} >
                    <div css={[defaultStyles.secondaryText, styleFromInit.secondaryText]} >
                        Not registered yet? 
                        <span 
                            onClick={signUpClicked}
                            css={[styles.signUpLink, defaultStyles.link, styleFromInit.link]}
                        >
                            Sign up
                        </span>
                    </div>
                </div>

                <div css={[defaultStyles.divider, styleFromInit.divider]}></div>

                <form noValidate onSubmit={onFormSubmit}>
                    {
                        formFields.map(field => {
                            let type = "text";
                            // If email or password, replace field type.
                            if (MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id)) {
                                type = field.id;
                            }
                            return (
                                <FormRow style={{}} key={field.id}>
                                    <>
                                        <Label style={styleFromInit.label} value={field.label} />
                                        <Input 
                                            style={styleFromInit.input}
                                            errorStyle={styleFromInit.inputError}
                                            type={type} 
                                            name={field.id}  
                                            placeholder={field.placeholder} 
                                            ref={field.ref}
                                            onChange={handleInputChange}
                                            hasError={field.error !== undefined}
                                        /> 
                                        {field.error && <InputError style={styleFromInit.inputErrorMessage} error={field.error} />}
                                    </>
                                </FormRow>
                            )
                        })
                    }
                    <FormRow style={styleFromInit.formRow} key="signin-button">
                        <Button style={styleFromInit.button} disabled={isLoading} isLoading={isLoading} type="submit" label="SIGN IN" />
                    </FormRow> 
                    <div 
                        css={[defaultStyles.link, defaultStyles.secondaryText, styleFromInit.link, styleFromInit.secondaryText]}
                        onClick={forgotPasswordClick}
                    >
                        Forgot password?
                    </div>
                </form>


            </div>

        </div>
    );
}

/*
 * Styles.
 */
const styles = {

    headerTitle: {
        fontSize: palette.fonts.size[2],
        lineHeight: "40px",
        letterSpacing: "0.28px",
        fontWeight: 800,
        color: palette.colors.primary
    } as CSSInterpolation,

    headerSubTitle: {
        marginTop: "15px",
        marginBottom: "15px"
    } as CSSInterpolation,

    signUpLink: {
        paddingLeft: '5px'
    }
}