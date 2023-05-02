import type { OnHandleEventContext } from "./types";
import type { RecipeOnHandleEventFunction } from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/thirdparty";
export declare const getFunctionOverrides: (
    recipeId: string,
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>
) => (originalImp: RecipeInterface) => RecipeInterface;
