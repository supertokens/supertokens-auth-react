let {
    getPrimaryUserUsingEmail,
    updateAndGetPrimaryUserFromSuperTokensUser,
    getSuperTokensIdFromPrimaryId,
} = require("./accountLinkingMap");

const plessOverride = (ogImpl) => {
    return {
        ...ogImpl,
        consumeCode: async function (input) {
            input.userContext.isPasswordless = true;
            let result = await ogImpl.consumeCode(input);
            if (result.status !== "OK") {
                return result;
            }

            const email = result.user.email;
            if (email === undefined) {
                // the user used phone number to sign in / up
            }

            // If this is sign up, and if the emailToPrimaryUserMap map already contains the email, it means that this user had previously signed up with another method so we will return the user object associated with the previous sign up. Hence createdNewUser would be false.
            return {
                ...result,
                createdNewUser: getPrimaryUserUsingEmail(email) === undefined,
                user: {
                    ...result.user,
                    ...updateAndGetPrimaryUserFromSuperTokensUser(result.user),
                },
            };
        },
        getUserById: async function (input) {
            // The input would be a primary userId. We can't give the primary userId
            // to supertokens' function because it won't recognize it. So we need to
            // find the associated supertokens' userId.
            //
            // Since the primary userId maps to multiple supertokens users,
            // we can use any one of them, but it has to be the same one each time.
            input.userId = getSuperTokensIdFromPrimaryId(input.userId);
            let user = await ogImpl.getUserById(input);
            if (user === undefined) {
                return undefined;
            }

            // once we have the supertokens' user object from the function call above,
            // we need to fetch the associated mapped (primary) user object.
            return {
                ...user,
                ...updateAndGetPrimaryUserFromSuperTokensUser(user),
            };
        },
        getUserByEmail: async function (input) {
            let user = await ogImpl.getUserByEmail(input);
            if (user === undefined) {
                return undefined;
            }

            // once we have the supertokens' user object from the function call above,
            // we need to fetch the associated mapped (primary) user object.
            return {
                ...user,
                ...updateAndGetPrimaryUserFromSuperTokensUser(user),
            };
        },
        getUserByPhoneNumber: async function (input) {
            let user = await ogImpl.getUserByPhoneNumber(input);
            if (user === undefined) {
                return undefined;
            }

            // once we have the supertokens' user object from the function call above,
            // we need to fetch the associated mapped (primary) user object.
            return {
                ...user,
                ...updateAndGetPrimaryUserFromSuperTokensUser(user),
            };
        },

        updateUser: async function (input) {
            input.userId = getSuperTokensIdFromPrimaryId(input.userId);
            return ogImpl.updateUser(input);
        },
    };
};

module.exports = { plessOverride };
