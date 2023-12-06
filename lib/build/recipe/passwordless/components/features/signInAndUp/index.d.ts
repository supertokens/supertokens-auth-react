import * as React from "react";
import type { Navigate, FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
import type { PasswordlessSignInUpAction, SignInUpState, SignInUpChildProps } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
export declare const useFeatureReducer: (
    recipeImpl: RecipeInterface | undefined,
    userContext: any
) => [SignInUpState, React.Dispatch<PasswordlessSignInUpAction>];
export declare function useChildProps(
    recipe: Recipe,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    state: SignInUpState,
    userContext: any,
    navigate?: Navigate
): SignInUpChildProps;
export declare function useChildProps(
    recipe: Recipe | undefined,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    state: SignInUpState,
    userContext: any,
    navigate?: Navigate
): SignInUpChildProps | undefined;
export declare const SignInUpFeature: React.FC<
    FeatureBaseProps<{
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }>
>;
export default SignInUpFeature;
