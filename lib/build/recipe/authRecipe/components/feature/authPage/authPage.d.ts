import React from "react";
import { FactorIds } from "../../../../multifactorauth/types";
import type { Navigate, UserContext } from "../../../../../types";
import type { RecipeRouter } from "../../../../recipeRouter";
import type { PropsWithChildren } from "react";
export declare type AuthPageProps = PropsWithChildren<{
    redirectOnSessionExists?: boolean;
    onSessionAlreadyExists?: () => void;
    preBuiltUIList: RecipeRouter[];
    factors?: (typeof FactorIds)[keyof Omit<typeof FactorIds, "TOTP">][];
    useSignUpStateFromQueryString?: boolean;
    isSignUp?: boolean;
    navigate?: Navigate;
    userContext?: UserContext;
}>;
declare const AuthPageWrapper: React.FC<AuthPageProps>;
export default AuthPageWrapper;
