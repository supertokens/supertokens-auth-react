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
import { FormEvent, useEffect, useRef, useState } from "react";
import {defaultStyles, palette} from '../../../styles/styles';
import { SignInThemeProps } from "../types";


/** @jsx jsx */
import { jsx } from '@emotion/core';
import { API_RESPONSE_STATUS, MANDATORY_FORM_FIELDS_ID_ARRAY } from "../../../constants";

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

    /*
     * Callbacks.
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

    /*
     * Effects.
     */
    useEffect(() => {
        onSignIn()
    }, [setIsLoading, callAPI, onSuccess])

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
                            let type: string = "text";
                            // If email or password, replace field type.
                            if (MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id)) {
                                type = field.id;
                            }
                            return (
                                <div key={field.id}>
                                    <label>
                                        {field.label}
                                    </label>
                                    <input type={type} name={field.id}  placeholder={field.placeholder} ref={field.ref} /> 
                                </div>
                            )
                        })
                    }

                    <button disabled={isLoading} type="submit"> Sign In </button>
                    <div>Forgot password?</div>
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
