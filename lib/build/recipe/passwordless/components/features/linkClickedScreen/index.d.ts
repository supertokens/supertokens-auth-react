import React from "react";
import type { UserContext } from "../../../../../types";
import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
declare type PropType = FeatureBaseProps<{
    recipe: Recipe;
    userContext?: UserContext;
    useComponentOverrides: () => ComponentOverrideMap;
}>;
declare const LinkClickedScreen: React.FC<PropType>;
export default LinkClickedScreen;
