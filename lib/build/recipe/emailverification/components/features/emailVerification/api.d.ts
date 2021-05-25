import RecipeModule from "../../../../recipeModule";
import { VerifyEmailThemeResponse, SendVerifyEmailThemeResponse } from "../../../types";
export declare function verifyEmailAPI(
    recipe: RecipeModule<any, any, any, any>,
    token: string
): Promise<VerifyEmailThemeResponse>;
export declare function sendVerifyEmailAPI(
    recipe: RecipeModule<any, any, any, any>
): Promise<SendVerifyEmailThemeResponse>;
export declare function isEmailVerifiedAPI(recipe: RecipeModule<any, any, any, any>): Promise<boolean>;
