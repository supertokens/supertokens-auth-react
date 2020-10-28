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

/** @jsx jsx */
import { jsx } from '@emotion/core';

/*
 * Component.
 */
export default function SignInTheme(props: SignInThemeProps) {
    /*
     * Props.
     */
    const {callAPI, onSuccess, styleFormInit} = props;

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
    const [isDisabled, setIsDisabled] = useState(true);

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

                    // Validate field on Change.
                    formFields[i].error = await formFields[i].validate(field.value);
                    // Update state.
                }
            }
            setFormFields([...formFields]);
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
     * UseEffect
     */
    useEffect(() => {
        const isDisabled = formFields.some(field => {

            // If one field contains an error, set isDisabled to true.
            if (field.error !== undefined) {
                return true;
            }

            // If one non optional field is empty, set isDisabled to true.
            if (field.optional === false && field.ref.current && field.ref.current.value.length === 0) {
                return true;
            }
 
        });
        setIsDisabled(isDisabled);
    }, [formFields, setIsDisabled]);

    /*
     * Render.
     */
    return (
        <div css={[defaultStyles.container]} >
            <div css={defaultStyles.row}>
                
                <div css={styles.header}>
                    <div css={styles.headerTitle} >Sign In</div>
                    <div css={styles.headerSubtitle} >
                        <div>Not registered yet?</div>
                        <a onClick={props.signUpClicked} css={styles.signUpLink}>Sign up</a>
                    </div>
                </div>

                <div css={defaultStyles.divider}></div>

                <form onSubmit={onFormSubmit}>
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
                                        <Label style={{}} value={field.label} />
                                        <Input 
                                            style={{}} 
                                            type={type} 
                                            name={field.id}  
                                            placeholder={field.placeholder} 
                                            ref={field.ref} 
                                            handleChange={handleInputChange}
                                        /> 
                                        {field.error && <InputError style={{}} error={field.error} />}
                                    </>
                                </FormRow>
                            )
                        })
                    }
                    <FormRow style={{}} key="signin-button">
                        <Button style={{}} disabled={isDisabled} isLoading={isLoading} type="submit" label="SIGN IN" />
                    </FormRow> 
                    <FormRow style={{}} key="forgot-password-link">
                        <div>Forgot password?</div>
                    </FormRow> 
                </form>


            </div>

        </div>
    );
}

/*
 * Styles.
 */
const styles = {
    header: {
        height: '141px'
    },
    headerTitle: {
        paddingTop: "49px",
        fontSize: palette.fonts.size[1],
        lineHeight: "40px",
        letterSpacing: "0.28px",
        fontWeight: 700,
        fontFamily: palette.fonts.primary,
        color: palette.colors.primary,
    },
    headerSubtitle: {
        fontSize: palette.fonts.size[0],
        fontWeight: 400,
        color: palette.colors.secondary,
        fontFamily: palette.fonts.primary
    },
    signUpLink: {
        color: 'blue'
    }
};
