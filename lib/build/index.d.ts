import RecipeModule from "./recipes/recipeModule";
import { AppInfo, SuperTokensConfig } from "./types";
export default class SuperTokens {
    private static appInfo?;
    private static recipeList;
    static init(config: SuperTokensConfig): void;
    static getAppInfo(): AppInfo;
    static canHandleRoute(url: string): boolean;
    static getRoutingComponent(url: string): void;
    static getRecipeList(): RecipeModule[];
    static reset(): void;
}
