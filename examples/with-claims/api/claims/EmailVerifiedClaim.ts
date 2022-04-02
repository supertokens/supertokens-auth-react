import { SessionClaimChecker } from "supertokens-node/recipe/session";
import { BooleanClaim } from "supertokens-node/lib/build/recipe/session/claimBaseClasses/booleanClaim";
import { isEmailVerified } from "supertokens-node/recipe/emailpassword";

class EmailVerifiedClaimClass extends BooleanClaim {
    constructor() {
        super({
            fetch: (userId: string, ctx) => {
                return isEmailVerified(userId, ctx);
            },
            id: "st-email-verified",
        });
    }
    // A bit of custom logic we discussed earlier, but it could be the above just as
    // return this.checkers.withFreshValue(true, 60);
    isVerified: SessionClaimChecker = {
        claim: this,
        shouldRefetch: (grantPayload, ctx) =>
            this.getValueFromPayload(grantPayload, ctx) === undefined ||
            (this.getValueFromPayload(grantPayload, ctx) === false &&
                // We know grantPayload[this.id] is defined since the value is not undefined in this branch
                grantPayload[this.id].t < Date.now() - 10 * 1000),
        isValid: (grantPayload, ctx) => this.getValueFromPayload(grantPayload, ctx) === true,
    };
}

// All of these claims/checkers are exported by us (per auth recipe)
export const EmailVerifiedClaim = new EmailVerifiedClaimClass();
