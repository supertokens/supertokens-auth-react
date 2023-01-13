import PasswordlessWebJS from "supertokens-web-js/recipe/passwordless";
import { WebJSRecipe } from "../../types";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";
declare type Recipe = WebJSRecipe<typeof PasswordlessWebJS>;
export declare const getFunctionOverrides: (
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>
) => (originalImp: Recipe) => Recipe;
export {};
