import { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";
export declare const getFunctionOverrides: (
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>
) => (originalImp: RecipeInterface) => RecipeInterface;
