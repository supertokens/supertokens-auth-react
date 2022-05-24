import {
    getPrimaryUserIdFromRecipeUserId,
    getRecipeUserIdFromPrimaryUserId,
    updateIdentifierArraysForRecipeUserId,
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
            await updateIdentifierArraysForRecipeUserId(input.userId);
            return ogImpl.unverifyEmail(input);
        },
        verifyEmailUsingToken: async function (input) {
            let result = await ogImpl.verifyEmailUsingToken(input);
            if (result.status !== "OK") {
                return result;
            }
            // we do not need to read it from the context object when the interface change happens
            let session = input.userContext.session;
            await updateIdentifierArraysForRecipeUserId(result.user.id, session);
            result.user.id = getPrimaryUserIdFromRecipeUserId(result.user.id);
            return result;
        },
    };
};
