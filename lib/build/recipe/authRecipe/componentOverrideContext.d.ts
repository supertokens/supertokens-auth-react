/// <reference types="react" />
import type { ComponentOverrideMap } from "./types";
declare const useContext: () => ComponentOverrideMap,
    Provider: import("react").FC<
        import("react").PropsWithChildren<{
            components: ComponentOverrideMap;
        }>
    >;
export { useContext as useAuthRecipeComponentOverrideContext, Provider as AuthRecipeComponentsOverrideContextProvider };
