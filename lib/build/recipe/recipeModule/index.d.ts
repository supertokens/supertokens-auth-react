import HttpRequest from "../../httpRequest";
import { NormalisedAppInfo, RouteToFeatureComponentMap } from "../../types";
import { History } from "history";
import { NormalisedRecipeModuleHooks, RecipeModuleConfig } from "./types";
export default abstract class RecipeModule {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    httpRequest: HttpRequest;
    hooks: NormalisedRecipeModuleHooks;
    constructor(config: RecipeModuleConfig<unknown, unknown, unknown>);
    redirect: (context: unknown, history?: History<unknown> | undefined, queryParams?: Record<string, string> | undefined) => Promise<void>;
    getRedirectUrl: (context: any) => Promise<string>;
    getDefaultRedirectionURL(context: unknown): Promise<string>;
    abstract getFeatures(): RouteToFeatureComponentMap;
}
