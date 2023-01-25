import * as React from "react";
import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type {
    ThirdPartySignInAndUpState,
    ThirdPartySignInUpActions,
    ThirdPartySignInUpChildProps,
} from "../../../types";
export declare const useFeatureReducer: () => [ThirdPartySignInAndUpState, React.Dispatch<ThirdPartySignInUpActions>];
export declare function useChildProps(recipe: Recipe): ThirdPartySignInUpChildProps;
export declare function useChildProps(recipe: Recipe | undefined): ThirdPartySignInUpChildProps | undefined;
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
export declare const SignInAndUpFeature: React.FC<PropType>;
export default SignInAndUpFeature;
