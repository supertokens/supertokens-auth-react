import HttpRequest from "../httpRequest";
import { RouteToFeatureComponentMap, RecipeModuleConfig, NormalisedAppInfo, NormalisedRecipeModuleHooks } from "../types";
import { History } from "history";
export default abstract class RecipeModule {
    private recipeId;
    private appInfo;
    private httpRequest;
    hooks: NormalisedRecipeModuleHooks;
    constructor(config: RecipeModuleConfig);
    getRecipeId: () => string;
    getAppInfo: () => NormalisedAppInfo;
    getHttp: () => HttpRequest;
    redirect: (context: unknown, history?: History<unknown> | undefined, queryParams?: Record<string, string> | undefined) => Promise<void>;
    getRedirectUrl: (context: any) => Promise<string>;
    abstract getFeatures(): RouteToFeatureComponentMap;
    protected getDefaultRedirectionURL(context: unknown): Promise<string>;
}
