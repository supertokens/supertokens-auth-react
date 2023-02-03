import * as React from "react";
import { FeatureBaseProps } from "../../../../../types";
import {
    ComponentOverrideMap,
    ThirdPartySignInAndUpState,
    ThirdPartySignInUpActions,
    ThirdPartySignInUpChildProps,
} from "../../../types";
import Recipe from "../../../recipe";
export declare const useFeatureReducer: () => [ThirdPartySignInAndUpState, React.Dispatch<ThirdPartySignInUpActions>];
export declare function useChildProps(recipe: Recipe): ThirdPartySignInUpChildProps;
export declare function useChildProps(recipe: Recipe | undefined): ThirdPartySignInUpChildProps | undefined;
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
    useComponentOverrides: () => ComponentOverrideMap;
};
export declare const SignInAndUpFeature: React.FC<PropType>;
export default SignInAndUpFeature;
