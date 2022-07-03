import { BooleanClaim } from "supertokens-node/recipe/session/claims";

// All of these claims/checkers are exported by us and added by endpoints of an MFA recipe
export const SecondFactorOTPClaim = new BooleanClaim({
    fetchValue: () => undefined,
    key: "st-mfa-otp",
});

export const SecondFactorTOTPClaim = new BooleanClaim({
    fetchValue: () => undefined,
    key: "st-mfa-totp",
});

export const SecondFactorClaimValidators = {
    any2Factors: {
        id: "st-mfa",
        validate: (payload, ctx) =>
            SecondFactorOTPClaim.validators.hasValue(true).validate(payload, ctx) ||
            SecondFactorTOTPClaim.validators.hasValue(true).validate(payload, ctx),
    },
    any2FreshFactors(maxAgeInSeconds: number) {
        return {
            id: "st-mfa",
            validate: (payload, ctx) =>
                SecondFactorOTPClaim.validators.hasFreshValue(true, maxAgeInSeconds).validate(payload, ctx) ||
                SecondFactorTOTPClaim.validators.hasFreshValue(true, maxAgeInSeconds).validate(payload, ctx),
        };
    },
};
