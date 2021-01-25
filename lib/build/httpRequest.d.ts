import RecipeModule from "./recipe/recipeModule";
export default class HttpRequest {
    private recipe;
    constructor(recipe: RecipeModule);
    get: <T>(path: string, config: RequestInit, action: string, queryParams?: Record<string, string> | undefined) => Promise<T>;
    post: <T>(path: string, config: RequestInit, action: string) => Promise<T>;
    delete: <T>(path: string, action: string, config: RequestInit) => Promise<T>;
    put: <T>(path: string, action: string, config: RequestInit) => Promise<T>;
    fetch: (url: RequestInfo, config: RequestInit, action: string) => Promise<Response>;
    fetchResponseJsonOrThrowAbove300: <T>(url: RequestInfo, config: RequestInit, action: string) => Promise<T>;
    getFullUrl: (pathStr: string, queryParams?: Record<string, string> | undefined) => string;
}
