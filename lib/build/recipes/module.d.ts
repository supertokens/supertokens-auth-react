export interface RecipeModuleConfig {
    routes: Array<string>;
    recipeId: string;
}
export default class RecipeModule {
    private routes;
    private recipeId;
    constructor(config: RecipeModuleConfig);
    static getInstanceIfDefined(): void;
    static init(config: RecipeModuleConfig): void;
    handleRoute(urlString: string): boolean;
}
