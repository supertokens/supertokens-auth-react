/// <reference types="react" />
import { RecipeInterface } from "supertokens-web-js/recipe/session";
import { InputType, SessionContextType } from "./types";
import SessionContext from "./sessionContext";
import { SuperTokensWrapper } from "./supertokensWrapper";
export default class SessionAPIWrapper {
    static useSessionContext: () => SessionContextType;
    static SessionAuth: import("react").FC<
        import("react").PropsWithChildren<
            import("./sessionAuth").SessionAuthProps & {
                userContext?: any;
            }
        >
    >;
    static SuperTokensWrapper: import("react").FC<
        import("react").PropsWithChildren<
            import("./sessionAuth").SessionAuthProps & {
                userContext?: any;
            }
        >
    >;
    static init(config?: InputType): import("../../types").CreateRecipeFunction<unknown, unknown, unknown, any>;
    static getUserId(input?: { userContext?: any }): Promise<string>;
    static getAccessTokenPayloadSecurely(input?: { userContext?: any }): Promise<any>;
    static attemptRefreshingSession(): Promise<boolean>;
    static doesSessionExist(input?: { userContext?: any }): Promise<boolean>;
    static addAxiosInterceptors(axiosInstance: any, userContext?: any): void;
    static signOut(input?: { userContext?: any }): Promise<void>;
}
declare const useSessionContext: () => SessionContextType;
declare const SessionAuth: import("react").FC<
    import("react").PropsWithChildren<
        import("./sessionAuth").SessionAuthProps & {
            userContext?: any;
        }
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
    SuperTokensWrapper,
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
