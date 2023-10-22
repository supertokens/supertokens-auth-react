import * as React from "react";
import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap, TOTPMFAAction, TOTPMFAChildProps, TOTPMFAState } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/totp";
export declare const useFeatureReducer: (
    recipeImpl: RecipeInterface | undefined,
    userContext: any
) => [TOTPMFAState, React.Dispatch<TOTPMFAAction>];
export declare function useChildProps(
    recipe: Recipe,
    dispatch: React.Dispatch<TOTPMFAAction>,
    state: TOTPMFAState,
    userContext: any,
    history: any
): TOTPMFAChildProps;
export declare function useChildProps(
    recipe: Recipe | undefined,
    dispatch: React.Dispatch<TOTPMFAAction>,
    state: TOTPMFAState,
    userContext: any,
    history: any
): TOTPMFAChildProps | undefined;
export declare const SignInUpFeature: React.FC<
    FeatureBaseProps & {
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }
>;
export default SignInUpFeature;
