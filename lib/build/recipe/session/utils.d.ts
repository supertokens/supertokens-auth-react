import type { InputType, NormalisedSessionConfig } from "./types";
import type { UserContext } from "../../types";
import type { SessionClaimValidator } from "../../types";
import type { ClaimValidationError } from "supertokens-web-js/recipe/session";
export declare function normaliseSessionConfig(config?: InputType): NormalisedSessionConfig;
export declare const getFailureRedirectionInfo: ({
    invalidClaims,
    overrideGlobalClaimValidators,
    userContext,
}: {
    invalidClaims: ClaimValidationError[];
    overrideGlobalClaimValidators?:
        | ((globalClaimValidators: SessionClaimValidator[], userContext: UserContext) => SessionClaimValidator[])
        | undefined;
    userContext: UserContext;
}) => Promise<{
    redirectPath?: string | undefined;
    failedClaim?: ClaimValidationError | undefined;
}>;
export declare function validateAndCompareOnFailureRedirectionURLToCurrent(redirectURL: string): boolean;
