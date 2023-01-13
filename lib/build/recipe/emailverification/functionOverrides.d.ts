import EmailVerificationWebJS from "supertokens-web-js/recipe/emailverification";
import { WebJSRecipe } from "../../types";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";
declare type Recipe = WebJSRecipe<typeof EmailVerificationWebJS>;
export declare const getFunctionOverrides: (
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>
) => (originalImp: Recipe) => Recipe;
export {};
