import RecipeModule from "./recipe/recipeModule";
export default class HttpRequest {
    private recipe;
    constructor(recipe: RecipeModule<any, any, any, any>);
    get: <T>(path: string, config: RequestInit, action: string, queryParams?: Record<string, string> | undefined) => Promise<T>;
    post: <T>(path: string, config: RequestInit, action: string) => Promise<T>;
    delete: <T>(path: string, action: string, config: RequestInit) => Promise<T>;
    put: <T>(path: string, action: string, config: RequestInit) => Promise<T>;
    fetch: (baseUrl: string, config: RequestInit, action: string) => Promise<Response>;
    preAPIHook: ({ action, url, requestInit, }: {
        action: string;
        url: string;
        requestInit: RequestInit;
    }) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    fetchResponseJsonOrThrowAbove300: <T>(url: string, config: RequestInit, action: string) => Promise<T>;
    getFullUrl: (pathStr: string, queryParams?: Record<string, string> | undefined) => string;
}
