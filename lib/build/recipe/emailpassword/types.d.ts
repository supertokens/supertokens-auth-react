import {
    APIFormField,
    FeatureBaseConfig,
    FormField,
    FormFieldBaseConfig,
    NormalisedBaseConfig,
    NormalisedFormField,
    ThemeBaseProps,
} from "../../types";
import { ForwardRefExoticComponent, RefAttributes, RefObject } from "react";
import {
    GetRedirectionURLContext as AuthRecipeModuleGetRedirectionURLContext,
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    PreAndPostAPIHookAction as AuthRecipeModulePreAPIHookAction,
    User,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
    UserInputOverride as AuthRecipeUserInputOverride,
} from "../authRecipeWithEmailVerification/types";
import OverrideableBuilder from "supertokens-js-override";
import { ComponentOverride } from "../../components/componentOverride/componentOverride";
import { SignInHeader } from "./components/themes/signInAndUp/signInHeader";
import { SignIn } from "./components/themes/signInAndUp/signIn";
import { SignInFooter } from "./components/themes/signInAndUp/signInFooter";
import { SignInForm } from "./components/themes/signInAndUp/signInForm";
import { SignUp } from "./components/themes/signInAndUp/signUp";
import { SignUpFooter } from "./components/themes/signInAndUp/signUpFooter";
import { SignUpForm } from "./components/themes/signInAndUp/signUpForm";
import { SignUpHeader } from "./components/themes/signInAndUp/signUpHeader";
import { ResetPasswordEmail } from "./components/themes/resetPasswordUsingToken/resetPasswordEmail";
import { SubmitNewPassword } from "./components/themes/resetPasswordUsingToken/submitNewPassword";
import { InputProps } from "./components/library/input";
export declare type ComponentOverrideMap = {
    EmailPasswordSignIn?: ComponentOverride<typeof SignIn>;
    EmailPasswordSignInFooter?: ComponentOverride<typeof SignInFooter>;
    EmailPasswordSignInForm?: ComponentOverride<typeof SignInForm>;
    EmailPasswordSignInHeader?: ComponentOverride<typeof SignInHeader>;
    EmailPasswordSignUp?: ComponentOverride<typeof SignUp>;
    EmailPasswordSignUpFooter?: ComponentOverride<typeof SignUpFooter>;
    EmailPasswordSignUpForm?: ComponentOverride<typeof SignUpForm>;
    EmailPasswordSignUpHeader?: ComponentOverride<typeof SignUpHeader>;
    EmailPasswordResetPasswordEmail?: ComponentOverride<typeof ResetPasswordEmail>;
    EmailPasswordSubmitNewPassword?: ComponentOverride<typeof SubmitNewPassword>;
};
export declare type UserInput = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
        components?: ComponentOverrideMap;
    } & AuthRecipeUserInputOverride;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
        components: ComponentOverrideMap;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type SignInAndUpFeatureUserInput = {
    disableDefaultImplementation?: boolean;
    defaultToSignUp?: boolean;
    signUpForm?: SignUpFormFeatureUserInput;
    signInForm?: SignInFormFeatureUserInput;
};
export declare type NormalisedSignInAndUpFeatureConfig = {
    disableDefaultImplementation: boolean;
    defaultToSignUp: boolean;
    signUpForm: NormalisedSignUpFormFeatureConfig;
    signInForm: NormalisedSignInFormFeatureConfig;
};
export declare type SignUpFormFeatureUserInput = FeatureBaseConfig & {
    formFields?: FormFieldSignUpConfig[];
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
};
export declare type NormalisedSignUpFormFeatureConfig = NormalisedBaseConfig & {
    formFields: NormalisedFormField[];
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
};
export declare type SignInFormFeatureUserInput = FeatureBaseConfig & {
    formFields?: FormFieldSignInConfig[];
};
export declare type NormalisedSignInFormFeatureConfig = NormalisedBaseConfig & {
    formFields: NormalisedFormField[];
};
export declare type FormFieldSignInConfig = FormFieldBaseConfig;
export declare type FormFieldSignUpConfig = FormField;
export declare type ResetPasswordUsingTokenUserInput = {
    disableDefaultImplementation?: boolean;
    submitNewPasswordForm?: FeatureBaseConfig;
    enterEmailForm?: FeatureBaseConfig;
};
export declare type NormalisedResetPasswordUsingTokenFeatureConfig = {
    disableDefaultImplementation: boolean;
    submitNewPasswordForm: NormalisedSubmitNewPasswordForm;
    enterEmailForm: NormalisedEnterEmailForm;
};
export declare type NormalisedSubmitNewPasswordForm = FeatureBaseConfig & {
    formFields: NormalisedFormField[];
};
export declare type NormalisedEnterEmailForm = FeatureBaseConfig & {
    formFields: NormalisedFormField[];
};
declare type FormThemeBaseProps = ThemeBaseProps & {
    formFields: FormFieldThemeProps[];
};
export declare type SignInThemeProps = FormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    signUpClicked?: () => void;
    forgotPasswordClick: () => void;
    onSuccess: () => void;
};
export declare type SignUpThemeProps = FormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    signInClicked?: () => void;
    onSuccess: () => void;
};
export declare type SignInAndUpThemeProps = {
    signInForm: SignInThemeProps;
    signUpForm: SignUpThemeProps;
    config: NormalisedConfig;
};
export declare type NormalisedFormFieldWithError = NormalisedFormField & {
    error?: string;
};
export declare type FormFieldThemeProps = NormalisedFormFieldWithError & {
    labelComponent?: JSX.Element;
    inputComponent?: ForwardRefExoticComponent<InputProps & RefAttributes<InputRef>>;
    showIsRequired?: boolean;
    clearOnSubmit?: boolean;
    autofocus?: boolean;
    autoComplete?: string;
};
export declare type FormFieldState = FormFieldThemeProps & {
    validated: boolean;
    ref: RefObject<InputRef>;
};
export declare type InputRef = HTMLInputElement & {
    isFocused?: boolean;
};
export declare type FormFieldError = {
    id: string;
    error: string;
};
export declare type PreAndPostAPIHookAction =
    | AuthRecipeModulePreAPIHookAction
    | "EMAIL_PASSWORD_SIGN_UP"
    | "EMAIL_PASSWORD_SIGN_IN"
    | "SEND_RESET_PASSWORD_EMAIL"
    | "SUBMIT_NEW_PASSWORD"
    | "EMAIL_EXISTS";
export declare type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: any;
};
export declare type GetRedirectionURLContext =
    | AuthRecipeModuleGetRedirectionURLContext
    | {
          action: "RESET_PASSWORD";
      };
export declare type OnHandleEventContext =
    | AuthRecipeModuleOnHandleEventContext
    | {
          action: "RESET_PASSWORD_EMAIL_SENT" | "PASSWORD_RESET_SUCCESSFUL";
      }
    | {
          action: "SUCCESS";
          isNewUser: boolean;
          user: {
              id: string;
              email: string;
          };
      };
export declare type ResetPasswordUsingTokenThemeProps = {
    enterEmailForm: EnterEmailProps;
    submitNewPasswordForm: SubmitNewPasswordProps | undefined;
    config: NormalisedConfig;
};
export declare type EnterEmailProps = FormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
};
export declare type SubmitNewPasswordProps = FormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSignInClicked: () => void;
    token: string;
};
export declare type EnterEmailStatus = "READY" | "SENT";
export declare type SubmitNewPasswordStatus = "READY" | "SUCCESS";
export declare type FormBaseState = {
    formFields: FormFieldState[];
    unmounting: AbortController;
} & (
    | {
          formFields: FormFieldState[];
          status: "IN_PROGRESS" | "READY" | "LOADING" | "FIELD_ERRORS" | "SUCCESS";
          unmounting: AbortController;
      }
    | {
          status: "GENERAL_ERROR";
          generalError: string;
      }
);
export declare type FormBaseProps<T> = {
    header?: JSX.Element;
    footer?: JSX.Element;
    formFields: FormFieldThemeProps[];
    showLabels: boolean;
    buttonLabel: string;
    error?: string;
    validateOnBlur?: boolean;
    onSuccess?: (
        result: T & {
            status: "OK";
        }
    ) => void;
    callAPI: (fields: APIFormField[]) => Promise<FormBaseAPIResponse<T>>;
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
export declare type SignInAndUpState = {
    user?: User;
};
export declare type RecipeInterface = {
    submitNewPassword: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        token: string;
        config: NormalisedConfig;
        userContext: any;
    }) => Promise<
        | {
              status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    >;
    sendPasswordResetEmail: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedConfig;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    >;
    signUp: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedConfig;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    >;
    signIn: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedConfig;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
        | {
              status: "WRONG_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
    >;
    doesEmailExist: (input: { email: string; config: NormalisedConfig; userContext: any }) => Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
};
export {};
