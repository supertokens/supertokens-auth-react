import { SessionClaimValidator } from "supertokens-node/recipe/session";
import { BooleanClaim } from "supertokens-node/lib/build/recipe/session/claimBaseClasses/booleanClaim";
import { isEmailVerified } from "supertokens-node/recipe/emailpassword";

class EmailVerifiedClaimClass extends BooleanClaim {
    constructor() {
        super({
            fetch: (userId: string, ctx) => {
                return isEmailVerified(userId, ctx);
            },
            key: "st-ev",
        });
    }

    // A bit of custom logic we discussed earlier, but it could be the above just as
    // return this.checkers.withFreshValue(true, 60);
    isVerified: SessionClaimValidator = {
        claim: this,
        validatorTypeId: this.key,
        shouldRefetch: (grantPayload, ctx) =>
            this.getValueFromPayload(grantPayload, ctx) === undefined ||
            (this.getValueFromPayload(grantPayload, ctx) === false &&
                // We know grantPayload[this.id] is defined since the value is not undefined in this branch
                grantPayload[this.key].t < Date.now() - 10_000),
        validate: (payload, ctx) => ({ isValid: EmailVerifiedClaim.getValueFromPayload(payload, ctx) === true }),
    };
}

// All of these claims/checkers are exported by us (per auth recipe)
export const EmailVerifiedClaim = new EmailVerifiedClaimClass();
