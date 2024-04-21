import * as React from "react";
import type { Navigate, UserContext, PartialAuthComponentProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { SignUpThemeProps } from "../../../types";
import type { ComponentOverrideMap } from "../../../types";
export declare function useChildProps(
    recipe: Recipe,
    error: string | undefined,
    onError: (err: string) => void,
    clearError: () => void,
    userContext: UserContext,
    navigate?: Navigate
): SignUpThemeProps;
export declare const SignUpFeature: React.FC<
    PartialAuthComponentProps & {
        recipe: Recipe;
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }
>;
export default SignUpFeature;
