import { RecipeInterface } from "supertokens-web-js/recipe/thirdpartypasswordless";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";
export declare const getFunctionOverrides: (
    recipeId: string,
    onHandleEvent?: RecipeOnHandleEventFunction<OnHandleEventContext>
) => (originalImp: RecipeInterface) => RecipeInterface;
