import type { NormalisedAppInfo } from "../../types";
import type { RecipeConfig as WebJSRecipeConfig } from "supertokens-web-js/recipe/recipeModule/types";

export type RecipePreAPIHookContext<Action> = {
    requestInit: RequestInit;
    url: string;
    action: Action;
    userContext: any;
};

export type RecipePostAPIHookContext<Action> = {
    action: Action;
    requestInit: RequestInit;
    url: string;
    fetchResponse: Response;
    userContext: any;
};

export type RecipePreAPIHookFunction<Action> = (
    context: RecipePreAPIHookContext<Action>
) => Promise<{ url: string; requestInit: RequestInit }>;

export type RecipePostAPIHookFunction<Action> = (context: RecipePostAPIHookContext<Action>) => Promise<void>;

export type RecipeOnHandleEventFunction<EventType> = (context: EventType) => void;

export type UserInput<GetRedirectionURLContextType, Action, OnHandleEventContextType> = {
    getRedirectionURL?: (context: GetRedirectionURLContextType) => Promise<string | undefined>;
    preAPIHook?: RecipePreAPIHookFunction<Action>;
    postAPIHook?: RecipePostAPIHookFunction<Action>;
    onHandleEvent?: RecipeOnHandleEventFunction<OnHandleEventContextType>;
    useShadowDom?: boolean;
    style?: string;
};

export type Config<GetRedirectionURLContextType, Action, OnHandleEventContextType> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
} & UserInput<GetRedirectionURLContextType, Action, OnHandleEventContextType>;

export type NormalisedConfig<GetRedirectionURLContextType, Action, OnHandleEventContextType> =
    WebJSRecipeConfig<Action> & {
        appInfo: NormalisedAppInfo;
        getRedirectionURL: (context: GetRedirectionURLContextType) => Promise<string | undefined>;
        onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContextType>;
        useShadowDom: boolean;
        rootStyle: string;
        preAPIHook: (context: RecipePreAPIHookContext<Action>) => Promise<{ url: string; requestInit: RequestInit }>;
        postAPIHook: (context: RecipePostAPIHookContext<Action>) => Promise<void>;
    };
