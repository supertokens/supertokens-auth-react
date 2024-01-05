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

import type { BlockedScreen } from "./components/themes/mfa/blockedScreen";
import type { LoadingScreen } from "./components/themes/mfa/loadingScreen";
import type { CodeForm } from "./components/themes/mfa/totpCodeForm";
import type { CodeVerificationFooter } from "./components/themes/mfa/totpCodeVerificationFooter";
import type { CodeVerificationHeader } from "./components/themes/mfa/totpCodeVerificationHeader";
import type { DeviceInfoSection } from "./components/themes/mfa/totpDeviceInfoSection";
import type { DeviceSetupFooter } from "./components/themes/mfa/totpDeviceSetupFooter";
import type { DeviceSetupHeader } from "./components/themes/mfa/totpDeviceSetupHeader";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { UserContext } from "../../types";
import type {
    Config as RecipeModuleConfig,
    NormalisedConfig as NormalisedRecipeModuleConfig,
    UserInput as RecipeModuleUserInput,
} from "../recipeModule/types";
import type { Dispatch } from "react";
import type { OverrideableBuilder } from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/totp";

export type ComponentOverrideMap = {
    TOTPBlockedScreen_Override?: ComponentOverride<typeof BlockedScreen>;
    TOTPLoadingScreen_Override?: ComponentOverride<typeof LoadingScreen>;
    TOTPCodeForm_Override?: ComponentOverride<typeof CodeForm>;
    TOTPCodeVerificationFooter_Override?: ComponentOverride<typeof CodeVerificationFooter>;
    TOTPCodeVerificationHeader_Override?: ComponentOverride<typeof CodeVerificationHeader>;
    TOTPDeviceSetupFooter_Override?: ComponentOverride<typeof DeviceSetupFooter>;
    TOTPDeviceSetupHeader_Override?: ComponentOverride<typeof DeviceSetupHeader>;
    TOTPDeviceInfoSection_Override?: ComponentOverride<typeof DeviceInfoSection>;
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
          showFactorChooserButton: boolean;
          showBackButton: boolean;
          deviceInfo: TOTPDeviceInfo | undefined;
          showAccessDenied: boolean;
          error: string | undefined;
          callingCreateDevice: boolean;
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
          showAccessDenied: boolean;
          error: string | undefined;
          maxAttemptCount?: number;
          currAttemptCount?: number;
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
    showFactorChooserButton: boolean;
    showBackButton: boolean;
    loaded: boolean;
    error: string | undefined;
    maxAttemptCount?: number;
    currAttemptCount?: number;
    showAccessDenied: boolean;
};

export type TOTPMFACommonProps = {
    featureState: TOTPMFAState;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    userContext?: UserContext;
};

export type TOTPMFAProps = {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess: () => void;
    onShowSecretClicked: () => void;
    onBackButtonClicked: () => void;
    onRetryClicked: () => void;
    onFactorChooserButtonClicked: () => void;
    onSignOutClicked: () => void;
    dispatch: Dispatch<TOTPMFAAction>;
    featureState: TOTPMFAState;
    userContext?: UserContext;
};
export type TOTPMFAChildProps = Omit<TOTPMFAProps, "featureState" | "dispatch">;

export type TOTPMFAScreenConfig = {
    disableDefaultUI: boolean;
    setupScreenStyle: string;
    verificationScreenStyle: string;
    blockedScreenStyle: string;
    loadingScreenStyle: string;
};

export type UserInput = {
    totpMFAScreen?: Partial<TOTPMFAScreenConfig>;

    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

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

export type OnHandleEventContext = never;
