import { NormalisedAppInfo, PostAPIHookFunction, Styles } from "../../types";
export declare type UserInput<GetRedirectionURLContextType, PreAPIHookContextType, OnHandleEventContextType> = {
    getRedirectionURL?: (context: GetRedirectionURLContextType) => Promise<string | undefined>;
    preAPIHook?: (context: PreAPIHookContextType) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    postAPIHook?: PostAPIHookFunction;
    onHandleEvent?: (context: OnHandleEventContextType) => void;
    useShadowDom?: boolean;
    palette?: Record<string, string>;
    style?: Styles;
};
export declare type Config<GetRedirectionURLContextType, PreAPIHookContextType, OnHandleEventContextType> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
} & UserInput<GetRedirectionURLContextType, PreAPIHookContextType, OnHandleEventContextType>;
export declare type NormalisedConfig<GetRedirectionURLContextType, PreAPIHookContextType, OnHandleEventContextType> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    getRedirectionURL: (context: GetRedirectionURLContextType) => Promise<string | undefined>;
    preAPIHook: (context: PreAPIHookContextType) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    postAPIHook: PostAPIHookFunction;
    onHandleEvent: (context: OnHandleEventContextType) => void;
    useShadowDom: boolean;
    palette: Record<string, string>;
    rootStyle: Styles;
};
