import { OnHandleEventContext, PreAndPostAPIHookAction } from "./types";
import { RecipeInterface } from "supertokens-web-js/recipe/thirdparty";
import { NormalisedAppInfo } from "../../types";
import {
    RecipeOnHandleEventFunction,
    RecipePostAPIHookFunction,
    RecipePreAPIHookFunction,
} from "../recipeModule/types";
import { NormalisedStorageHandlers } from "supertokens-web-js/utils/storage";
export default function getRecipeImplementation(recipeInput: {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: RecipePreAPIHookFunction<PreAndPostAPIHookAction>;
    postAPIHook: RecipePostAPIHookFunction<PreAndPostAPIHookAction>;
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>;
    storageHandlers: NormalisedStorageHandlers;
}): RecipeInterface;
