import * as React from "react";
import type { FeatureBaseProps, UserContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
declare type PropType = FeatureBaseProps<{
    recipe: Recipe;
    userContext?: UserContext;
    useComponentOverrides: () => ComponentOverrideMap;
}>;
declare const SignInAndUpFeatureWrapper: React.FC<PropType>;
export default SignInAndUpFeatureWrapper;
