/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
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

import { normaliseAuthRecipe } from "../authRecipe/utils";

import { MANDATORY_FORM_FIELDS_ID_ARRAY } from "./constants";
import {
    defaultLoginPasswordValidator,
    defaultEmailValidator,
    defaultPasswordValidator,
    defaultValidate,
} from "./validators";

import type {
    Config,
    NormalisedConfig,
    NormalisedEnterEmailForm,
    NormalisedResetPasswordUsingTokenFeatureConfig,
    NormalisedSignInAndUpFeatureConfig,
    NormalisedSignInFormFeatureConfig,
    NormalisedSignUpFormFeatureConfig,
    NormalisedSubmitNewPasswordForm,
    ResetPasswordUsingTokenUserInput,
    SignInAndUpFeatureUserInput,
    SignInFormFeatureUserInput,
    SignUpFormFeatureUserInput,
} from "./types";
import type { FormField, FormFieldBaseConfig, NormalisedFormField } from "../../types";
import type { OverrideableBuilder } from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";

export function normaliseEmailPasswordConfig(config: Config): NormalisedConfig {
    const signInAndUpFeature: NormalisedSignInAndUpFeatureConfig = normaliseSignInAndUpFeature(
        config.signInAndUpFeature
    );

    const signUpPasswordField: NormalisedFormField = <NormalisedFormField>signInAndUpFeature.signUpForm.formFields.find(
        (field: NormalisedFormField) => {
            return field.id === "password";
        }
    );

    const signUpEmailField: NormalisedFormField = <NormalisedFormField>signInAndUpFeature.signUpForm.formFields.find(
        (field: NormalisedFormField) => {
            return field.id === "email";
        }
    );

    const resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig =
        normaliseResetPasswordUsingTokenFeature(
            signUpPasswordField.validate,
            signUpEmailField,
            config.resetPasswordUsingTokenFeature
        );

    const override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    } = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        ...config.override,
    };

    return {
        ...normaliseAuthRecipe(config),
        signInAndUpFeature,
        resetPasswordUsingTokenFeature,
        override,
    };
}

export function normaliseSignInAndUpFeature(config?: SignInAndUpFeatureUserInput): NormalisedSignInAndUpFeatureConfig {
    if (config === undefined) {
        config = {};
    }

    const disableDefaultUI = config.disableDefaultUI === true;
    const signUpForm: NormalisedSignUpFormFeatureConfig = normaliseSignUpFormFeatureConfig(config.signUpForm);
    const defaultToSignUp = config.defaultToSignUp !== undefined ? config.defaultToSignUp : false;

    /*
     * Default Sign In corresponds to computed Sign Up fields filtered by email and password only.
     * i.e. If the user overrides sign Up fields, that is propagated to default sign In fields.
     * Exception made of the password validator which only verifies that the value is not empty for login
     * https://github.com/supertokens/supertokens-auth-react/issues/21
     */
    const defaultSignInFields: NormalisedFormField[] = signUpForm.formFields.reduce(
        (signInFieldsAccumulator, field) => {
            if (field.id === "email") {
                return [...signInFieldsAccumulator, field];
            }
            if (field.id === "password") {
                return [
                    ...signInFieldsAccumulator,
                    {
                        ...field,
                        autoComplete: "current-password",
                        validate: defaultLoginPasswordValidator,
                    },
                ];
            }

            return signInFieldsAccumulator;
        },
        [] as NormalisedFormField[]
    );

    const signInForm: NormalisedSignInFormFeatureConfig = normaliseSignInFormFeatureConfig(
        defaultSignInFields,
        config.signInForm
    );
    return {
        disableDefaultUI,
        defaultToSignUp,
        signUpForm,
        signInForm,
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
    const style = config.style !== undefined ? config.style : "";

    return {
        style,
        formFields,
        privacyPolicyLink,
        termsOfServiceLink,
    };
}

export function normaliseSignInFormFeatureConfig(
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
            .filter((field) => MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id))
            // Sign In fields are never optional.
            .map((field: FormFieldBaseConfig) => ({
                ...field,
                optional: false,
            }));
    }
    const formFields = mergeFormFields(defaultFormFields, userFormFields);

    const style = config.style !== undefined ? config.style : "";

    return {
        style,
        formFields,
    };
}

export function getDefaultFormFields(): NormalisedFormField[] {
    return [getDefaultEmailFormField(), getDefaultPasswordFormField()];
}

function getDefaultEmailFormField(): NormalisedFormField {
    return {
        id: "email",
        label: "EMAIL_PASSWORD_EMAIL_LABEL",
        placeholder: "EMAIL_PASSWORD_EMAIL_PLACEHOLDER",
        validate: defaultEmailValidator,
        optional: false,
        autoComplete: "email",
    };
}

function getDefaultPasswordFormField(): NormalisedFormField {
    return {
        id: "password",
        label: "EMAIL_PASSWORD_PASSWORD_LABEL",
        placeholder: "EMAIL_PASSWORD_PASSWORD_PLACEHOLDER",
        validate: defaultPasswordValidator,
        optional: false,
        autoComplete: "new-password",
    };
}

export function normaliseResetPasswordUsingTokenFeature(
    signUpPasswordFieldValidate: (value: any) => Promise<string | undefined> | string | undefined,
    signUpEmailField: NormalisedFormField,
    config?: ResetPasswordUsingTokenUserInput
): NormalisedResetPasswordUsingTokenFeatureConfig {
    if (config === undefined) {
        config = {};
    }

    const disableDefaultUI = config.disableDefaultUI === true;

    const submitNewPasswordFormStyle =
        config.submitNewPasswordForm !== undefined && config.submitNewPasswordForm.style !== undefined
            ? config.submitNewPasswordForm.style
            : "";

    const submitNewPasswordForm: NormalisedSubmitNewPasswordForm = {
        style: submitNewPasswordFormStyle,
        formFields: [
            {
                id: "password",
                label: "EMAIL_PASSWORD_NEW_PASSWORD_LABEL",
                placeholder: "EMAIL_PASSWORD_NEW_PASSWORD_PLACEHOLDER",
                validate: signUpPasswordFieldValidate,
                optional: false,
                autoComplete: "new-password",
            },
            {
                id: "confirm-password",
                label: "EMAIL_PASSWORD_CONFIRM_PASSWORD_LABEL",
                placeholder: "EMAIL_PASSWORD_CONFIRM_PASSWORD_PLACEHOLDER",
                validate: signUpPasswordFieldValidate,
                optional: false,
                autoComplete: "new-password",
            },
        ],
    };

    const enterEmailFormStyle =
        config.enterEmailForm !== undefined && config.enterEmailForm.style !== undefined
            ? config.enterEmailForm.style
            : "";

    const enterEmailForm: NormalisedEnterEmailForm = {
        style: enterEmailFormStyle,
        formFields: [
            {
                ...getDefaultEmailFormField(),
                validate: signUpEmailField.validate,
                placeholder: "",
                autofocus: true,
            },
        ],
    };

    return {
        disableDefaultUI,
        submitNewPasswordForm,
        enterEmailForm,
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
                if (MANDATORY_FORM_FIELDS_ID_ARRAY.includes(userField.id)) {
                    optional = false;
                }

                // Merge.
                mergedFormFields[j] = {
                    ...mergedFormFields[j],
                    ...userField,
                    optional,
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
                ...userField,
            });
        }
    }

    return mergedFormFields.map((field) => getFormattedFormField(field));
}

export function getFormattedFormField(field: NormalisedFormField): NormalisedFormField {
    return {
        ...field,
        validate: async (value: any): Promise<string | undefined> => {
            // Absent or not optional empty field
            if (value === "" && field.optional === false) {
                return "ERROR_NON_OPTIONAL";
            }

            return await field.validate(value);
        },
    };
}
