let {
    getSuperTokensIdFromPrimaryId,
    createPrimaryUserFromSuperTokensUser,
    getPrimaryUserFromSuperTokensId,
} = require("./accountLinkingMap");

const tpepOverride = (ogImpl) => {
    return {
        ...ogImpl,

        thirdPartySignInUp: async function (input) {
            let result = await ogImpl.thirdPartySignInUp(input);

            // if there was some error, we return that as is.
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

        emailPasswordSignUp: async function (input) {
            let result = await ogImpl.emailPasswordSignUp(input);
            if (result.status !== "OK") {
                return result;
            }

            createPrimaryUserFromSuperTokensUser(result.user);

            return {
                ...result,
                user: {
                    ...result.user,
                    ...getPrimaryUserFromSuperTokensId(result.user.id),
                },
            };
        },

        // this will be called for sign in via email / password
        emailPasswordSignIn: async function (input) {
            let result = await ogImpl.emailPasswordSignIn(input);
            if (result.status !== "OK") {
                return result;
            }

            createPrimaryUserFromSuperTokensUser(result.user);

            return {
                ...result,
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
            input.userId = getSuperTokensIdFromPrimaryId(input.userId);
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
        getUserByThirdPartyInfo: async function (input) {
            let user = await ogImpl.getUserByThirdPartyInfo(input);
            if (user === undefined) {
                return undefined;
            }

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
        updateEmailOrPassword: async function (input) {
            input.userId = getSuperTokensIdFromPrimaryId(input.userId);
            return ogImpl.updateEmailOrPassword(input);
        },
    };
};

module.exports = { tpepOverride };
