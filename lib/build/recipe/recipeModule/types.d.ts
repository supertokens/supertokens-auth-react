import { NormalisedAppInfo } from "../../types";
export declare type Config<GetRedirectionURLContextType, PreAPIHookContextType, OnHandleEventContextType> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    getRedirectionURL?: (context: GetRedirectionURLContextType) => Promise<string | undefined>;
    preAPIHook?: (context: PreAPIHookContextType) => Promise<RequestInit | {
        url?: string;
        requestInit: RequestInit;
    }>;
    onHandleEvent?: (context: OnHandleEventContextType) => void;
    useShadowDom?: boolean;
    palette?: Record<string, string>;
};
export declare type NormalisedConfig<GetRedirectionURLContextType, PreAPIHookContextType, OnHandleEventContextType> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    getRedirectionURL: (context: GetRedirectionURLContextType) => Promise<string | undefined>;
    preAPIHook: (context: PreAPIHookContextType) => Promise<RequestInit | {
        url?: string;
        requestInit: RequestInit;
    }>;
    onHandleEvent: (context: OnHandleEventContextType) => void;
    useShadowDom: boolean;
    palette: Record<string, string>;
};
