import { BooleanClaim } from "supertokens-web-js/recipe/session";

export const RealPasswordClaim = new BooleanClaim({
    id: "uses-real-password",
    refresh: async () => {
        // This is something we have no way of refreshing, so this is a no-op
    },
});
