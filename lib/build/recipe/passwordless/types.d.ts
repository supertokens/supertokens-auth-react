import type { LinkClickedScreen } from "./components/themes/linkClickedScreen";
import type { LoadingScreen } from "./components/themes/mfa/loadingScreen";
import type { MFAFooter } from "./components/themes/mfa/mfaFooter";
import type { MFAHeader } from "./components/themes/mfa/mfaHeader";
import type { MFAOTPFooter } from "./components/themes/mfa/mfaOTPFooter";
import type { MFAOTPHeader } from "./components/themes/mfa/mfaOTPHeader";
import type { EmailForm } from "./components/themes/signInUp/emailForm";
import type { EmailOrPhoneForm } from "./components/themes/signInUp/emailOrPhoneForm";
import type { LinkSent } from "./components/themes/signInUp/linkSent";
import type { PhoneForm } from "./components/themes/signInUp/phoneForm";
import type { SignInUpFooter } from "./components/themes/signInUp/signInUpFooter";
import type { SignInUpHeader } from "./components/themes/signInUp/signInUpHeader";
import type { UserInputCodeForm } from "./components/themes/signInUp/userInputCodeForm";
import type { UserInputCodeFormFooter } from "./components/themes/signInUp/userInputCodeFormFooter";
import type { UserInputCodeFormHeader } from "./components/themes/signInUp/userInputCodeFormHeader";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { FeatureBaseConfig, NormalisedBaseConfig, UserContext, WebJSRecipeInterface } from "../../types";
import type {
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
} from "../authRecipe/types";
import type { Dispatch } from "react";
import type WebJSRecipe from "supertokens-web-js/recipe/passwordless";
import type { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import type { User } from "supertokens-web-js/types";
export declare type PreAndPostAPIHookAction =
    | "PASSWORDLESS_CREATE_CODE"
    | "PASSWORDLESS_CONSUME_CODE"
    | "PASSWORDLESS_RESEND_CODE"
    | "EMAIL_EXISTS"
    | "PHONE_NUMBER_EXISTS";
export declare type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
};
export declare type GetRedirectionURLContext = never;
export declare type OnHandleEventContext =
    | {
          rid: "passwordless";
          action: "SUCCESS";
          isNewRecipeUser: boolean;
          createdNewSession: boolean;
          user: User;
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
    disableDefaultUI?: boolean;
} & NormalisedBaseConfig;
export declare type NormalisedConfig = {
    validateEmailAddress: (email: string) => Promise<string | undefined> | string | undefined;
    validatePhoneNumber: (phoneNumber: string) => Promise<string | undefined> | string | undefined;
    signInUpFeature: {
        resendEmailOrSMSGapInSeconds: number;
        defaultCountry?: string;
        guessInternationPhoneNumberFromInputPhoneNumber: (
            inputPhoneNumber: string,
            defaultCountryFromConfig?: string
        ) => Promise<string | undefined> | string | undefined;
        privacyPolicyLink?: string;
        termsOfServiceLink?: string;
        emailOrPhoneFormStyle: string;
        userInputCodeFormStyle: string;
        linkSentScreenStyle: string;
        disableDefaultUI?: boolean;
    };
    linkClickedScreenFeature: PasswordlessNormalisedBaseConfig;
    mfaFeature: PasswordlessNormalisedBaseConfig;
    contactMethod: "PHONE" | "EMAIL" | "EMAIL_OR_PHONE";
    override: {
        functions: (originalImplementation: RecipeInterface) => RecipeInterface;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type PasswordlessFeatureBaseConfig = {
    disableDefaultUI?: boolean;
} & FeatureBaseConfig;
export declare type SignInUpFeatureConfigInput = {
    disableDefaultUI?: boolean;
    resendEmailOrSMSGapInSeconds?: number;
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
    emailOrPhoneFormStyle?: string;
    userInputCodeFormStyle?: string;
    linkSentScreenStyle?: string;
};
export declare type UserInput = (
    | {
          contactMethod: "EMAIL";
          validateEmailAddress?: (email: string) => Promise<string | undefined> | string | undefined;
          signInUpFeature?: SignInUpFeatureConfigInput;
      }
    | {
          contactMethod: "PHONE";
          validatePhoneNumber?: (phoneNumber: string) => Promise<string | undefined> | string | undefined;
          signInUpFeature?: SignInUpFeatureConfigInput & {
              defaultCountry?: string;
          };
      }
    | {
          contactMethod: "EMAIL_OR_PHONE";
          validateEmailAddress?: (email: string) => Promise<string | undefined> | string | undefined;
          validatePhoneNumber?: (phoneNumber: string) => Promise<string | undefined> | string | undefined;
          signInUpFeature?: SignInUpFeatureConfigInput & {
              defaultCountry?: string;
              guessInternationPhoneNumberFromInputPhoneNumber?: (
                  inputPhoneNumber: string,
                  defaultCountryFromConfig?: string
              ) => Promise<string | undefined> | string | undefined;
          };
      }
) & {
    override?: {
        functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
    };
    linkClickedScreenFeature?: PasswordlessFeatureBaseConfig;
    mfaFeature?: PasswordlessFeatureBaseConfig;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type MFAProps = {
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    contactMethod: "EMAIL" | "PHONE";
    onBackButtonClicked: () => void;
    onSignOutClicked: () => void;
    onSuccess?: () => void;
    onFetchError: (err: Response) => void;
    dispatch: Dispatch<MFAAction>;
    featureState: {
        canChangeEmail: boolean;
        loginAttemptInfo?: LoginAttemptInfo;
        loaded: boolean;
        showBackButton: boolean;
        showAccessDenied: boolean;
        error: string | undefined;
    };
    userContext?: UserContext;
};
export declare type SignInUpProps = {
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    onSuccess?: (result: { createdNewRecipeUser: boolean; user: User }) => void;
    dispatch: Dispatch<PasswordlessSignInUpAction>;
    onFetchError: (err: Response) => void;
    featureState: {
        loginAttemptInfo?: LoginAttemptInfo;
        loaded: boolean;
        error: string | undefined;
    };
    userContext: UserContext;
};
export declare type LoginAttemptInfo = {
    deviceId: string;
    preAuthSessionId: string;
    contactInfo: string;
    contactMethod: "EMAIL" | "PHONE";
    lastResend: number;
    redirectToPath?: string;
    flowType: "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";
};
/**
 * When calling getLoginAttemptInfo/setLoginAttemptInfo from web-js we use generics to get
 * access to properties in local storage that web-js does not set by default.
 * This allows us to strongly type the response while keeping it dynamic.
 *
 * In the context of auth-react this type indicates all the additional properties we need.
 */
export declare type AdditionalLoginAttemptInfoProperties = {
    contactInfo: string;
    contactMethod: "EMAIL" | "PHONE";
    lastResend: number;
    redirectToPath?: string;
};
export declare type RecipeImplementation = WebJSRecipeInterface<typeof WebJSRecipe>;
export declare type SignInUpEmailFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    onFetchError: (error: Response) => void;
    error: string | undefined;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    onSuccess?: () => void;
};
export declare type SignInUpPhoneFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    onFetchError: (error: Response) => void;
    error: string | undefined;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    onSuccess?: () => void;
};
export declare type SignInUpEmailOrPhoneFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    onFetchError: (error: Response) => void;
    error: string | undefined;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    onSuccess?: () => void;
};
export declare type SignInUpUserInputCodeFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    onFetchError: (error: Response) => void;
    error: string | undefined;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    loginAttemptInfo: LoginAttemptInfo;
    onSuccess?: (result: { createdNewRecipeUser: boolean; user: User }) => void;
};
export declare type LinkClickedScreenProps = {
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    requireUserInteraction: boolean;
    consumeCode: () => void;
    onSuccess?: () => void;
};
export declare type PasswordlessSignInUpAction =
    | {
          type: "load";
          loginAttemptInfo: LoginAttemptInfo | undefined;
          error: string | undefined;
      }
    | {
          type: "startLogin";
          loginAttemptInfo: LoginAttemptInfo;
      }
    | {
          type: "resendCode";
          timestamp: number;
      }
    | {
          type: "restartFlow";
          error: string | undefined;
      }
    | {
          type: "setError";
          error: string | undefined;
      };
export declare type SignInUpState = {
    error: string | undefined;
    loaded: boolean;
    loginAttemptInfo: LoginAttemptInfo | undefined;
};
export declare type MFAAction =
    | {
          type: "load";
          loginAttemptInfo: LoginAttemptInfo | undefined;
          canChangeEmail: boolean;
          showAccessDenied: boolean;
          showBackButton: boolean;
          error: string | undefined;
          callingCreateCode: boolean;
      }
    | {
          type: "startVerify";
          loginAttemptInfo: LoginAttemptInfo;
      }
    | {
          type: "resendCode";
          timestamp: number;
      }
    | {
          type: "restartFlow";
          error: string | undefined;
      }
    | {
          type: "setError";
          showAccessDenied: boolean;
          error: string | undefined;
      };
export declare type MFAState = {
    showAccessDenied: boolean;
    error: string | undefined;
    loaded: boolean;
    showBackButton: boolean;
    loginAttemptInfo: LoginAttemptInfo | undefined;
    canChangeEmail: boolean;
};
export declare type SignInUpChildProps = Omit<SignInUpProps, "featureState" | "dispatch">;
export declare type MFAChildProps = Omit<MFAProps, "featureState" | "dispatch">;
export declare type LinkSentThemeProps = {
    clearError: () => void;
    onError: (error: string) => void;
    error: string | undefined;
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
};
export declare type UserInputCodeFormFooterProps = {
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
};
export declare type UserInputCodeFormHeaderProps = {
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
};
export declare type MFAFooterProps = {
    canChangeEmail: boolean;
    onSignOutClicked: () => void;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
};
export declare type MFAOTPFooterProps = {
    canChangeEmail: boolean;
    onSignOutClicked: () => void;
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
};
export declare type MFAHeaderProps = {
    contactMethod: "EMAIL" | "PHONE";
    showBackButton: boolean;
    onBackButtonClicked: () => void;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
};
export declare type MFAOTPHeaderProps = {
    canChangeEmail: boolean;
    showBackButton: boolean;
    onBackButtonClicked: () => void;
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
};
export declare type ComponentOverrideMap = {
    PasswordlessSignInUpHeader_Override?: ComponentOverride<typeof SignInUpHeader>;
    PasswordlessSignInUpFooter_Override?: ComponentOverride<typeof SignInUpFooter>;
    PasswordlessEmailForm_Override?: ComponentOverride<typeof EmailForm>;
    PasswordlessPhoneForm_Override?: ComponentOverride<typeof PhoneForm>;
    PasswordlessEmailOrPhoneForm_Override?: ComponentOverride<typeof EmailOrPhoneForm>;
    PasswordlessUserInputCodeFormHeader_Override?: ComponentOverride<typeof UserInputCodeFormHeader>;
    PasswordlessUserInputCodeFormFooter_Override?: ComponentOverride<typeof UserInputCodeFormFooter>;
    PasswordlessUserInputCodeForm_Override?: ComponentOverride<typeof UserInputCodeForm>;
    PasswordlessLinkSent_Override?: ComponentOverride<typeof LinkSent>;
    PasswordlessLinkClickedScreen_Override?: ComponentOverride<typeof LinkClickedScreen>;
    PasswordlessMFAHeader_Override?: ComponentOverride<typeof MFAHeader>;
    PasswordlessMFAFooter_Override?: ComponentOverride<typeof MFAFooter>;
    PasswordlessMFAOTPHeader_Override?: ComponentOverride<typeof MFAOTPHeader>;
    PasswordlessMFAOTPFooter_Override?: ComponentOverride<typeof MFAOTPFooter>;
    PasswordlessMFAOTPLoadingScreen_Override?: ComponentOverride<typeof LoadingScreen>;
};
