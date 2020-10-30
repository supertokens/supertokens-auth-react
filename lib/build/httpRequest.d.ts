import { NormalisedAppInfo } from "./types";
export default class HttpRequest {
    private appInfo;
    constructor(appInfo: NormalisedAppInfo);
    get: (path: string, config: RequestInit) => Promise<any>;
    post: (path: string, config: RequestInit) => Promise<any>;
    delete: (path: string, config: RequestInit) => Promise<any>;
    put: (path: string, config: RequestInit) => Promise<any>;
    fetch: (url: RequestInfo, config: RequestInit) => Promise<any>;
    getFullUrl: (pathStr: string) => string;
}
