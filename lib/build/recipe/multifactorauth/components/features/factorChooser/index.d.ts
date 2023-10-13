import * as React from "react";
import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
declare type Prop = FeatureBaseProps & {
    recipe: Recipe;
    userContext?: any;
    useComponentOverrides: () => ComponentOverrideMap;
};
export declare const EmailVerification: React.FC<Prop>;
export default EmailVerification;
