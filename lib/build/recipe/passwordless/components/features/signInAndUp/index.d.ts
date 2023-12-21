import * as React from "react";
import type { Navigate, FeatureBaseProps, UserContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
import type { PasswordlessSignInUpAction, SignInUpState, SignInUpChildProps, NormalisedConfig } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
export declare const useFeatureReducer: (
    recipeImpl: RecipeInterface | undefined,
    contactMethod: NormalisedConfig["contactMethod"],
    userContext: UserContext
) => [SignInUpState, React.Dispatch<PasswordlessSignInUpAction>];
export declare function useChildProps(
    recipe: Recipe,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    state: SignInUpState,
    userContext: UserContext,
    navigate?: Navigate
): SignInUpChildProps;
export declare function useChildProps(
    recipe: Recipe | undefined,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    state: SignInUpState,
    userContext: UserContext,
    navigate?: Navigate
): SignInUpChildProps | undefined;
export declare const SignInUpFeature: React.FC<
    FeatureBaseProps<{
        recipe: Recipe;
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }>
>;
export default SignInUpFeature;
