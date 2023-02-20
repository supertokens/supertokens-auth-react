import * as React from "react";
import type { FeatureBaseProps } from "../../../../../types";
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
    history: any
): EmailPasswordSignInAndUpChildProps;
export declare function useChildProps(
    recipe: Recipe | undefined,
    state: SignInAndUpState,
    dispatch: Dispatch<EmailPasswordSignInAndUpAction>,
    history: any
): EmailPasswordSignInAndUpChildProps | undefined;
export declare const SignInAndUpFeature: React.FC<
    FeatureBaseProps & {
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }
>;
export default SignInAndUpFeature;
