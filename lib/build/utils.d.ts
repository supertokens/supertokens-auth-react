import { FormFields } from "./types";
export declare function getRecipeIdFromSearch(search: string): string | null;
export declare function isTest(): boolean;
export declare function mergeFormFields(defaultFormFields: FormFields[], userFormFields: FormFields[]): FormFields[];
export declare function validateEmail(email: string): Promise<string | undefined>;
export declare function validatePassword(password: string): Promise<string | undefined>;
