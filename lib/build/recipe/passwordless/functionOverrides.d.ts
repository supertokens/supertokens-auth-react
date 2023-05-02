import type { OnHandleEventContext } from "./types";
import type { RecipeOnHandleEventFunction } from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
export declare const getFunctionOverrides: (
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>
) => (originalImp: RecipeInterface) => RecipeInterface;
