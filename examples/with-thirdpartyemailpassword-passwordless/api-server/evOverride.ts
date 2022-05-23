import {
    getPrimaryUserIdFromRecipeUserId,
    getRecipeUserIdFromPrimaryUserId,
    markIdentifierAsVerified,
} from "./accountLinkingMap";
import { RecipeInterface } from "supertokens-node/recipe/emailverification/types";

export const evOverride = (ogImpl: RecipeInterface): RecipeInterface => {
    return {
        ...ogImpl,
        createEmailVerificationToken: async function (input) {
            input.userId = getRecipeUserIdFromPrimaryUserId(input.userId);
            return ogImpl.createEmailVerificationToken(input);
        },
        isEmailVerified: async function (input) {
            input.userId = getRecipeUserIdFromPrimaryUserId(input.userId);
            return ogImpl.isEmailVerified(input);
        },
        revokeEmailVerificationTokens: async function (input) {
            input.userId = getRecipeUserIdFromPrimaryUserId(input.userId);
            return ogImpl.revokeEmailVerificationTokens(input);
        },
        unverifyEmail: async function (input) {
            input.userId = getRecipeUserIdFromPrimaryUserId(input.userId);
            // TODO: mark email as unverified in account linking.
            return ogImpl.unverifyEmail(input);
        },
        verifyEmailUsingToken: async function (input) {
            let result = await ogImpl.verifyEmailUsingToken(input);
            if (result.status !== "OK") {
                return result;
            }
            markIdentifierAsVerified(result.user.id, result.user.email);
            result.user.id = getPrimaryUserIdFromRecipeUserId(result.user.id);
            return result;
        },
    };
};
