/// <reference types="react" />
import { ComponentOverrideMap } from "./types";
declare const useOverrideContext: () => ComponentOverrideMap,
    Provider: import("react").FC<
        import("react").PropsWithChildren<{
            components: ComponentOverrideMap;
        }>
    >;
export { useOverrideContext, Provider as RecipeComponentsOverrideContextProvider };
