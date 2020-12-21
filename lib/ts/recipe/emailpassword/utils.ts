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

import NormalisedURLPath from "../../normalisedURLPath";
import { FormField, FormFieldBaseConfig, NormalisedAppInfo, NormalisedFormField } from "../../types";
import { getWindowOrThrow } from "../../utils";
import { DEFAULT_RESET_PASSWORD_PATH, MANDATORY_FORM_FIELDS_ID, MANDATORY_FORM_FIELDS_ID_ARRAY } from "./constants";
import {
    EmailPasswordConfig,
    NormalisedEmailPasswordConfig,
    NormalisedEnterEmailForm,
    NormalisedResetPasswordUsingTokenFeatureConfig,
    NormalisedSignInAndUpFeatureConfig,
    NormalisedSignInFormFeatureConfig,
    NormalisedSignUpFormFeatureConfig,
    NormalisedSubmitNewPasswordForm,
    ResetPasswordUsingTokenUserInput,
    SignInAndUpFeatureUserInput,
    SignInFormFeatureUserInput,
    SignUpFormFeatureUserInput
} from "./types";
import {
    defaultLoginPasswordValidator,
    defaultEmailValidator,
    defaultPasswordValidator,
    defaultValidate
} from "./validators";

export function normaliseEmailPasswordConfig(config: EmailPasswordConfig): NormalisedEmailPasswordConfig {
    const signInAndUpFeature: NormalisedSignInAndUpFeatureConfig = normaliseSignInAndUpFeature(
        config.appInfo,
        config.signInAndUpFeature
    );

    const signUpPasswordField: NormalisedFormField = <NormalisedFormField>signInAndUpFeature.signUpForm.formFields.find(
        (field: NormalisedFormField) => {
            return <MANDATORY_FORM_FIELDS_ID>field.id === MANDATORY_FORM_FIELDS_ID.PASSWORD;
        }
    );

    const signUpEmailField: NormalisedFormField = <NormalisedFormField>signInAndUpFeature.signUpForm.formFields.find(
        (field: NormalisedFormField) => {
            return <MANDATORY_FORM_FIELDS_ID>field.id === MANDATORY_FORM_FIELDS_ID.EMAIL;
        }
    );

    const resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig = normaliseResetPasswordUsingTokenFeature(
        signUpPasswordField.validate,
        signUpEmailField,
        config.appInfo.websiteBasePath,
        config.resetPasswordUsingTokenFeature
    );

    const palette = config.palette !== undefined ? config.palette : {};

    const useShadowDom = getShouldUseShadowDom(config.useShadowDom);

    return {
        palette,
        useShadowDom,
        signInAndUpFeature,
        resetPasswordUsingTokenFeature
    };
}

export function normaliseSignInAndUpFeature(
    appInfo: NormalisedAppInfo,
    config?: SignInAndUpFeatureUserInput
): NormalisedSignInAndUpFeatureConfig {
    if (config === undefined) {
        config = {};
    }

    const disableDefaultImplementation = config.disableDefaultImplementation === true;
    const onSuccessRedirectURL = config.onSuccessRedirectURL !== undefined ? config.onSuccessRedirectURL : "/";
    const signUpForm: NormalisedSignUpFormFeatureConfig = normaliseSignUpFormFeatureConfig(config.signUpForm);
    const defaultToSignUp = config.defaultToSignUp !== undefined ? config.defaultToSignUp : true;

    /*
     * Default Sign In corresponds to computed Sign Up fields filtered by email and password only.
     * i.e. If the user overrides sign Up fields, that is propagated to default sign In fields.
     * Exception made of the password validator which only verifies that the value is not empty for login
     * https://github.com/supertokens/supertokens-auth-react/issues/21
     */
    const defaultSignInFields: NormalisedFormField[] = signUpForm.formFields.reduce(
        (signInFieldsAccumulator, field) => {
            if (field.id === MANDATORY_FORM_FIELDS_ID.EMAIL) {
                return [...signInFieldsAccumulator, field];
            }
            if (field.id === MANDATORY_FORM_FIELDS_ID.PASSWORD) {
                return [
                    ...signInFieldsAccumulator,
                    {
                        ...field,
                        autoComplete: "current-password",
                        validate: defaultLoginPasswordValidator
                    }
                ];
            }

            return signInFieldsAccumulator;
        },
        []
    );

    const signInForm: NormalisedSignInFormFeatureConfig = normaliseSignInFormFeatureConfig(
        appInfo,
        defaultSignInFields,
        config.signInForm
    );
    return {
        onSuccessRedirectURL,
        disableDefaultImplementation,
        defaultToSignUp,
        signUpForm,
        signInForm
    };
}

export function normaliseSignUpFormFeatureConfig(
    config?: SignUpFormFeatureUserInput
): NormalisedSignUpFormFeatureConfig {
    if (config === undefined) {
        config = {};
    }

    const defaultFormFields = getDefaultFormFields();

    let userFormFields: FormField[] = [];
    if (config.formFields !== undefined) {
        userFormFields = config.formFields;
    }
    const formFields = mergeFormFields(defaultFormFields, userFormFields);
    const privacyPolicyLink = config.privacyPolicyLink;
    const termsOfServiceLink = config.termsOfServiceLink;
    const style = config.style !== undefined ? config.style : {};

    return {
        style,
        formFields,
        privacyPolicyLink,
        termsOfServiceLink
    };
}

export function normaliseSignInFormFeatureConfig(
    appInfo: NormalisedAppInfo,
    defaultFormFields: NormalisedFormField[],
    config?: SignInFormFeatureUserInput
): NormalisedSignInFormFeatureConfig {
    if (config === undefined) {
        config = {};
    }

    let userFormFields: FormField[] = [];
    if (config.formFields !== undefined) {
        userFormFields = config.formFields
            // Filter on email and password only.
            .filter(field => MANDATORY_FORM_FIELDS_ID_ARRAY.includes(<MANDATORY_FORM_FIELDS_ID>field.id))
            // Sign In fields are never optional.
            .map((field: FormFieldBaseConfig) => ({
                ...field,
                optional: false
            }));
    }
    const formFields = mergeFormFields(defaultFormFields, userFormFields);

    let resetPasswordURL: NormalisedURLPath;
    if (config.resetPasswordURL !== undefined) {
        resetPasswordURL = new NormalisedURLPath(config.resetPasswordURL);
    } else {
        resetPasswordURL = new NormalisedURLPath(
            `${appInfo.websiteBasePath.getAsStringDangerous()}${DEFAULT_RESET_PASSWORD_PATH}`
        );
    }

    const style = config.style !== undefined ? config.style : {};

    return {
        style,
        formFields,
        resetPasswordURL
    };
}

export function getDefaultFormFields(): NormalisedFormField[] {
    return [getDefaultEmailFormField(), getDefaultPasswordFormField()];
}

function getDefaultEmailFormField(): NormalisedFormField {
    return {
        id: "email",
        label: "Email",
        placeholder: "Email address",
        validate: defaultEmailValidator,
        optional: false,
        autoComplete: "email"
    };
}

function getDefaultPasswordFormField(): NormalisedFormField {
    return {
        id: "password",
        label: "Password",
        placeholder: "Password",
        validate: defaultPasswordValidator,
        optional: false,
        autoComplete: "new-password"
    };
}

export function normaliseResetPasswordUsingTokenFeature(
    signUpPasswordFieldValidate: (value: any) => Promise<string | undefined>,
    signUpEmailField: NormalisedFormField,
    websiteBasePath: NormalisedURLPath,
    config?: ResetPasswordUsingTokenUserInput
): NormalisedResetPasswordUsingTokenFeatureConfig {
    if (config === undefined) {
        config = {};
    }

    const disableDefaultImplementation = config.disableDefaultImplementation === true;
    const onSuccessRedirectURL =
        config.onSuccessRedirectURL !== undefined
            ? config.onSuccessRedirectURL
            : websiteBasePath.getAsStringDangerous();

    const submitNewPasswordFormStyle =
        config.submitNewPasswordForm !== undefined && config.submitNewPasswordForm.style !== undefined
            ? config.submitNewPasswordForm.style
            : {};

    const submitNewPasswordForm: NormalisedSubmitNewPasswordForm = {
        style: submitNewPasswordFormStyle,
        formFields: [
            {
                id: "password",
                label: "New password",
                placeholder: "New password",
                validate: signUpPasswordFieldValidate,
                optional: false,
                autoComplete: "new-password"
            },
            {
                id: "confirm-password",
                label: "Confirm password",
                placeholder: "Confirm your password",
                validate: signUpPasswordFieldValidate,
                optional: false,
                autoComplete: "new-password"
            }
        ]
    };

    const enterEmailFormStyle =
        config.enterEmailForm !== undefined && config.enterEmailForm.style !== undefined
            ? config.enterEmailForm.style
            : {};

    const enterEmailForm: NormalisedEnterEmailForm = {
        style: enterEmailFormStyle,
        formFields: [signUpEmailField]
    };

    return {
        onSuccessRedirectURL,
        disableDefaultImplementation,
        submitNewPasswordForm,
        enterEmailForm
    };
}

/*
 * mergeFormFields by keeping the provided order, defaultFormFields or merged first, and unmerged userFormFields after.
 */

export function mergeFormFields(
    defaultFormFields: NormalisedFormField[],
    userFormFields: FormField[]
): NormalisedFormField[] {
    // Create a new array with default fields.
    const mergedFormFields: NormalisedFormField[] = defaultFormFields;

    // Loop through user provided fields.
    for (let i = 0; i < userFormFields.length; i++) {
        const userField = userFormFields[i];
        let isNewField = true;

        // Loop through the merged fields array.
        for (let j = 0; j < mergedFormFields.length; j++) {
            const mergedField = mergedFormFields[j];

            // If id is equal, merge the fields
            if (userField.id === mergedField.id) {
                // Make sure that email and password are kept mandatory.
                let optional: boolean = mergedField.optional; // Init with default value.
                // If user provided value, overwrite.
                if (userField.optional !== undefined) {
                    optional = userField.optional;
                }

                // If "email" or "password", always mandatory.
                if (MANDATORY_FORM_FIELDS_ID_ARRAY.includes(<MANDATORY_FORM_FIELDS_ID>userField.id)) {
                    optional = false;
                }

                // Merge.
                mergedFormFields[j] = {
                    ...mergedFormFields[j],
                    ...userField,
                    optional
                };

                isNewField = false;
                break;
            }
        }

        // If new field, push to mergeFormFields.
        if (isNewField) {
            mergedFormFields.push({
                optional: false,
                placeholder: userField.label,
                validate: defaultValidate,
                ...userField
            });
        }
    }

    return mergedFormFields.map(field => getFormattedFormField(field));
}

export function getFormattedFormField(field: NormalisedFormField): NormalisedFormField {
    return {
        ...field,
        validate: async (value: any): Promise<string | undefined> => {
            // Absent or not optional empty field
            if (value === "" && field.optional === false) {
                return "Field is not optional";
            }

            return await field.validate(value);
        }
    };
}

function getShouldUseShadowDom(useShadowDom?: boolean): boolean {
    /*
     * Detect if browser is IE
     * In order to disable unsupported shadowDom
     * https://github.com/supertokens/supertokens-auth-react/issues/99
     */
    const isIE = getWindowOrThrow().document.documentMode !== undefined;
    // If browser is Internet Explorer, always disable shadow dom.
    if (isIE === true) {
        return false;
    }

    // Otherwise, use provided config or default to true.
    return useShadowDom !== undefined ? useShadowDom : true;
}
