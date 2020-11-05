import { CreateRecipeFunction } from "../../types";
import { SessionUserInput } from "./types";
export default class SessionAPIWrapper {
    static init(config: SessionUserInput): CreateRecipeFunction;
    static getRefreshURLDomain(): string;
    static getUserId(): string;
    static getJWTPayloadSecurely(): Promise<any>;
    static attemptRefreshingSession(): Promise<boolean>;
    static doesSessionExist(): boolean;
}
export declare const init: typeof SessionAPIWrapper.init;
export declare const getRefreshURLDomain: typeof SessionAPIWrapper.getRefreshURLDomain;
export declare const getUserId: typeof SessionAPIWrapper.getUserId;
export declare const getJWTPayloadSecurely: typeof SessionAPIWrapper.getJWTPayloadSecurely;
export declare const attemptRefreshingSession: typeof SessionAPIWrapper.attemptRefreshingSession;
export declare const doesSessionExist: typeof SessionAPIWrapper.doesSessionExist;
