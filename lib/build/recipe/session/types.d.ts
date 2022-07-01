import { UserInput as WebJSInputType, RecipeEvent } from "supertokens-web-js/recipe/session/types";
export declare type RecipeEventWithSessionContext = RecipeEvent & {
    sessionContext: SessionContextTypeWithoutInvalidClaim;
};
export declare type InputType = WebJSInputType & {
    onHandleEvent?: (event: RecipeEventWithSessionContext) => void;
};
export declare type SessionContextTypeWithoutInvalidClaim = Omit<LoadedSessionContext, "invalidClaim" | "loading">;
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
    abstract refresh(userContext: any): Promise<T | undefined> | T | undefined;
    /**
     * Decides if we need to refresh the claim value before checking the payload with `isClaimValid`.
     * E.g.: if the information in the payload is expired, or is not sufficient for this check.
     */
    abstract shouldRefresh(accessTokenPayload: any, userContext: any): Promise<boolean> | boolean;
    /**
     * Decides if the claim is valid based on the accessTokenPayload object (and not checking DB or anything else)
     */
    abstract validate(
        accessTokenPayload: any,
        userContext: any
    ): Promise<ClaimValidationResult> | ClaimValidationResult;
}
declare type LoadedSessionContext = {
    loading: false;
    doesSessionExist: boolean;
    userId: string;
    accessTokenPayload: any;
    invalidClaim: ClaimValidationError | undefined;
};
export declare type SessionContextType =
    | LoadedSessionContext
    | {
          loading: true;
      };
export {};
