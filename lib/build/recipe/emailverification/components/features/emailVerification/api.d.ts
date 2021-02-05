import RecipeModule from "../../../../recipeModule";
import { VerifyEmailThemeResponse, SendVerifyEmailThemeResponse } from "../../../types";
export declare function verifyEmailAPI(recipe: RecipeModule, token: string): Promise<VerifyEmailThemeResponse>;
export declare function sendVerifyEmailAPI(recipe: RecipeModule): Promise<SendVerifyEmailThemeResponse>;
export declare function isEmailVerifiedAPI(recipe: RecipeModule): Promise<boolean>;
