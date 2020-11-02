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

import { DEFAULT_API_BASE_PATH, DEFAULT_WEBSITE_BASE_PATH, RECIPE_ID_QUERY_PARAM } from "./constants";
import NormalisedURLDomain from "./normalisedURLDomain";
import NormalisedURLPath from "./normalisedURLPath";
import { FormFieldError } from "./recipe/emailpassword/types";
import { APIFormField, AppInfoUserInput, NormalisedAppInfo, NormalisedFormField } from "./types";

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

export function normaliseInputAppInfoOrThrowError(appInfo: AppInfoUserInput): NormalisedAppInfo {
    if (appInfo === undefined) {
        throw new Error("Please provide the appInfo object when calling supertokens.init");
    }

    if (appInfo.apiDomain === undefined) {
        throw new Error("Please provide your apiDomain inside the appInfo object when calling supertokens.init");
    }
    if (appInfo.appName === undefined) {
        throw new Error("Please provide your appName inside the appInfo object when calling supertokens.init");
    }
    if (appInfo.websiteDomain === undefined) {
        throw new Error("Please provide your websiteDomain inside the appInfo object when calling supertokens.init");
    }

    return {
        appName: appInfo.appName,
        apiDomain: new NormalisedURLDomain(appInfo.apiDomain),
        websiteDomain: new NormalisedURLDomain(appInfo.websiteDomain),
        apiBasePath: getNormalisedURLPathOrDefault(DEFAULT_API_BASE_PATH, appInfo.apiBasePath),
        websiteBasePath: getNormalisedURLPathOrDefault(DEFAULT_WEBSITE_BASE_PATH, appInfo.websiteBasePath)
    };
}

function getNormalisedURLPathOrDefault(defaultPath: string, path?: string): NormalisedURLPath {
    if (path !== undefined) {
        return new NormalisedURLPath(path);
    } else {
        return new NormalisedURLPath(defaultPath);
    }
}

/*
 * validateFormOrThrow
 */

// We check that the number of fields in input and config form field is the same.
// We check that each item in the config form field is also present in the input form field
export async function validateFormOrThrow(
    inputs: APIFormField[],
    configFormFields: NormalisedFormField[]
): Promise<FormFieldError[]> {
    const validationErrors: FormFieldError[] = [];

    if (configFormFields.length !== inputs.length) {
        throw Error("Are you sending too many / too few formFields?");
    }

    // Loop through all form fields.
    for (let i = 0; i < configFormFields.length; i++) {
        const field = configFormFields[i];

        // Find corresponding input value.
        const input = inputs.find(i => i.id === field.id);

        // Absent or not optional empty field
        if (input === undefined || (input.value === "" && field.optional === false)) {
            validationErrors.push({
                error: "This field can not be empty",
                id: field.id
            });
        } else {
            // Otherwise, use validate function.
            const error = await field.validate(input.value);

            // If error, add it.
            if (error !== undefined) {
                validationErrors.push({
                    error,
                    id: field.id
                });
            }
        }
    }

    return validationErrors;
}

/*
 * openExternalLink
 */
export function openExternalLink(link?: string): void {
    if (link === undefined) {
        return;
    }

    window.open(link, "_blank");
}

/*
 * getCurrentNormalisedUrlPath
 */
export function getCurrentNormalisedUrlPath(): NormalisedURLPath {
    return new NormalisedURLPath(window.location.pathname);
}

/*
 * redirectTo
 */
export function redirectTo(path: NormalisedURLPath): void {
    let newPath: string = path.getAsStringDangerous();

    if (newPath.length === 0) {
        newPath = "/";
    }

    window.location.href = newPath;
}
