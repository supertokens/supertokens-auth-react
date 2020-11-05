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
import { EmailPasswordConfig, SignOutResponse } from "./types";

import EmailPassword from "./emailPassword";
import SignInAndUp from "./components/signInAndUp/SignInAndUp";
import SignInAndUpTheme from "./components/signInAndUp/themes/default";
import ResetPasswordUsingTokenTheme from "./components/resetPasswordUsingToken/themes/default";
import ResetPasswordUsingToken from "./components/resetPasswordUsingToken/resetPasswordUsingToken";

/*
 * Class.
 */
export default class EmailPasswordAPIWrapper {
    /*
     * Static attributes.
     */

    SignInAndUp = SignInAndUp;
    SignInAndUpTheme = SignInAndUpTheme;
    ResetPasswordUsingToken = ResetPasswordUsingToken;
    ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenTheme;

    static init(config: EmailPasswordConfig): CreateRecipeFunction {
        return EmailPassword.init(config);
    }

    static async signOut(): Promise<SignOutResponse> {
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
