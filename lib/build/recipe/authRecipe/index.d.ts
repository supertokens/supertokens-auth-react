import RecipeModule from "../recipeModule";
import { NormalisedConfig, GetRedirectionURLContext, OnHandleEventContext } from "./types";
export default abstract class AuthRecipe<
    T,
    S,
    R,
    N extends NormalisedConfig<T | GetRedirectionURLContext, S, R | OnHandleEventContext>
> extends RecipeModule<T | GetRedirectionURLContext, S, R | OnHandleEventContext, N> {
    constructor(config: N);
    getAuthRecipeDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    signOut: () => Promise<void>;
    doesSessionExist: () => Promise<boolean>;
    redirectToAuthWithRedirectToPath: (
        show?: "signin" | "signup" | undefined,
        history?: any,
        queryParams?: any
    ) => Promise<void>;
    redirectToAuthWithoutRedirectToPath: (
        show?: "signin" | "signup" | undefined,
        history?: any,
        queryParams?: any
    ) => Promise<void>;
}
