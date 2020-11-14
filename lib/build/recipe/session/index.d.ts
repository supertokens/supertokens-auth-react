import { CreateRecipeFunction } from "../../types";
import { SessionUserInput } from "./types";
export default class SessionAPIWrapper {
    static init(config: SessionUserInput): CreateRecipeFunction;
    static getRefreshURLDomain(): string | undefined;
    static getUserId(): string;
    static getJWTPayloadSecurely(): Promise<any>;
    static attemptRefreshingSession(): Promise<boolean>;
    static doesSessionExist(): boolean;
    static addAxiosInterceptors: (axiosInstance: any) => void;
    static setAuth0API: (apiPath: string) => void;
    static getAuth0API: () => {
        apiPath: string | undefined;
    };
}
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
