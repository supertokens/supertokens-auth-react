import HttpRequest from "../../httpRequest";
import { NormalisedAppInfo, RecipeFeatureComponentMap } from "../../types";
import { NormalisedRecipeModuleHooks, RecipeModuleConfig } from "./types";
export default abstract class RecipeModule<T, S, R> {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    httpRequest: HttpRequest<T, S, R>;
    hooks: NormalisedRecipeModuleHooks<T, S, R>;
    constructor(config: RecipeModuleConfig<T, S, R>);
    redirect: (context: T, history?: any, queryParams?: Record<string, string> | undefined) => Promise<void>;
    getRedirectUrl: (context: T) => Promise<string>;
    getDefaultRedirectionURL(_: T): Promise<string>;
    abstract getFeatures(): RecipeFeatureComponentMap;
}
