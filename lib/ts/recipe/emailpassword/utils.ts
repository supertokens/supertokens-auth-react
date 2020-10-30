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

import { DEFAULT_RESET_PASSWORD_PATH, MANDATORY_FORM_FIELDS_ID_ARRAY } from "../../constants";
import NormalisedURLPath from "../../normalisedURLPath";
import { FormField, FormFieldBaseConfig, NormalisedAppInfo, NormalisedFormField } from "../../types";
import { mergeFormFields } from "../../utils";
import { defaultPalette } from "./styles/styles";
import {
    EmailPasswordConfig,
    NormalisedEmailPasswordConfig,
    NormalisedPalette,
    NormalisedSignInAndUpFeatureConfig,
    NormalisedSignInFormFeatureConfig,
    NormalisedSignUpFormFeatureConfig,
    SignInAndUpFeatureUserInput,
    SignInFormFeatureUserInput,
    SignUpFormFeatureUserInput
} from "./types";

/*
 * defaultEmailValidator.
 */

export async function defaultEmailValidator(value: string) {
    // We check if the email syntax is correct
    // As per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
    // Regex from https://stackoverflow.com/a/46181/3867175

    if (
        value.match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) === null
    ) {
        return "Email is invalid";
    }

    return undefined;
}

/*
 * defaultPasswordValidator.
 * min 8 characters.
 * Contains lowercase, uppercase, and numbers.
 */

export async function defaultPasswordValidator(value: string) {
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

export function normaliseEmailPasswordConfigOrThrow(config: EmailPasswordConfig): NormalisedEmailPasswordConfig {
    const signInAndUpFeature: NormalisedSignInAndUpFeatureConfig = normaliseSignInAndUpFeature(
        config.appInfo,
        config.signInAndUpFeature
    );
    const resetPasswordUsingTokenFeature: any = undefined;

    let palette: NormalisedPalette = defaultPalette;
    if (config.palette !== undefined) {
        if (config.palette.colors !== undefined) {
            palette.colors = {
                ...defaultPalette.colors,
                ...config.palette.colors
            };
        }
        if (config.palette.fonts !== undefined) {
            palette.fonts = {
                ...defaultPalette.fonts,
                ...config.palette.fonts
            };
        }
    }

    return {
        palette,
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
     * Default Sign In corresponds tocomputed Sign Up fields filtered by email and password only.
     * i.e. If the user overrides sign Up fields, that is propagated to default sign In fields.
     */

    const defaultSignInFields: NormalisedFormField[] = signUpForm.formFields.filter(field => {
        return MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id);
    });

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
            if (!MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id)) {
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
        resetPasswordURL = new NormalisedURLPath(`${appInfo.websiteBasePath}${DEFAULT_RESET_PASSWORD_PATH}`);
    }

    const style = config.style || {};

    return {
        style,
        formFields,
        resetPasswordURL
    };
}

export function getDefaultFormFields(): NormalisedFormField[] {
    return [
        {
            id: "email",
            label: "Email",
            placeholder: "youremail@example.com",
            validate: defaultEmailValidator,
            optional: false
        },
        {
            id: "password",
            label: "Password",
            placeholder: "Enter your password",
            validate: defaultPasswordValidator,
            optional: false
        }
    ];
}
