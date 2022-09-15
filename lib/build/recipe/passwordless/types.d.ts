import { Dispatch } from "react";
import { FeatureBaseConfig, NormalisedBaseConfig, Styles } from "../../types";
import {
    GetRedirectionURLContext as AuthRecipeModuleGetRedirectionURLContext,
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
} from "../authRecipe/types";
import { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { CountryCode } from "libphonenumber-js";
import { SignInUpHeader } from "./components/themes/signInUp/signInUpHeader";
import { SignInUpFooter } from "./components/themes/signInUp/signInUpFooter";
import { EmailForm } from "./components/themes/signInUp/emailForm";
import { PhoneForm } from "./components/themes/signInUp/phoneForm";
import { UserInputCodeForm } from "./components/themes/signInUp/userInputCodeForm";
import { LinkClickedScreen } from "./components/themes/linkClickedScreen";
import { UserInputCodeFormHeader } from "./components/themes/signInUp/userInputCodeFormHeader";
import { UserInputCodeFormFooter } from "./components/themes/signInUp/userInputCodeFormFooter";
import { LinkSent } from "./components/themes/signInUp/linkSent";
import { CloseTabScreen } from "./components/themes/signInUp/closeTabScreen";
import { EmailOrPhoneForm } from "./components/themes/signInUp/emailOrPhoneForm";
import { RecipeInterface, PasswordlessUser } from "supertokens-web-js/recipe/passwordless";
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
    disableDefaultUI?: boolean;
} & NormalisedBaseConfig;
export declare type NormalisedConfig = {
    validateEmailAddress: (email: string) => Promise<string | undefined> | string | undefined;
    validatePhoneNumber: (phoneNumber: string) => Promise<string | undefined> | string | undefined;
    signInUpFeature: {
        resendEmailOrSMSGapInSeconds: number;
        defaultCountry?: CountryCode;
        guessInternationPhoneNumberFromInputPhoneNumber: (
            inputPhoneNumber: string,
            defaultCountryFromConfig?: CountryCode
        ) => Promise<string | undefined> | string | undefined;
        privacyPolicyLink?: string;
        termsOfServiceLink?: string;
        emailOrPhoneFormStyle: Styles;
        userInputCodeFormStyle: Styles;
        linkSentScreenStyle: Styles;
        closeTabScreenStyle: Styles;
        disableDefaultUI?: boolean;
    };
    linkClickedScreenFeature: PasswordlessNormalisedBaseConfig;
    contactMethod: "PHONE" | "EMAIL" | "EMAIL_OR_PHONE";
    override: {
        functions: (originalImplementation: RecipeInterface) => RecipeInterface;
        components: ComponentOverrideMap;
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
    emailOrPhoneFormStyle?: Styles;
    userInputCodeFormStyle?: Styles;
    linkSentScreenStyle?: Styles;
    closeTabScreenStyle?: Styles;
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
              defaultCountry?: CountryCode;
          };
      }
    | {
          contactMethod: "EMAIL_OR_PHONE";
          validateEmailAddress?: (email: string) => Promise<string | undefined> | string | undefined;
          validatePhoneNumber?: (phoneNumber: string) => Promise<string | undefined> | string | undefined;
          signInUpFeature?: SignInUpFeatureConfigInput & {
              defaultCountry?: CountryCode;
              guessInternationPhoneNumberFromInputPhoneNumber?: (
                  inputPhoneNumber: string,
                  defaultCountryFromConfig?: CountryCode
              ) => Promise<string | undefined> | string | undefined;
          };
      }
) & {
    override?: {
        functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
        components?: ComponentOverrideMap;
    };
    linkClickedScreenFeature?: PasswordlessFeatureBaseConfig;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type SignInUpProps = {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess?: (result: { createdNewUser: boolean; user: PasswordlessUser }) => void;
    dispatch: Dispatch<PasswordlessSignInUpAction>;
    featureState: {
        loginAttemptInfo?: LoginAttemptInfo;
        loaded: boolean;
        successInAnotherTab: boolean;
        error: string | undefined;
    };
    userContext?: any;
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
export declare type SignInUpEmailFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    error: string | undefined;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess?: () => void;
};
export declare type SignInUpPhoneFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    error: string | undefined;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess?: () => void;
};
export declare type SignInUpEmailOrPhoneFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    error: string | undefined;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess?: () => void;
};
export declare type SignInUpUserInputCodeFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    error: string | undefined;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    loginAttemptInfo: LoginAttemptInfo;
    onSuccess?: (result: { createdNewUser: boolean; user: PasswordlessUser }) => void;
};
export declare type LinkClickedScreenProps = {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    requireUserInteraction: boolean;
    consumeCode: () => void;
    onSuccess?: () => void;
};
export declare type CloseTabScreenProps = {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
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
      }
    | {
          type: "successInAnotherTab";
      };
export declare type SignInUpState = {
    error: string | undefined;
    loaded: boolean;
    loginAttemptInfo: LoginAttemptInfo | undefined;
    successInAnotherTab: boolean;
};
export declare type SignInUpChildProps = Omit<SignInUpProps, "featureState" | "dispatch">;
export declare type LinkSentThemeProps = {
    clearError: () => void;
    onError: (error: string) => void;
    error: string | undefined;
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
};
export declare type UserInputCodeFormFooterProps = {
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
};
export declare type UserInputCodeFormHeaderProps = {
    loginAttemptInfo: LoginAttemptInfo;
    recipeImplementation: RecipeInterface;
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
    PasswordlessCloseTabScreen_Override?: ComponentOverride<typeof CloseTabScreen>;
};
