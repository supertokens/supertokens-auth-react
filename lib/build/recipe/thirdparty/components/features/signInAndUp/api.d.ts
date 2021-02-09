import RecipeModule from "../../../../recipeModule";
import { AuthorisationURLAPIResponse } from "../../../types";
export declare function getOAuthAuthorisationURLAPI(providerId: string, recipe: RecipeModule): Promise<AuthorisationURLAPIResponse>;
