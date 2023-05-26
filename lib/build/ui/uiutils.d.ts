import type { RecipeFeatureComponentMap } from "../types";
export declare const getRecipeFeaturesSSRSafe: <RecipeInstance>(
    getRecipeInstance: () => RecipeInstance,
    getRecipefeatures: (recipeInstance: RecipeInstance) => RecipeFeatureComponentMap
) => RecipeFeatureComponentMap;
