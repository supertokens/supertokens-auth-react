import {
    shouldAllowSignUp,
    linkNewAccountAndGetPrimaryUserId,
    getPrimaryUserIdFromRecipeUserId,
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
                // TODO: user's email may have changed, so we need to update their identifying info in this case. It can also be that that email is being used by some other primary user already, in which case we should throw an error.. and then what?

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
        // getUserById: async function (input) {
        //     // The input would be a primary userId. We can't give the primary userId
        //     // to supertokens' function because it won't recognize it. So we need to
        //     // find the associated supertokens' userId.
        //     //
        //     // Since the primary userId maps to multiple supertokens users,
        //     // we can use any one of them, but it has to be the same one each time.
        //     input.userId = getTPEPSuperTokensIdFromPrimaryId(input.userId)!;
        //     let user = await ogImpl.getUserById(input);
        //     if (user === undefined) {
        //         return undefined;
        //     }

        //     // once we have the supertokens' user object from the function call above,
        //     // we need to fetch the associated primary user object.
        //     return {
        //         ...user,
        //         ...getPrimaryUserFromSuperTokensId(user.id),
        //     };
        // },
        // getUserByThirdPartyInfo: async function (input) {
        //     let user = await ogImpl.getUserByThirdPartyInfo(input);
        //     if (user === undefined) {
        //         return undefined;
        //     }

        //     return {
        //         ...user,
        //         ...getPrimaryUserFromSuperTokensId(user.id),
        //     };
        // },
        // getUsersByEmail: async function (input) {
        //     let users = await ogImpl.getUsersByEmail(input);

        //     for (let i = 0; i < users.length; i++) {
        //         users[i].id = getPrimaryUserFromSuperTokensId(users[i].id)!.id;
        //     }
        //     return users;
        // },
        // updateEmailOrPassword: async function (input) {
        //     input.userId = getTPEPSuperTokensIdFromPrimaryId(input.userId)!;
        //     return ogImpl.updateEmailOrPassword(input);
        // },
    };
};
