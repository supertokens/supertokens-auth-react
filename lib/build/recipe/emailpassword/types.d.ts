import {
    APIFormField,
    FeatureBaseConfig,
    FormField,
    FormFieldBaseConfig,
    NormalisedBaseConfig,
    NormalisedFormField,
    ThemeBaseProps,
} from "../../types";
import { RefObject } from "react";
import {
    GetRedirectionURLContext as AuthRecipeModuleGetRedirectionURLContext,
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    PreAPIHookContext as AuthRecipeModulePreAPIHookContext,
    User,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
    UserInputOverride as AuthRecipeUserInputOverride,
} from "../authRecipeModule/types";
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
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
export declare type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
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
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
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
    showIsRequired?: boolean;
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
export declare type PreAPIHookContext =
    | AuthRecipeModulePreAPIHookContext
    | {
          action:
              | "EMAIL_PASSWORD_SIGN_UP"
              | "EMAIL_PASSWORD_SIGN_IN"
              | "SEND_RESET_PASSWORD_EMAIL"
              | "SUBMIT_NEW_PASSWORD"
              | "EMAIL_EXISTS";
          requestInit: RequestInit;
          url: string;
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
export declare type EnterEmailState = {
    status: "READY" | "SENT";
};
export declare type SubmitNewPasswordState = {
    status: "READY" | "SUCCESS";
};
export declare type FormBaseState =
    | {
          formFields: FormFieldState[];
          status: "IN_PROGRESS" | "READY" | "LOADING" | "FIELD_ERRORS" | "SUCCESS";
      }
    | {
          formFields: FormFieldState[];
          status: "GENERAL_ERROR";
          generalError: string;
      };
export declare type FormBaseProps = {
    header?: JSX.Element;
    footer?: JSX.Element;
    formFields: FormFieldThemeProps[];
    showLabels: boolean;
    buttonLabel: string;
    validateOnBlur?: boolean;
    onSuccess?: () => void;
    callAPI: (fields: APIFormField[]) => Promise<FormBaseAPIResponse>;
};
export declare type FormBaseAPIResponse =
    | {
          status: "OK";
          user?: User;
      }
    | {
          status: "GENERAL_ERROR";
          message: string;
      }
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
    }) => Promise<
        | {
              status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
          }
    >;
    sendPasswordResetEmail: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedConfig;
    }) => Promise<
        | {
              status: "OK";
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
          }
    >;
    signUp: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedConfig;
    }) => Promise<
        | {
              status: "OK";
              user: User;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
          }
    >;
    signIn: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedConfig;
    }) => Promise<
        | {
              status: "OK";
              user: User;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
          }
        | {
              status: "WRONG_CREDENTIALS_ERROR";
          }
    >;
    doesEmailExist: (input: { email: string; config: NormalisedConfig }) => Promise<boolean>;
};
export {};
