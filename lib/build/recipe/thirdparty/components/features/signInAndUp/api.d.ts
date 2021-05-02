import RecipeModule from "../../../../recipeModule";
import { AuthorisationURLAPIResponse } from "../../../types";
export declare function getOAuthAuthorisationURLAPI<T, S, R>(thirdPartyId: string, recipe: RecipeModule<T, S, R>): Promise<AuthorisationURLAPIResponse>;
