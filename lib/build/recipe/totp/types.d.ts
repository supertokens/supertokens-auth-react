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
    TOTPMFAScreen_Override?: ComponentOverride<any>;
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
export declare type TOTPMFAState = {
    deviceInfo?: TOTPDeviceInfo;
    showSecret: boolean;
    nextRetryAt?: number;
    isBlocked: boolean;
    showBackButton: boolean;
    loaded: boolean;
    error: string | undefined;
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
export declare type OnHandleEventContext = {
    action: "FACTOR_CHOSEN";
    userContext: any;
};
