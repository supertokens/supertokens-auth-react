export declare type RecipePreAPIHookContext<Action> = {
    requestInit: RequestInit;
    url: string;
    action: Action;
    userContext: any;
};
export declare type RecipePostAPIHookContext<Action> = {
    action: Action;
    requestInit: RequestInit;
    url: string;
    fetchResponse: Response;
    userContext: any;
};
export declare type RecipePreAPIHookFunction<Action> = (context: RecipePreAPIHookContext<Action>) => Promise<{
    url: string;
    requestInit: RequestInit;
}>;
export declare type RecipePostAPIHookFunction<Action> = (context: RecipePostAPIHookContext<Action>) => Promise<void>;
export declare type RecipeOnHandleEventFunction<EventType> = (context: EventType) => void;
export declare type UserInput<GetRedirectionURLContextType, Action, OnHandleEventContextType> = {
    getRedirectionURL?: (context: GetRedirectionURLContextType) => Promise<string | undefined>;
    preAPIHook?: RecipePreAPIHookFunction<Action>;
    postAPIHook?: RecipePostAPIHookFunction<Action>;
    onHandleEvent?: RecipeOnHandleEventFunction<OnHandleEventContextType>;
    useShadowDom?: boolean;
    style?: string;
};
export declare type Config<GetRedirectionURLContextType, Action, OnHandleEventContextType> = UserInput<
    GetRedirectionURLContextType,
    Action,
    OnHandleEventContextType
>;
export declare type NormalisedConfig<GetRedirectionURLContextType, Action, OnHandleEventContextType> = {
    getRedirectionURL: (context: GetRedirectionURLContextType) => Promise<string | undefined>;
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContextType>;
    useShadowDom: boolean;
    rootStyle: string;
    preAPIHook: (context: RecipePreAPIHookContext<Action>) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    postAPIHook: (context: RecipePostAPIHookContext<Action>) => Promise<void>;
};
