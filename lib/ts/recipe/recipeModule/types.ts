import type { NormalisedGetRedirectionURLContext, UserContext } from "../../types";

export type RecipePreAPIHookContext<Action> = {
    requestInit: RequestInit;
    url: string;
    action: Action;
    userContext: UserContext;
};

export type RecipePostAPIHookContext<Action> = {
    action: Action;
    requestInit: RequestInit;
    url: string;
    fetchResponse: Response;
    userContext: UserContext;
};

export type RecipePreAPIHookFunction<Action> = (
    context: RecipePreAPIHookContext<Action>
) => Promise<{ url: string; requestInit: RequestInit }>;

export type RecipePostAPIHookFunction<Action> = (context: RecipePostAPIHookContext<Action>) => Promise<void>;

export type RecipeOnHandleEventFunction<EventType> = (context: EventType) => void;

export type UserInput<GetRedirectionURLContextType, Action, OnHandleEventContextType> = {
    getRedirectionURL?: (
        context: NormalisedGetRedirectionURLContext<GetRedirectionURLContextType>,
        userContext: UserContext
    ) => Promise<string | undefined | null>;
    preAPIHook?: RecipePreAPIHookFunction<Action>;
    postAPIHook?: RecipePostAPIHookFunction<Action>;
    onHandleEvent?: RecipeOnHandleEventFunction<OnHandleEventContextType>;
    style?: string;
};

export type Config<GetRedirectionURLContextType, Action, OnHandleEventContextType> = UserInput<
    GetRedirectionURLContextType,
    Action,
    OnHandleEventContextType
>;

export type NormalisedConfig<GetRedirectionURLContextType, Action, OnHandleEventContextType> = {
    getRedirectionURL: (
        context: NormalisedGetRedirectionURLContext<GetRedirectionURLContextType>,
        userContext: UserContext
    ) => Promise<string | undefined | null>;
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContextType>;
    recipeRootStyle: string;
    preAPIHook: (context: RecipePreAPIHookContext<Action>) => Promise<{ url: string; requestInit: RequestInit }>;
    postAPIHook: (context: RecipePostAPIHookContext<Action>) => Promise<void>;
};
