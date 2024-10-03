import * as React from "react";
import type { Navigate, PartialAuthComponentProps, UserContext } from "../../../../../types";
import type { AuthSuccessContext } from "../../../../authRecipe/types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap, SignInAndUpThemeProps } from "../../../types";
export declare function useChildProps(
    recipe: Recipe,
    onAuthSuccess: (successContext: AuthSuccessContext) => Promise<void>,
    error: string | undefined,
    onError: (err: string) => void,
    clearError: () => void,
    rebuildAuthPage: () => void,
    setFactorList: (factorIds: string[]) => void,
    navigate: Navigate | undefined,
    userContext: UserContext
): SignInAndUpThemeProps;
declare type PropType = PartialAuthComponentProps & {
    recipe: Recipe;
    userContext?: UserContext;
    useComponentOverrides: () => ComponentOverrideMap;
};
export declare const SignInAndUpFeature: React.FC<PropType>;
declare const SignInAndUpFeatureWrapper: React.FC<PropType>;
export default SignInAndUpFeatureWrapper;
