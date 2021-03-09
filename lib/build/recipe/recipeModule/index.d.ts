import HttpRequest from "../../httpRequest";
import { NormalisedAppInfo, RecipeFeatureComponentMap } from "../../types";
import { History } from "history";
import { NormalisedRecipeModuleHooks, RecipeModuleConfig } from "./types";
export default abstract class RecipeModule<RecipeModuleGetRedirectionURLContext, RecipeModulePreAPIHookContext, RecipeModuleOnHandleEventContext> {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    httpRequest: HttpRequest;
    hooks: NormalisedRecipeModuleHooks<RecipeModuleGetRedirectionURLContext, RecipeModulePreAPIHookContext, RecipeModuleOnHandleEventContext>;
    constructor(config: RecipeModuleConfig<RecipeModuleGetRedirectionURLContext, RecipeModulePreAPIHookContext, RecipeModuleOnHandleEventContext>);
    redirect: (context: RecipeModuleGetRedirectionURLContext, history?: History<any> | undefined, queryParams?: Record<string, string> | undefined) => Promise<void>;
    getRedirectUrl: (context: RecipeModuleGetRedirectionURLContext) => Promise<string>;
    getDefaultRedirectionURL(context: RecipeModuleGetRedirectionURLContext): Promise<string>;
    abstract getFeatures(): RecipeFeatureComponentMap;
}
