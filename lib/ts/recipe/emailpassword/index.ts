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
import { CreateRecipeFunction } from "../../types";
import { EmailPasswordConfig, SignOutAPIResponse } from "./types";

import EmailPassword from "./emailPassword";
import SignInAndUpTheme from "./components/themes/default/signInAndUp";
import ResetPasswordUsingToken from "./components/features/resetPasswordUsingToken/resetPasswordUsingToken";
import { ResetPasswordUsingTokenTheme } from "./components/themes/default/resetPasswordUsingToken";
import SignInAndUp from "./components/features/signInAndUp/SignInAndUp";

/*
 * Class.
 */
export default class EmailPasswordAPIWrapper {
    /*
     * Static attributes.
     */

    static SignInAndUp = SignInAndUp;
    static SignInAndUpTheme = SignInAndUpTheme;
    static ResetPasswordUsingToken = ResetPasswordUsingToken;
    static ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenTheme;

    static init(config: EmailPasswordConfig): CreateRecipeFunction {
        return EmailPassword.init(config);
    }

    static async signOut(): Promise<SignOutAPIResponse> {
        return EmailPassword.signOut();
    }
}

const init = EmailPasswordAPIWrapper.init;
const signOut = EmailPasswordAPIWrapper.signOut;

export {
    EmailPasswordAPIWrapper,
    init,
    SignInAndUp,
    SignInAndUpTheme,
    signOut,
    ResetPasswordUsingToken,
    ResetPasswordUsingTokenTheme
};
