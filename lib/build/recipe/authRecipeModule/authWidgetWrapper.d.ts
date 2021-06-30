import React from "react";
import AuthRecipeModule from ".";
import { NormalisedConfig, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
declare type Props<
    T,
    S,
    R,
    N extends NormalisedConfig<T | GetRedirectionURLContext, S | PreAPIHookContext, R | OnHandleEventContext>
> = {
    onSessionAlreadyExists?: () => void;
    authRecipe: AuthRecipeModule<T, S, R, N>;
    history: any;
};
/**
 * AuthWidgetWrapper shows the children component only if no session exists,
 * else it calls onSessionAlreadyExists
 */
declare const AuthWidgetWrapper: <
    T,
    S,
    R,
    N extends NormalisedConfig<
        | {
              action: "SUCCESS";
              isNewUser: boolean;
              redirectToPath?: string | undefined;
          }
        | {
              action: "SIGN_IN_AND_UP";
          }
        | import("../emailverification").GetRedirectionURLContext
        | T,
        import("../emailverification").PreAPIHookContext | S,
        | {
              action: "SESSION_ALREADY_EXISTS";
          }
        | {
              action: "SUCCESS";
              isNewUser: boolean;
              user: {
                  id: string;
                  email: string;
              };
          }
        | import("../emailverification").OnHandleEventContext
        | R
    >
>(
    props: Props<T, S, R, N> & {
        children?: React.ReactNode;
    }
) => React.ReactElement<
    any,
    | string
    | ((props: any) => React.ReactElement<any, any> | null)
    | (new (props: any) => React.Component<any, any, any>)
> | null;
export default AuthWidgetWrapper;
