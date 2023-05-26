import { PropsWithChildren } from "react";

type Props<ComponentName, Recipe> = {
    componentName: ComponentName;
    getRecipe: () => Recipe;
    getFeatureComponent: (componentName: ComponentName, recipeInstance: Recipe) => JSX.Element;
};

// This component tries to get the recipe instance and returns an empty div for SSR environments if it fails (throws in non SSR)
export const SSRSafeWrapper = <ComponentName, Recipe>(props: PropsWithChildren<Props<ComponentName, Recipe>>) => {
    const { getRecipe, getFeatureComponent, componentName } = props;

    let recipeInstance: Recipe;

    try {
        recipeInstance = getRecipe();
    } catch (e) {
        if (typeof window === "undefined") {
            return <></>;
        }

        throw e;
    }

    return getFeatureComponent(componentName, recipeInstance);
};
