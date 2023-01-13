import EmailPasswordWebJS from "supertokens-web-js/recipe/emailpassword";
import { WebJSRecipe } from "../../types";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";
declare type Recipe = WebJSRecipe<typeof EmailPasswordWebJS>;
export declare const getFunctionOverrides: (
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>
) => (originalImp: Recipe) => Recipe;
export {};
