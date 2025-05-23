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

import { useEffect, useRef, useState } from "react";
import { CookieHandlerReference } from "supertokens-web-js/utils/cookieHandler";
import NormalisedURLDomain from "supertokens-web-js/utils/normalisedURLDomain";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

import {
    DEFAULT_API_BASE_PATH,
    DEFAULT_WEBSITE_BASE_PATH,
    RECIPE_ID_QUERY_PARAM,
    TENANT_ID_QUERY_PARAM,
} from "./constants";

import type { FormFieldError } from "./recipe/emailpassword/types";
import type {
    APIFormField,
    AppInfoUserInput,
    Navigate,
    NormalisedAppInfo,
    NormalisedFormField,
    NormalisedGetRedirectionURLContext,
    SuperTokensPlugin,
    SuperTokensPublicPlugin,
    UserContext,
} from "./types";

/*
 * getRecipeIdFromPath
 * Input:
 * Output: The "rid" query param if present, null otherwise.
 */
export function getRecipeIdFromSearch(search: string): string | null {
    const urlParams = new URLSearchParams(search);
    return urlParams.get(RECIPE_ID_QUERY_PARAM);
}

export function clearQueryParams(paramNames: string[]): void {
    const newURL = new URL(WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHref());

    for (const param of paramNames) {
        newURL.searchParams.delete(param);
    }

    WindowHandlerReference.getReferenceOrThrow().windowHandler.history.replaceState(
        WindowHandlerReference.getReferenceOrThrow().windowHandler.history.getState(),
        "",
        newURL.toString()
    );
}

export function updateQueryParam(name: string, value: string) {
    const newURL = new URL(WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHref());

    newURL.searchParams.set(name, value);

    WindowHandlerReference.getReferenceOrThrow().windowHandler.history.replaceState(
        WindowHandlerReference.getReferenceOrThrow().windowHandler.history.getState(),
        "",
        newURL.toString()
    );
}

export function clearErrorQueryParam(): void {
    clearQueryParams(["error", "message"]);
}

export function getQueryParams(param: string): string | null {
    const urlParams = new URLSearchParams(
        WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()
    );
    return urlParams.get(param);
}

export function getURLHash(): string {
    // By default it is returined with the "#" at the beginning, we cut that off here.
    return WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash().substr(1);
}

export function getRedirectToPathFromURL(): string | undefined {
    const redirectToPath = getQueryParams("redirectToPath");
    if (redirectToPath === null) {
        return undefined;
    } else {
        try {
            let url: URL;
            try {
                url = new URL(redirectToPath);
            } catch (error) {
                const fakeDomain = redirectToPath.startsWith("/") ? "http://localhost" : "http://localhost/";
                url = new URL(`${fakeDomain}${redirectToPath}`);
            }

            // Prevent Open redirects by normalising path.
            const normalisedURLPath = new NormalisedURLPath(redirectToPath).getAsStringDangerous();
            const pathQueryParams = url.search || ""; // url.search contains the leading ?
            const pathHash = url.hash || ""; // url.hash contains the leading #
            const pathWithQueryParamsAndHash = normalisedURLPath + pathQueryParams + pathHash;

            // Ensure a leading "/" if `normalisedUrlPath` is empty but `pathWithQueryParamsAndHash` is not to ensure proper redirection.
            // Example: "?test=1" will not redirect the user to `/?test=1` if we don't add a leading "/".
            if (
                normalisedURLPath.length === 0 &&
                pathWithQueryParamsAndHash.length > 0 &&
                !pathWithQueryParamsAndHash.startsWith("/")
            ) {
                return "/" + pathWithQueryParamsAndHash;
            }
            return pathWithQueryParamsAndHash;
        } catch {
            return undefined;
        }
    }
}

export function getTenantIdFromQueryParams(): string | undefined {
    return getQueryParams(TENANT_ID_QUERY_PARAM) ?? undefined;
}

export function getDefaultRedirectionURLForPath(
    config: { appInfo: NormalisedAppInfo },
    defaultPath: string,
    context: NormalisedGetRedirectionURLContext<unknown>,
    extraQueryParams?: Record<string, string | undefined>
): string {
    const redirectPath = config.appInfo.websiteBasePath
        .appendPath(new NormalisedURLPath(defaultPath))
        .getAsStringDangerous();

    const queryParams = new URLSearchParams();
    if (context.tenantIdFromQueryParams !== undefined) {
        queryParams.set(TENANT_ID_QUERY_PARAM, context.tenantIdFromQueryParams);
    }

    if (extraQueryParams !== undefined) {
        Object.entries(extraQueryParams).forEach(([key, value]) => {
            if (value !== undefined) {
                queryParams.set(key, value);
            }
        });
    }

    if (queryParams.toString() !== "") {
        return `${redirectPath}?${queryParams.toString()}`;
    }

    return redirectPath;
}

/*
 * isTest
 */
export function isTest(): boolean {
    try {
        return process.env.TEST_MODE === "testing" || process.env.REACT_APP_TEST_MODE === "testing";
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
    return new NormalisedURLPath(WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getPathName());
}

export function getCurrentNormalisedUrlPathWithQueryParamsAndFragments(): string {
    const normalisedUrlPath = getCurrentNormalisedUrlPath().getAsStringDangerous();
    return (
        normalisedUrlPath +
        WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch() +
        WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash()
    );
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
        const fakeDomain = stringUrl.startsWith("/") ? "http://localhost" : "http://localhost/";
        const url = new URL(`${fakeDomain}${stringUrl}`);
        Object.entries(queryParams).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        return `${url.pathname}${url.search}${url.hash}`;
    }
}

export function appendTrailingSlashToURL(stringUrl: string): string {
    return stringUrl.endsWith("/") ? stringUrl : stringUrl + "/";
}

/*
 * Default method for matching recipe route based on query params.
 */
export function matchRecipeIdUsingQueryParams(recipeId: string): () => boolean {
    return () => {
        const recipeIdFromSearch = getRecipeIdFromSearch(
            WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()
        );
        return recipeIdFromSearch === recipeId;
    };
}

export function redirectWithFullPageReload(to: string): void {
    if (to.trim() === "") {
        to = "/";
    }
    WindowHandlerReference.getReferenceOrThrow().windowHandler.location.setHref(to);
}

export function redirectWithNavigate(to: string, navigate: Navigate): void {
    if (to.trim() === "") {
        to = "/";
    }

    if ("push" in navigate) {
        // we are using react-router-dom that is before v6
        navigate.push(to);
    } else {
        // in react-router-dom v6, it is just navigate(to)
        navigate(to);
    }
}

export function getOriginOfPage(): NormalisedURLDomain {
    return new NormalisedURLDomain(WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getOrigin());
}

export async function getLocalStorage(key: string): Promise<string | null> {
    const res = WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.getItem(key);
    if (res === null || res === undefined) {
        return null;
    }
    return res;
}

export async function setLocalStorage(key: string, value: string): Promise<void> {
    await WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.setItem(key, value);
}

export async function removeFromLocalStorage(key: string): Promise<void> {
    await WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.removeItem(key);
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
    function helper(cookieScope: string): string {
        cookieScope = cookieScope.trim().toLowerCase();

        // first we convert it to a URL so that we can use the URL class
        if (cookieScope.startsWith(".")) {
            cookieScope = cookieScope.substr(1);
        }

        if (!cookieScope.startsWith("http://") && !cookieScope.startsWith("https://")) {
            cookieScope = "http://" + cookieScope;
        }

        try {
            const urlObj = new URL(cookieScope);
            cookieScope = urlObj.hostname;

            // remove leading dot
            if (cookieScope.startsWith(".")) {
                cookieScope = cookieScope.substr(1);
            }

            return cookieScope;
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
        return normaliseCookieScopeOrThrowError(
            WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHostName()
        );
    } catch {
        return undefined;
    }
}

export async function getCookieValue(name: string): Promise<string | null> {
    const value = "; " + (await CookieHandlerReference.getReferenceOrThrow().cookieHandler.getCookie());
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
export async function setFrontendCookie(
    name: string,
    value: string | undefined,
    scope: string | undefined
): Promise<void> {
    let expires: string | undefined = "Thu, 01 Jan 1970 00:00:01 GMT";
    let cookieVal = "";
    if (value !== undefined) {
        cookieVal = value;
        expires = undefined; // set cookie without expiry
    }
    if (
        scope === "localhost" ||
        scope === WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHostName() ||
        scope === undefined
    ) {
        // since some browsers ignore cookies with domain set to localhost
        // see https://github.com/supertokens/supertokens-website/issues/25
        if (expires !== undefined) {
            await CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                `${name}=${cookieVal};expires=${expires};path=/;samesite=lax`
            );
        } else {
            await CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                `${name}=${cookieVal};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax`
            );
        }
    } else {
        if (expires !== undefined) {
            await CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                `${name}=${cookieVal};expires=${expires};domain=${scope};path=/;samesite=lax`
            );
        } else {
            await CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                `${name}=${cookieVal};domain=${scope};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax`
            );
        }
    }
}

export function getNormalisedUserContext(userContext?: UserContext): UserContext {
    return userContext === undefined ? {} : userContext;
}

/**
 * This function handles calling APIs that should only be called once during mount (mostly on mount of a route/feature component).
 * It's split into multiple callbacks (fetch + handleResponse/handleError) because we expect fetch to take longer and
 * and the component may be unmounted during the first fetch, in which case we want to avoid updating state/redirecting.
 * This is especially relevant for development in strict mode with React 18 (and in the future for concurrent rendering).
 *
 * @param fetch This is a callback that is only called once on mount. Mostly it's for consuming tokens/doing one time only API calls
 * @param handleResponse This is called with the result of the first (fetch) call if it succeeds.
 * @param handleError This is called with the error of the first (fetch) call if it rejects.
 * @param startLoading Will start the whole process if this is set to true (or omitted). Mostly used to wait for session loading.
 */
export const useOnMountAPICall = <T>(
    fetch: () => Promise<T>,
    handleResponse: (consumeResp: T) => Promise<void>,
    handleError?: (err: unknown, consumeResp: T | undefined) => void | Promise<void>,
    startLoading = true
) => {
    const consumeReq = useRef<Promise<T>>();

    const [error, setError] = useState<any>(undefined);
    useEffect(() => {
        const effect = async (signal: AbortSignal) => {
            let resp;
            try {
                if (consumeReq.current === undefined) {
                    consumeReq.current = fetch();
                }

                resp = await consumeReq.current;

                if (!signal.aborted) {
                    void handleResponse(resp);
                }
            } catch (err) {
                if (!signal.aborted) {
                    if (handleError !== undefined) {
                        try {
                            await handleError(err, resp);
                        } catch (err) {
                            setError(err);
                        }
                    } else {
                        setError(err);
                    }
                }
            }
        };
        if (startLoading) {
            const ctrl = new AbortController();

            void effect(ctrl.signal);
            return () => {
                ctrl.abort();
            };
        }
        return;
    }, [setError, consumeReq, fetch, handleResponse, handleError, startLoading]);

    if (error) {
        throw error;
    }
};

export function useRethrowInRender() {
    const [error, setError] = useState(undefined);

    if (error) {
        throw error;
    }

    return setError;
}

export function getPublicPlugin(plugin: SuperTokensPlugin): SuperTokensPublicPlugin {
    return {
        id: plugin.id,
        initialized: plugin.init ? false : true, // since the init method is optional, we default to true
        version: plugin.version,
        exports: plugin.exports,
        compatibleAuthReactSDKVersions: plugin.compatibleAuthReactSDKVersions,
        compatibleWebJSSDKVersions: plugin.compatibleWebJSSDKVersions,
    };
}
