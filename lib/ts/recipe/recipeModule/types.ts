import { NormalisedAppInfo } from "../../types";

export type UserInput<GetRedirectionURLContextType, PreAPIHookContextType, OnHandleEventContextType> = {
    getRedirectionURL?: (context: GetRedirectionURLContextType) => Promise<string | undefined>;
    preAPIHook?: (context: PreAPIHookContextType) => Promise<RequestInit | { url?: string; requestInit: RequestInit }>;
    onHandleEvent?: (context: OnHandleEventContextType) => void;
    useShadowDom?: boolean;
    palette?: Record<string, string>;
};

export type Config<GetRedirectionURLContextType, PreAPIHookContextType, OnHandleEventContextType> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
} & UserInput<GetRedirectionURLContextType, PreAPIHookContextType, OnHandleEventContextType>;

export type NormalisedConfig<GetRedirectionURLContextType, PreAPIHookContextType, OnHandleEventContextType> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    getRedirectionURL: (context: GetRedirectionURLContextType) => Promise<string | undefined>;
    preAPIHook: (context: PreAPIHookContextType) => Promise<RequestInit | { url?: string; requestInit: RequestInit }>;
    onHandleEvent: (context: OnHandleEventContextType) => void;
    useShadowDom: boolean;
    palette: Record<string, string>;
};
