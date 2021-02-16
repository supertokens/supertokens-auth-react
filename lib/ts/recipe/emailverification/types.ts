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
import { FeatureBaseConfig, SuccessAPIResponse, ThemeBaseProps } from "../../types";
import { ThemeResponseGeneralError } from "../emailpassword/types";
import { RecipeModuleConfig } from "../recipeModule/types";

export type EmailVerificationUserInput = {
    /*
     * Email Verification Mode
     */
    mode?: "OFF" | "REQUIRED";

    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation?: boolean;

    /*
     * sendVerifyEmailScreen config.
     */
    sendVerifyEmailScreen?: FeatureBaseConfig;

    /*
     * verifyEmailLinkClickedScreen config.
     */
    verifyEmailLinkClickedScreen?: FeatureBaseConfig;
};

export type NormalisedEmailVerificationConfig = {
    /*
     * Email Verification Mode
     */
    mode: "OFF" | "REQUIRED";

    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation: boolean;

    /*
     * Normalised sendVerifyEmailScreen config.
     */
    sendVerifyEmailScreen: FeatureBaseConfig;

    /*
     * Normalised verifyEmailLinkClickedScreen config.
     */
    verifyEmailLinkClickedScreen: FeatureBaseConfig;
};

export type EmailVerificationConfig<T, S, R> = RecipeModuleConfig<T, S, R> &
    NormalisedEmailVerificationConfig & {
        /*
         * SignOut
         */
        signOut(): Promise<SuccessAPIResponse>;

        /*
         * Use shadow Dom root.
         */
        useShadowDom: boolean;

        /*
         * Styling palette.
         */
        palette: Record<string, string>;
    };

export type IsEmailVerifiedAPIResponse = {
    /*
     * Success.
     */
    status: "OK";

    /*
     * Is email verified
     */
    isVerified: boolean;
};

export type VerifyEmailAPIResponse = {
    /*
     * Email verification status.
     */
    status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
};

export type EmailVerificationThemeProps = {
    /*
     * Send Verification Email Screen Theme Props.
     */
    sendVerifyEmailScreen: SendVerifyEmailThemeProps;

    /*
     * Verify Email Link Clicked Screen Theme Props.
     */
    verifyEmailLinkClickedScreen: VerifyEmailLinkClickedThemeProps;

    /*
     * A token is present in the query params or not.
     */
    hasToken: boolean;

    /*
     * Raw Palette provided by user.
     */
    rawPalette: Record<string, string>;
};

export type SendVerifyEmailThemeProps = ThemeBaseProps & {
    /*
     * Call Send Verify Email API.
     */
    sendVerifyEmailAPI: () => Promise<SendVerifyEmailThemeResponse>;

    /*
     * Method called when Sign Out button is clicked. Default to SuperTokens Session Sign Out.
     */
    signOut: () => Promise<void>;

    /*
     * Method called when "resend email" clicked results in email already verified response.
     */
    onEmailAlreadyVerified: () => Promise<void>;
};

export type VerifyEmailLinkClickedThemeProps = ThemeBaseProps & {
    /*
     * Call Verify Email API.
     */
    verifyEmailAPI: () => Promise<VerifyEmailThemeResponse>;

    /*
     * Redirect to verify Email Screen on invalid token.
     */
    onTokenInvalidRedirect: () => Promise<void>;

    /*
     * On email verification success, action when "Continue" button is clicked.
     */
    onContinueClicked: () => Promise<void>;
};

export type SendVerifyEmailAPIResponse = {
    /*
     * Success.
     */
    status: "OK" | "EMAIL_ALREADY_VERIFIED_ERROR";
};
export type SendVerifyEmailThemeResponse = SendVerifyEmailAPIResponse | ThemeResponseGeneralError;

export type VerifyEmailThemeResponse = {
    /*
     * Verify Email Link clicked Theme Status.
     */
    status: "LOADING" | "INVALID" | "GENERAL_ERROR" | "SUCCESSFUL";
};

export type VerifyEmailLinkClickedThemeState = {
    /*
     * Verify Email Link clicked Status.
     */
    status: "LOADING" | "INVALID" | "GENERAL_ERROR" | "SUCCESSFUL";
};
