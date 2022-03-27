import * as React from "react";
import Recipe from "../../../recipe";
import { RecipeInterface, PasswordlessSignInUpAction, SignInUpState, SignInUpChildProps } from "../../../types";
import { FeatureBaseProps } from "../../../../../types";
export declare const useSuccessInAnotherTabChecker: (
    state: SignInUpState,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>
) => React.MutableRefObject<boolean>;
export declare const useFeatureReducer: (
    recipeImpl: RecipeInterface | undefined
) => [SignInUpState, React.Dispatch<PasswordlessSignInUpAction>];
export declare function useChildProps(
    recipe: Recipe,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    state: SignInUpState,
    callingConsumeCodeRef: React.MutableRefObject<boolean>,
    history: any
): SignInUpChildProps;
export declare function useChildProps(
    recipe: Recipe | undefined,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    state: SignInUpState,
    callingConsumeCodeRef: React.MutableRefObject<boolean>,
    history: any
): SignInUpChildProps | undefined;
export declare const SignInUpFeature: React.FC<
    FeatureBaseProps & {
        recipe: Recipe;
    }
>;
export default SignInUpFeature;
