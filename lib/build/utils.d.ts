import NormalisedURLDomain from "./normalisedURLDomain";
import NormalisedURLPath from "./normalisedURLPath";
import { FormFieldError } from "./recipe/emailpassword/types";
import { APIFormField, AppInfoUserInput, NormalisedAppInfo, NormalisedFormField } from "./types";
export declare function getRecipeIdFromSearch(search: string): string | null;
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
export declare function setSessionStorage(key: string, value: string): void;
export declare function getSessionStorage(key: string): string;
export declare function getOriginOfPage(): NormalisedURLDomain;
export declare function getLocalStorage(key: string): string | null;
export declare function setLocalStorage(key: string, value: string): void;
export declare function removeFromLocalStorage(key: string): void;
