import RecipeModule from "../recipeModule";
import { NormalisedConfig, GetRedirectionURLContext, OnHandleEventContext } from "./types";
export default abstract class AuthRecipe<
    T,
    Action,
    R,
    N extends NormalisedConfig<T | GetRedirectionURLContext, Action, R | OnHandleEventContext>
> extends RecipeModule<T | GetRedirectionURLContext, Action, R | OnHandleEventContext, N> {
    constructor(config: N);
    getAuthRecipeDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    signOut: (
        input?:
            | {
                  userContext?: any;
              }
            | undefined
    ) => Promise<void>;
    doesSessionExist: (
        input?:
            | {
                  userContext?: any;
              }
            | undefined
    ) => Promise<boolean>;
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
