import NormalisedURLDomain from "supertokens-web-js/utils/normalisedURLDomain";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import { FormFieldError } from "./recipe/emailpassword/types";
import { APIFormField, AppInfoUserInput, NormalisedAppInfo, NormalisedFormField } from "./types";
export declare function getRecipeIdFromSearch(search: string): string | null;
export declare function clearQueryParams(paramNames: string[]): void;
export declare function clearErrorQueryParam(): void;
export declare function getQueryParams(param: string): string | null;
export declare function getURLHash(): string;
export declare function getRedirectToPathFromURL(): string | undefined;
export declare function isTest(): boolean;
export declare function normaliseInputAppInfoOrThrowError(appInfo: AppInfoUserInput): NormalisedAppInfo;
export declare function validateForm(
    inputs: APIFormField[],
    configFormFields: NormalisedFormField[]
): Promise<FormFieldError[]>;
export declare function getCurrentNormalisedUrlPath(): NormalisedURLPath;
export declare function appendQueryParamsToURL(stringUrl: string, queryParams?: Record<string, string>): string;
export declare function matchRecipeIdUsingQueryParams(recipeId: string): () => boolean;
export declare function redirectWithFullPageReload(to: string): void;
export declare function redirectWithHistory(to: string, history: any): void;
export declare function isIE(): boolean;
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
export declare function getNormalisedUserContext(userContext?: any): any;
export declare const useOnMountAPICall: <T>(
    fetch: () => Promise<T>,
    handleResponse: (consumeResp: T) => Promise<void>,
    handleError?: ((err: unknown, consumeResp: T | undefined) => void) | undefined
) => void;
