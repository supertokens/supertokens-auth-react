let {
    getPrimaryUserUsingEmail,
    updateAndGetPrimaryUserFromSuperTokensUser,
    getSuperTokensIdFromPrimaryId,
} = require("./accountLinkingMap");

const tpepOverride = (ogImpl) => {
    return {
        ...ogImpl,

        // this will be called for sign in or sign up for OAuth login providers
        thirdPartySignInUp: async function (input) {
            // first we let the user sign in / up via the default implementation.
            // If signing up, this will create a new user object in SuperTokens with a new userId.
            let result = await ogImpl.thirdPartySignInUp(input);

            // if there was some error, we return that as is.
            if (result.status !== "OK") {
                return result;
            }

            const email = result.user.email;

            // If this is sign up, and if the emailToUserMap map already contains the email, it means that this user had previously signed up with another method so we will return the user object associated with the previous sign up. Hence createdNewUser would be false.
            return {
                ...result,
                createdNewUser: getPrimaryUserUsingEmail(email) === undefined,
                user: {
                    ...result.user,
                    ...updateAndGetPrimaryUserFromSuperTokensUser(result.user),
                },
            };
        },

        // this will be called for sign up via email & password
        emailPasswordSignUp: async function (input) {
            let result = await ogImpl.emailPasswordSignUp(input);
            if (result.status !== "OK") {
                return result;
            }

            // we modify the returned user object to have the same user
            // associated with the email from previous sign ups. If this
            // is the first time this email is being used, then we return this
            // user object and store it in the map for future sign ups / ins.
            return {
                ...result,
                user: {
                    ...result.user,
                    ...updateAndGetPrimaryUserFromSuperTokensUser(result.user),
                },
            };
        },

        // this will be called for sign in via email / password
        emailPasswordSignIn: async function (input) {
            let result = await ogImpl.emailPasswordSignIn(input);
            if (result.status !== "OK") {
                return result;
            }

            // we modify the returned user object to have the same user
            // associated with the email from previous sign ups. Note that
            // this user object could have been created from email password sign up
            // or from OAuth provider sign up.
            return {
                ...result,
                user: {
                    ...result.user,
                    ...updateAndGetPrimaryUserFromSuperTokensUser(result.user),
                },
            };
        },
        getUserById: async function (input) {
            // The input would be a custom userId. We can't give the custom userId
            // to supertokens' function because it won't recognize it. So we need to
            // find the associated supertokens' userId.
            //
            // Since the custom userId maps to multiple supertokens users,
            // we can use any one of them, but it has to be the same one each time.
            input.userId = getSuperTokensIdFromPrimaryId(input.userId);
            let user = await ogImpl.getUserById(input);
            if (user === undefined) {
                return undefined;
            }

            // once we have the supertokens' user object from the function call above,
            // we need to fetch the associated mapped (custom) user object.
            return {
                ...user,
                ...updateAndGetPrimaryUserFromSuperTokensUser(user),
            };
        },
        getUserByThirdPartyInfo: async function (input) {
            let user = await ogImpl.getUserByThirdPartyInfo(input);
            if (user === undefined) {
                return undefined;
            }

            // once we have the supertokens' user object from the function call above,
            // we need to fetch the associated mapped (custom) user object.
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
            // we need to fetch the associated mapped (custom) user object.
            return {
                ...user,
                ...updateAndGetPrimaryUserFromSuperTokensUser(user),
            };
        },
    };
};

module.exports = { tpepOverride };
