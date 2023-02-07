/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
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

import { hasFontDefined } from "../../../../../styles/styles";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import { ThemeBase } from "../themeBase";

import { SignIn } from "./signIn";
import { SignUp } from "./signUp";

import type { SignInAndUpThemeProps } from "../../../types";

export const SignInAndUpTheme: React.FC<SignInAndUpThemeProps> = (props) => {
    // If isSignUp, return signUp.
    if (props.featureState.isSignUp) {
        return (
            <SignUp
                {...props.signUpForm}
                signInClicked={() => {
                    props.dispatch({ type: "setSignIn" });
                }}
            />
        );
    }

    // Otherwise, return SignIn.
    return (
        <SignIn
            {...props.signInForm}
            signUpClicked={() => {
                props.dispatch({ type: "setSignUp" });
            }}
        />
    );
};

function SignInAndUpThemeWrapper(props: SignInAndUpThemeProps): JSX.Element {
    const hasFont = hasFontDefined(props.config.rootStyle);

    const activeStyle = props.featureState.isSignUp
        ? props.config.signInAndUpFeature.signUpForm.style
        : props.config.signInAndUpFeature.signInForm.style;

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase loadDefaultFont={!hasFont} userStyles={[props.config.rootStyle, activeStyle]}>
                <SignInAndUpTheme {...props} />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default SignInAndUpThemeWrapper;
