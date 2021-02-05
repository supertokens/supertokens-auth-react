import { NormalisedAppInfo } from "../../types";

export type RecipeModuleConfig<T, S, R> = RecipeModuleHooks<T, S, R> & {
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

export type RecipeModuleHooks<T, S, R> = {
    /*
     * Optional pre API Hook.
     */
    preAPIHook?: (context: S) => Promise<RequestInit>;

    /*
     * Optional method used for handling event success.
     */
    onHandleEvent?: (context: R) => void;

    /*
     * Method used for redirections.
     */
    getRedirectionURL?: (context: T) => Promise<string | undefined>;
};

export type NormalisedRecipeModuleHooks = {
    /*
     * Optional pre API Hook.
     */
    preAPIHook: (context: unknown) => Promise<RequestInit>;

    /*
     * Method used for handling event success.
     */
    onHandleEvent: (context: unknown) => void;

    /*
     * Optional method used for redirections.
     */
    getRedirectionURL: (context: unknown) => Promise<string | undefined>;
};
