const override = (ogImpl) => {
    return {
        ...ogImpl,

        // this will be called for sign in or sign up for OAuth login providers
        signInUp: async function (input) {
            // first we let the user sign in / up via the default implementation.
            // If signing up, this will create a new user object in SuperTokens with a new userId.
            let result = await ogImpl.signInUp(input);

            // if there was some error, we return that as is.
            if (result.status !== "OK") {
                return result;
            }

            const email = result.user.email;

            // If this is sign up, and if the emailToUserMap map already contains the email, it means that this user had previously signed up with another OAuth provider and so we will return the user object associated with the previous sign up. Hence createdNewUser would be false.
            return {
                ...result,
                createdNewUser: emailToUserMap[email] === undefined,
                user: {
                    ...result.user,
                    ...updateAndGetUserFromMaps(result.user),
                },
            };
        },

        // this will be called for sign up via email & password
        signUp: async function (input) {
            let result = await ogImpl.signUp(input);
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
                    ...updateAndGetUserFromMaps(result.user),
                },
            };
        },

        // this will be called for sign in via email / password
        signIn: async function (input) {
            let result = await ogImpl.signIn(input);
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
                    ...updateAndGetUserFromMaps(result.user),
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
            input.userId = getSuperTokensIdFromCustomId(input.userId);
            let user = await ogImpl.getUserById(input);
            if (user === undefined) {
                return undefined;
            }

            // once we have the supertokens' user object from the function call above,
            // we need to fetch the associated mapped (custom) user object.
            return {
                ...user,
                ...updateAndGetUserFromMaps(user),
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
                ...updateAndGetUserFromMaps(user),
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
                ...updateAndGetUserFromMaps(user),
            };
        },
    };
};

// email => {
//     id: string; - this is a custom userId and not one that is created by supertokens
//     timeJoined: number;
//     email: string;
// }
let emailToUserMap = {};

/*
supertokens userId => custom user Id

one custom user ID can be mapped to multiple supertokens userId
*/
let supertokensUserIdToCustomUserIdMap = {};

/**
 * This function takes a user object returned by supertokens,
 * finds an existing user object with the same email and returns that.
 * If no user object exists in the map, then it adds the input user object
 * to the map so that that can be returned in the future.
 *
 * This way, we will always return the same user object from these functions
 * based on the provided email. Therefore, if a user signs in / up with a different
 * method, as long as their email is the same, it will always return the same user object.
 */
function updateAndGetUserFromMaps(user) {
    const email = user.email;
    if (emailToUserMap[email] === undefined) {
        // this is a new user sign up.
        emailToUserMap[email] = {
            // we use a custom userId instead of the one
            // provided by SuperTokens. This custom userId
            // can be mapped to several supertokens' userIds.
            id: getCustomUserId(user),
            timeJoined: user.timeJoined,
            email: user.email,
        };
    }

    return {
        ...user,
        ...emailToUserMap[email],
    };
}

// Given a customID, we need to return a supertokens' userId.
// Since one custom ID can map to several supertokens' userIds, we must be
// careful to always return the same supertokens' userId.
function getSuperTokensIdFromCustomId(customId) {
    for (const stId in supertokensUserIdToCustomUserIdMap) {
        if (supertokensUserIdToCustomUserIdMap[stId] === customId) {
            return stId;
        }
    }
}

// This function returns a custom userId given a supertokens' userId.
// If the mapping for the input supertokens' userId doesn't exist,
// we create a new custom userId, add that to the mapping and return that.
function getCustomUserId(user) {
    let supertokensId = user.id;
    if (supertokensUserIdToCustomUserIdMap[supertokensId] === undefined) {
        let customUserId = getNewUserId();
        supertokensUserIdToCustomUserIdMap[supertokensId] = customUserId;
        return customUserId;
    } else {
        return supertokensUserIdToCustomUserIdMap[supertokensId];
    }
}

// this generates new userIds.
// Note that this is just for the demo's purpose.
// In production, you would want to use a globally unique
// method to generate a userID.
function getNewUserId() {
    userCount++;
    return "user" + userCount;
}

let userCount = 0;

module.exports = { override };
