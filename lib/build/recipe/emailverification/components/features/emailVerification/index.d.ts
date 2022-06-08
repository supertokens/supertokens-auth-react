import * as React from "react";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
declare type Prop = FeatureBaseProps & {
    recipe: Recipe;
    userContext?: any;
};
export declare const EmailVerification: React.FC<Prop>;
export default EmailVerification;
