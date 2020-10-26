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
import {defaultStyles, palette} from '../../../styles/styles';
import { SignInThemeProps } from "../types";


/** @jsx jsx */
import { jsx } from '@emotion/core';

/*
 * Component.
 */
export default function SignInTheme(props: SignInThemeProps) {
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

                <form>
                    {
                        props.formFields.map(field => {
                            return (
                                <div key={field.id}>
                                    <label>
                                        {field.label}
                                    </label>
                                    <input name={field.id}  placeholder={field.placeholder}/> 
                                </div>
                            )
                        })
                    }
                </form>

                <button> Sign In </button>
                <div>Forgot password?</div>

            </div>

        </div>
    );
}

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
