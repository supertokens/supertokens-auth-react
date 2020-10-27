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
import { FormField, NormalisedFormField, RequestJson } from "../../types";
import { SignInFormFeatureConfig } from "./types";
import { mergeFormFields, mandatoryFormFields } from "../../utils";
/*
 * Class.
 */
export default class SignInFeature {
    /*
     * Instance attributes.
     */
    formFields: NormalisedFormField[];
    resetPasswordURL?: string;

    /*
     * Constructor.
     */
    constructor(defaultFormFields: NormalisedFormField[], config?: SignInFormFeatureConfig) {
        let userFormFields: FormField[] = [];
        if (config !== undefined) {
            this.resetPasswordURL = config.resetPasswordURL;

            if (config.formFields) {
                userFormFields = config.formFields.reduce((acc: FormField[], field) => {
                    // Filter on email and password only.
                    if (!mandatoryFormFields.includes(field.id)) {
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
        }

        this.formFields = mergeFormFields(defaultFormFields, userFormFields);
    }

    /*
     * Instance methods.
     */

    getFormFields = (): NormalisedFormField[] => {
        return this.formFields;
    };

    getResetPasswordURL = (): string | undefined => {
        return this.resetPasswordURL;
    };
}
