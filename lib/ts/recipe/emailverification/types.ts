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
import type { SendVerifyEmail } from "./components/themes/emailVerification/sendVerifyEmail";
import type { VerifyEmailLinkClicked } from "./components/themes/emailVerification/verifyEmailLinkClicked";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { FeatureBaseConfig, ThemeBaseProps } from "../../types";
import type {
    Config as RecipeModuleConfig,
    NormalisedConfig as NormalisedRecipeModuleConfig,
    UserInput as RecipeModuleUserInput,
} from "../recipeModule/types";
import type { OverrideableBuilder } from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailverification";

export type ComponentOverrideMap = {
    EmailVerificationSendVerifyEmail_Override?: ComponentOverride<typeof SendVerifyEmail>;
    EmailVerificationVerifyEmailLinkClicked_Override?: ComponentOverride<typeof VerifyEmailLinkClicked>;
};

// Config is what does in the constructor of the recipe.
export type UserInput = {
    mode?: "OPTIONAL" | "REQUIRED";
    disableDefaultUI?: boolean;
    sendVerifyEmailScreen?: FeatureBaseConfig;
    verifyEmailLinkClickedScreen?: FeatureBaseConfig;

    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

// Config is what does in the constructor of the recipe.
export type Config = UserInput &
    RecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type NormalisedConfig = {
    mode: "OPTIONAL" | "REQUIRED";
    disableDefaultUI: boolean;
    sendVerifyEmailScreen: FeatureBaseConfig;
    verifyEmailLinkClickedScreen: FeatureBaseConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
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
    userContext: any;
};

export type EmailVerificationThemeProps = {
    sendVerifyEmailScreen: SendVerifyEmailThemeProps;
    verifyEmailLinkClickedScreen?: VerifyEmailLinkClickedThemeProps;
    config: NormalisedConfig;
    userContext?: any;
};

export type SendVerifyEmailThemeProps = ThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    signOut: () => Promise<void>;
    onEmailAlreadyVerified: () => Promise<void>;
    redirectToAuth: () => Promise<void>;
};

export type VerifyEmailLinkClickedThemeProps = ThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess: () => Promise<void>;
    onTokenInvalidRedirect: () => Promise<void>;
    token: string;
};
