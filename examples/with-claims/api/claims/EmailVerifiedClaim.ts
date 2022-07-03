import { SessionClaimValidator } from "supertokens-node/recipe/session";
import { BooleanClaim } from "supertokens-node/recipe/session/claims";
import { isEmailVerified } from "supertokens-node/recipe/emailpassword";

class EmailVerifiedClaimClass extends BooleanClaim {
    constructor() {
        super({
            fetchValue: (userId: string, ctx) => {
                return isEmailVerified(userId, ctx);
            },
            key: "st-ev",
        });
    }

    // A bit of custom logic we discussed earlier, but it could be the above just as
    // return this.checkers.withFreshValue(true, 60);
    isVerified: SessionClaimValidator = {
        claim: this,
        id: this.key,
        shouldRefetch: (accessTokenPayload, ctx) =>
            this.getValueFromPayload(accessTokenPayload, ctx) === undefined ||
            (this.getValueFromPayload(accessTokenPayload, ctx) === false &&
                // We know grantPayload[this.id] is defined since the value is not undefined in this branch
                accessTokenPayload[this.key].t < Date.now() - 10_000),
        validate: (payload, ctx) => ({ isValid: EmailVerifiedClaim.getValueFromPayload(payload, ctx) === true }),
    };
}

// All of these claims/checkers are exported by us (per auth recipe)
export const EmailVerifiedClaim = new EmailVerifiedClaimClass();
