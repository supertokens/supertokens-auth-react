let {
    createPrimaryUserFromSuperTokensUser,
    getPwlessSuperTokensIdFromPrimaryId,
    getPrimaryUserFromSuperTokensId,
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

            let createdNewUser = createPrimaryUserFromSuperTokensUser(result.user);

            return {
                ...result,
                createdNewUser,
                user: {
                    ...result.user,
                    ...getPrimaryUserFromSuperTokensId(result.user.id),
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
            input.userId = getPwlessSuperTokensIdFromPrimaryId(input.userId);
            let user = await ogImpl.getUserById(input);
            if (user === undefined) {
                return undefined;
            }

            // once we have the supertokens' user object from the function call above,
            // we need to fetch the associated primary user object.
            return {
                ...user,
                ...getPrimaryUserFromSuperTokensId(user.id),
            };
        },
        getUserByEmail: async function (input) {
            let user = await ogImpl.getUserByEmail(input);
            if (user === undefined) {
                return undefined;
            }

            return {
                ...user,
                ...getPrimaryUserFromSuperTokensId(user.id),
            };
        },
        getUserByPhoneNumber: async function (input) {
            let user = await ogImpl.getUserByPhoneNumber(input);
            if (user === undefined) {
                return undefined;
            }

            return {
                ...user,
                ...getPrimaryUserFromSuperTokensId(user.id),
            };
        },

        updateUser: async function (input) {
            input.userId = getPwlessSuperTokensIdFromPrimaryId(input.userId);
            return ogImpl.updateUser(input);
        },
    };
};

module.exports = { plessOverride };
