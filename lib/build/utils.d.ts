import NormalisedURLPath from "./normalisedURLPath";
import { FormFieldError } from "./recipe/emailpassword/types";
import { APIFormField, AppInfoUserInput, NormalisedAppInfo, NormalisedFormField } from "./types";
export declare function getRecipeIdFromSearch(search: string): string | null;
export declare function getQueryParams(param: string): string | null;
export declare function getRedirectToPathFromURL(): string | undefined;
export declare function isTest(): boolean;
export declare function normaliseInputAppInfoOrThrowError(appInfo: AppInfoUserInput): NormalisedAppInfo;
export declare function validateForm(
    inputs: APIFormField[],
    configFormFields: NormalisedFormField[]
): Promise<FormFieldError[]>;
export declare function getCurrentNormalisedUrlPath(): NormalisedURLPath;
export declare function appendQueryParamsToURL(stringUrl: string, queryParams?: Record<string, string>): string;
export declare function getWindowOrThrow(): any;
export declare function matchRecipeIdUsingQueryParams(recipeId: string): () => boolean;
export declare function redirectWithFullPageReload(to: string): void;
export declare function redirectWithHistory(to: string, history: any): void;
