import type { OnHandleEventContext } from "./types";
import type { RecipeOnHandleEventFunction } from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/multifactorauth";

export const getFunctionOverrides =
    (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>
    ) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        ...originalImp,
    });
