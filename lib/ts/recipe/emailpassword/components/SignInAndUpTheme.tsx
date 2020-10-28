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
import { useState } from "react";
import { SignInAndUpThemeProps } from "../types";

import SignUpTheme from "./SignUpTheme";
import SignInTheme from "./SignInTheme";

/*
 * Component.
 */

export function SignInAndUpTheme(props: SignInAndUpThemeProps): JSX.Element {
    /*
     * State.
     */
    const [isSignIn, setSignIn] = useState(true);

    /*
     * Render.
     */

    // If isSignIn, return signInTheme.
    if (isSignIn) {
        return <SignInTheme {...props.signInForm} signUpClicked={() => setSignIn(false)} />;
    }

    // Otherwise, return SignUpTheme.
    return <SignUpTheme {...props.signUpForm} signInClicked={() => setSignIn(true)} />;
}

export default SignInAndUpTheme;
