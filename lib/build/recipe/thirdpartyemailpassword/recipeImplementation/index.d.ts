import { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { OnHandleEventContext, PreAndPostAPIHookAction } from "../types";
import { NormalisedAppInfo } from "../../../types";
import {
    RecipeOnHandleEventFunction,
    RecipePostAPIHookFunction,
    RecipePreAPIHookFunction,
} from "../../recipeModule/types";
export default function getRecipeImplementation(recipeInput: {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: RecipePreAPIHookFunction<PreAndPostAPIHookAction>;
    postAPIHook: RecipePostAPIHookFunction<PreAndPostAPIHookAction>;
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>;
}): RecipeInterface;
