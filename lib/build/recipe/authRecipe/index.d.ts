import RecipeModule from "../recipeModule";
import type { NormalisedConfig, GetRedirectionURLContext, OnHandleEventContext } from "./types";
import type { NormalisedConfigWithAppInfoAndRecipeID } from "../../types";
export default abstract class AuthRecipe<
    T,
    Action,
    R,
    N extends NormalisedConfig<T | GetRedirectionURLContext, Action, R | OnHandleEventContext>
> extends RecipeModule<T | GetRedirectionURLContext, Action, R | OnHandleEventContext, N> {
    constructor(config: NormalisedConfigWithAppInfoAndRecipeID<N>);
    getAuthRecipeDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    signOut: (input?: { userContext?: any }) => Promise<void>;
    doesSessionExist: (input?: { userContext?: any }) => Promise<boolean>;
}
