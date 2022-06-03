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
import { FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import {
    GetRedirectionURLContext as EmailPasswordGetRedirectionURLContext,
    OnHandleEventContext as EmailPasswordOnHandleEventContext,
    PreAPIHookContext as EmailPasswordPreAPIHookContext,
} from "../emailpassword";
import {
    ResetPasswordUsingTokenUserInput,
    SignInFormFeatureUserInput,
    SignUpFormFeatureUserInput,
    PreAndPostAPIHookAction as EmailPasswordPreAndPostAPIHookAction,
    SignInAndUpState as EmailPasswordSignInAndUpState,
    EmailPasswordSignInAndUpAction,
    EmailPasswordSignInAndUpChildProps,
} from "../emailpassword/types";
import {
    GetRedirectionURLContext as ThirdPartyGetRedirectionURLContext,
    OnHandleEventContext as ThirdPartyOnHandleEventContext,
    PreAPIHookContext as ThirdPartyPreAPIHookContext,
} from "../thirdparty";
import {
    PreAndPostAPIHookAction as ThirdPartyPreAndPostAPIHookAction,
    ThirdPartySignInAndUpState,
    ThirdPartySignInUpActions,
    ThirdPartySignInUpChildProps,
} from "../thirdparty/types";
import Provider from "../thirdparty/providers";
import { CustomProviderConfig } from "../thirdparty/providers/types";
import {
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
    UserInputOverride as AuthRecipeUserInputOverride,
} from "../authRecipeWithEmailVerification/types";
import EPRecipe from "../emailpassword/recipe";
import TPRecipe from "../thirdparty/recipe";
import OverrideableBuilder from "supertokens-js-override";

import { ComponentOverride } from "../../components/componentOverride/componentOverride";
import { ComponentOverrideMap as EmailPasswordOverrideMap } from "../emailpassword/types";
import { ComponentOverrideMap as ThirdPartyOverrideMap } from "../thirdparty/types";
import { Header } from "./components/themes/signInAndUp/header";
import { Dispatch } from "react";
import { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";

export type ComponentOverrideMap = EmailPasswordOverrideMap &
    ThirdPartyOverrideMap & {
        ThirdPartyEmailPasswordHeader_Override?: ComponentOverride<typeof Header>;
    };

export type UserInput = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    oAuthCallbackScreen?: FeatureBaseConfig;
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
    disableEmailPassword?: boolean;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
        components?: ComponentOverrideMap;
    } & AuthRecipeUserInputOverride;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
    oAuthCallbackScreen?: FeatureBaseConfig;
    disableEmailPassword: boolean;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
        components: ComponentOverrideMap;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type SignInAndUpFeatureUserInput = FeatureBaseConfig & {
    disableDefaultUI?: boolean;
    defaultToSignUp?: boolean;
    signUpForm?: SignUpFormFeatureUserInput;
    signInForm?: SignInFormFeatureUserInput;
    providers?: (Provider | CustomProviderConfig)[];
};

export type NormalisedSignInAndUpFeatureConfig = NormalisedBaseConfig & {
    disableDefaultUI: boolean;
    defaultToSignUp: boolean;
    signUpForm?: SignUpFormFeatureUserInput;
    signInForm?: SignInFormFeatureUserInput;
    providers?: (Provider | CustomProviderConfig)[];
};

export type GetRedirectionURLContext = EmailPasswordGetRedirectionURLContext | ThirdPartyGetRedirectionURLContext;

export type PreAndPostAPIHookAction = EmailPasswordPreAndPostAPIHookAction | ThirdPartyPreAndPostAPIHookAction;

export type PreAPIHookContext = EmailPasswordPreAPIHookContext | ThirdPartyPreAPIHookContext;

export type OnHandleEventContext = ThirdPartyOnHandleEventContext | EmailPasswordOnHandleEventContext;

export type ThirdPartyEmailPasswordSignInAndUpThemeProps = {
    config: NormalisedConfig;
    history?: any;
    commonState: {
        error: string | undefined;
    };

    emailPasswordRecipe?: EPRecipe;
    epState: EmailPasswordSignInAndUpState;
    epDispatch: Dispatch<EmailPasswordSignInAndUpAction>;
    epChildProps?: EmailPasswordSignInAndUpChildProps;

    thirdPartyRecipe?: TPRecipe;
    tpState: ThirdPartySignInAndUpState;
    tpDispatch: Dispatch<ThirdPartySignInUpActions>;
    tpChildProps?: ThirdPartySignInUpChildProps;
};
