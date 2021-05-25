import RecipeModule from "../recipeModule";
import { NormalisedConfig, GetRedirectionURLContext } from "./types";
import { SuccessAPIResponse } from "../../types";
import EmailVerification from "../emailverification/recipe";
export default abstract class AuthRecipeModule<
    T,
    S,
    R,
    N extends NormalisedConfig<T | GetRedirectionURLContext, S, R>
> extends RecipeModule<T | GetRedirectionURLContext, S, R, N> {
    emailVerification: EmailVerification;
    constructor(config: N);
    getAuthRecipeModuleDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getAuthRecipeModuleFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    signOut: () => Promise<SuccessAPIResponse>;
    doesSessionExist: () => Promise<boolean>;
    redirectToAuth: (show?: "signin" | "signup" | undefined, history?: any, queryParams?: any) => void;
}
