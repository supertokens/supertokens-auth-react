/// <reference types="react" />
import { ComponentOverrideMap } from "../../types";
declare const useOverrideContext: () => ComponentOverrideMap,
    Provider: import("react").FC<
        import("react").PropsWithChildren<{
            components: ComponentOverrideMap;
        }>
    >,
    Consumer: import("react").Consumer<ComponentOverrideMap>;
export {
    useOverrideContext,
    Provider as RecipeComponentsOverrideContextProvider,
    Consumer as RecipeComponentsOverrideContextConsumer,
};
