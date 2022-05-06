/// <reference types="react" />
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
declare const SignInAndUpCallback: React.FC<PropType>;
export default SignInAndUpCallback;
