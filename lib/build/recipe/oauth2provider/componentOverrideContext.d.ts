/// <reference types="react" />
declare const useContext: () => any,
    Provider: import("react").FC<
        import("react").PropsWithChildren<{
            components: any;
        }>
    >;
export { useContext as useRecipeComponentOverrideContext, Provider as RecipeComponentsOverrideContextProvider };
