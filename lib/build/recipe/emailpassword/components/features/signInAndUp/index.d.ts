import * as React from "react";
import type { Navigate, FeatureBaseProps, UserContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { SignInAndUpState } from "../../../types";
import type {
    ComponentOverrideMap,
    EmailPasswordSignInAndUpAction,
    EmailPasswordSignInAndUpChildProps,
} from "../../../types";
import type { Dispatch } from "react";
export declare const useFeatureReducer: (
    recipe: Recipe | undefined
) => [SignInAndUpState, React.Dispatch<EmailPasswordSignInAndUpAction>];
export declare function useChildProps(
    recipe: Recipe,
    state: SignInAndUpState,
    dispatch: Dispatch<EmailPasswordSignInAndUpAction>,
    userContext: UserContext,
    navigate?: Navigate
): EmailPasswordSignInAndUpChildProps;
export declare function useChildProps(
    recipe: Recipe | undefined,
    state: SignInAndUpState,
    dispatch: Dispatch<EmailPasswordSignInAndUpAction>,
    userContext: UserContext,
    navigate?: Navigate
): EmailPasswordSignInAndUpChildProps | undefined;
export declare const SignInAndUpFeature: React.FC<
    FeatureBaseProps<{
        recipe: Recipe;
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }>
>;
export default SignInAndUpFeature;
