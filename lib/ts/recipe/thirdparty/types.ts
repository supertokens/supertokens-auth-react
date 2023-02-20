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

import type { ProvidersForm } from "./components/themes/signInAndUp/providersForm";
import type { SignInAndUpHeader } from "./components/themes/signInAndUp/signInAndUpHeader";
import type { SignUpFooter } from "./components/themes/signInAndUp/signUpFooter";
import type { SignInAndUpCallbackTheme } from "./components/themes/signInAndUpCallback";
import type Provider from "./providers";
import type { CustomProviderConfig } from "./providers/types";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import type {
    GetRedirectionURLContext as AuthRecipeModuleGetRedirectionURLContext,
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
} from "../authRecipe/types";
import type { OverrideableBuilder } from "supertokens-js-override";
import type { StateObject as WebJsStateObject, RecipeInterface } from "supertokens-web-js/recipe/thirdparty";

export type ComponentOverrideMap = {
    ThirdPartySignUpFooter_Override?: ComponentOverride<typeof SignUpFooter>;
    ThirdPartySignInAndUpHeader_Override?: ComponentOverride<typeof SignInAndUpHeader>;
    ThirdPartySignInAndUpProvidersForm_Override?: ComponentOverride<typeof ProvidersForm>;
    ThirdPartySignInAndUpCallbackTheme_Override?: ComponentOverride<typeof SignInAndUpCallbackTheme>;
};

export type UserInput = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    oAuthCallbackScreen?: FeatureBaseConfig;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    oAuthCallbackScreen: FeatureBaseConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type SignInAndUpFeatureUserInput = FeatureBaseConfig & {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultUI?: boolean;

    /*
     * Privacy policy link for sign up form.
     */
    privacyPolicyLink?: string;

    /*
     * Terms and conditions link for sign up form.
     */
    termsOfServiceLink?: string;

    /*
     * Providers
     */
    providers?: (Provider | CustomProviderConfig)[];
};

export type NormalisedSignInAndUpFeatureConfig = NormalisedBaseConfig & {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultUI: boolean;

    /*
     * Privacy policy link for sign up form.
     */
    privacyPolicyLink?: string;

    /*
     * Terms and conditions link for sign up form.
     */
    termsOfServiceLink?: string;

    /*
     * Providers
     */
    providers: Provider[];
};

export type GetRedirectionURLContext = AuthRecipeModuleGetRedirectionURLContext;

export type PreAndPostAPIHookAction = "GET_AUTHORISATION_URL" | "THIRD_PARTY_SIGN_IN_UP";

export type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: any;
};

export type OnHandleEventContext =
    | AuthRecipeModuleOnHandleEventContext
    | {
          action: "SUCCESS";
          isNewUser: boolean;
          user: { id: string; email: string };
          userContext: any;
      };

export type SignInAndUpThemeProps = {
    featureState: {
        error: string | undefined;
    };
    dispatch: (action: ThirdPartySignInUpActions) => void;
    providers: {
        id: string;
        buttonComponent: JSX.Element;
    }[];
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
};
export type ThirdPartySignInUpChildProps = Omit<SignInAndUpThemeProps, "featureState" | "dispatch">;

export type ThirdPartySignInUpActions = {
    type: "setError";
    error: string | undefined;
};

export type ThirdPartySignInAndUpState = {
    error: string | undefined;
};

export type StateObject = WebJsStateObject & {
    rid?: string;
    redirectToPath?: string;
};

export type CustomStateProperties = {
    rid: string;
    redirectToPath: string;
};
