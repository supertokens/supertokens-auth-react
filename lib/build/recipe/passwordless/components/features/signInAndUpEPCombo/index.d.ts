import * as React from "react";
import type { Navigate, UserContext, PartialAuthComponentProps, SuccessRedirectContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
import type { SignInUpEPComboChildProps } from "../../../types";
export declare function useChildProps(
    recipe: Recipe,
    factorIds: string[],
    onAuthSuccess: (
        successContext: Omit<SuccessRedirectContext, "redirectToPath" | "action" | "loginChallenge">
    ) => Promise<void>,
    error: string | undefined,
    onError: (err: string) => void,
    clearError: () => void,
    rebuildAuthPage: () => void,
    userContext: UserContext,
    navigate?: Navigate
): SignInUpEPComboChildProps;
export declare const SignInUpEPComboFeature: React.FC<
    PartialAuthComponentProps & {
        recipe: Recipe;
        factorIds: string[];
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }
>;
export default SignInUpEPComboFeature;
