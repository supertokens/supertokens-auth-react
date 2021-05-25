import { APIFormField } from "../../../../../types";
import RecipeModule from "../../../../recipeModule";
import { FormBaseAPIResponse } from "../../../types";
export declare function signUpAPI(
    formFields: APIFormField[],
    recipe: RecipeModule<any, any, any, any>
): Promise<FormBaseAPIResponse>;
export declare function signInAPI(
    formFields: APIFormField[],
    recipe: RecipeModule<any, any, any, any>
): Promise<FormBaseAPIResponse>;
export declare function emailExistsAPI(
    email: string,
    recipe: RecipeModule<any, any, any, any>
): Promise<string | undefined>;
