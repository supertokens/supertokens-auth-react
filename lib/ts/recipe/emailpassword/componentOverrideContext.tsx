import { createGenericComponentsOverrideContext } from "../../components/componentOverride/genericComponentOverrideContext";
import { ComponentOverrideMap } from "./types";

const [useContext, Provider, Consumer] = createGenericComponentsOverrideContext<ComponentOverrideMap>();

export {
    useContext as useRecipeComponentOverrideContext,
    Provider as RecipeComponentsOverrideContextProvider,
    Consumer as RecipeComponentsOverrideContextConsumer,
};
