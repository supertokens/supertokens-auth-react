import React from "react";
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
    N extends import("../recipeModule/types").NormalisedConfig<
        | {
              action: "SUCCESS";
              isNewUser: boolean;
              redirectToPath?: string | undefined;
          }
        | {
              action: "SIGN_IN_AND_UP";
          }
        | T,
        Action,
        OnHandleEventContext | R
    >
>(
    props: React.PropsWithChildren<Props<T, Action, R, N>>
) => React.ReactElement<
    any,
    | string
    | ((props: any) => React.ReactElement<any, any> | null)
    | (new (props: any) => React.Component<any, any, any>)
> | null;
export default AuthWidgetWrapper;
