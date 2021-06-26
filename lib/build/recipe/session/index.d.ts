/// <reference types="react" />
/// <reference types="@emotion/react/types/css-prop" />
import { RecipeInterface } from "supertokens-website";
import { InputType } from "./types";
import SessionContext from "./sessionContext";
export default class SessionAPIWrapper {
    static useSessionContext: () => import("./types").SessionContextType;
    static SessionAuth: import("react").FunctionComponent<{
        requireAuth?: boolean | undefined;
        redirectToLogin: () => void;
    }>;
    static init(config?: InputType): import("../../types").CreateRecipeFunction<unknown, unknown, unknown, any>;
    static getUserId(): Promise<string>;
    static getJWTPayloadSecurely(): Promise<any>;
    static attemptRefreshingSession(): Promise<boolean>;
    static doesSessionExist(): Promise<boolean>;
    static addAxiosInterceptors(axiosInstance: any): void;
    static signOut(): Promise<void>;
}
declare const useSessionContext: () => import("./types").SessionContextType;
declare const SessionAuth: import("react").FunctionComponent<{
    requireAuth?: boolean | undefined;
    redirectToLogin: () => void;
}>;
declare const init: typeof SessionAPIWrapper.init;
declare const getUserId: typeof SessionAPIWrapper.getUserId;
declare const getJWTPayloadSecurely: typeof SessionAPIWrapper.getJWTPayloadSecurely;
declare const attemptRefreshingSession: typeof SessionAPIWrapper.attemptRefreshingSession;
declare const doesSessionExist: typeof SessionAPIWrapper.doesSessionExist;
declare const addAxiosInterceptors: typeof SessionAPIWrapper.addAxiosInterceptors;
declare const signOut: typeof SessionAPIWrapper.signOut;
export {
    useSessionContext,
    SessionAuth,
    init,
    getUserId,
    getJWTPayloadSecurely,
    attemptRefreshingSession,
    doesSessionExist,
    addAxiosInterceptors,
    signOut,
    RecipeInterface,
    InputType,
    SessionContext,
};
