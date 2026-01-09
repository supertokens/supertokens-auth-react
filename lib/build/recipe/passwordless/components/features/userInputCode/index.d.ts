import * as React from "react";
import type { Navigate, UserContext, AuthComponentProps } from "../../../../../types";
import type { AuthSuccessContext } from "../../../../authRecipe/types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap, LoginAttemptInfo, SignInUpUserInputCodeFormProps } from "../../../types";
export declare function useChildProps(
    recipe: Recipe,
    loginAttemptInfo: LoginAttemptInfo,
    onAuthSuccess: (successContext: AuthSuccessContext) => Promise<void>,
    error: string | undefined,
    onError: (err: string) => void,
    clearError: () => void,
    rebuildAuthPage: () => void,
    userContext: UserContext,
    navigate?: Navigate
): SignInUpUserInputCodeFormProps;
export declare const UserInputCodeFeature: React.FC<
    AuthComponentProps & {
        recipe: Recipe;
        loginAttemptInfo: LoginAttemptInfo;
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }
>;
export default UserInputCodeFeature;
