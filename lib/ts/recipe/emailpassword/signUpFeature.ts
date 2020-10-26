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

/*
 * Imports.
 */
import { FormFields, RequestJson } from "../../types";
import { SignUpFormFeatureConfig } from "./types";
import { mergeFormFields, validateEmail, validatePassword } from "../../utils";

/*
 * Class.
 */
export default class SignUpFeature {
    /*
     * Instance attributes.
     */
    formFields: FormFields[];
    privacyPolicyLink?: string;
    termsAndConditionsLink?: string;

    /*
     * Constructor.
     */
    constructor(config?: SignUpFormFeatureConfig) {
        const defaultFormFields = this.getDefaultFormFields();

        let userFormFields: FormFields[] = [];
        if (config !== undefined) {
            this.privacyPolicyLink = config.privacyPolicyLink;
            this.termsAndConditionsLink = config.termsAndConditionsLink;

            if (config.formFields !== undefined) {
                userFormFields = config.formFields;
            }
        }

        this.formFields = mergeFormFields(defaultFormFields, userFormFields);
    }

    /*
     * Instance methods.
     */

    getFormFields = (): FormFields[] => {
        return this.formFields;
    };

    getPrivacyPolicyLink = (): string | undefined => {
        return this.privacyPolicyLink;
    };

    getTermsAndConditionsLink = (): string | undefined => {
        return this.termsAndConditionsLink;
    };

    getDefaultFormFields = (): FormFields[] => {
        return [
            {
                id: "email",
                label: "Email",
                placeholder: "youremail@example.com",
                validate: validateEmail,
                optional: false
            },
            {
                id: "password",
                label: "Password",
                placeholder: "Enter your password",
                validate: validatePassword,
                optional: false
            }
        ];
    };
}
