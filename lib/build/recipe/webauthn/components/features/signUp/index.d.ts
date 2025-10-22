import * as React from "react";
import type { UserContext, PartialAuthComponentProps, Navigate } from "../../../../../types";
import type { AuthSuccessContext } from "../../../../authRecipe/types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
import type { SignUpThemeProps } from "../../../types";
export declare function useChildProps(
    recipe: Recipe,
    factorIds: string[],
    onAuthSuccess: (successContext: AuthSuccessContext) => Promise<void>,
    error: string | undefined,
    onError: (err: string) => void,
    userContext: UserContext,
    clearError: () => void,
    resetFactorList: () => void,
    onSignInUpSwitcherClick: () => void,
    showBackButton: boolean,
    navigate?: Navigate
): SignUpThemeProps;
export declare const SignInUpFeatureFullPage: React.FC<
    PartialAuthComponentProps & {
        recipe: Recipe;
        factorIds: string[];
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }
>;
export declare const SignUpWithPasskeyFeature: React.FC<
    PartialAuthComponentProps & {
        recipe: Recipe;
        factorIds: string[];
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }
>;
export default SignInUpFeatureFullPage;
