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
    preAPIHook: <T>(context: {
        action: T;
        requestInit: RequestInit;
    }) => Promise<RequestInit>;
    redirect: <T>(context: {
        action: T;
    }, history?: History<unknown> | undefined, title?: string | undefined, shouldReload?: boolean) => Promise<void>;
    getRedirectionURL: (context: {
        action: unknown;
    }) => Promise<string>;
    onHandleEvent<T>(context: T): void;
    abstract getFeatures(): RouteToFeatureComponentMap;
    protected getDefaultRedirectionURL<T>(context: {
        action: T;
    }): Promise<string>;
}
