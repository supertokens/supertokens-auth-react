import React, { PropsWithChildren } from "react";
import AuthRecipe from ".";
import { NormalisedConfig, GetRedirectionURLContext, OnHandleEventContext } from "./types";
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
