import * as React from "react";
import type { UserContext, PartialAuthComponentProps } from "../../../../../types";
import type { AuthSuccessContext } from "../../../../authRecipe/types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap, SignInThemeProps } from "../../../types";
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
    isPasskeySupported: boolean
): SignInThemeProps;
export declare const SignInWithPasskeyFeature: React.FC<
    PartialAuthComponentProps & {
        recipe: Recipe;
        factorIds: string[];
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }
>;
export default SignInWithPasskeyFeature;
