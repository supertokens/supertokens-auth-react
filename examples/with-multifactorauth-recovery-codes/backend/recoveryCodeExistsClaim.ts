import { BooleanClaim } from "supertokens-node/recipe/session/claims";
import { getUserMetadata } from "supertokens-node/recipe/usermetadata";

export const RecoveryCodeExistsClaim = new BooleanClaim({
    key: "rc",
    fetchValue: async (userId) => {
        const userData = await getUserMetadata(userId);
        return userData.metadata.recoveryCodeHash !== undefined;
    },
});
