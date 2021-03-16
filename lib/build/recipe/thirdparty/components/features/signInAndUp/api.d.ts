import RecipeModule from "../../../../recipeModule";
import { AuthorisationURLAPIResponse } from "../../../types";
export declare function getOAuthAuthorisationURLAPI(thirdPartyId: string, recipe: RecipeModule<unknown, unknown, unknown>): Promise<AuthorisationURLAPIResponse>;
