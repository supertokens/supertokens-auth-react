import * as React from "react";
import type { Navigate, UserContext, PartialAuthComponentProps } from "../../../../../types";
import type { AuthSuccessContext } from "../../../../authRecipe/types";
import type Recipe from "../../../recipe";
import type { SignInThemeProps } from "../../../types";
import type { ComponentOverrideMap } from "../../../types";
export declare function useChildProps(
    recipe: Recipe,
    onAuthSuccess: (successContext: AuthSuccessContext) => Promise<void>,
    error: string | undefined,
    onError: (err: string) => void,
    clearError: () => void,
    userContext: UserContext,
    navigate?: Navigate
): SignInThemeProps;
export declare const SignInFeature: React.FC<
    PartialAuthComponentProps & {
        recipe: Recipe;
        userContext: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }
>;
export default SignInFeature;
