import { RecipeInterface, RecipeImplementation } from "supertokens-website";
import SessionAuthComponent from "./sessionAuth";
import { InputType } from "./types";
export default class SessionAPIWrapper {
    static useSessionContext: () => import("./types").SessionContextType;
    static SessionAuth: typeof SessionAuthComponent;
    static init(config?: InputType): import("../../types").CreateRecipeFunction<unknown, unknown, unknown, any>;
    static getUserId(): Promise<string>;
    static getJWTPayloadSecurely(): Promise<any>;
    static attemptRefreshingSession(): Promise<boolean>;
    static doesSessionExist(): Promise<boolean>;
    static addAxiosInterceptors(axiosInstance: any): void;
    static signOut(): Promise<void>;
}
declare const useSessionContext: () => import("./types").SessionContextType;
declare const SessionAuth: typeof SessionAuthComponent;
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
    RecipeImplementation,
    InputType,
};
