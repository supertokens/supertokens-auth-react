/// <reference types="react" />
import NormalisedURLDomain from "supertokens-web-js/utils/normalisedURLDomain";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import type { FormFieldError } from "./recipe/emailpassword/types";
import type {
    APIFormField,
    AppInfoUserInput,
    Navigate,
    NormalisedAppInfo,
    NormalisedFormField,
    NormalisedGetRedirectionURLContext,
    UserContext,
} from "./types";
export declare function getRecipeIdFromSearch(search: string): string | null;
export declare function clearQueryParams(paramNames: string[]): void;
export declare function updateQueryParam(name: string, value: string): void;
export declare function clearErrorQueryParam(): void;
export declare function getQueryParams(param: string): string | null;
export declare function getURLHash(): string;
export declare function getRedirectToPathFromURL(): string | undefined;
export declare function getTenantIdFromQueryParams(): string | undefined;
export declare function getDefaultRedirectionURLForPath(
    config: {
        appInfo: NormalisedAppInfo;
    },
    defaultPath: string,
    context: NormalisedGetRedirectionURLContext<unknown>,
    extraQueryParams?: Record<string, string | undefined>
): string;
export declare function isTest(): boolean;
export declare function normaliseInputAppInfoOrThrowError(appInfo: AppInfoUserInput): NormalisedAppInfo;
export declare function validateForm(
    inputs: APIFormField[],
    configFormFields: NormalisedFormField[]
): Promise<FormFieldError[]>;
export declare function getCurrentNormalisedUrlPath(): NormalisedURLPath;
export declare function getCurrentNormalisedUrlPathWithQueryParamsAndFragments(): string;
export declare function appendQueryParamsToURL(stringUrl: string, queryParams?: Record<string, string>): string;
export declare function appendTrailingSlashToURL(stringUrl: string): string;
export declare function matchRecipeIdUsingQueryParams(recipeId: string): () => boolean;
export declare function redirectWithFullPageReload(to: string): void;
export declare function redirectWithNavigate(to: string, navigate: Navigate): void;
export declare function getOriginOfPage(): NormalisedURLDomain;
export declare function getLocalStorage(key: string): Promise<string | null>;
export declare function setLocalStorage(key: string, value: string): Promise<void>;
export declare function removeFromLocalStorage(key: string): Promise<void>;
export declare function mergeObjects<T>(obj1: T, obj2: T): T;
export declare function normaliseCookieScopeOrThrowError(cookieScope: string): string;
export declare function getDefaultCookieScope(): string | undefined;
export declare function getCookieValue(name: string): Promise<string | null>;
export declare function setFrontendCookie(
    name: string,
    value: string | undefined,
    scope: string | undefined
): Promise<void>;
export declare function getNormalisedUserContext(userContext?: UserContext): UserContext;
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
export declare const useOnMountAPICall: <T>(
    fetch: () => Promise<T>,
    handleResponse: (consumeResp: T) => Promise<void>,
    handleError?: ((err: unknown, consumeResp: T | undefined) => void | Promise<void>) | undefined,
    startLoading?: boolean
) => void;
export declare function useRethrowInRender(): import("react").Dispatch<import("react").SetStateAction<undefined>>;
