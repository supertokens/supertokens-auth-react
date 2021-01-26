import HttpRequest from "../httpRequest";
import { RouteToFeatureComponentMap, RecipeModuleConfig, NormalisedAppInfo } from "../types";
import { History } from "history";
export default abstract class RecipeModule {
    private recipeId;
    private appInfo;
    private hooks;
    private httpRequest;
    private redirectTo?;
    constructor(config: RecipeModuleConfig);
    getRecipeId: () => string;
    setSuccessRedirectTo: (value: string) => void;
    getAppInfo: () => NormalisedAppInfo;
    getHttp: () => HttpRequest;
    preAPIHook: (context: {
        action: string;
        requestInit: RequestInit;
    }) => Promise<RequestInit>;
    redirect: (context: {
        action: string;
    }, history?: History<unknown> | undefined) => Promise<void>;
    getRedirectionURL: (context: {
        action: string;
    }) => Promise<string>;
    getSuccessRedirectionURL: (context: {
        action: string;
    }) => string | undefined;
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
