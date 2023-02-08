import { ConfigType, NormalisedSessionConfig } from "./types";
import { ClaimValidationError } from "supertokens-web-js/recipe/session";
import { SessionClaimValidator } from "../../types";
export declare function normaliseSessionConfig(config: ConfigType): NormalisedSessionConfig;
export declare const getFailureRedirectionInfo: ({
    invalidClaims,
    overrideGlobalClaimValidators,
    userContext,
}: {
    invalidClaims: ClaimValidationError[];
    overrideGlobalClaimValidators?:
        | ((globalClaimValidators: SessionClaimValidator[], userContext: any) => SessionClaimValidator[])
        | undefined;
    userContext: any;
}) => Promise<{
    accessForbidden: boolean;
    redirectPath?: string;
    failedClaim?: ClaimValidationError;
}>;
export declare const getSuccessRedirectionPath: ({
    invalidClaims,
    overrideGlobalClaimValidators,
    userContext,
}: {
    invalidClaims: ClaimValidationError[];
    overrideGlobalClaimValidators?:
        | ((globalClaimValidators: SessionClaimValidator[], userContext: any) => SessionClaimValidator[])
        | undefined;
    userContext: any;
}) => Promise<string | undefined>;
