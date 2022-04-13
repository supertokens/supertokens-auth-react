import { BooleanClaim } from "supertokens-node/lib/build/recipe/session/claimBaseClasses/booleanClaim";

// All of these claims/checkers are exported by us and added by endpoints of an MFA recipe
export const SecondFactorOTPClaim = new BooleanClaim({
    fetch: () => undefined,
    key: "st-mfa-otp",
});

export const SecondFactorTOTPClaim = new BooleanClaim({
    fetch: () => undefined,
    key: "st-mfa-totp",
});

export const SecondFactorCheckers = {
    any2Factors: {
        validatorTypeId: "st-mfa",
        validate: (payload, ctx) =>
            SecondFactorOTPClaim.validators.hasValue(true).validate(payload, ctx) ||
            SecondFactorTOTPClaim.validators.hasValue(true).validate(payload, ctx),
    },
    any2FreshFactors(maxAgeInSeconds: number) {
        return {
            validatorTypeId: "st-mfa",
            validate: (payload, ctx) =>
                SecondFactorOTPClaim.validators.hasFreshValue(true, maxAgeInSeconds).validate(payload, ctx) ||
                SecondFactorTOTPClaim.validators.hasFreshValue(true, maxAgeInSeconds).validate(payload, ctx),
        };
    },
    any3FreshFactors(maxAgeInSeconds: number) {
        return {
            validatorTypeId: "st-mfa",
            validate: (payload, ctx) =>
                SecondFactorOTPClaim.validators.hasFreshValue(true, maxAgeInSeconds).validate(payload, ctx) &&
                SecondFactorTOTPClaim.validators.hasFreshValue(true, maxAgeInSeconds).validate(payload, ctx),
        };
    },
};
