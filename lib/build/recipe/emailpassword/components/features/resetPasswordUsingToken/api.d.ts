import { APIFormField } from "../../../../../types";
import RecipeModule from "../../../../recipeModule";
import { FormBaseAPIResponse } from "../../../types";
export declare function handleSubmitNewPasswordAPI(formFields: APIFormField[], recipe: RecipeModule<any, any, any, any>, token: string): Promise<FormBaseAPIResponse>;
export declare function enterEmailAPI(formFields: APIFormField[], recipe: RecipeModule<any, any, any, any>): Promise<FormBaseAPIResponse>;
