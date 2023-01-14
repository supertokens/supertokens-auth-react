import ThirdPartyPasswordlessWebJS from "supertokens-web-js/recipe/thirdpartypasswordless";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";
import { WebJSRecipeInterface } from "../../types";
declare type Recipe = WebJSRecipeInterface<typeof ThirdPartyPasswordlessWebJS>;
export declare const getFunctionOverrides: (
    recipeId: string,
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>
) => (originalImp: Recipe) => Recipe;
export {};
