import RecipeModule from "../../../../recipeModule";
import { SignInAndUpAPIResponse } from "../../../types";
export declare function signInAndUpAPI<T, S, R>(thirdPartyId: string, code: string, recipe: RecipeModule<T, S, R>, redirectURI: string): Promise<SignInAndUpAPIResponse>;
