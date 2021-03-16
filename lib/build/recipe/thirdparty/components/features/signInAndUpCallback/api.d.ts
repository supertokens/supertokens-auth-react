import RecipeModule from "../../../../recipeModule";
import { SignInAndUpAPIResponse } from "../../../types";
export declare function signInAndUpAPI(thirdPartyId: string, code: string, recipe: RecipeModule<unknown, unknown, unknown>, redirectURI: string): Promise<SignInAndUpAPIResponse>;
