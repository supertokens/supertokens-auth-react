import {
    shouldAllowSignUp,
    linkNewAccountAndGetPrimaryUserId,
    getPrimaryUserIdFromRecipeUserId,
    getRecipeUserIdFromPrimaryUserId,
    findPrimaryUserIdIdentifyingInfo,
    getAllLinkedAccounts,
} from "./accountLinkingMap";
import { RecipeInterface } from "supertokens-node/recipe/thirdpartyemailpassword/types";

export const tpepOverride = (ogImpl: RecipeInterface): RecipeInterface => {
    return {
        ...ogImpl,

        thirdPartySignInUp: async function (input) {
            // if this is a sign up, we need to check if the contact info is
            // in a primary user's unverified ID. If it is, we need to stop this sign up.
            // We intentionally do not check using email since a third party provider's
            // email can change even if their user ID doesn't.
            let info = await this.getUserByThirdPartyInfo({
                thirdPartyId: input.thirdPartyId,
                thirdPartyUserId: input.thirdPartyUserId,
                userContext: input.userContext,
            });

            if (info === undefined) {
                // Is a new sign up
                if (!(await shouldAllowSignUp(input.email.id))) {
                    // TODO: Does this kind of message make sense? Cause actually the problem is that the user's email on the other account is not verified.
                    return {
                        status: "FIELD_ERROR",
                        error: "Seems like you already signed up with another method. Please sign in using that instead.",
                    };
                }
            } else {
                let checkIfThirdPartyInfoIsBeingUsedByAnotherAccount = async (
                    primaryUserToCheck: string
                ): Promise<boolean> => {
                    // we get all the linked accounts for this user ID, and if none of them
                    // match the input thirdPartyId and thirdPartyUserId, then we know that
                    // this is another account and we should reject the request
                    let allLinkedAccounts = getAllLinkedAccounts(primaryUserToCheck)!;
                    for (let i = 0; i < allLinkedAccounts.length; i++) {
                        let linkedAccount = allLinkedAccounts[i];
                        if (linkedAccount.recipeId === "thirdparty") {
                            let recipeUserId = linkedAccount.recipeUserId;
                            let thirdPartyInfo = (await this.getUserById({
                                userId: recipeUserId,
                                userContext: input.userContext,
                            }))!;
                            if (
                                thirdPartyInfo.thirdParty!.id === input.thirdPartyId &&
                                thirdPartyInfo.thirdParty!.userId === input.thirdPartyUserId
                            ) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                // is sign in.. we should check if the email is already being used by
                // another primary user, and if so, then we should reject this sign in attempt
                let fromVerifiedList = findPrimaryUserIdIdentifyingInfo(input.email.id, true);
                let fromUnverifiedList = findPrimaryUserIdIdentifyingInfo(input.email.id, false);
                if (
                    fromUnverifiedList !== undefined &&
                    !(await checkIfThirdPartyInfoIsBeingUsedByAnotherAccount(fromUnverifiedList))
                ) {
                    return {
                        status: "FIELD_ERROR",
                        error: "Unable to sign in. It seems your email changed to another account that already has this email. Please contact support",
                    };
                }
                if (
                    fromVerifiedList !== undefined &&
                    !(await checkIfThirdPartyInfoIsBeingUsedByAnotherAccount(fromVerifiedList))
                ) {
                    return {
                        status: "FIELD_ERROR",
                        error: "Unable to sign in. It seems your email changed to another account that already has this email. Please contact support",
                    };
                }
            }

            let result = await ogImpl.thirdPartySignInUp(input);

            // if there was some error, we return that as it is.
            if (result.status !== "OK") {
                return result;
            }

            if (result.createdNewUser) {
                result.user.id = linkNewAccountAndGetPrimaryUserId(
                    "thirdparty",
                    result.user.id,
                    result.user.email,
                    input.email.isVerified
                );
            } else {
                // TODO: user's email may have changed, so we need to update their identifying info in this case.

                result.user.id = getPrimaryUserIdFromRecipeUserId("thirdparty", result.user.id);
            }

            return result;
        },

        emailPasswordSignUp: async function (input) {
            if (!(await shouldAllowSignUp(input.email))) {
                // TODO: ideally we want to send back an error message with a
                // message to display to the user.
                return {
                    status: "EMAIL_ALREADY_EXISTS_ERROR",
                };
            }
            let result = await ogImpl.emailPasswordSignUp(input);
            if (result.status !== "OK") {
                return result;
            }

            result.user.id = linkNewAccountAndGetPrimaryUserId(
                "emailpassword",
                result.user.id,
                result.user.email,
                false
            );

            return result;
        },

        // this will be called for sign in via email / password
        emailPasswordSignIn: async function (input) {
            let result = await ogImpl.emailPasswordSignIn(input);
            if (result.status !== "OK") {
                return result;
            }

            result.user.id = getPrimaryUserIdFromRecipeUserId("emailpassword", result.user.id);

            return result;
        },
        getUserById: async function (input) {
            // The input would be a primary userId. We can't give the primary userId
            // to supertokens' function because it won't recognize it. So we need to
            // find the associated recips userId.

            // first we try emailpassword recipe
            let recipeUserId = getRecipeUserIdFromPrimaryUserId("emailpassword", input.userId);
            if (recipeUserId === input.userId) {
                // this means either an emailpassword user doesn't exist, or it's primary userId is the same as the recipe ID. Either way, we try thirdparty in case that exists
                recipeUserId = getRecipeUserIdFromPrimaryUserId("thirdparty", input.userId);
            }
            input.userId = recipeUserId;
            let user = await ogImpl.getUserById(input);
            if (user === undefined) {
                return undefined;
            }

            user.id = getPrimaryUserIdFromRecipeUserId(
                user.thirdParty === undefined ? "emailpassword" : "thirdparty",
                user.id
            );

            return user;
        },
        getUserByThirdPartyInfo: async function (input) {
            let user = await ogImpl.getUserByThirdPartyInfo(input);
            if (user === undefined) {
                return undefined;
            }

            user.id = getPrimaryUserIdFromRecipeUserId("thirdparty", user.id);

            return user;
        },
        getUsersByEmail: async function (input) {
            let users = await ogImpl.getUsersByEmail(input);

            for (let i = 0; i < users.length; i++) {
                users[i].id = getPrimaryUserIdFromRecipeUserId(
                    users[i].thirdParty === undefined ? "emailpassword" : "thirdparty",
                    users[i].id
                );
            }
            return users;
        },

        updateEmailOrPassword: async function (input) {
            if (input.email !== null && input.email !== undefined) {
                let fromVerifiedList = findPrimaryUserIdIdentifyingInfo(input.email, true);
                let fromUnverifiedList = findPrimaryUserIdIdentifyingInfo(input.email, false);
                if (fromUnverifiedList !== undefined && fromUnverifiedList !== input.userId) {
                    return {
                        status: "EMAIL_ALREADY_EXISTS_ERROR",
                    };
                }
                if (fromVerifiedList !== undefined && fromVerifiedList !== input.userId) {
                    return {
                        status: "EMAIL_ALREADY_EXISTS_ERROR",
                    };
                }
            }
            input.userId = getRecipeUserIdFromPrimaryUserId("emailpassword", input.userId);
            let response = await ogImpl.updateEmailOrPassword(input);
            if (response.status === "OK") {
                // TODO: we need to update the mapping in primary key user store
            }
            return response;
        },
    };
};
