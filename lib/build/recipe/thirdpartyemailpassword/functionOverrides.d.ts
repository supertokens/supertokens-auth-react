import { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";
export declare const getFunctionOverrides: (
    recipeId: string,
    onHandleEvent?: RecipeOnHandleEventFunction<OnHandleEventContext>
) => (originalImp: RecipeInterface) => RecipeInterface;
