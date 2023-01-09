import { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";
export declare const getFunctionOverrides: (
    onHandleEvent?: RecipeOnHandleEventFunction<OnHandleEventContext>
) => (originalImp: RecipeInterface) => RecipeInterface;
