import * as React from "react";
import type { Navigate, UserContext, AuthComponentProps, SuccessRedirectContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap, LoginAttemptInfo, SignInUpUserInputCodeFormProps } from "../../../types";
export declare function useChildProps(
    recipe: Recipe,
    loginAttemptInfo: LoginAttemptInfo,
    onAuthSuccess: (
        successContext: Omit<SuccessRedirectContext, "redirectToPath" | "action" | "loginChallenge">
    ) => Promise<void>,
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
