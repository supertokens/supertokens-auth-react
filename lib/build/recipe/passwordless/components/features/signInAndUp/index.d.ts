import * as React from "react";
import Recipe from "../../../recipe";
import { PasswordlessSignInUpAction, SignInUpState, SignInUpChildProps } from "../../../types";
import { FeatureBaseProps } from "../../../../../types";
import { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
export declare const useSuccessInAnotherTabChecker: (
    state: SignInUpState,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    userContext: any
) => React.MutableRefObject<boolean>;
export declare const useFeatureReducer: (
    recipeImpl: RecipeInterface | undefined,
    userContext: any
) => [SignInUpState, React.Dispatch<PasswordlessSignInUpAction>];
export declare function useChildProps(
    recipe: Recipe,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    state: SignInUpState,
    callingConsumeCodeRef: React.MutableRefObject<boolean>,
    userContext: any,
    history: any
): SignInUpChildProps;
export declare function useChildProps(
    recipe: Recipe | undefined,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    state: SignInUpState,
    callingConsumeCodeRef: React.MutableRefObject<boolean>,
    userContext: any,
    history: any
): SignInUpChildProps | undefined;
export declare const SignInUpFeature: React.FC<
    FeatureBaseProps & {
        recipe: Recipe;
    }
>;
export default SignInUpFeature;
