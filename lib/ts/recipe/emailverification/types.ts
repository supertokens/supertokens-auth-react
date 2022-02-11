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
import { FeatureBaseConfig, ThemeBaseProps } from "../../types";
import { Config as RecipeModuleConfig, NormalisedConfig as NormalisedRecipeModuleConfig } from "../recipeModule/types";

import { ComponentOverride } from "../../components/componentOverride/componentOverride";
import { SendVerifyEmail } from "./components/themes/emailVerification/sendVerifyEmail";
import { VerifyEmailLinkClicked } from "./components/themes/emailVerification/verifyEmailLinkClicked";
import OverrideableBuilder from "supertokens-js-override";

// For AuthRecipeModule, we don't need to take signOut,
// redirectToSignIn and postVerificationRedirect as inputs from the user.
// So we have UserInputForAuthRecipeModule for AuthRecipeModule, and UserInput
// for anyone who wants to use this recipe directly.
export type UserInputForAuthRecipeModule = {
    mode?: "OFF" | "REQUIRED";
    disableDefaultImplementation?: boolean;
    sendVerifyEmailScreen?: FeatureBaseConfig;
    verifyEmailLinkClickedScreen?: FeatureBaseConfig;
};

export type ComponentOverrideMap = {
    EmailVerificationSendVerifyEmail?: ComponentOverride<typeof SendVerifyEmail>;
    EmailVerificationVerifyEmailLinkClicked?: ComponentOverride<typeof VerifyEmailLinkClicked>;
};

export type UserInput = UserInputForAuthRecipeModule & {
    signOut(): Promise<void>;
    redirectToSignIn(history?: any): Promise<void>;
    postVerificationRedirect(history?: any): Promise<void>;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
        components?: ComponentOverrideMap;
    };
};

// Config is what does in the constructor of the recipe.
export type Config = UserInput &
    RecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type NormalisedConfig = {
    mode: "OFF" | "REQUIRED";
    disableDefaultImplementation: boolean;
    sendVerifyEmailScreen: FeatureBaseConfig;
    verifyEmailLinkClickedScreen: FeatureBaseConfig;
    signOut(): Promise<void>;
    redirectToSignIn(history?: any): Promise<void>;
    postVerificationRedirect(history?: any): Promise<void>;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
        components: ComponentOverrideMap;
    };
} & NormalisedRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type GetRedirectionURLContext = {
    action: "VERIFY_EMAIL";
};

export type PreAndPostAPIHookAction = "VERIFY_EMAIL" | "SEND_VERIFY_EMAIL" | "IS_EMAIL_VERIFIED";

export type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: any;
};

export type OnHandleEventContext = {
    action: "VERIFY_EMAIL_SENT" | "EMAIL_VERIFIED_SUCCESSFUL";
};

export type EmailVerificationThemeProps = {
    sendVerifyEmailScreen: SendVerifyEmailThemeProps;
    verifyEmailLinkClickedScreen?: VerifyEmailLinkClickedThemeProps;
    config: NormalisedConfig;
};

export type SendVerifyEmailThemeProps = ThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    signOut: () => Promise<void>;
    onEmailAlreadyVerified: () => Promise<void>;
};

export type VerifyEmailLinkClickedThemeProps = ThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onContinueClicked: () => Promise<void>;
    onTokenInvalidRedirect: () => Promise<void>;
    token: string;
};

export type RecipeInterface = {
    verifyEmail: (input: { token: string; config: NormalisedConfig; userContext: any }) => Promise<{
        status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
        fetchResponse: Response;
    }>;

    sendVerificationEmail: (input: { config: NormalisedConfig; userContext: any }) => Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }>;

    isEmailVerified: (input: { config: NormalisedConfig; userContext: any }) => Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }>;
};
