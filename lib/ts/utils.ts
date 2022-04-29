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

import { DEFAULT_API_BASE_PATH, DEFAULT_WEBSITE_BASE_PATH, RECIPE_ID_QUERY_PARAM } from "./constants";
import NormalisedURLDomain from "./normalisedURLDomain";
import NormalisedURLPath from "./normalisedURLPath";
import { FormFieldError } from "./recipe/emailpassword/types";
import { APIFormField, AppInfoUserInput, NormalisedAppInfo, NormalisedFormField } from "./types";
import { WindowUtilities } from "./windowUtils";

/*
 * getRecipeIdFromPath
 * Input:
 * Output: The "rid" query param if present, null otherwise.
 */
export function getRecipeIdFromSearch(search: string): string | null {
    const urlParams = new URLSearchParams(search);
    return urlParams.get(RECIPE_ID_QUERY_PARAM);
}

export function clearErrorQueryParam(): void {
    const newURL = new URL(WindowUtilities.location.href);
    newURL.searchParams.delete("error");
    newURL.searchParams.delete("message");
    WindowUtilities.history.replaceState(WindowUtilities.history.state, "", WindowUtilities.location.href);
}

export function getQueryParams(param: string): string | null {
    const urlParams = new URLSearchParams(WindowUtilities.location.search);
    return urlParams.get(param);
}

export function getURLHash(): string {
    // By default it is returined with the "#" at the beginning, we cut that off here.
    return WindowUtilities.location.hash.substr(1);
}

export function getRedirectToPathFromURL(): string | undefined {
    const param = getQueryParams("redirectToPath");
    if (param === null) {
        return undefined;
    } else {
        // Prevent Open redirects by normalising path.
        try {
            return new NormalisedURLPath(param).getAsStringDangerous();
        } catch {
            return undefined;
        }
    }
}

/*
 * isTest
 */
export function isTest(): boolean {
    try {
        return process.env.TEST_MODE === "testing";
    } catch (err) {
        // can get Uncaught ReferenceError: process is not defined error
        return false;
    }
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

    let apiGatewayPath = new NormalisedURLPath("");
    if (appInfo.apiGatewayPath !== undefined) {
        apiGatewayPath = new NormalisedURLPath(appInfo.apiGatewayPath);
    }

    return {
        appName: appInfo.appName,
        apiDomain: new NormalisedURLDomain(appInfo.apiDomain),
        websiteDomain: new NormalisedURLDomain(appInfo.websiteDomain),
        apiBasePath: apiGatewayPath.appendPath(
            getNormalisedURLPathOrDefault(DEFAULT_API_BASE_PATH, appInfo.apiBasePath)
        ),
        websiteBasePath: getNormalisedURLPathOrDefault(DEFAULT_WEBSITE_BASE_PATH, appInfo.websiteBasePath),
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
 * validateForm
 */

// We check that the number of fields in input and config form field is the same.
// We check that each item in the config form field is also present in the input form field
export async function validateForm(
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
        const input = inputs.find((i) => i.id === field.id)!;

        // Otherwise, use validate function.

        // Trim value for email only.
        let value: string = input.value;
        if (input.id === "email") {
            value = value.trim();
        }
        const error = await field.validate(value);

        // If error, add it.
        if (error !== undefined) {
            validationErrors.push({
                error,
                id: field.id,
            });
        }
    }

    return validationErrors;
}

/*
 * getCurrentNormalisedUrlPath
 */
export function getCurrentNormalisedUrlPath(): NormalisedURLPath {
    return new NormalisedURLPath(WindowUtilities.location.pathname);
}

export function appendQueryParamsToURL(stringUrl: string, queryParams?: Record<string, string>): string {
    if (queryParams === undefined) {
        return stringUrl;
    }

    try {
        const url = new URL(stringUrl);
        Object.entries(queryParams).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        return url.href;
    } catch (e) {
        const fakeDomain = stringUrl.startsWith("/") ? "http:localhost" : "http://localhost/";
        const url = new URL(`${fakeDomain}${stringUrl}`);
        Object.entries(queryParams).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        return `${url.pathname}${url.search}`;
    }
}

/*
 * Default method for matching recipe route based on query params.
 */
export function matchRecipeIdUsingQueryParams(recipeId: string): () => boolean {
    return () => {
        const recipeIdFromSearch = getRecipeIdFromSearch(WindowUtilities.location.search);
        return recipeIdFromSearch === recipeId;
    };
}

export function redirectWithFullPageReload(to: string): void {
    if (to.trim() === "") {
        to = "/";
    }
    WindowUtilities.location.href = to;
}

export function redirectWithHistory(to: string, history: any): void {
    if (to.trim() === "") {
        to = "/";
    }

    if (history.push !== undefined) {
        // we are using react-router-dom that is before v6
        history.push(to);
    } else {
        // in react-router-dom v6, it is just navigate(to), and we are renaming
        // naviagte to history, so it becomes history(to).
        history(to);
    }
}

export function isIE(): boolean {
    return WindowUtilities.document.documentMode !== undefined;
}

export function setSessionStorage(key: string, value: string): void {
    WindowUtilities.sessionStorage.setItem(key, value);
}

export function getSessionStorage(key: string): string | null {
    return WindowUtilities.sessionStorage.getItem(key);
}

export function getOriginOfPage(): NormalisedURLDomain {
    return new NormalisedURLDomain(WindowUtilities.location.origin);
}

export function getLocalStorage(key: string): string | null {
    const res = WindowUtilities.localStorage.getItem(key);
    if (res === null || res === undefined) {
        return null;
    }
    return res;
}

export function setLocalStorage(key: string, value: string): void {
    WindowUtilities.localStorage.setItem(key, value);
}

export function removeFromLocalStorage(key: string): void {
    WindowUtilities.localStorage.removeItem(key);
}

export function mergeObjects<T>(obj1: T, obj2: T): T {
    const res = {
        ...obj1,
    };
    for (const key in obj2) {
        if (typeof res[key] === "object" && typeof obj2[key] === "object") {
            res[key] = mergeObjects(res[key], obj2[key]);
        } else {
            res[key] = obj2[key];
        }
    }

    return res;
}

export function normaliseCookieScopeOrThrowError(cookieScope: string): string {
    function helper(sessionScope: string): string {
        sessionScope = sessionScope.trim().toLowerCase();

        // first we convert it to a URL so that we can use the URL class
        if (sessionScope.startsWith(".")) {
            sessionScope = sessionScope.substr(1);
        }

        if (!sessionScope.startsWith("http://") && !sessionScope.startsWith("https://")) {
            sessionScope = "http://" + sessionScope;
        }

        try {
            const urlObj = new URL(sessionScope);
            sessionScope = urlObj.hostname;

            // remove leading dot
            if (sessionScope.startsWith(".")) {
                sessionScope = sessionScope.substr(1);
            }

            return sessionScope;
        } catch (err) {
            throw new Error("Please provide a valid cookie scope");
        }
    }

    function isAnIpAddress(ipaddress: string) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
            ipaddress
        );
    }

    const noDotNormalised = helper(cookieScope);

    if (noDotNormalised === "localhost" || isAnIpAddress(noDotNormalised)) {
        return noDotNormalised;
    }

    if (cookieScope.startsWith(".")) {
        return "." + noDotNormalised;
    }

    return noDotNormalised;
}

export function getDefaultCookieScope(): string | undefined {
    try {
        return normaliseCookieScopeOrThrowError(WindowUtilities.location.hostname);
    } catch {
        return undefined;
    }
}

export function getCookieValue(name: string): string | null {
    const value = "; " + WindowUtilities.document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length >= 2) {
        const last = parts.pop();
        if (last !== undefined) {
            const temp = last.split(";").shift();
            if (temp === undefined) {
                return null;
            }
            return temp;
        }
    }
    return null;
}

// undefined value will remove the cookie
export function setFrontendCookie(name: string, value: string | undefined, scope: string | undefined): void {
    let expires: string | undefined = "Thu, 01 Jan 1970 00:00:01 GMT";
    let cookieVal = "";
    if (value !== undefined) {
        cookieVal = value;
        expires = undefined; // set cookie without expiry
    }
    if (scope === "localhost" || scope === WindowUtilities.location.hostname || scope === undefined) {
        // since some browsers ignore cookies with domain set to localhost
        // see https://github.com/supertokens/supertokens-website/issues/25
        if (expires !== undefined) {
            WindowUtilities.document.cookie = `${name}=${cookieVal};expires=${expires};path=/;samesite=lax`;
        } else {
            WindowUtilities.document.cookie = `${name}=${cookieVal};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax`;
        }
    } else {
        if (expires !== undefined) {
            WindowUtilities.document.cookie = `${name}=${cookieVal};expires=${expires};domain=${scope};path=/;samesite=lax`;
        } else {
            WindowUtilities.document.cookie = `${name}=${cookieVal};domain=${scope};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax`;
        }
    }
}
