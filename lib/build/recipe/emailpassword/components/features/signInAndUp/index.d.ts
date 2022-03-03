import * as React from "react";
import { EmailPasswordSignInAndUpAction, EmailPasswordSignInAndUpChildProps } from "../../../types";
import { FeatureBaseProps } from "../../../../../types";
import { SignInAndUpState } from "../../../types";
import Recipe from "../../../recipe";
import { Dispatch } from "react";
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
    }
>;
export default SignInAndUpFeature;
