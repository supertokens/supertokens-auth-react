import RecipeModule from "./recipe/recipeModule";
export default class HttpRequest<T, S, R> {
    private recipe;
    constructor(recipe: RecipeModule<T, S, R>);
    get: <T_1>(path: string, config: RequestInit, action: string, queryParams?: Record<string, string> | undefined) => Promise<T_1>;
    post: <T_1>(path: string, config: RequestInit, action: string) => Promise<T_1>;
    delete: <T_1>(path: string, action: string, config: RequestInit) => Promise<T_1>;
    put: <T_1>(path: string, action: string, config: RequestInit) => Promise<T_1>;
    fetch: (baseUrl: string, config: RequestInit, action: string) => Promise<Response>;
    preAPIHook: ({ action, url, requestInit, }: {
        action: string;
        url: string;
        requestInit: RequestInit;
    }) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    fetchResponseJsonOrThrowAbove300: <T_1>(url: string, config: RequestInit, action: string) => Promise<T_1>;
    getFullUrl: (pathStr: string, queryParams?: Record<string, string> | undefined) => string;
}
