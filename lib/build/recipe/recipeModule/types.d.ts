import { NormalisedAppInfo } from "../../types";
export declare type RecipeModuleConfig<RecipeModuleGetRedirectionURLContext, RecipeModulePreAPIHookContext, RecipeModuleOnHandleEventContext> = RecipeModuleHooks<RecipeModuleGetRedirectionURLContext, RecipeModulePreAPIHookContext, RecipeModuleOnHandleEventContext> & {
    recipeId: string;
    /**
     *
     * AppInfo as present in the recipe module manager
     */
    appInfo: NormalisedAppInfo;
};
export declare type RecipeModuleHooks<RecipeModuleGetRedirectionURLContext, RecipeModulePreAPIHookContext, RecipeModuleOnHandleEventContext> = {
    getRedirectionURL?: (context: RecipeModuleGetRedirectionURLContext) => Promise<string | undefined>;
    preAPIHook?: (context: RecipeModulePreAPIHookContext) => Promise<RequestInit | {
        url?: string;
        requestInit: RequestInit;
    }>;
    onHandleEvent?: (context: RecipeModuleOnHandleEventContext) => void;
};
export declare type NormalisedRecipeModuleHooks<RecipeModuleGetRedirectionURLContext, RecipeModulePreAPIHookContext, RecipeModuleOnHandleEventContext> = {
    getRedirectionURL: (context: RecipeModuleGetRedirectionURLContext) => Promise<string | undefined>;
    preAPIHook: (context: RecipeModulePreAPIHookContext) => Promise<RequestInit | {
        url?: string;
        requestInit: RequestInit;
    }>;
    onHandleEvent: (context: RecipeModuleOnHandleEventContext) => void;
};
