import { UserInput, RecipeInterface } from "./types";
import SessionAuthComponent from "./sessionAuth";
import RecipeImplementation from "./recipeImplementation";
export default class SessionAPIWrapper {
    static useSessionContext: () => import("./types").SessionContextType;
    static SessionAuth: typeof SessionAuthComponent;
    static init(config?: UserInput): import("../../types").CreateRecipeFunction<unknown, unknown, unknown, any>;
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
    UserInput,
    getJWTPayloadSecurely,
    attemptRefreshingSession,
    doesSessionExist,
    addAxiosInterceptors,
    signOut,
    RecipeInterface,
    RecipeImplementation,
};
