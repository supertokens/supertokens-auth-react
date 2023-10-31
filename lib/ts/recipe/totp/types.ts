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

import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type {
    Config as RecipeModuleConfig,
    NormalisedConfig as NormalisedRecipeModuleConfig,
    UserInput as RecipeModuleUserInput,
} from "../recipeModule/types";
import type { Dispatch } from "react";
import type { OverrideableBuilder } from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/totp";

export type ComponentOverrideMap = {
    TOTPMFAScreen_Override?: ComponentOverride<any>; // TODO
};

export type TOTPDeviceInfo = {
    issuerName: string;
    deviceName: string;
    secret: string;
    qrCodeString: string;
    userIdentifier?: string | undefined;
};

export type TOTPMFAAction =
    | {
          type: "load";
          showBackButton: boolean;
          deviceInfo: TOTPDeviceInfo | undefined;
          error: string | undefined;
      }
    | {
          type: "createDevice";
          deviceInfo: TOTPDeviceInfo;
      }
    | {
          type: "setBlocked";
          error: string | undefined;
          nextRetryAt: number;
      }
    | {
          type: "setError";
          error: string | undefined;
      }
    | {
          type: "restartFlow";
          error: string | undefined;
      }
    | {
          type: "success";
      }
    | {
          type: "showSecret";
      };

export type TOTPMFAState = {
    deviceInfo?: TOTPDeviceInfo;
    showSecret: boolean;
    nextRetryAt?: number;
    isBlocked: boolean;
    showBackButton: boolean;
    loaded: boolean;
    error: string | undefined;
};

export type TOTPMFACommonProps = {
    featureState: TOTPMFAState;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    userContext?: any;
};

export type TOTPMFAProps = {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess: () => void;
    onShowSecretClick: () => void;
    onBackButtonClicked: () => void;
    onRetryClicked: () => void;
    onSignOutClicked: () => void;
    dispatch: Dispatch<TOTPMFAAction>;
    featureState: TOTPMFAState;
    userContext?: any;
};
export type TOTPMFAChildProps = Omit<TOTPMFAProps, "featureState" | "dispatch">;

export type TOTPMFAScreenConfig = {
    disableDefaultUI: boolean;
    setupScreenStyle: string;
    verificationScreenStyle: string;
    blockedScreenStyle: string;
    loadingScreenStyle: string;
};

// Config is what does in the constructor of the recipe.
export type UserInput = {
    totpMFAScreen?: Partial<TOTPMFAScreenConfig>;

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
    totpMFAScreen: TOTPMFAScreenConfig;

    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & NormalisedRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type GetRedirectionURLContext =
    | {
          action: "MFA_TOTP";
          userContext: any;
      }
    | {
          action: "SUCCESS";
          redirectToPath?: string;
          userContext: any;
      };

export type PreAndPostAPIHookAction =
    | "CREATE_DEVICE"
    | "VERIFY_CODE"
    | "VERIFY_DEVICE"
    | "REMOVE_DEVICE"
    | "LIST_DEVICES";

export type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: any;
};

export type OnHandleEventContext = {
    action: "FACTOR_CHOSEN";
    userContext: any;
};
