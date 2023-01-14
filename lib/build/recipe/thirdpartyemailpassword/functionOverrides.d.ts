import ThirdPartyEmailPasswordWebJS from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";
import { WebJSRecipeInterface } from "../../types";
declare type Recipe = WebJSRecipeInterface<typeof ThirdPartyEmailPasswordWebJS>;
export declare const getFunctionOverrides: (
    recipeId: string,
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>
) => (originalImp: Recipe) => Recipe;
export {};
