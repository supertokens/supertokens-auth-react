import * as React from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
import { ComponentOverrideMap } from "../../../types";
declare type Prop = FeatureBaseProps & {
    recipe: Recipe;
    userContext?: any;
    useComponentOverrides: () => ComponentOverrideMap;
};
export declare const EmailVerification: React.FC<Prop>;
export default EmailVerification;
