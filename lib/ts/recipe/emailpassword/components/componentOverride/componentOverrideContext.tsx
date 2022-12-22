import { createGenericComponentsOverrideContext } from "../../../../components/componentOverride/genericComponentOverrideContext";
import { ComponentOverrideMap } from "../../types";

const [useOverrideContext, Provider, Consumer] = createGenericComponentsOverrideContext<ComponentOverrideMap>();

export {
    useOverrideContext,
    Provider as RecipeComponentsOverrideContextProvider,
    Consumer as RecipeComponentsOverrideContextConsumer,
};
