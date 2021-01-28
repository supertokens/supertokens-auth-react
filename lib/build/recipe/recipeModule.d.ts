import HttpRequest from "../httpRequest";
import { RouteToFeatureComponentMap, RecipeModuleConfig, NormalisedAppInfo } from "../types";
import { History } from "history";
export default abstract class RecipeModule {
    private recipeId;
    private appInfo;
    private hooks;
    private httpRequest;
    constructor(config: RecipeModuleConfig);
    getRecipeId: () => string;
    getAppInfo: () => NormalisedAppInfo;
    getHttp: () => HttpRequest;
    preAPIHook: (context: {
        action: string;
        requestInit: RequestInit;
    }) => Promise<RequestInit>;
    redirect: (context: {
        action: string;
        redirectToPath?: string | undefined;
    }, history?: History<unknown> | undefined, queryParams?: Record<string, string> | undefined) => Promise<void>;
    getRedirectionURL: (context: {
        action: string;
        redirectToPath?: string | undefined;
    }) => Promise<string>;
    onHandleEvent(context: {
        action: string;
        user?: {
            id: string;
            email: string;
        };
    }): void;
    abstract getFeatures(): RouteToFeatureComponentMap;
    protected getDefaultRedirectionURL(context: {
        action: unknown;
    }): Promise<string>;
}
