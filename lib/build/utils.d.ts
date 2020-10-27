import { FormField, NormalisedFormField } from "./types";
export declare function getRecipeIdFromSearch(search: string): string | null;
export declare function isTest(): boolean;
export declare function mergeFormFields(defaultFormFields: NormalisedFormField[], userFormFields: FormField[]): NormalisedFormField[];
export declare function validateEmail(email: string): Promise<string | undefined>;
export declare function validatePassword(password: string): Promise<string | undefined>;
export declare function capitalize(value: string): string;
export declare function defaultValidate(value: string): Promise<string | undefined>;
export declare const mandatoryFormFields: any;
