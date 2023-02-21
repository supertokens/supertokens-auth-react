import * as React from "react";
import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
    useComponentOverrides: () => ComponentOverrideMap;
};
declare const SignInAndUp: React.FC<PropType>;
export default SignInAndUp;
