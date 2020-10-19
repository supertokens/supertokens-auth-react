import { RecipeModuleConfig } from "../types";
export default abstract class RecipeModule {
    private routes;
    private recipeId;
    constructor(config: RecipeModuleConfig);
    getRecipeId(): string;
    canHandleRoute(urlString: string): boolean;
}
