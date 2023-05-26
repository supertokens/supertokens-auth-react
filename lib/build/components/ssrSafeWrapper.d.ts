import { PropsWithChildren } from "react";
declare type Props<ComponentName, Recipe> = {
    componentName: ComponentName;
    getRecipe: () => Recipe;
    getFeatureComponent: (componentName: ComponentName, recipeInstance: Recipe) => JSX.Element;
};
export declare const SSRSafeWrapper: <ComponentName, Recipe>(
    props: PropsWithChildren<Props<ComponentName, Recipe>>
) => JSX.Element;
export {};
