import type { RecipeFeatureComponentMap } from "../types";

export const getRecipeFeaturesSSRSafe = <RecipeInstance,>(
    getRecipeInstance: () => RecipeInstance,
    getRecipefeatures: (recipeInstance: RecipeInstance) => RecipeFeatureComponentMap
) => {
    let recipeInstance: RecipeInstance;

    try {
        recipeInstance = getRecipeInstance();
    } catch (e) {
        if (typeof window === "undefined") {
            return {};
        }

        throw e;
    }

    return getRecipefeatures(recipeInstance);
};
