import RecipeModule from "../recipeModule";
import { NormalisedConfig, GetRedirectionURLContext, OnHandleEventContext } from "./types";
import { NormalisedAppInfo } from "../../types";
export default abstract class AuthRecipe<
    T,
    Action,
    R,
    N extends NormalisedConfig<T | GetRedirectionURLContext, Action, R | OnHandleEventContext>
> extends RecipeModule<T | GetRedirectionURLContext, Action, R | OnHandleEventContext, N> {
    constructor(
        config: N & {
            appInfo: NormalisedAppInfo;
            recipeId: string;
        }
    );
    getAuthRecipeDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    signOut: (input?: { userContext?: any }) => Promise<void>;
    doesSessionExist: (input?: { userContext?: any }) => Promise<boolean>;
}
