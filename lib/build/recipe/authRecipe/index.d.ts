import RecipeModule from "../recipeModule";
import type { NormalisedConfig, GetRedirectionURLContext, OnHandleEventContext } from "./types";
import type { NormalisedConfigWithAppInfoAndRecipeID, UserContext } from "../../types";
export default abstract class AuthRecipe<
    T,
    Action,
    R,
    N extends NormalisedConfig<T | GetRedirectionURLContext, Action, R | OnHandleEventContext>
> extends RecipeModule<T | GetRedirectionURLContext, Action, R | OnHandleEventContext, N> {
    constructor(config: NormalisedConfigWithAppInfoAndRecipeID<N>);
    getAuthRecipeDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    signOut: (input?: { userContext?: UserContext }) => Promise<void>;
    doesSessionExist: (input?: { userContext?: UserContext }) => Promise<boolean>;
}
