import * as React from "react";
import type { Navigate, UserContext, AuthComponentProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap, LinkSentChildProps, LoginAttemptInfo } from "../../../types";
export declare function useChildProps(
    recipe: Recipe,
    loginAttemptInfo: LoginAttemptInfo,
    error: string | undefined,
    onError: (err: string) => void,
    clearError: () => void,
    rebuildAuthPage: () => void,
    userContext: UserContext,
    navigate?: Navigate
): LinkSentChildProps | undefined;
export declare const LinkSentFeature: React.FC<
    AuthComponentProps & {
        recipe: Recipe;
        loginAttemptInfo: LoginAttemptInfo;
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }
>;
export default LinkSentFeature;
