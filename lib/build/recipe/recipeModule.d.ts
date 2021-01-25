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
    }, history?: History<unknown> | undefined, title?: string | undefined, shouldReload?: boolean) => Promise<void>;
    getRedirectionURL: (context: {
        action: string;
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
