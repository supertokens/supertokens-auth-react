import { CreateRecipeFunction } from "../../types";
import { SessionUserInput } from "./types";
import SessionAuthComponent from "./sessionAuth";
export default class SessionAPIWrapper {
    static useSessionContext: () => import("./types").SessionContextType;
    static SessionAuth: typeof SessionAuthComponent;
    static init(config?: SessionUserInput): CreateRecipeFunction<unknown, unknown, unknown>;
    static getRefreshURLDomain(): string | undefined;
    static getUserId(): Promise<string>;
    static getJWTPayloadSecurely(): Promise<any>;
    static attemptRefreshingSession(): Promise<boolean>;
    static doesSessionExist(): Promise<boolean>;
    static addAxiosInterceptors: (axiosInstance: any) => void;
    static setAuth0API: (apiPath: string) => void;
    static getAuth0API: () => {
        apiPath: string | undefined;
    };
    static signOut: () => Promise<void>;
}
export declare const useSessionContext: () => import("./types").SessionContextType;
export declare const SessionAuth: typeof SessionAuthComponent;
export declare const init: typeof SessionAPIWrapper.init;
export declare const getRefreshURLDomain: typeof SessionAPIWrapper.getRefreshURLDomain;
export declare const getUserId: typeof SessionAPIWrapper.getUserId;
export declare const getJWTPayloadSecurely: typeof SessionAPIWrapper.getJWTPayloadSecurely;
export declare const attemptRefreshingSession: typeof SessionAPIWrapper.attemptRefreshingSession;
export declare const doesSessionExist: typeof SessionAPIWrapper.doesSessionExist;
export declare const addAxiosInterceptors: (axiosInstance: any) => void;
export declare const setAuth0API: (apiPath: string) => void;
export declare const getAuth0API: () => {
    apiPath: string | undefined;
};
export declare const signOut: () => Promise<void>;
