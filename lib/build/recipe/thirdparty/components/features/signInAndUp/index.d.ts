import * as React from "react";
import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type {
    ComponentOverrideMap,
    ThirdPartySignInAndUpState,
    ThirdPartySignInUpActions,
    ThirdPartySignInUpChildProps,
} from "../../../types";
export declare const useFeatureReducer: () => [ThirdPartySignInAndUpState, React.Dispatch<ThirdPartySignInUpActions>];
export declare function useChildProps(recipe: Recipe): ThirdPartySignInUpChildProps;
export declare function useChildProps(recipe: Recipe | undefined): ThirdPartySignInUpChildProps | undefined;
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
    useComponentOverrides: () => ComponentOverrideMap;
};
export declare const SignInAndUpFeature: React.FC<PropType>;
declare const SignInAndUpFeatureWrapper: React.FC<PropType>;
export default SignInAndUpFeatureWrapper;
