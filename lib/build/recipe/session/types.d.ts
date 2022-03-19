import { RecipeInterface } from "supertokens-website";
import OverrideableBuilder from "supertokens-js-override";
import { Awaitable } from "../../types";
export declare type RecipeEvent =
    | {
          action: "SIGN_OUT" | "REFRESH_SESSION" | "SESSION_CREATED";
      }
    | {
          action: "UNAUTHORISED";
          sessionExpiredOrRevoked: boolean;
      }
    | {
          action: "CLAIM_MISSING";
          claimId: string;
      };
export declare type RecipeEventWithSessionContext = RecipeEvent & {
    sessionContext: SessionContextType;
};
export declare type InputType = {
    apiDomain?: string;
    apiBasePath?: string;
    sessionScope?: string;
    sessionExpiredStatusCode?: number;
    autoAddCredentials?: boolean;
    isInIframe?: boolean;
    cookieDomain?: string;
    preAPIHook?: (context: {
        action: "SIGN_OUT" | "REFRESH_SESSION";
        requestInit: RequestInit;
        url: string;
    }) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    onHandleEvent?: (event: RecipeEvent) => void;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type SessionContextType = {
    doesSessionExist: boolean;
    userId: string;
    accessTokenPayload: any;
};
export declare abstract class SessionClaim<T> {
    readonly key: string;
    constructor(key: string);
    /**
     * Makes an API call that will refresh the claim in the token.
     */
    abstract refreshClaim(userId: string, userContext: any): Awaitable<T | undefined>;
    /**
     * Decides if we need to refresh the claim value before checking the payload with `isClaimValid`.
     * E.g.: if the information in the payload is expired, or is not sufficient for this check.
     */
    abstract shouldRefreshClaim(sessionClaims: any, userContext: any): Awaitable<boolean>;
    /**
     * Decides if the claim is valid based on the sessionClaims object (and not checking DB or anything else)
     */
    abstract isClaimValid(sessionClaims: any, userContext: any): Awaitable<boolean>;
}
