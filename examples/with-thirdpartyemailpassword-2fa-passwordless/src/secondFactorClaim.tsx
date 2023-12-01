import { BooleanClaim } from "supertokens-auth-react/recipe/session";

export const SecondFactorClaim = new BooleanClaim({
    id: "2fa-completed",
    refresh: async () => {
        // This is something we have no way of refreshing, so this is a no-op
    },
    onFailureRedirection: () => {
        // Redirect the user to the /second-factor page upon claim failure.
        // SuperTokens defaults to redirection when a session exists, which could result in repetitive redirection to /second-factor in case of a failed claim.
        // To avoid this, return null if already on the /second-factor page.
        if (window.location.pathname !== "/second-factor") {
            return "/second-factor";
        }
        return null;
    },
});
