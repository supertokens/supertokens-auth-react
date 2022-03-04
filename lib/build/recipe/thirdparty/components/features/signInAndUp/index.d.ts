import * as React from "react";
import { FeatureBaseProps } from "../../../../../types";
import { ThirdPartySignInAndUpState, ThirdPartySignInUpActions, ThirdPartySignInUpChildProps } from "../../../types";
import Recipe from "../../../recipe";
export declare const useFeatureReducer: () => [ThirdPartySignInAndUpState, React.Dispatch<ThirdPartySignInUpActions>];
export declare function useChildProps(recipe: Recipe): ThirdPartySignInUpChildProps;
export declare function useChildProps(recipe: Recipe | undefined): ThirdPartySignInUpChildProps | undefined;
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
export declare const SignInAndUpFeature: React.FC<PropType>;
export default SignInAndUpFeature;
