import React from "react";
import type AuthRecipe from ".";
import type { NormalisedConfig, OnHandleEventContext } from "./types";
import type { Navigate } from "../../types";
import type { PropsWithChildren } from "react";
declare type Props<T, S, R, N extends NormalisedConfig<T, S, R | OnHandleEventContext>> = {
    onSessionAlreadyExists?: () => void;
    authRecipe: AuthRecipe<T, S, R, N>;
    navigate?: Navigate;
};
/**
 * AuthWidgetWrapper shows the children component only if no session exists,
 * else it calls onSessionAlreadyExists
 */
declare const AuthWidgetWrapper: <T, Action, R, N extends NormalisedConfig<T, Action, OnHandleEventContext | R>>(
    props: React.PropsWithChildren<Props<T, Action, R, N>>
) => React.ReactElement | null;
export default AuthWidgetWrapper;
