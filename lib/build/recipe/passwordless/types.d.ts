import { FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import {
    GetRedirectionURLContext as AuthRecipeModuleGetRedirectionURLContext,
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
} from "../authRecipe/types";
import { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { CountryCode } from "libphonenumber-js";
import SignInUpTheme from "./components/themes/signInUp";
import { SignInUpHeader } from "./components/themes/signInUp/signInUpHeader";
import { SignInUpFooter } from "./components/themes/signInUp/signInUpFooter";
import { EmailForm } from "./components/themes/signInUp/emailForm";
import { MobileForm } from "./components/themes/signInUp/mobileForm";
import { UserInputCodeForm } from "./components/themes/signInUp/userInputCodeForm";
import { LinkClickedScreen } from "./components/themes/linkClickedScreen";
import { SignInUpCodeInputHeader } from "./components/themes/signInUp/signInUpCodeInputHeader";
import { SignInUpCodeInputFooter } from "./components/themes/signInUp/signInUpCodeInputFooter";
import { LinkSent as LinkSentScreen } from "./components/themes/signInUp/linkSent";
import { CloseTabScreen } from "./components/themes/signInUp/closeTabScreen";
export declare type PasswordlessUser = {
    id: string;
    email?: string;
    phoneNumber?: string;
    timeJoined: number;
};
export declare type RecipeInterface = {
    createCode: (
        input: (
            | {
                  email: string;
              }
            | {
                  phoneNumber: string;
              }
        ) & {
            config: NormalisedConfig;
        }
    ) => Promise<
        | {
              status: "OK";
              deviceId: string;
              preAuthSessionId: string;
              flowType: "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";
          }
        | {
              status: "GENERAL_ERROR";
              message: string;
          }
    >;
    resendCode: (
        input: {
            deviceId: string;
            preAuthSessionId: string;
        } & {
            config: NormalisedConfig;
        }
    ) => Promise<
        | {
              status: "OK" | "RESTART_FLOW_ERROR";
          }
        | {
              status: "GENERAL_ERROR";
              message: string;
          }
    >;
    consumeCode: (
        input: (
            | {
                  userInputCode: string;
                  deviceId: string;
                  preAuthSessionId: string;
              }
            | {
                  preAuthSessionId: string;
                  linkCode: string;
              }
        ) & {
            config: NormalisedConfig;
        }
    ) => Promise<
        | {
              status: "OK";
              createdUser: boolean;
              user: PasswordlessUser;
          }
        | {
              status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
              failedCodeInputAttemptCount: number;
              maximumCodeInputAttempts: number;
          }
        | {
              status: "GENERAL_ERROR";
              message: string;
          }
        | {
              status: "RESTART_FLOW_ERROR";
          }
    >;
    doesEmailExist: (input: { email: string; config: NormalisedConfig }) => Promise<boolean>;
    doesPhoneNumberExist: (input: { phoneNumber: string; config: NormalisedConfig }) => Promise<boolean>;
    getLoginAttemptInfo: () =>
        | Promise<
              | undefined
              | {
                    deviceId: string;
                    preAuthSessionId: string;
                    contactInfo: string;
                    contactMethod: "EMAIL" | "PHONE";
                    flowType: "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";
                    lastResend: number;
                }
          >
        | {
              deviceId: string;
              preAuthSessionId: string;
              contactInfo: string;
              contactMethod: "EMAIL" | "PHONE";
              flowType: "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";
              lastResend: number;
          }
        | undefined;
    setLoginAttemptInfo: (input: {
        deviceId: string;
        preAuthSessionId: string;
        contactInfo: string;
        contactMethod: "EMAIL" | "PHONE";
        flowType: "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";
        lastResend: number;
    }) => Promise<void> | void;
    clearLoginAttemptInfo: () => Promise<void> | void;
};
export declare type PreAPIHookContext = {
    action:
        | "PASSWORDLESS_CREATE_CODE"
        | "PASSWORDLESS_CONSUME_CODE"
        | "PASSWORDLESS_RESEND_CODE"
        | "EMAIL_EXISTS"
        | "PHONE_NUMBER_EXISTS";
    requestInit: RequestInit;
    url: string;
};
export declare type GetRedirectionURLContext = AuthRecipeModuleGetRedirectionURLContext;
export declare type OnHandleEventContext =
    | {
          action: "SUCCESS";
          isNewUser: boolean;
          user: PasswordlessUser;
      }
    | {
          action: "PASSWORDLESS_RESTART_FLOW";
      }
    | {
          action: "PASSWORDLESS_CODE_SENT";
          isResend: boolean;
      }
    | AuthRecipeModuleOnHandleEventContext;
export declare type PasswordlessNormalisedBaseConfig = {
    disableDefaultImplementation?: boolean;
} & NormalisedBaseConfig;
export declare type NormalisedConfig = {
    resendCodeTimeGapInSeconds: number;
    validateEmailAddress: (email: string) => Promise<string | undefined> | string | undefined;
    validatePhoneNumber: (phoneNumber: string) => Promise<string | undefined> | string | undefined;
    emailForm: {
        privacyPolicyLink?: string;
        termsOfServiceLink?: string;
    } & PasswordlessNormalisedBaseConfig;
    mobileForm: {
        defaultCountry?: CountryCode;
        privacyPolicyLink?: string;
        termsOfServiceLink?: string;
    } & PasswordlessNormalisedBaseConfig;
    userInputCodeForm: PasswordlessNormalisedBaseConfig;
    linkClickedScreen: PasswordlessNormalisedBaseConfig;
    closeTabScreen: PasswordlessNormalisedBaseConfig;
    contactMethod: "PHONE" | "EMAIL";
    override: {
        functions: (originalImplementation: RecipeInterface) => RecipeInterface;
        components: ComponentOverrideMap;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
export declare type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
export declare type PasswordlessFeatureBaseConfig = {
    disableDefaultImplementation?: boolean;
} & FeatureBaseConfig;
export declare type UserInput = {
    contactMethod: "PHONE" | "EMAIL";
    validateEmailAddress?: (email: string) => Promise<string | undefined> | string | undefined;
    validatePhoneNumber?: (phoneNumber: string) => Promise<string | undefined> | string | undefined;
    resendCodeTimeGapInSeconds?: number;
    emailForm?: {
        privacyPolicyLink?: string;
        termsOfServiceLink?: string;
    } & FeatureBaseConfig;
    mobileForm?: {
        defaultCountry?: CountryCode;
        privacyPolicyLink?: string;
        termsOfServiceLink?: string;
    } & FeatureBaseConfig;
    userInputCodeForm?: FeatureBaseConfig;
    linkClickedScreen?: FeatureBaseConfig;
    closeTabScreen?: FeatureBaseConfig;
    override?: {
        functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
        components?: ComponentOverrideMap;
    };
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
export declare type SignInUpProps = {
    loginAttemptInfo?: LoginAttemptInfo;
    loaded: boolean;
    successInAnotherTab: boolean;
    error?: string;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess?: () => void;
};
export declare type LoginAttemptInfo = {
    deviceId: string;
    preAuthSessionId: string;
    contactInfo: string;
    contactMethod: "EMAIL" | "PHONE";
    lastResend: number;
    flowType: "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";
};
export declare type SignInUpEmailFormProps = {
    error?: string;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess?: () => void;
};
export declare type SignInUpMobileFormProps = {
    error?: string;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess?: () => void;
};
export declare type SignInUpUserInputCodeFormProps = {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    loginAttemptInfo: LoginAttemptInfo;
    onSuccess?: () => void;
};
export declare type LinkClickedScreenProps = {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess?: () => void;
};
export declare type CloseTabScreenProps = {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess?: () => void;
};
export declare type LinkEmailSentThemeProps = {
    error?: string;
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
};
export declare type SignInUpCodeInputFooterProps = {
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
};
export declare type SignInUpCodeInputHeaderProps = {
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
};
export declare type ComponentOverrideMap = {
    PasswordlessSignInUp?: ComponentOverride<typeof SignInUpTheme>;
    PasswordlessSignInUpHeader?: ComponentOverride<typeof SignInUpHeader>;
    PasswordlessSignInUpFooter?: ComponentOverride<typeof SignInUpFooter>;
    PasswordlessSignInUpEmailForm?: ComponentOverride<typeof EmailForm>;
    PasswordlessSignInUpPhoneNumberForm?: ComponentOverride<typeof MobileForm>;
    PasswordlessSignInUpCodeInputForm?: ComponentOverride<typeof UserInputCodeForm>;
    PasswordlessSignInUpCodeInputHeader?: ComponentOverride<typeof SignInUpCodeInputHeader>;
    PasswordlessSignInUpCodeInputFooter?: ComponentOverride<typeof SignInUpCodeInputFooter>;
    PasswordlessLinkSentScreen?: ComponentOverride<typeof LinkSentScreen>;
    PasswordlessLinkClickedScreen?: ComponentOverride<typeof LinkClickedScreen>;
    PasswordlessCloseTabScreen?: ComponentOverride<typeof CloseTabScreen>;
};
