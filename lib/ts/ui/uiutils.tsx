import type { RecipeFeatureComponentMap } from "../types";

// eslint-disable-next-line comma-spacing
export const getRecipeFeaturesSSRSafe = <RecipeInstance,>(
    getRecipeInstance: () => RecipeInstance,
    getRecipefeatures: (recipeInstance: RecipeInstance) => RecipeFeatureComponentMap
) => {
    let recipeInstance: RecipeInstance;

    try {
        recipeInstance = getRecipeInstance();
    } catch (e) {
        // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
        if (typeof window === "undefined") {
            return {};
        }

        throw e;
    }

    return getRecipefeatures(recipeInstance);
};
