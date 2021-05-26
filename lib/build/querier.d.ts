import { PreAPIHookFunction, NormalisedAppInfo } from './types';
export default class Querier {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    constructor(recipeId: string, appInfo: NormalisedAppInfo);
    get: <T>(path: string, config: RequestInit, queryParams?: Record<string, string> | undefined, preAPIHook?: PreAPIHookFunction | undefined) => Promise<T>;
    post: <T>(path: string, config: RequestInit, preAPIHook?: PreAPIHookFunction | undefined) => Promise<T>;
    delete: <T>(path: string, config: RequestInit, preAPIHook?: PreAPIHookFunction | undefined) => Promise<T>;
    put: <T>(path: string, config: RequestInit, preAPIHook?: PreAPIHookFunction | undefined) => Promise<T>;
    fetch: (url: string, config: RequestInit, preAPIHook?: PreAPIHookFunction | undefined) => Promise<Response>;
    callPreAPIHook: (context: {
        preAPIHook?: PreAPIHookFunction | undefined;
        requestInit: RequestInit;
        url: string;
    }) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    getFullUrl: (pathStr: string, queryParams?: Record<string, string> | undefined) => string;
}
