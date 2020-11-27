import { NormalisedAppInfo } from "./types";
export default class HttpRequest {
    private appInfo;
    constructor(appInfo: NormalisedAppInfo);
    get: <T>(path: string, config: RequestInit, queryParams?: Record<string, string> | undefined) => Promise<T>;
    post: <T>(path: string, config: RequestInit) => Promise<T>;
    delete: <T>(path: string, config: RequestInit) => Promise<T>;
    put: <T>(path: string, config: RequestInit) => Promise<T>;
    fetch: (url: RequestInfo, config: RequestInit) => Promise<Response>;
    fetchResponseJsonOrThrowAbove300: <T>(url: RequestInfo, config: RequestInit) => Promise<T>;
    getFullUrl: (pathStr: string, queryParams?: Record<string, string> | undefined) => string;
}
