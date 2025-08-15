import type { PasskeyNotSupportedError } from "./components/themes/error/passkeyNotSupportedError";
import type Recipe from "./recipe";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type {
    NormalisedBaseConfig,
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
import type { ContinueWithPasskeyWithOverride } from "./components/themes/continueWithPasskey";
import type {
    WebauthnMFASignIn,
    WebauthnMFALoadingScreen,
    WebauthnMFASignUp,
    WebauthnMFASignUpConfirmation,
    WebauthnMFAFooter,
} from "./components/themes/mfa";
import type { PasskeyRecoveryEmailSent } from "./components/themes/sendRecoveryEmail/emailSent";
import type {
    WebauthnRecoverAccount,
    WebauthnRecoverAccountForm,
} from "./components/themes/sendRecoveryEmail/recoverAccountForm";
import type { PasskeyConfirmation } from "./components/themes/signUp/confirmation";
import type { ContinueWithoutPasskey } from "./components/themes/signUp/continueWithoutPasskey";
import type { PasskeyFeatureBlock } from "./components/themes/signUp/featureBlocks";
import type { SignUpFormInner } from "./components/themes/signUp/signUpForm";
import type { SignUpSomethingWentWrong } from "./components/themes/signUp/somethingWentWrong";
import type { Dispatch } from "react";
import type React from "react";
import type { RecipeInterface } from "supertokens-web-js/recipe/webauthn";
import type WebJSRecipe from "supertokens-web-js/recipe/webauthn";
import type { User } from "supertokens-web-js/types";
export declare type GetRedirectionURLContext = NormalisedGetRedirectionURLContext<{
    action: "SEND_RECOVERY_EMAIL";
}>;
export declare type PreAndPostAPIHookAction =
    | "REGISTER_OPTIONS"
    | "SIGN_IN_OPTIONS"
    | "SIGN_UP"
    | "SIGN_IN"
    | "EMAIL_EXISTS"
    | "GENERATE_RECOVER_ACCOUNT_TOKEN"
    | "RECOVER_ACCOUNT"
    | "REGISTER_CREDENTIAL"
    | "REMOVE_CREDENTIAL"
    | "LIST_CREDENTIALS";
export declare type OnHandleEventContext =
    | {
          action: "SUCCESS";
          isNewRecipeUser: boolean;
          createdNewSession: boolean;
          user: User;
      }
    | {
          action: "GET_EMAIL_EXISTS";
          exists: boolean;
      }
    | {
          action: "REGISTER_CREDENTIAL_OK";
      }
    | {
          action: "AUTHENTICATE_CREDENTIAL_OK";
      }
    | {
          action: "FAILED_TO_REGISTER_USER";
      }
    | AuthRecipeModuleOnHandleEventContext;
export declare type UserInput = Record<string, unknown> & {
    override?: {
        functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
    };
    signInAndUpFeature?: NormalisedSignInAndUpFormFeatureConfig;
    recoveryFeature?: NormalisedRecoveryFeatureConfig;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type NormalisedSignInAndUpFormFeatureConfig = NormalisedBaseConfig;
export declare type NormalisedRecoveryFeatureConfig = NormalisedBaseConfig & {
    disableDefaultUI: boolean;
};
export declare type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFormFeatureConfig;
    recoveryFeature: NormalisedRecoveryFeatureConfig;
    disableDefaultUI?: boolean;
    override: {
        functions: (originalImplementation: RecipeInterface) => RecipeInterface;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type RecipeImplementation = WebJSRecipeInterface<typeof WebJSRecipe>;
export declare type ComponentOverrideMap = {
    WebauthnContinueWithPasskey_Override?: ComponentOverride<typeof ContinueWithPasskeyWithOverride>;
    WebauthnPasskeyNotSupportedError_Override?: ComponentOverride<typeof PasskeyNotSupportedError>;
    WebauthnPasskeyRecoveryEmailSent_Override?: ComponentOverride<typeof PasskeyRecoveryEmailSent>;
    WebauthnRecoverAccountForm_Override?: ComponentOverride<typeof WebauthnRecoverAccountForm>;
    WebauthnRecoverAccount_Override?: ComponentOverride<typeof WebauthnRecoverAccount>;
    WebauthnPasskeyConfirmation_Override?: ComponentOverride<typeof PasskeyConfirmation>;
    WebauthnPasskeyFeatureBlock_Override?: ComponentOverride<typeof PasskeyFeatureBlock>;
    WebauthnContinueWithoutPasskey_Override?: ComponentOverride<typeof ContinueWithoutPasskey>;
    WebauthnPasskeySignUpForm_Override?: ComponentOverride<typeof SignUpFormInner>;
    WebauthnPasskeySignUpSomethingWentWrong_Override?: ComponentOverride<typeof SignUpSomethingWentWrong>;
    WebauthnMFASignIn_Override?: ComponentOverride<typeof WebauthnMFASignIn>;
    WebauthnMFALoadingScreen_Override?: ComponentOverride<typeof WebauthnMFALoadingScreen>;
    WebauthnMFASignUp_Override?: ComponentOverride<typeof WebauthnMFASignUp>;
    WebauthnMFASignUpConfirmation_Override?: ComponentOverride<typeof WebauthnMFASignUpConfirmation>;
    WebauthnMFAFooter_Override?: ComponentOverride<typeof WebauthnMFAFooter>;
};
export declare type SignUpThemeBaseProps = {
    clearError: () => void;
    recipeImplementation: RecipeImplementation;
    factorIds: string[];
    config: NormalisedConfig;
    onSuccess: (result: { createdNewRecipeUser: boolean; user: User }) => void;
    onFetchError: (err: Response) => void;
    onError: (err: string) => void;
    error: string | undefined;
    userContext: UserContext;
    resetFactorList: () => void;
    onSignInUpSwitcherClick: () => void;
    showBackButton: boolean;
};
export declare type SignUpThemeProps = SignUpThemeBaseProps & {
    onRecoverAccountClick: () => void;
};
export declare type SignInThemeProps = SignUpThemeBaseProps & {
    isPasskeySupported: boolean;
};
export declare type SignUpFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    onFetchError?: (error: Response) => void;
    error: string | undefined;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    onSuccess?: (result: { createdNewRecipeUser: boolean; user: User }) => void;
    resetFactorList?: () => void;
    showBackButton: boolean;
};
export declare type RecoverAccountWithTokenProps = {
    userContext?: UserContext | undefined;
    recipe: Recipe;
    useComponentOverrides: () => ComponentOverrideMap;
    children?: React.ReactNode;
};
export declare type RegisterOptions = Extract<
    Awaited<ReturnType<RecipeImplementation["getRegisterOptions"]>>,
    {
        status: "OK";
    }
>;
export declare enum RecoverAccountScreen {
    ContinueWithPasskey = 0,
    Success = 1,
}
export declare type RecoverAccountWithTokenThemeProps = {
    config: NormalisedConfig;
    userContext?: UserContext;
    recipeImplementation: RecipeImplementation;
    error: string | undefined;
    clearError: () => void;
    onError: (error: string) => void;
    token: string | null;
    registerOptions: RegisterOptions | null;
    errorMessageLabel: string | null;
    isLoading: boolean;
    activeScreen: RecoverAccountScreen;
    onContinueClick: () => void;
};
export declare type SendRecoveryEmailFormProps = {
    userContext?: UserContext | undefined;
    recipe: Recipe;
    useComponentOverrides: () => ComponentOverrideMap;
    children?: React.ReactNode;
};
export declare enum SendRecoveryEmailScreen {
    RecoverAccount = 0,
    RecoverEmailSent = 1,
}
export declare type SendRecoveryEmailFormThemeProps = {
    config: NormalisedConfig;
    userContext?: UserContext;
    recipeImplementation: RecipeImplementation;
    error: string | undefined;
    clearError: () => void;
    onError: (error: string) => void;
    recoverAccountEmail: string;
    activeScreen: SendRecoveryEmailScreen;
    setActiveScreen: React.Dispatch<React.SetStateAction<SendRecoveryEmailScreen>>;
    onRecoverAccountFormSuccess: (result: { email: string }) => void;
    onRecoverAccountBackClick: () => void;
    onEmailChangeClick: () => void;
};
export declare type ContinueOnSuccessParams = {
    email: string;
};
export declare type FeatureBlockDetailProps = {
    title: string;
    subText: string;
    icon: JSX.Element;
};
export declare type RecoverFormProps = {
    onSuccess: (result: any) => void;
    onBackClick: () => void;
    recipeImplementation: RecipeImplementation;
};
export declare type ContinueWithPasskeyProps = {
    continueTo: "SIGN_UP" | "SIGN_IN";
    continueWithPasskeyClicked: () => void;
    isLoading: boolean;
    recipeImplementation: RecipeImplementation;
    isPasskeySupported: boolean;
};
export declare type EmailSentProps = {
    email: string;
    onEmailChangeClick: () => void;
};
export declare type WebAuthnMFAAction =
    | {
          type: "setError";
          accessDenied?: boolean;
          error: string | undefined;
      }
    | {
          type: "load";
          deviceSupported: boolean;
          error: string | undefined;
          email: string | undefined;
          showBackButton: boolean;
          canRegisterPasskey: boolean;
          hasRegisteredPassKey: boolean;
      };
declare type WebAuthnMFAInitialState = {
    error: undefined;
    loaded: false;
    accessDenied: boolean;
    deviceSupported: boolean;
    showBackButton: boolean;
    canRegisterPasskey: false;
    hasRegisteredPassKey: false;
    email: undefined;
};
declare type WebAuthnMFALoadedState = {
    error: string | undefined;
    loaded: true;
    accessDenied: boolean;
    deviceSupported: boolean;
    showBackButton: boolean;
    canRegisterPasskey: boolean;
    hasRegisteredPassKey: boolean;
    email: string | undefined;
};
export declare type WebAuthnMFAState = WebAuthnMFAInitialState | WebAuthnMFALoadedState;
export declare type WebAuthnMFAProps = {
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    onBackButtonClicked: () => void;
    onSignOutClicked: () => void;
    onSignIn: () => Promise<void>;
    onSignUp: (email: string) => Promise<void>;
    onRecoverAccountClick: () => void;
    userContext?: UserContext;
    featureState: WebAuthnMFAState;
    dispatch: Dispatch<WebAuthnMFAAction>;
};
export {};
