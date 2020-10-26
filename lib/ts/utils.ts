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

import { ComponentClass } from "react";
import { RECIPE_ID_QUERY_PARAM } from "./constants";
import { FormFields } from "./types";
const { withRouter } = require("react-router-dom");

/*
 * getRecipeIdFromPath
 * Input:
 * Output: The "rid" query param if present, null otherwise.
 */
export function getRecipeIdFromSearch(search: string): string | null {
    const urlParams = new URLSearchParams(search);
    return urlParams.get(RECIPE_ID_QUERY_PARAM);
}

/*
 * isTest
 */
export function isTest(): boolean {
    return process.env.TEST_MODE === "testing";
}

/*
 * mergeFormFields by keeping the provided order, defaultFormFields or merged first, and unmerged userFormFields after.
 */

export function mergeFormFields(defaultFormFields: FormFields[], userFormFields: FormFields[]): FormFields[] {
    // Create a new array with default fields.
    const mergedFormFields: FormFields[] = defaultFormFields;

    // Loop through user provided fields.
    for (let i = 0; i < userFormFields.length; i++) {
        const userField = userFormFields[i];
        let isNewField: boolean = true;

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
                if (["email", "password"].includes(userField.id) === true) {
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
            mergedFormFields.push(userField);
        }
    }

    return mergedFormFields;
}

/*
 * validateEmail.
 */

export async function validateEmail(email: string): Promise<string | undefined> {
    return new Promise(resolve => resolve(undefined));
}

/*
 * validatePassword.
 * min 8 characters.
 * Contains lowercase, uppercase, and numbers.
 */

export async function validatePassword(password: string): Promise<string | undefined> {
    return new Promise(resolve => resolve(undefined));
}

export function withOrWithoutRouter(component: ComponentClass) {
    try {
        return withRouter(component);
    } catch (e) {
        return component;
    }
}
