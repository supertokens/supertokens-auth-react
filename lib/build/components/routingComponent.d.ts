/// <reference types="react" />
import { RecipeRouter } from "../recipe/recipeRouter";
import type { ReactRouterDom } from "../ui/types";
export declare function RoutingComponent(props: {
    getReactRouterDomWithCustomHistory: () => ReactRouterDom | undefined;
    preBuiltUIList: RecipeRouter[];
    path: string;
}): JSX.Element | null;
