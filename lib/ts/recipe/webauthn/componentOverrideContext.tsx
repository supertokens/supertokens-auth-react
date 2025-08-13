import { createGenericComponentsOverrideContext } from "../../components/componentOverride/genericComponentOverrideContext";

import Recipe from "./recipe";

import type { ComponentOverrideMap } from "./types";

const [useContext, Provider] = createGenericComponentsOverrideContext<ComponentOverrideMap>(
    undefined,
    Recipe.RECIPE_ID
);

export { useContext as useRecipeComponentOverrideContext, Provider as RecipeComponentsOverrideContextProvider };
