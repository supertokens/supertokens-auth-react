import React from "react";
import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
declare const LinkClickedScreen: React.FC<PropType>;
export default LinkClickedScreen;
