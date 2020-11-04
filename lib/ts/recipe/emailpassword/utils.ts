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
import { DEFAULT_RESET_PASSWORD_PATH, MANDATORY_FORM_FIELDS_ID, MANDATORY_FORM_FIELDS_ID_ARRAY } from "./constants";
import { defaultPalette } from "./styles/styles";
import {
    EmailPasswordConfig,
    NormalisedEmailPasswordConfig,
    NormalisedEnterEmailForm,
    NormalisedPalette,
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

/*
 * defaultEmailValidator.
 */

export async function defaultEmailValidator(value: string): Promise<string | undefined> {
    // eslint-disable-next-line no-useless-escape
    const defaultEmailValidatorRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // We check if the email syntax is correct
    // As per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
    // Regex from https://stackoverflow.com/a/46181/3867175

    if (value.match(defaultEmailValidatorRegexp) === null) {
        return "Email is invalid";
    }

    return undefined;
}

/*
 * defaultPasswordValidator.
 * min 8 characters.
 * Contains lowercase, uppercase, and numbers.
 */

export async function defaultPasswordValidator(value: string): Promise<string | undefined> {
    // length >= 8 && < 100
    // must have a number and a character
    // as per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438

    if (value.length < 8) {
        return "Password must contain at least 8 characters, including a number";
    }

    if (value.length >= 100) {
        return "Password's length must be lesser than 100 characters";
    }

    if (value.match(/^.*[A-Za-z]+.*$/) === null) {
        return "Password must contain at least one alphabet";
    }

    if (value.match(/^.*[0-9]+.*$/) === null) {
        return "Password must contain at least one number";
    }

    return undefined;
}

/*
 * defaultLoginPasswordValidator.
 * min 1 characters.
 */

export async function defaultLoginPasswordValidator(value: string): Promise<string | undefined> {
    // length = 0
    if (value.length === 0) {
        return "Password must not be empty";
    }
    return undefined;
}

export function normaliseEmailPasswordConfig(config: EmailPasswordConfig): NormalisedEmailPasswordConfig {
    const signInAndUpFeature: NormalisedSignInAndUpFeatureConfig = normaliseSignInAndUpFeature(
        config.appInfo,
        config.signInAndUpFeature
    );
    const resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig = normaliseResetPasswordUsingTokenFeature(
        config.resetPasswordUsingTokenFeature
    );

    const palette: NormalisedPalette = defaultPalette;
    if (config.palette !== undefined) {
        if (config.palette.colors !== undefined) {
            palette.colors = {
                ...defaultPalette.colors,
                ...config.palette.colors
            };
        }
    }

    const useShadowDom = config.useShadowDom !== undefined ? config.useShadowDom === true : true;

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
    const onSuccessRedirectURL =
        config.onSuccessRedirectURL !== undefined
            ? new NormalisedURLPath(config.onSuccessRedirectURL)
            : new NormalisedURLPath("/");
    const signUpForm: NormalisedSignUpFormFeatureConfig = normaliseSignUpFormFeatureConfig(config.signUpForm);

    /*
     * Default Sign In corresponds to computed Sign Up fields filtered by email and password only.
     * i.e. If the user overrides sign Up fields, that is propagated to default sign In fields.
     * Exception made of the password validator which only verifies that the value is not empty for login.
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
    const termsAndConditionsLink = config.termsAndConditionsLink;
    const style = config.style || {};

    return {
        style,
        formFields,
        privacyPolicyLink,
        termsAndConditionsLink
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
        userFormFields = config.formFields.reduce((acc: FormField[], field: FormFieldBaseConfig) => {
            // Filter on email and password only.
            if (!MANDATORY_FORM_FIELDS_ID_ARRAY.includes(<MANDATORY_FORM_FIELDS_ID>field.id)) {
                return acc;
            }
            return [
                ...acc,
                {
                    ...field,
                    optional: false // Sign In fields are never optional.
                }
            ];
        }, []);
    }
    const formFields = mergeFormFields(defaultFormFields, userFormFields);

    let resetPasswordURL: NormalisedURLPath;
    if (config.resetPasswordURL) {
        resetPasswordURL = new NormalisedURLPath(config.resetPasswordURL);
    } else {
        resetPasswordURL = new NormalisedURLPath(
            `${appInfo.websiteBasePath.getAsStringDangerous()}${DEFAULT_RESET_PASSWORD_PATH}`
        );
    }

    const style = config.style || {};

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
        optional: false
    };
}

function getDefaultPasswordFormField(): NormalisedFormField {
    return {
        id: "password",
        label: "Password",
        placeholder: "Password",
        validate: defaultPasswordValidator,
        optional: false
    };
}

export function normaliseResetPasswordUsingTokenFeature(
    config?: ResetPasswordUsingTokenUserInput
): NormalisedResetPasswordUsingTokenFeatureConfig {
    if (config === undefined) {
        config = {};
    }

    const disableDefaultImplementation = config.disableDefaultImplementation === true;
    const onSuccessRedirectURL =
        config.onSuccessRedirectURL !== undefined
            ? new NormalisedURLPath(config.onSuccessRedirectURL)
            : new NormalisedURLPath("/");

    const submitNewPasswordFormStyle =
        config.submitNewPasswordForm !== undefined && config.submitNewPasswordForm.style !== undefined
            ? config.submitNewPasswordForm.style
            : {};

    const submitNewPasswordForm: NormalisedSubmitNewPasswordForm = {
        style: submitNewPasswordFormStyle,
        formFields: [
            Object.assign(
                {
                    label: "New password",
                    placeholder: "New password"
                },
                getDefaultPasswordFormField()
            ),
            {
                id: "confirm-password",
                label: "Confirm password",
                placeholder: "Confirm your password",
                validate: defaultPasswordValidator,
                optional: false
            }
        ]
    };

    const enterEmailFormStyle =
        config.enterEmailForm !== undefined && config.enterEmailForm.style !== undefined
            ? config.enterEmailForm.style
            : {};

    const enterEmailForm: NormalisedEnterEmailForm = {
        style: enterEmailFormStyle,
        formFields: [getDefaultEmailFormField()]
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
                placeholder: capitalize(userField.id),
                validate: defaultValidate,
                ...userField
            });
        }
    }

    return mergedFormFields;
}

/*
 * capitalize
 */
export function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

/*
 * defaultValidate
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function defaultValidate(_: string): Promise<string | undefined> {
    return undefined;
}
