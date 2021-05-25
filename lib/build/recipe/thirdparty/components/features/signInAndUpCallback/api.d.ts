import RecipeModule from "../../../../recipeModule";
import { SignInAndUpAPIResponse } from "../../../types";
export declare function signInAndUpAPI(
    thirdPartyId: string,
    code: string,
    recipe: RecipeModule<any, any, any, any>,
    redirectURI: string
): Promise<SignInAndUpAPIResponse>;
