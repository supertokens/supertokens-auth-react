/// <reference types="react" />
/// <reference types="@emotion/react/types/css-prop" />
import { RecipeInterface } from "supertokens-website";
import { InputType, SessionContextType } from "./types";
import SessionContext from "./sessionContext";
export default class SessionAPIWrapper {
    static useSessionContext: () => SessionContextType;
    static SessionAuth: import("react").FC<
        import("react").PropsWithChildren<
            | ({
                  requireAuth?: false | undefined;
              } & {
                  onSessionExpired?: (() => void) | undefined;
              })
            | ({
                  requireAuth: true;
                  redirectToLogin: () => void;
              } & {
                  onSessionExpired?: (() => void) | undefined;
              })
        >
    >;
    static init(config?: InputType): import("../../types").CreateRecipeFunction<unknown, unknown, unknown, any>;
    static getUserId(): Promise<string>;
    static getAccessTokenPayloadSecurely(): Promise<any>;
    static attemptRefreshingSession(): Promise<boolean>;
    static doesSessionExist(): Promise<boolean>;
    static addAxiosInterceptors(axiosInstance: any): void;
    static signOut(): Promise<void>;
}
declare const useSessionContext: () => SessionContextType;
declare const SessionAuth: import("react").FC<
    import("react").PropsWithChildren<
        | ({
              requireAuth?: false | undefined;
          } & {
              onSessionExpired?: (() => void) | undefined;
          })
        | ({
              requireAuth: true;
              redirectToLogin: () => void;
          } & {
              onSessionExpired?: (() => void) | undefined;
          })
    >
>;
declare const init: typeof SessionAPIWrapper.init;
declare const getUserId: typeof SessionAPIWrapper.getUserId;
declare const getAccessTokenPayloadSecurely: typeof SessionAPIWrapper.getAccessTokenPayloadSecurely;
declare const attemptRefreshingSession: typeof SessionAPIWrapper.attemptRefreshingSession;
declare const doesSessionExist: typeof SessionAPIWrapper.doesSessionExist;
declare const addAxiosInterceptors: typeof SessionAPIWrapper.addAxiosInterceptors;
declare const signOut: typeof SessionAPIWrapper.signOut;
export {
    useSessionContext,
    SessionAuth,
    init,
    getUserId,
    getAccessTokenPayloadSecurely,
    attemptRefreshingSession,
    doesSessionExist,
    addAxiosInterceptors,
    signOut,
    RecipeInterface,
    InputType,
    SessionContext,
    SessionContextType,
};
