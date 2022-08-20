import { BooleanClaim } from "supertokens-web-js/recipe/session";

export const PhoneVerifiedClaim = new BooleanClaim({
    id: "phone-verified",
    refresh: async () => {
        // This is something we have no way of refreshing, so this is a no-op
    },
});
