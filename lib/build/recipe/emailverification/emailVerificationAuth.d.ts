import React from "react";
import { FeatureBaseProps } from "../../types";
import Recipe from "./recipe";
declare type Props = FeatureBaseProps & {
    recipe: Recipe;
};
declare const EmailVerificationAuthWrapper: React.FC<
    Props & {
        userContext?: any;
    }
>;
export default EmailVerificationAuthWrapper;
