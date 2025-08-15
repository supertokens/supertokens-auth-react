import RecipeModule from "../recipeModule";
import type { NormalisedConfig, OnHandleEventContext } from "./types";
import type { UserContext } from "../../types";
export default abstract class AuthRecipe<
    T,
    Action,
    R,
    N extends NormalisedConfig<T, Action, R | OnHandleEventContext>
> extends RecipeModule<T, Action, R | OnHandleEventContext, N> {
    abstract firstFactorIds: string[];
    abstract getFirstFactorsForAuthPage(): string[];
    getAuthRecipeDefaultRedirectionURL: (_context: T) => Promise<string>;
    signOut: (input?: { userContext?: UserContext }) => Promise<void>;
    doesSessionExist: (input?: { userContext?: UserContext }) => Promise<boolean>;
}
