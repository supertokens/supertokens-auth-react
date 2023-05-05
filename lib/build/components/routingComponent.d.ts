/// <reference types="react" />
import { RecipeRouter } from "../recipe/recipeRouter";
import type { ReactRouterDomWithCustomHistory } from "../prebuiltui/types";
export declare function RoutingComponent(props: {
    getReactRouterDomWithCustomHistory: () => ReactRouterDomWithCustomHistory | undefined;
    preBuiltUIList: RecipeRouter[];
    path: string;
}): JSX.Element | null;
