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
import ThirdParty from "./thirdparty";
import { CreateRecipeFunction, SuccessAPIResponse } from "../../types";
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import { EmailVerification } from "./components/features/emailVerification";
import { ThirdPartyUserInput } from "./types";
import ThirdPartyAuth from "./thirdpartyAuth";
import SignInAndUp from "./components/features/signInAndUp";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import Apple from "./providers/apple";
import Google from "./providers/google";
import Twitter from "./providers/twitter";
import Facebook from "./providers/facebook";
import Github from "./providers/github";
import Custom from "./providers/custom";
/*
 * Class.
 */
export default class ThirdPartyAPIWrapper {
    /*
     * Static attributes.
     */

    static init(config: ThirdPartyUserInput): CreateRecipeFunction {
        return ThirdParty.init(config);
    }

    static async signOut(): Promise<SuccessAPIResponse> {
        return ThirdParty.signOut();
    }

    static async isEmailVerified(): Promise<boolean> {
        return ThirdParty.isEmailVerified();
    }

    /*
     * Providers
     */
    static Custom = Custom;
    static Apple = Apple;
    static Google = Google;
    static Twitter = Twitter;
    static Facebook = Facebook;
    static Github = Github;
}

const init = ThirdPartyAPIWrapper.init;
const signOut = ThirdPartyAPIWrapper.signOut;
const isEmailVerified = ThirdPartyAPIWrapper.isEmailVerified;

export {
    ThirdPartyAuth,
    ThirdPartyAPIWrapper,
    init,
    Apple,
    Google,
    Twitter,
    Facebook,
    Github,
    Custom,
    isEmailVerified,
    SignInAndUp,
    SignInAndUpTheme,
    signOut,
    EmailVerification,
    EmailVerificationTheme
};
