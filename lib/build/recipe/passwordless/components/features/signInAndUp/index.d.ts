import * as React from "react";
import type { Navigate, UserContext, PartialAuthComponentProps } from "../../../../../types";
import type { AuthSuccessContext } from "../../../../authRecipe/types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
import type { SignInUpChildProps } from "../../../types";
export declare function useChildProps(
    recipe: Recipe,
    factorIds: string[],
    onAuthSuccess: (successContext: AuthSuccessContext) => Promise<void>,
    error: string | undefined,
    onError: (err: string) => void,
    clearError: () => void,
    rebuildAuthPage: () => void,
    userContext: UserContext,
    navigate?: Navigate
): SignInUpChildProps;
export declare const SignInUpFeature: React.FC<
    PartialAuthComponentProps & {
        recipe: Recipe;
        factorIds: string[];
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }
>;
export default SignInUpFeature;
