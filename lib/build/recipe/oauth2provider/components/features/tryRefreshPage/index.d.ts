import * as React from "react";
import type { FeatureBaseProps, UserContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
declare type Prop = FeatureBaseProps<{
    recipe: Recipe;
    userContext?: UserContext;
    useComponentOverrides: () => ComponentOverrideMap;
}>;
export declare const TryRefreshPage: React.FC<Prop>;
export default TryRefreshPage;
