import { NormalisedAppInfo } from "../../types";
export declare type RecipeModuleConfig<T, S, R> = RecipeModuleHooks<T, S, R> & {
    recipeId: string;
    /**
     *
     * AppInfo as present in the recipe module manager
     */
    appInfo: NormalisedAppInfo;
};
export declare type RecipeModuleHooks<T, S, R> = {
    preAPIHook?: (context: S) => Promise<RequestInit>;
    onHandleEvent?: (context: R) => void;
    getRedirectionURL?: (context: T) => Promise<string | undefined>;
};
export declare type NormalisedRecipeModuleHooks = {
    preAPIHook: (context: unknown) => Promise<RequestInit>;
    onHandleEvent: (context: unknown) => void;
    getRedirectionURL: (context: unknown) => Promise<string | undefined>;
};
