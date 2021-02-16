import { APIFormField } from "../../../../../types";
import RecipeModule from "../../../../recipeModule";
import { FormBaseAPIResponse } from "../../../types";
export declare function signUpAPI(formFields: APIFormField[], recipe: RecipeModule<unknown, unknown, unknown>): Promise<FormBaseAPIResponse>;
export declare function signInAPI(formFields: APIFormField[], recipe: RecipeModule<unknown, unknown, unknown>): Promise<FormBaseAPIResponse>;
export declare function emailExistsAPI(email: string, recipe: RecipeModule<unknown, unknown, unknown>): Promise<string | undefined>;
