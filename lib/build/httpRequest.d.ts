import { AppInfo } from "./types";
export default class HttpRequest {
    private appInfo;
    constructor(appInfo: AppInfo);
    get: (path: string, config?: RequestInit | undefined) => Promise<Response>;
    post: (path: string, config?: RequestInit | undefined) => Promise<Response>;
    delete: (path: string, config?: RequestInit | undefined) => Promise<Response>;
    put: (path: string, config?: RequestInit | undefined) => Promise<Response>;
    fetch: (url: RequestInfo, config?: RequestInit | undefined) => Promise<Response>;
    getFullUrl: (pathStr: string) => string;
}
