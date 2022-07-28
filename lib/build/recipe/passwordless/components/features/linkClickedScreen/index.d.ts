import React from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
declare const LinkClickedScreen: React.FC<PropType>;
export default LinkClickedScreen;
