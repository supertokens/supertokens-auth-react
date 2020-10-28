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
import { defaultStyles } from "../../../styles/styles";
import { SignUpThemeProps } from "../types";

/** @jsx jsx */
import { jsx } from "@emotion/core";

/*
 * Component.
 */
export default function SignUpTheme(props: SignUpThemeProps) {
    return (
        <div css={defaultStyles.container}>
            <div css={defaultStyles.row}>
                <div>Sign Up</div>
                <div>Already registered?</div>
                <a onClick={props.signInClicked} css={defaultStyles.link}>
                    Sign in
                </a>
                <div css={defaultStyles.divider}></div>
                <form>
                    {props.formFields.map(field => {
                        return (
                            <div key={field.id}>
                                <label>{field.label}</label>
                                <input name={field.id} placeholder={field.placeholder} />
                            </div>
                        );
                    })}
                </form>
                <input type="checkbox" value={""} checked={true} />
                <div>
                    By signin up, you agree to our <a>Terms of Service</a> and <a>Privacy Policy</a>
                </div>

                <button>Sign Up</button>
            </div>
        </div>
    );
}
