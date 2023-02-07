/// <reference types="react" />
import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
declare const SignInAndUpCallback: React.FC<PropType>;
export default SignInAndUpCallback;
