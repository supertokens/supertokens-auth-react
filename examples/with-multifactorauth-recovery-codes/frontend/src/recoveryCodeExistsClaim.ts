import { BooleanClaim } from "supertokens-auth-react/recipe/session";

export const RecoveryCodeExistsClaim = new BooleanClaim({
    id: "rc",
    refresh: async () => {
        // This is something we have no way of refreshing, so this is a no-op
    },
    onFailureRedirection: () => "/create-recovery-code",
});
