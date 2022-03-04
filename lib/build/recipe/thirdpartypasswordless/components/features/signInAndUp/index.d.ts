import * as React from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
declare const SignInAndUp: React.FC<PropType>;
export default SignInAndUp;
