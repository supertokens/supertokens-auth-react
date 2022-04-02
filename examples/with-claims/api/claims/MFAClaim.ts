import { SessionClaimChecker } from "supertokens-node/recipe/session";
import { BooleanClaim } from "supertokens-node/lib/build/recipe/session/claimBaseClasses/booleanClaim";

// All of these claims/checkers are exported by us and added by endpoints of an MFA recipe
export const SecondFactorOTPClaim = new BooleanClaim({
    fetch: () => undefined,
    id: "st-mfa-otp",
});

export const SecondFactorTOTPClaim = new BooleanClaim({
    fetch: () => undefined,
    id: "st-mfa-totp",
});

export const SecondFactorCheckers = {
    any2Factors: {
        claimId: "st-mfa",
        isValid: (payload, ctx) =>
            SecondFactorOTPClaim.checkers.hasValue(true).isValid(payload, ctx) ||
            SecondFactorTOTPClaim.checkers.hasValue(true).isValid(payload, ctx),
    },
    any2FreshFactors(maxAgeInSeconds: number) {
        return {
            claimId: "st-mfa",
            isValid: (payload, ctx) =>
                SecondFactorOTPClaim.checkers.hasFreshValue(true, maxAgeInSeconds).isValid(payload, ctx) ||
                SecondFactorTOTPClaim.checkers.hasFreshValue(true, maxAgeInSeconds).isValid(payload, ctx),
        };
    },
};
