import * as React from "react";
import type { FeatureBaseProps, Navigate, UserContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap, TOTPMFAAction, TOTPMFAChildProps, TOTPMFAState } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/totp";
export declare const useFeatureReducer: () => [TOTPMFAState, React.Dispatch<TOTPMFAAction>];
export declare function useChildProps(
    recipe: Recipe,
    recipeImplementation: RecipeInterface,
    state: TOTPMFAState,
    dispatch: React.Dispatch<TOTPMFAAction>,
    userContext: UserContext,
    navigate?: Navigate
): TOTPMFAChildProps | undefined;
export declare const SignInUpFeature: React.FC<
    FeatureBaseProps<{
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }>
>;
export default SignInUpFeature;
