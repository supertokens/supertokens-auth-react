const override = (ogImpl) => {
    return {
        ...ogImpl,
        signInUp: async (input) => {
            let result = await ogImpl.signInUp(input);
            if (result.status !== "OK") {
                return result;
            }
            const email = result.user.email;
            return {
                ...result,
                createdNewUser: emailToUserMap[email] === undefined,
                user: {
                    ...result.user,
                    ...updateAndGetUserFromMaps(result.user),
                },
            };
        },
        signUp: async (input) => {
            let result = await ogImpl.signUp(input);
            if (result.status !== "OK") {
                return result;
            }
            return {
                ...result,
                user: {
                    ...result.user,
                    ...updateAndGetUserFromMaps(result.user),
                },
            };
        },
        signIn: async (input) => {
            let result = await ogImpl.signIn(input);
            if (result.status !== "OK") {
                return result;
            }
            return {
                ...result,
                user: {
                    ...result.user,
                    ...updateAndGetUserFromMaps(result.user),
                },
            };
        },
        getUserById: async (input) => {
            // The input would be a custom userId.
            // This would map to multiple supertokens users,
            // so we return any one of them, but the same one each time (IMPORTANT).
            input.userId = getSuperTokensIdFromCustomId(input.userId);
            let user = await ogImpl.getUserById(input);
            if (user === undefined) {
                return undefined;
            }
            return {
                ...user,
                ...updateAndGetUserFromMaps(user),
            };
        },
        getUserByThirdPartyInfo: async (input) => {
            let user = await ogImpl.getUserByThirdPartyInfo(input);
            if (user === undefined) {
                return undefined;
            }
            return {
                ...user,
                ...updateAndGetUserFromMaps(user),
            };
        },
        getUserByEmail: async (input) => {
            let user = await ogImpl.getUserByEmail(input);
            if (user === undefined) {
                return undefined;
            }
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

function updateAndGetUserFromMaps(user) {
    const email = user.email;
    if (emailToUserMap[email] === undefined) {
        // this is a new user sign up.
        emailToUserMap[email] = {
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

function getSuperTokensIdFromCustomId(customId) {
    for (const stId in supertokensUserIdToCustomUserIdMap) {
        if (supertokensUserIdToCustomUserIdMap[stId] === customId) {
            return stId;
        }
    }
}

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

function getNewUserId() {
    userCount++;
    return "user" + userCount;
}

let userCount = 0;

module.exports = { override };
