import { NormalisedAppInfo } from "../../types";

export type RecipeModuleConfig<
    RecipeModuleGetRedirectionURLContext,
    RecipeModulePreAPIHookContext,
    RecipeModuleOnHandleEventContext
> = RecipeModuleHooks<
    RecipeModuleGetRedirectionURLContext,
    RecipeModulePreAPIHookContext,
    RecipeModuleOnHandleEventContext
> & {
    /*
     * Unique Identifier of a module.
     */
    recipeId: string;

    /**
     *
     * AppInfo as present in the recipe module manager
     */
    appInfo: NormalisedAppInfo;
};

export type RecipeModuleHooks<
    RecipeModuleGetRedirectionURLContext,
    RecipeModulePreAPIHookContext,
    RecipeModuleOnHandleEventContext
> = {
    /*
     * Method used for redirections.
     */
    getRedirectionURL?: (context: RecipeModuleGetRedirectionURLContext) => Promise<string | undefined>;

    /*
     * Optional pre API Hook.
     */
    preAPIHook?: (
        context: RecipeModulePreAPIHookContext
    ) => Promise<RequestInit | { url?: string; requestInit: RequestInit }>;

    /*
     * Optional method used for handling event success.
     */
    onHandleEvent?: (context: RecipeModuleOnHandleEventContext) => void;
};

export type NormalisedRecipeModuleHooks<
    RecipeModuleGetRedirectionURLContext,
    RecipeModulePreAPIHookContext,
    RecipeModuleOnHandleEventContext
> = {
    /*
     * Optional method used for redirections.
     */
    getRedirectionURL: (context: RecipeModuleGetRedirectionURLContext) => Promise<string | undefined>;

    /*
     * Optional pre API Hook.
     */
    preAPIHook: (
        context: RecipeModulePreAPIHookContext
    ) => Promise<RequestInit | { url?: string; requestInit: RequestInit }>;

    /*
     * Method used for handling event success.
     */
    onHandleEvent: (context: RecipeModuleOnHandleEventContext) => void;
};
