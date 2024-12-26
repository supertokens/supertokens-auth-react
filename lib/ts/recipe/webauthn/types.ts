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

import type {
    FeatureBaseConfig,
    NormalisedBaseConfig,
    NormalisedFormField,
    NormalisedGetRedirectionURLContext,
    UserContext,
    WebJSRecipeInterface,
} from "../../types";
import type {
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    UserInput as AuthRecipeModuleUserInput,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    Config as AuthRecipeModuleConfig,
} from "../authRecipe/types";
import type { InputProps } from "../emailpassword/components/library/input";
import type WebJSRecipe from "supertokens-web-js/recipe/webauthn";
import type { RecipeInterface } from "supertokens-web-js/recipe/webauthn";
import type { User } from "supertokens-web-js/types";

export type WebauthnFeatureBaseConfig = {
    disableDefaultUI?: boolean;
} & FeatureBaseConfig;

export type GetRedirectionURLContext = NormalisedGetRedirectionURLContext<{
    /*
     * Get Redirection URL Context
     */
    action: "RECOVER_ACCOUNT";
}>;

export type PreAndPostAPIHookAction =
    | "REGISTER_OPTIONS"
    | "SIGN_IN_OPTIONS"
    | "SIGN_UP"
    | "SIGN_IN"
    | "EMAIL_EXISTS"
    | "GENERATE_RECOVER_ACCOUNT_TOKEN"
    | "RECOVER_ACCOUNT";

export type OnHandleEventContext =
    | {
          action: "SUCCESS";
          isNewRecipeUser: boolean;
          createdNewSession: boolean;
          user: User;
      }
    | {
          action: "REGISTER_OPTIONS";
      }
    | {
          action: "SIGN_IN_OPTIONS";
      }
    | {
          action: "GET_EMAIL_EXISTS";
          exists: boolean;
      }
    | {
          action: "REGISTER_CREDENTIAL";
      }
    | {
          action: "AUTHENTICATE_CREDENTIAL";
      }
    | {
          action: "SIGN_IN";
      }
    | {
          action: "SIGN_UP";
      }
    | {
          action: "GENERATE_RECOVER_ACCOUNT_TOKEN";
      }
    | {
          action: "RECOVER_ACCOUNT";
      }
    | {
          action: "REGISTER_CREDENTIAL_WITH_SIGN_UP";
      }
    | {
          action: "AUTHENTICATE_CREDENTIAL_WITH_SIGN_IN";
      }
    | {
          action: "REGISTER_CREDENTIAL_WITH_RECOVER_ACCOUNT";
      }
    | AuthRecipeModuleOnHandleEventContext;

export type UserInput = Record<string, unknown> & {
    override?: {
        functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
    };
    signUpFeature?: NormalisedSignUpFormFeatureConfig;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type NormalisedSignUpFormFeatureConfig = NormalisedBaseConfig & {
    /*
     * Normalised form fields for SignUp.
     */
    formFields: (NormalisedFormField & {
        inputComponent?: (props: InputProps) => JSX.Element;
    })[];
};

export type NormalisedConfig = {
    signUpFeature: NormalisedSignUpFormFeatureConfig;

    override: {
        functions: (originalImplementation: RecipeInterface) => RecipeInterface;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type RecipeImplementation = WebJSRecipeInterface<typeof WebJSRecipe>;

export type ComponentOverrideMap = Record<string, undefined>;

export type WebauthnSignUpState = {
    showBackButton: boolean;
    loaded: boolean;
    error: string | undefined;
};

export type SignUpThemeProps = {
    clearError: () => void;
    recipeImplementation: RecipeImplementation;
    factorIds: string[];
    config: NormalisedConfig;
    onSuccess?: (result: { createdNewRecipeUser: boolean; user: User }) => void;
    onFetchError: (err: Response) => void;
    onError: (err: string) => void;
    error: string | undefined;
    userContext: UserContext;
};

export type SignUpFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    onFetchError: (error: Response) => void;
    error: string | undefined;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    onSuccess?: (result: { createdNewRecipeUser: boolean; user: User }) => void;
};

// Type to indicate what the `Continue with` button is being used for.
export type ContinueFor = "SIGN_UP" | "SIGN_IN";
