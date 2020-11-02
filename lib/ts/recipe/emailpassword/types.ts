/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import {
    APIFormField,
    FeatureBaseConfig,
    FormField,
    FormFieldBaseConfig,
    NormalisedBaseConfig,
    NormalisedFormField,
    RecipeModuleConfig,
    RequestJson
} from "../../types";
import EmailPassword from "./emailPassword";
import { CSSInterpolation } from "@emotion/serialize/types/index";
import { RefObject } from "react";
import NormalisedURLPath from "../../normalisedURLPath";
import { API_RESPONSE_STATUS, SUCCESS_ACTION } from "./constants";

/*
 * EmailPassword User InputsConfig Types.
 */

export type EmailPasswordUserInput = {
    /*
     * Styling palette.
     */
    palette?: PaletteUserInput;

    /*
     * Sign In and Sign Up feature.
     */
    signInAndUpFeature?: SignInAndUpFeatureUserInput;

    /*
     * Reset password Using Token feature.
     */
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
};

export type EmailPasswordConfig = RecipeModuleConfig & EmailPasswordUserInput;

export type NormalisedEmailPasswordConfig = {
    /*
     * Styling palette.
     */
    palette: NormalisedPalette;

    /*
     * Sign In and Sign Up feature.
     */
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;

    /*
     * Reset password Using Token feature.
     */
    resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig;
};

export type SignInAndUpFeatureUserInput = {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation?: boolean;

    /*
     * URL to redirect to in case disableDefaultImplemention is true
     */
    onSuccessRedirectURL?: string;

    /*
     * SignUp form config.
     */

    signUpForm?: SignUpFormFeatureUserInput;

    /*
     * SignIn form config.
     */

    signInForm?: SignInFormFeatureUserInput;
};

export type NormalisedSignInAndUpFeatureConfig = {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation: boolean;

    /*
     * URL to redirect to in case disableDefaultImplemention is true
     */
    onSuccessRedirectURL: NormalisedURLPath;

    /*
     * SignUp form config.
     */

    signUpForm: NormalisedSignUpFormFeatureConfig;

    /*
     * SignIn form config.
     */

    signInForm: NormalisedSignInFormFeatureConfig;
};

export type SignUpFormFeatureUserInput = FeatureBaseConfig & {
    /*
     * Form fields for SignUp.
     */
    formFields?: FormFieldSignUpConfig[];

    /*
     * Privacy policy link for sign up form.
     */
    privacyPolicyLink?: string;

    /*
     * Terms and conditions link for sign up form.
     */
    termsAndConditionsLink?: string;
};

export type NormalisedSignUpFormFeatureConfig = NormalisedBaseConfig & {
    /*
     * Normalised form fields for SignUp.
     */
    formFields: NormalisedFormField[];

    /*
     * Privacy policy link for sign up form.
     */
    privacyPolicyLink?: string;

    /*
     * Terms and conditions link for sign up form.
     */
    termsAndConditionsLink?: string;
};

export type SignInFormFeatureUserInput = FeatureBaseConfig & {
    /*
     * Form fields for SignUp.
     */
    formFields?: FormFieldSignInConfig[];

    /*
     * Link to the reset password URL in case disableDefaultImplemention is true.
     */
    resetPasswordURL?: string;
};

export type NormalisedSignInFormFeatureConfig = NormalisedBaseConfig & {
    /*
     * Form fields for SignUp.
     */
    formFields: NormalisedFormField[];

    /*
     * Link to the reset password URL in case disableDefaultImplemention is true.
     */
    resetPasswordURL: NormalisedURLPath;
};

export type FormFieldSignInConfig = FormFieldBaseConfig;

export type FormFieldSignUpConfig = FormField;

export type ResetPasswordUsingTokenUserInput = {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation?: boolean;

    /*
     * URL to redirect to in case disableDefaultImplemention is true
     */
    onSuccessRedirectURL?: string;

    /*
     * submitNewPasswordForm config.
     */
    submitNewPasswordForm?: FeatureBaseConfig;

    /*
     * enterEmailForm config.
     */
    enterEmailForm?: FeatureBaseConfig;
};

export type NormalisedResetPasswordUsingTokenFeatureConfig = {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation: boolean;

    /*
     * URL to redirect to in case disableDefaultImplemention is true
     */
    onSuccessRedirectURL: NormalisedURLPath;

    /*
     * submitNewPasswordForm config.
     */
    submitNewPasswordForm: NormalisedSubmitNewPasswordForm;

    /*
     * enterEmailForm config.
     */
    enterEmailForm: NormalisedEnterEmailForm;
};

export type NormalisedSubmitNewPasswordForm = FeatureBaseConfig & {
    formFields: NormalisedFormField[];
};

export type NormalisedEnterEmailForm = FeatureBaseConfig & {
    formFields: NormalisedFormField[];
};

/*
 * Props Types.
 */
export type BaseProps = {
    /*
     * Internal props provided by
     */
    __internal?: { instance: EmailPassword };

    /*
     * Children elemnt
     */
    children?: JSX.Element;
};

export type SignInAndUpProps = BaseProps & {
    onHandleForgotPasswordClicked?: () => Promise<boolean>;

    doesSessionExist?: () => Promise<boolean>;

    onHandleSuccess?: (context: onHandleSignInAndUpSuccessContext) => Promise<boolean>;

    onCallSignUpAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;

    onCallSignInAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
};

export type ResetPasswordUsingTokenProps = BaseProps & {
    onHandleSuccess(context: {
        action: SUCCESS_ACTION.RESET_PASSWORD_EMAIL_SENT | SUCCESS_ACTION.PASSWORD_RESET_SUCCESSFUL;
    }): Promise<boolean>;

    onCallSubmitNewPasswordAPI(requestJson: RequestJson, headers: HeadersInit): Promise<any>;

    onCallEnterEmailAPI(requestJson: RequestJson, headers: HeadersInit): Promise<any>;
};

export type onHandleResetPasswordUsingTokenSuccessContext = {
    action: SUCCESS_ACTION.RESET_PASSWORD_EMAIL_SENT | SUCCESS_ACTION.PASSWORD_RESET_SUCCESSFUL;
};

type ThemeBaseProps = {
    /*
     * Custom styling from user.
     */
    styleFromInit?: { [key: string]: CSSInterpolation };

    /*
     * Form fields to use in the signin form.
     */
    formFields: FormFieldThemeProps[];

    /*
     * Sign up form props.
     */
    defaultStyles: NormalisedDefaultStyles;

    /*
     * Sign up form props.
     */
    palette: NormalisedPalette;

    /*
     * Called on successful signin/signup/resetpassword.
     */
    onSuccess?: () => void;
};

export type SignInThemeProps = ThemeBaseProps & {
    /*
     * Callback called when Sign Up link is clicked.
     */
    signUpClicked?: () => void;

    /*
     * Callback called when Forgot password link is clicked.
     */
    forgotPasswordClick?: () => void;

    /*
     * Reset password URL for forgot password button.
     */
    resetPasswordURL?: NormalisedURLPath;

    /*
     * Call Sign In API.
     */
    callAPI: (fields: APIFormField[]) => Promise<SignInThemeResponse>;
};

export type SignUpThemeProps = ThemeBaseProps & {
    /*
     * Callback called when Sign In link is clicked.
     */
    signInClicked?: () => void;

    /*
     * Privacy policy link.
     */
    privacyPolicyLink?: string;

    /*
     * Terms and conditions link.
     */
    termsAndConditionsLink?: string;

    /*
     * Call Sign In API.
     */
    callAPI: (fields: APIFormField[]) => Promise<SignUpThemeResponse>;
};

export type SignInAndUpThemeProps = {
    /*
     * Sign in form props.
     */
    signInForm: SignInThemeProps;

    /*
     * Sign up form props.
     */
    signUpForm: SignUpThemeProps;
};

export type NormalisedFormFieldWithError = NormalisedFormField & {
    /*
     * Error message to display to users.
     */
    error?: string;
};

export type FormFieldThemeProps = NormalisedFormFieldWithError;

export type FormFieldError = {
    /*
     * Field id.
     */
    id: string;

    /*
     * Error message.
     */
    error: string;
};

// es-lint / prettier clash regarding | indentation.
/*eslint-disable */
export type BaseResponse =
    | {
          /*
           * Success.
           */
          status: API_RESPONSE_STATUS.OK;
      }
    | {
          /*
           * General error.
           */
          status: API_RESPONSE_STATUS.GENERAL_ERROR;

          /*
           * General error message.
           */
          message: string;
      }
    | {
          /*
           * Field validation errors.
           */
          status: API_RESPONSE_STATUS.FIELD_ERROR;

          /*
           * Array of Field Id and their corresponding error.
           */
          fields: FormFieldError[];
      };

export type SignUpThemeResponse = BaseResponse;

export type SignInThemeResponse =
    | BaseResponse
    | {
          /*
           * Wrong credentials error.
           */
          status: API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR;

          /*
           * Wrong credentials error message.
           */
          message: string;
      };

export type EnterEmailThemeResponse = BaseResponse;

export type SubmitNewPasswordThemeResponse =
    | BaseResponse
    | {
          /*
           * Wrong credentials error.
           */
          status: API_RESPONSE_STATUS.RESET_PASSWORD_INVALID_TOKEN_ERROR;
      };

export type onHandleSignInAndUpSuccessContext =
    | { action: SUCCESS_ACTION.SESSION_ALREADY_EXISTS }
    | {
          /*
           * Sign In / Sign Up success.
           */
          action: SUCCESS_ACTION.SIGN_IN_COMPLETE | SUCCESS_ACTION.SIGN_UP_COMPLETE;
          /*
           * User returned from API.
           */
          user: { id: string; email: string };

          /*
           * Response body from API.
           */
          responseJson: any;
      };

/*eslint-enabled */

export type User = {
    /*
     * User id.
     */
    id: string;

    /*
     * User email.
     */
    email: string;
};

export type ResetPasswordUsingTokenThemeProps = {
    /*
     * Enter email form props.
     */
    enterEmail: EnterEmailThemeProps;

    /*
     * Submit new password form props.
     */
    submitNewPassword: SubmitNewPasswordThemeProps;

    /*
     * A token is present in the query params or not.
     */
    hasToken: boolean;
};

export type EnterEmailThemeProps = ThemeBaseProps & {
    /*
     * Call Sign In API.
     */
    callAPI: (fields: APIFormField[]) => Promise<EnterEmailThemeResponse>;
};

export type SubmitNewPasswordThemeProps = ThemeBaseProps & {
    /*
     * Call Sign In API.
     */
    callAPI: (fields: APIFormField[]) => Promise<SubmitNewPasswordThemeResponse>;

    /*
     * Click on Sign In button after reset password form.
     */
    onSignInClicked: () => void;
};

/*
 * State type.
 */

export type FormFieldState = FormFieldThemeProps & {
    /*
     * Has the value already been submitted to its validator.
     */
    validated: boolean;

    /*
     * Has the value already been submitted to its validator.
     */
    ref: RefObject<HTMLInputElement>;

    /*
     * Has the value already been submitted to its validator.
     */
    showIsRequired?: boolean;
};

enum paletteColorOptions {
    BACKGROUND = "background",
    INPUTBACKGROUND = "inputBackground",
    PRIMARY = "primary",
    ERROR = "error",
    TEXTTITLE = "textTitle",
    TEXTPRIMARY = "textPrimary",
    TEXTSECONDARY = "textSecondary",
    TEXTLINK = "textLink"
}

export type PaletteUserInput = {
    colors?: {
        [key in paletteColorOptions]: string;
    };
};

export type NormalisedPalette = {
    colors: {
        [key in paletteColorOptions]: string;
    };
    fonts: {
        size: string[];
    };
};

enum defaultStylesOptions {
    ROOT = "root",
    CONTAINER = "container",
    ROW = "row",
    GENERALERROR = "generalError",
    INPUTWRAPPER = "inputWrapper",
    INPUT = "input",
    INPUTERROR = "inputError",
    INPUTADORNMENT = "inputAdornment",
    INPUTERRORMESSAGE = "inputErrorMessage",
    BUTTON = "button",
    LABEL = "label",
    FORMROW = "formRow",
    PRIMARYTEXT = "primaryText",
    SECONDARYTEXT = "secondaryText",
    LINK = "link",
    DIVIDER = "divider"
}

export type DefaultStylesUserInput = {
    [key in defaultStylesOptions]?: CSSInterpolation;
};

export type NormalisedDefaultStyles = {
    [key in defaultStylesOptions]: CSSInterpolation;
};

export type FormBaseState = {
    formFields: FormFieldState[];

    generalError: string | undefined;

    isLoading: boolean;
};

export type FormBaseProps = {
    header?: JSX.Element;

    footer?: JSX.Element;

    formFields: FormFieldState[];

    showLabels: boolean;

    buttonLabel: string;

    onSuccess?: () => void;

    callAPI: (
        fields: APIFormField[]
    ) => Promise<SignInThemeResponse | SignUpThemeResponse | SubmitNewPasswordThemeResponse | EnterEmailThemeResponse>;

    defaultStyles: NormalisedDefaultStyles;

    palette: NormalisedPalette;

    styleFromInit?: { [key: string]: CSSInterpolation };
};
