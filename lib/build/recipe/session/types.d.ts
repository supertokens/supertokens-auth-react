import { RecipeInterface } from "supertokens-website";
import OverrideableBuilder from "supertokens-js-override";
import { Awaitable } from "../../types";
export declare type RecipeEvent =
    | {
          action: "SIGN_OUT" | "REFRESH_SESSION" | "SESSION_CREATED" | "ACCESS_TOKEN_PAYLOAD_UPDATED";
      }
    | {
          action: "UNAUTHORISED";
          sessionExpiredOrRevoked: boolean;
      }
    | {
          action: "API_INVALID_CLAIM";
          claimId: string;
      };
export declare type RecipeEventWithSessionContext = RecipeEvent & {
    sessionContext: SessionContextTypeWithoutInvalidClaim;
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
    invalidClaim: ClaimValidationError | undefined;
};
export declare type SessionContextTypeWithoutInvalidClaim = Omit<SessionContextType, "invalidClaim">;
export declare type ClaimValidationResult =
    | {
          isValid: true;
      }
    | {
          isValid: false;
          reason?: any;
      };
export declare type ClaimValidationError = {
    validatorId: string;
    reason?: any;
};
export declare abstract class SessionClaimValidator<T> {
    readonly id: string;
    constructor(id: string);
    /**
     * Makes an API call that will refresh the claim in the token.
     */
    abstract refresh(userContext: any): Awaitable<T | undefined>;
    /**
     * Decides if we need to refresh the claim value before checking the payload with `isClaimValid`.
     * E.g.: if the information in the payload is expired, or is not sufficient for this check.
     */
    abstract shouldRefresh(accessTokenPayload: any, userContext: any): Awaitable<boolean>;
    /**
     * Decides if the claim is valid based on the accessTokenPayload object (and not checking DB or anything else)
     */
    abstract validate(accessTokenPayload: any, userContext: any): Awaitable<ClaimValidationResult>;
}
