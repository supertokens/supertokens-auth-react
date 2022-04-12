import { PreAndPostAPIHookAction, OnHandleEventContext } from "../types";
import { NormalisedAppInfo } from "../../../types";
import {
    RecipeOnHandleEventFunction,
    RecipePostAPIHookFunction,
    RecipePreAPIHookFunction,
} from "../../recipeModule/types";
import { RecipeInterface as TPPWlessRecipeInterface } from "supertokens-web-js/recipe/thirdpartypasswordless";
import { NormalisedStorageHandlers } from "supertokens-web-js/utils/storage";
export default function getRecipeImplementation(recipeInput: {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: RecipePreAPIHookFunction<PreAndPostAPIHookAction>;
    postAPIHook: RecipePostAPIHookFunction<PreAndPostAPIHookAction>;
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>;
    storageHandlers: NormalisedStorageHandlers;
}): TPPWlessRecipeInterface;
