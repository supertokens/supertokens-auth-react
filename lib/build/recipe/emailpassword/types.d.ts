/// <reference types="react" />
import type { InputProps } from "./components/library/input";
import type { ResetPasswordEmail } from "./components/themes/resetPasswordUsingToken/resetPasswordEmail";
import type { SubmitNewPassword } from "./components/themes/resetPasswordUsingToken/submitNewPassword";
import type { SignInForm } from "./components/themes/signIn";
import type { SignUpForm } from "./components/themes/signUp";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type {
    APIFormField,
    FeatureBaseConfig,
    FormField,
    FormFieldBaseConfig,
    NormalisedBaseConfig,
    NormalisedFormField,
    NormalisedGetRedirectionURLContext,
    ThemeBaseProps,
    UserContext,
} from "../../types";
import type {
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
} from "../authRecipe/types";
import type { OverrideableBuilder } from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";
import type { User } from "supertokens-web-js/types";
export declare type ComponentOverrideMap = {
    EmailPasswordSignInForm_Override?: ComponentOverride<typeof SignInForm>;
    EmailPasswordSignUpForm_Override?: ComponentOverride<typeof SignUpForm>;
    EmailPasswordResetPasswordEmail_Override?: ComponentOverride<typeof ResetPasswordEmail>;
    EmailPasswordSubmitNewPassword_Override?: ComponentOverride<typeof SubmitNewPassword>;
};
export declare type UserInput = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type SignInAndUpFeatureUserInput = {
    signUpForm?: SignUpFormFeatureUserInput;
    signInForm?: SignInFormFeatureUserInput;
};
export declare type NormalisedSignInAndUpFeatureConfig = {
    signUpForm: NormalisedSignUpFormFeatureConfig;
    signInForm: NormalisedSignInFormFeatureConfig;
};
export declare type SignUpFormFeatureUserInput = FeatureBaseConfig & {
    formFields?: (FormField & {
        inputComponent?: (props: InputProps) => JSX.Element;
    })[];
};
export declare type NormalisedSignUpFormFeatureConfig = NormalisedBaseConfig & {
    formFields: (NormalisedFormField & {
        inputComponent?: (props: InputProps) => JSX.Element;
    })[];
};
export declare type SignInFormFeatureUserInput = FeatureBaseConfig & {
    formFields?: FormFieldSignInConfig[];
};
export declare type NormalisedSignInFormFeatureConfig = NormalisedBaseConfig & {
    formFields: NormalisedFormField[];
};
export declare type FormFieldSignInConfig = FormFieldBaseConfig;
export declare type ResetPasswordUsingTokenUserInput = {
    disableDefaultUI?: boolean;
    submitNewPasswordForm?: FeatureBaseConfig;
    enterEmailForm?: FeatureBaseConfig;
};
export declare type NormalisedResetPasswordUsingTokenFeatureConfig = {
    disableDefaultUI: boolean;
    submitNewPasswordForm: NormalisedSubmitNewPasswordForm;
    enterEmailForm: NormalisedEnterEmailForm;
};
export declare type NormalisedSubmitNewPasswordForm = FeatureBaseConfig & {
    formFields: NormalisedFormField[];
};
export declare type NormalisedEnterEmailForm = FeatureBaseConfig & {
    formFields: NormalisedFormField[];
};
declare type NonSignUpFormThemeBaseProps = ThemeBaseProps & {
    formFields: Omit<FormFieldThemeProps, "inputComponent">[];
    error: string | undefined;
};
export declare type SignInThemeProps = NonSignUpFormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    clearError: () => void;
    onFetchError: (error: Response) => void;
    onError: (error: string) => void;
    config: NormalisedConfig;
    onForgotPasswordClick: () => void;
    onSuccess: (result: { user: User }) => void;
    userContext: UserContext;
};
export declare type SignUpThemeProps = ThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    clearError: () => void;
    onFetchError: (error: Response) => void;
    onError: (error: string) => void;
    config: NormalisedConfig;
    signInClicked?: () => void;
    onSuccess: (result: { user: User }) => void;
    formFields: FormFieldThemeProps[];
    error: string | undefined;
    userContext: UserContext;
};
export declare type FormFieldThemeProps = NormalisedFormField & {
    labelComponent?: JSX.Element;
    showIsRequired?: boolean;
    clearOnSubmit?: boolean;
    inputComponent?: (props: InputProps) => JSX.Element;
};
export declare type FormFieldError = {
    id: string;
    error: string;
};
export declare type PreAndPostAPIHookAction =
    | "EMAIL_PASSWORD_SIGN_UP"
    | "EMAIL_PASSWORD_SIGN_IN"
    | "SEND_RESET_PASSWORD_EMAIL"
    | "SUBMIT_NEW_PASSWORD"
    | "EMAIL_EXISTS";
export declare type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: UserContext;
};
export declare type GetRedirectionURLContext = NormalisedGetRedirectionURLContext<{
    action: "RESET_PASSWORD";
}>;
export declare type OnHandleEventContext =
    | AuthRecipeModuleOnHandleEventContext
    | {
          action: "RESET_PASSWORD_EMAIL_SENT";
          email: string;
          userContext: UserContext;
      }
    | {
          action: "PASSWORD_RESET_SUCCESSFUL";
          userContext: UserContext;
      }
    | {
          action: "SUCCESS";
          isNewRecipeUser: boolean;
          createdNewSession: boolean;
          user: User;
          userContext: UserContext;
      };
export declare type ResetPasswordUsingTokenThemeProps = {
    enterEmailForm: EnterEmailProps;
    submitNewPasswordForm: SubmitNewPasswordProps | undefined;
    config: NormalisedConfig;
    userContext?: UserContext;
};
export declare type EnterEmailProps = NonSignUpFormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    error: string | undefined;
    clearError: () => void;
    onError: (error: string) => void;
    config: NormalisedConfig;
    onBackButtonClicked: () => void;
};
export declare type SubmitNewPasswordProps = NonSignUpFormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    error: string | undefined;
    clearError: () => void;
    onError: (error: string) => void;
    config: NormalisedConfig;
    onSignInClicked: () => void;
    token: string;
};
export declare type EnterEmailStatus = "READY" | "SENT";
export declare type SubmitNewPasswordStatus = "READY" | "SUCCESS";
export declare type FormBaseProps<T> = {
    formDataSupertokens?: string;
    footer?: JSX.Element;
    formFields: FormFieldThemeProps[];
    showLabels: boolean;
    buttonLabel: string;
    validateOnBlur?: boolean;
    clearError: () => void;
    onError: (error: string) => void;
    onFetchError?: (err: Response) => void;
    onSuccess?: (
        result: T & {
            status: "OK";
        }
    ) => void;
    callAPI: (fields: APIFormField[], setValue: (id: string, value: string) => void) => Promise<FormBaseAPIResponse<T>>;
};
export declare type FormBaseAPIResponse<T> =
    | ({
          status: "OK";
      } & T)
    | {
          status: "FIELD_ERROR";
          formFields: FormFieldError[];
      };
declare global {
    interface Document {
        documentMode?: any;
    }
}
export {};
