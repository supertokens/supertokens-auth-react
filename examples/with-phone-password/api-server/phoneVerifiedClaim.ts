import { BooleanClaim } from "supertokens-node/recipe/session/claims";

export const PhoneVerifiedClaim = new BooleanClaim({
    fetchValue: () => false,
    key: "phone-verified",
});
