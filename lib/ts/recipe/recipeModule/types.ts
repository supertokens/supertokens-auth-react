import { Styles } from "../../types";

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
    palette?: Record<string, string>;
    style?: Styles;
};

export type Config<GetRedirectionURLContextType, Action, OnHandleEventContextType> = UserInput<
    GetRedirectionURLContextType,
    Action,
    OnHandleEventContextType
>;

export type NormalisedConfig<GetRedirectionURLContextType, Action, OnHandleEventContextType> = {
    getRedirectionURL: (context: GetRedirectionURLContextType) => Promise<string | undefined>;
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContextType>;
    useShadowDom: boolean;
    palette: Record<string, string>;
    rootStyle: Styles;
    preAPIHook: (context: RecipePreAPIHookContext<Action>) => Promise<{ url: string; requestInit: RequestInit }>;
    postAPIHook: (context: RecipePostAPIHookContext<Action>) => Promise<void>;
};
