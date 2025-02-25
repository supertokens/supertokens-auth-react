/// <reference types="react" />
import type Recipe from "./recipe";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
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
import type SignInForm from "./components/features/signIn";
import type { InputProps } from "../emailpassword/components/library/input";
import type WebJSRecipe from "supertokens-web-js/recipe/webauthn";
import type { RecipeInterface } from "supertokens-web-js/recipe/webauthn";
import type { User } from "supertokens-web-js/types";
export declare type WebauthnFeatureBaseConfig = {
    disableDefaultUI?: boolean;
} & FeatureBaseConfig;
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
          action: "REGISTER_CREDENTIAL";
      }
    | {
          action: "AUTHENTICATE_CREDENTIAL";
      }
    | {
          action: "FAILED_TO_REGISTER_USER";
      }
    | AuthRecipeModuleOnHandleEventContext;
export declare type UserInput = Record<string, unknown> & {
    override?: {
        functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
    };
    signUpFeature?: NormalisedSignUpFormFeatureConfig;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type NormalisedSignUpFormFeatureConfig = NormalisedBaseConfig & {
    formFields: (NormalisedFormField & {
        inputComponent?: (props: InputProps) => JSX.Element;
    })[];
};
export declare type NormalisedConfig = {
    signUpFeature: NormalisedSignUpFormFeatureConfig;
    disableDefaultUI?: boolean;
    override: {
        functions: (originalImplementation: RecipeInterface) => RecipeInterface;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type RecipeImplementation = WebJSRecipeInterface<typeof WebJSRecipe>;
export declare type ComponentOverrideMap = {
    PasskeySignInForm_Override?: ComponentOverride<typeof SignInForm>;
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
    originalFactorIds: string[];
};
export declare type SignUpThemeProps = SignUpThemeBaseProps & {
    onRecoverAccountClick: () => void;
};
export declare type SignInThemeProps = SignUpThemeBaseProps;
export declare type SignUpFormProps = {
    clearError: () => void;
    onError: (error: string) => void;
    onFetchError?: (error: Response) => void;
    error: string | undefined;
    recipeImplementation: RecipeImplementation;
    config: NormalisedConfig;
    onSuccess?: (result: { createdNewRecipeUser: boolean; user: User }) => void;
    resetFactorList?: () => void;
    originalFactorIds: string[];
};
export declare type RecoverAccountWithTokenProps = {
    userContext?: UserContext | undefined;
    recipe: Recipe;
    useComponentOverrides: () => ComponentOverrideMap;
};
export declare type RecoverAccountWithTokenThemeProps = {
    config: NormalisedConfig;
    userContext?: UserContext;
    recipeImplementation: RecipeImplementation;
    error: string | undefined;
    clearError: () => void;
    onError: (error: string) => void;
    token: string | null;
};
export declare type SendRecoveryEmailFormProps = {
    userContext?: UserContext | undefined;
    recipe: Recipe;
    useComponentOverrides: () => ComponentOverrideMap;
};
export declare type SendRecoveryEmailFormThemeProps = {
    config: NormalisedConfig;
    userContext?: UserContext;
    recipeImplementation: RecipeImplementation;
    error: string | undefined;
    clearError: () => void;
    onError: (error: string) => void;
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
};
export declare type EmailSentProps = {
    email: string;
    onEmailChangeClick: () => void;
};
export declare type ContinueFor = "SIGN_UP" | "SIGN_IN";
