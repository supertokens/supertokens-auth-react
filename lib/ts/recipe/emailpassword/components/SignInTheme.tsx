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
import { FormEvent, useCallback, useRef, useState } from "react";
import {defaultStyles, palette} from '../../../styles/styles';
import { SignInThemeProps } from "../types";


/** @jsx jsx */
import { jsx } from '@emotion/core';

/*
 * Component.
 */
export default function SignInTheme(props: SignInThemeProps) {
    /*
     * Props.
     */
    const {callAPI} = props;

    /*
     * State.
     */
    const [formFields, setFormFields] = useState(props.formFields.map(field => {
        return {
            ...field,
            ref: useRef<HTMLInputElement>(null)
        }
    }))

    /*
     * Callbacks.
     */
    const onSignIn = useCallback(
        async () => {
            const fields = formFields.map(field => {
                return {
                    id: field.id,
                    value: (field.ref.current !== null) ? field.ref.current.value : ""
                }
            });
            const res = await callAPI(fields);
        },
        [formFields, props.callAPI, setFormFields]
    );

    /*
     * Event Handlers.
     */
    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSignIn();
    }

    /*
     * Render.
     */
    return (
        <div css={defaultStyles.container} >
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
                            return (
                                <div key={field.id}>
                                    <label>
                                        {field.label}
                                    </label>
                                    <input type={field.id !== "password" ? "text" : "password"} name={field.id}  placeholder={field.placeholder} ref={field.ref} /> 
                                </div>
                            )
                        })
                    }

                    <button type="submit"> Sign In </button>
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
