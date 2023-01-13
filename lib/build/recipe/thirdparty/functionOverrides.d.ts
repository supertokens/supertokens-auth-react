import ThirdPartyWebJS from "supertokens-web-js/recipe/thirdparty";
import { WebJSRecipe } from "../../types";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";
declare type Recipe = WebJSRecipe<typeof ThirdPartyWebJS>;
export declare const getFunctionOverrides: (
    recipeId: string,
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>
) => (originalImp: Recipe) => Recipe;
export {};
