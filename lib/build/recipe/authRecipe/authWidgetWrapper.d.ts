import React from "react";
import type AuthRecipe from ".";
import type { NormalisedConfig, GetRedirectionURLContext, OnHandleEventContext } from "./types";
import type { PropsWithChildren } from "react";
declare type Props<T, S, R, N extends NormalisedConfig<T | GetRedirectionURLContext, S, R | OnHandleEventContext>> = {
    onSessionAlreadyExists?: () => void;
    authRecipe: AuthRecipe<T, S, R, N>;
    history: any;
};
/**
 * AuthWidgetWrapper shows the children component only if no session exists,
 * else it calls onSessionAlreadyExists
 */
declare const AuthWidgetWrapper: <
    T,
    Action,
    R,
    N extends NormalisedConfig<GetRedirectionURLContext | T, Action, OnHandleEventContext | R>
>(
    props: React.PropsWithChildren<Props<T, Action, R, N>>
) => React.ReactElement | null;
export default AuthWidgetWrapper;
