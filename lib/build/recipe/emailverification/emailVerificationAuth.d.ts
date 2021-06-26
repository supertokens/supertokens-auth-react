import React from "react";
import { FeatureBaseProps } from "../../types";
import Recipe from "./recipe";
declare type Props = FeatureBaseProps & {
    recipe: Recipe;
};
declare const EmailVerificationAuth: React.FC<Props>;
export default EmailVerificationAuth;
