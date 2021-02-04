import { AuthRecipeModuleConfig, NormalisedAuthRecipeConfig, NormalisedAuthRecipeConfigHooks, NormalisedRecipeModuleHooks, SuccessAPIResponse } from "../types";
import RecipeModule from "./recipeModule";
import { History } from "history";
export default abstract class AuthRecipeModule extends RecipeModule {
    config: NormalisedAuthRecipeConfig;
    hooks: NormalisedAuthRecipeConfigHooks & NormalisedRecipeModuleHooks;
    constructor(config: AuthRecipeModuleConfig<unknown, unknown, unknown>);
    redirect: (context: unknown, history?: History<unknown> | undefined, queryParams?: Record<string, string> | undefined) => Promise<void>;
    getRedirectUrl: (context: any) => Promise<string>;
    abstract getDefaultRedirectionURL(context: unknown): Promise<string>;
    abstract signOut(): Promise<SuccessAPIResponse>;
}
