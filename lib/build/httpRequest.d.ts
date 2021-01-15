import RecipeModule from "./recipe/recipeModule";
export default class HttpRequest {
    private recipe;
    constructor(recipe: RecipeModule);
    get: <S, T>(path: string, config: RequestInit, action: T, queryParams?: Record<string, string> | undefined) => Promise<S>;
    post: <S, T>(path: string, config: RequestInit, action: S) => Promise<T>;
    delete: <S, T>(path: string, action: S, config: RequestInit) => Promise<T>;
    put: <S, T>(path: string, action: S, config: RequestInit) => Promise<T>;
    fetch: <S>(url: RequestInfo, config: RequestInit, action: S) => Promise<Response>;
    fetchResponseJsonOrThrowAbove300: <S, T>(url: RequestInfo, config: RequestInit, action: S) => Promise<T>;
    getFullUrl: (pathStr: string, queryParams?: Record<string, string> | undefined) => string;
}
