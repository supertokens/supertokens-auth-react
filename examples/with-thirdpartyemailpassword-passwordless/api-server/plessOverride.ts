import {
    linkNewAccountAndGetPrimaryUserId,
    getPrimaryUserIdFromRecipeUserId,
    shouldAllowSignUp,
    getRecipeUserIdFromPrimaryUserId,
    findPrimaryUserIdIdentifyingInfo,
} from "./accountLinkingMap";
import { RecipeInterface } from "supertokens-node/recipe/passwordless/types";

export const plessOverride = (ogImpl: RecipeInterface): RecipeInterface => {
    return {
        ...ogImpl,
        consumeCode: async function (input) {
            // if this is a sign up, we need to check if the contact info is
            // in a primary user's unverified ID. If it is, we need to stop this sign up
            let info = await this.listCodesByPreAuthSessionId({
                preAuthSessionId: input.preAuthSessionId,
                userContext: input.userContext,
            });
            if (info === undefined) {
                return {
                    status: "RESTART_FLOW_ERROR",
                };
            }
            let userAlreadyExists = false;
            if (info.email !== undefined) {
                userAlreadyExists =
                    (await this.getUserByEmail({
                        email: info.email,
                        userContext: input.userContext,
                    })) !== undefined;
            } else {
                userAlreadyExists =
                    (await this.getUserByPhoneNumber({
                        phoneNumber: info.phoneNumber!,
                        userContext: input.userContext,
                    })) !== undefined;
            }

            if (!userAlreadyExists) {
                // Is a new sign up
                if (!(await shouldAllowSignUp((info.email || info.phoneNumber)!))) {
                    // TODO: ideally we want to send back an error message with a
                    // message to display to the user.
                    return {
                        status: "RESTART_FLOW_ERROR",
                    };
                }
            }

            let result = await ogImpl.consumeCode(input);
            if (result.status !== "OK") {
                return result;
            }

            if (result.createdNewUser) {
                /* we intentionally use the input and not the user info returned from consumeCode cause the returned user info might have both the email and phone number*/
                result.user.id = linkNewAccountAndGetPrimaryUserId(
                    "passwordless",
                    result.user.id,
                    (info.email || info.phoneNumber)!,
                    true
                );
            } else {
                result.user.id = getPrimaryUserIdFromRecipeUserId(result.user.id);
            }

            return result;
        },
        getUserById: async function (input) {
            // The input would be a primary userId. We can't give the primary userId
            // to supertokens' function because it won't recognize it. So we need to
            // find the associated recipe userId.
            input.userId = getRecipeUserIdFromPrimaryUserId(input.userId);
            let user = await ogImpl.getUserById(input);
            if (user === undefined) {
                return undefined;
            }

            user.id = getPrimaryUserIdFromRecipeUserId(user.id);

            return user;
        },
        getUserByEmail: async function (input) {
            let user = await ogImpl.getUserByEmail(input);
            if (user === undefined) {
                return undefined;
            }

            user.id = getPrimaryUserIdFromRecipeUserId(user.id);

            return user;
        },
        getUserByPhoneNumber: async function (input) {
            let user = await ogImpl.getUserByPhoneNumber(input);
            if (user === undefined) {
                return undefined;
            }

            user.id = getPrimaryUserIdFromRecipeUserId(user.id);

            return user;
        },

        updateUser: async function (input) {
            // We need to make sure that another primary user doesn't already have
            // this new email / phone number in their identifying info.
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

            if (input.phoneNumber !== null && input.phoneNumber !== undefined) {
                let fromVerifiedList = findPrimaryUserIdIdentifyingInfo(input.phoneNumber, true);
                let fromUnverifiedList = findPrimaryUserIdIdentifyingInfo(input.phoneNumber, false);
                if (fromUnverifiedList !== undefined && fromUnverifiedList !== input.userId) {
                    return {
                        status: "PHONE_NUMBER_ALREADY_EXISTS_ERROR",
                    };
                }
                if (fromVerifiedList !== undefined && fromVerifiedList !== input.userId) {
                    return {
                        status: "PHONE_NUMBER_ALREADY_EXISTS_ERROR",
                    };
                }
            }

            input.userId = getRecipeUserIdFromPrimaryUserId(input.userId);
            let response = await ogImpl.updateUser(input);
            if (response.status === "OK") {
                // TODO: we need to update the verified mapping associated with this primary user.
            }
            return response;
        },
    };
};
