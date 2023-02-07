import * as React from "react";
import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
declare type Prop = FeatureBaseProps & {
    recipe: Recipe;
    userContext?: any;
};
export declare const EmailVerification: React.FC<Prop>;
export default EmailVerification;
