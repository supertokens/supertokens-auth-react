import { BooleanClaim } from "supertokens-auth-react/recipe/session";

export const PhoneVerifiedClaim = new BooleanClaim({
    id: "phone-verified",
    refresh: async () => {
        // This is something we have no way of refreshing, so this is a no-op
    },
    // Redirect the user to the /auth/verify-phone page upon claim failure.
    // SuperTokens defaults to redirection when a session exists, which could result in repetitive redirection to /auth/verify-phone in case of a failed claim.
    // To avoid this, return null if already on the /auth/verify-phone page.
    onFailureRedirection: () => {
        if (window.location.pathname !== "/auth/verify-phone") {
            return "/auth/verify-phone";
        }
        return null;
    },
});
