import { createGenericComponentsOverrideContext } from "../../../../components/componentOverride/genericComponentOverrideContext";
import { ComponentOverrideMap } from "../../types";

const [useOverrideContext, Provider] = createGenericComponentsOverrideContext<ComponentOverrideMap>();

export { useOverrideContext, Provider as RecipeComponentsOverrideContextProvider };
