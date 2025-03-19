/// <reference types="react" />
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
import type { SendRecoveryEmailForm } from "./components/features/sendRecoveryEmail";
import type SignInForm from "./components/features/signIn";
import type SignUpForm from "./components/features/signUp";
import type { ContinueWithPasskeyWithOverride } from "./components/themes/continueWithPasskey";
import type { PasskeyEmailSent } from "./components/themes/sendRecoveryEmail/emailSent";
import type {
    PasskeyRecoverAccount,
    PasskeyRecoverAccountForm,
} from "./components/themes/sendRecoveryEmail/recoverAccountForm";
import type { PasskeyConfirmation } from "./components/themes/signUp/confirmation";
import type { ContinueWithoutPasskey } from "./components/themes/signUp/continueWithoutPasskey";
import type { PasskeyFeatureBlock } from "./components/themes/signUp/featureBlocks";
import type { SignUpFormInner } from "./components/themes/signUp/signUpForm";
import type { SignUpSomethingWentWrong } from "./components/themes/signUp/somethingWentWrong";
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
    | "RECOVER_ACCOUNT";
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
    PasskeySignInForm_Override?: ComponentOverride<typeof SignInForm>;
    PasskeySignUpForm_Override?: ComponentOverride<typeof SignUpForm>;
    PasskeySendRecoveryEmailForm_Override?: ComponentOverride<typeof SendRecoveryEmailForm>;
    PasskeyContinueWithPasskey_Override?: ComponentOverride<typeof ContinueWithPasskeyWithOverride>;
    PasskeyNotSupportedError_Override?: ComponentOverride<typeof PasskeyNotSupportedError>;
    PasskeyEmailSent_Override?: ComponentOverride<typeof PasskeyEmailSent>;
    PasskeyRecoverAccountForm_Override?: ComponentOverride<typeof PasskeyRecoverAccountForm>;
    PasskeyRecoverAccount_Override?: ComponentOverride<typeof PasskeyRecoverAccount>;
    PasskeyConfirmation_Override?: ComponentOverride<typeof PasskeyConfirmation>;
    PasskeyFeatureBlock_Override?: ComponentOverride<typeof PasskeyFeatureBlock>;
    PasskeyContinueWithoutPasskey_Override?: ComponentOverride<typeof ContinueWithoutPasskey>;
    PasskeySignUpFormInner_Override?: ComponentOverride<typeof SignUpFormInner>;
    PasskeySignUpSomethingWentWrong_Override?: ComponentOverride<typeof SignUpSomethingWentWrong>;
};
export declare type WebauthnSignUpState = {
    showBackButton: boolean;
    loaded: boolean;
    error: string | undefined;
};
export declare type SignUpThemeBaseProps = {
    clearError: () => void;
    recipeImplementation: RecipeImplementation;
    factorIds: string[];
    config: NormalisedConfig;
    onSuccess?: (result: { createdNewRecipeUser: boolean; user: User }) => void;
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
    continueFor: ContinueFor;
    continueWithPasskeyClicked: (continueFor: ContinueFor) => void;
    isLoading?: boolean;
    isPasskeyNotSupported?: boolean;
    recipeImplementation: RecipeImplementation;
    isPasskeySupported?: boolean;
};
export declare type EmailSentProps = {
    email: string;
    onEmailChangeClick: () => void;
};
export declare type ContinueFor = "SIGN_UP" | "SIGN_IN";
