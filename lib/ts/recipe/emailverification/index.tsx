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
import { UserInput } from "./types";
import EmailVerificationRecipe from "./recipe";
import EmailVerificationTheme from "./components/themes/emailVerification";
import EmailVerification from "./components/features/emailVerification";
import {
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
} from "./types";
/*
 * Class.
 */
export default class Wrapper {
    static EmailVerification = EmailVerification;
    static EmailVerificationTheme = EmailVerificationTheme;

    static init(
        config: UserInput
    ) {
        return EmailVerificationRecipe.init(config);
    }

    static async isEmailVerified(): Promise<boolean> {
        return EmailVerificationRecipe.getInstanceOrThrow().isEmailVerified();
    }
}

const init = Wrapper.init;
const isEmailVerified = Wrapper.isEmailVerified;

export {
    init,
    isEmailVerified,
    EmailVerification,
    EmailVerificationTheme,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput
};
