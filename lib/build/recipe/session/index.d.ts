/// <reference types="react" />
import { RecipeInterface } from "supertokens-web-js/recipe/session";
import { InputType, SessionContextType } from "./types";
import SessionContext from "./sessionContext";
import { ClaimValidationError, SessionClaimValidator } from "supertokens-website";
export default class SessionAPIWrapper {
    static useSessionContext: () => SessionContextType;
    static SessionAuth: import("react").FC<
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
    static validateClaims(input: {
        overrideGlobalClaimValidators?: (
            globalClaimValidators: SessionClaimValidator[],
            userContext: any
        ) => SessionClaimValidator[];
        userContext: any;
    }): Promise<ClaimValidationError[]> | ClaimValidationError[];
    static getInvalidClaimsFromResponse(input: {
        response:
            | {
                  data: any;
              }
            | Response;
        userContext: any;
    }): Promise<ClaimValidationError[]>;
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
declare const validateClaims: typeof SessionAPIWrapper.validateClaims;
declare const getInvalidClaimsFromResponse: typeof SessionAPIWrapper.getInvalidClaimsFromResponse;
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
    validateClaims,
    getInvalidClaimsFromResponse,
    RecipeInterface,
    InputType,
    SessionContext,
    SessionContextType,
};
