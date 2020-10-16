import RecipeModule from "./recipes/module";
interface AppInfo {
    appName: string;
    apiDomain: string;
    apiBasePath?: string;
    websiteDomain: string;
    websiteBasePath?: string;
    logoFullURL?: string;
}
interface SuperTokensConfig {
    appInfo: AppInfo;
    recipeList: Array<RecipeModule>;
}
export default class SuperTokens {
    private static appInfo?;
    private static recipeList;
    static init(config: SuperTokensConfig): void;
    static getAppInfo(): AppInfo;
    static handleRoute(url: string): boolean;
    static getRoutingComponent(url: string): void;
    static getRecipeList(): RecipeModule[];
    static prependWebsiteBasePath(path: string): string;
    static reset(): void;
}
export {};
