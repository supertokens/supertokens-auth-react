import type { BlockedScreen } from "./components/themes/mfa/blockedScreen";
import type { LoadingScreen } from "./components/themes/mfa/loadingScreen";
import type { CodeForm } from "./components/themes/mfa/totpCodeForm";
import type { CodeVerificationFooter } from "./components/themes/mfa/totpCodeVerificationFooter";
import type { CodeVerificationHeader } from "./components/themes/mfa/totpCodeVerificationHeader";
import type { DeviceInfoSection } from "./components/themes/mfa/totpDeviceInfoSection";
import type { DeviceSetupFooter } from "./components/themes/mfa/totpDeviceSetupFooter";
import type { DeviceSetupHeader } from "./components/themes/mfa/totpDeviceSetupHeader";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type {
    Config as RecipeModuleConfig,
    NormalisedConfig as NormalisedRecipeModuleConfig,
    UserInput as RecipeModuleUserInput,
} from "../recipeModule/types";
import type { Dispatch } from "react";
import type { OverrideableBuilder } from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/totp";
export declare type ComponentOverrideMap = {
    TOTPBlockedScreen_Override?: ComponentOverride<typeof BlockedScreen>;
    TOTPLoadingScreen_Override?: ComponentOverride<typeof LoadingScreen>;
    TOTPCodeForm_Override?: ComponentOverride<typeof CodeForm>;
    TOTPCodeVerificationFooter_Override?: ComponentOverride<typeof CodeVerificationFooter>;
    TOTPCodeVerificationHeader_Override?: ComponentOverride<typeof CodeVerificationHeader>;
    TOTPDeviceSetupFooter_Override?: ComponentOverride<typeof DeviceSetupFooter>;
    TOTPDeviceSetupHeader_Override?: ComponentOverride<typeof DeviceSetupHeader>;
    TOTPDeviceInfoSection_Override?: ComponentOverride<typeof DeviceInfoSection>;
};
export declare type TOTPDeviceInfo = {
    issuerName: string;
    deviceName: string;
    secret: string;
    qrCodeString: string;
    userIdentifier?: string | undefined;
};
export declare type TOTPMFAAction =
    | {
          type: "load";
          showBackButton: boolean;
          deviceInfo: TOTPDeviceInfo | undefined;
          showAccessDenied: boolean;
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
export declare type TOTPMFAState = {
    deviceInfo?: TOTPDeviceInfo;
    showSecret: boolean;
    nextRetryAt?: number;
    isBlocked: boolean;
    showBackButton: boolean;
    loaded: boolean;
    error: string | undefined;
    maxAttemptCount?: number;
    currAttemptCount?: number;
    showAccessDenied: boolean;
};
export declare type TOTPMFACommonProps = {
    featureState: TOTPMFAState;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    userContext?: any;
};
export declare type TOTPMFAProps = {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess: () => void;
    onShowSecretClick: () => void;
    onBackButtonClicked: () => void;
    onRetryClicked: () => void;
    onFactorChooserButtonClicked: () => void;
    onSignOutClicked: () => void;
    dispatch: Dispatch<TOTPMFAAction>;
    featureState: TOTPMFAState;
    userContext?: any;
};
export declare type TOTPMFAChildProps = Omit<TOTPMFAProps, "featureState" | "dispatch">;
export declare type TOTPMFAScreenConfig = {
    disableDefaultUI: boolean;
    setupScreenStyle: string;
    verificationScreenStyle: string;
    blockedScreenStyle: string;
    loadingScreenStyle: string;
};
export declare type UserInput = {
    totpMFAScreen?: Partial<TOTPMFAScreenConfig>;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type Config = UserInput &
    RecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type NormalisedConfig = {
    totpMFAScreen: TOTPMFAScreenConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & NormalisedRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type GetRedirectionURLContext =
    | {
          action: "MFA_TOTP";
          userContext: any;
      }
    | {
          action: "SUCCESS";
          redirectToPath?: string;
          userContext: any;
      };
export declare type PreAndPostAPIHookAction =
    | "CREATE_DEVICE"
    | "VERIFY_CODE"
    | "VERIFY_DEVICE"
    | "REMOVE_DEVICE"
    | "LIST_DEVICES";
export declare type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: any;
};
export declare type OnHandleEventContext = never;