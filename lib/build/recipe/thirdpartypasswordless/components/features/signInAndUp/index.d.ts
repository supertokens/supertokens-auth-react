import * as React from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
import { ComponentOverrideMap } from "../../../types";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
    useComponentOverrides: () => ComponentOverrideMap;
};
declare const SignInAndUp: React.FC<PropType>;
export default SignInAndUp;
