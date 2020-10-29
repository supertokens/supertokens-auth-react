import { NormalisedAppInfo } from "./types";
export default class HttpRequest {
    private appInfo;
    constructor(appInfo: NormalisedAppInfo);
    get: (path: string, config: RequestInit) => Promise<Response>;
    post: (path: string, config: RequestInit) => Promise<Response>;
    delete: (path: string, config: RequestInit) => Promise<Response>;
    put: (path: string, config: RequestInit) => Promise<Response>;
    fetch: (url: RequestInfo, config: RequestInit) => Promise<Response>;
    getFullUrl: (pathStr: string) => string;
}
