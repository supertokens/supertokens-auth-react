/**
 * email ID => {primary user ID, time joined}
 * primary key (email ID)
 *
 * This will map an email ID to a userID. That userID will then be used
 * for all users that have the same email, regardless of which login method they used.
 */
let emailToPrimaryUserMap = {};

/**
 * supertokens user ID => primary user ID
 * primary key (supertokens user ID, primary user ID)
 *
 * Several supertokens user ID can map to the same primary user ID.
 */

let superTokensUserIdToPrimaryUserId = {};

function getPrimaryUserUsingEmail(email) {
    return emailToPrimaryUserMap[email];
}

/**
 * This function takes a supertokens thirdpartyemailpassword or passwordless user
 * and returns the associated primary user from the maps above. If the primary user
 * doesn't exist for the email, if will create a new primary user.
 */
function updateAndGetPrimaryUserFromSuperTokensUser(user) {
    let email = user.email;
    let id = user.id;
    let timeJoined = user.timeJoined;

    if (emailToPrimaryUserMap[email] === undefined) {
        // this means this is a new supertokens user
        let primaryUserID = getNewPrimaryUserId();
        emailToPrimaryUserMap[email] = {
            id: primaryUserID,
            timeJoined,
        };
        superTokensUserIdToPrimaryUserId[id] = primaryUserID;
    }
    return emailToPrimaryUserMap[email];
}

function getSuperTokensIdFromPrimaryId(primaryId) {
    /**
     * Since many supertokens ID can map to a single primary ID, we must get the first one always
     */

    for (const stId in superTokensUserIdToPrimaryUserId) {
        if (superTokensUserIdToPrimaryUserId[stId] === primaryId) {
            return stId;
        }
    }
}

// this generates new userIds.
// Note that this is just for the demo's purpose.
// In production, you would want to use a globally unique
// method to generate a userID.
function getNewPrimaryUserId() {
    userCount++;
    return "user" + userCount;
}

let userCount = 0;

module.exports = {
    getSuperTokensIdFromPrimaryId,
    updateAndGetPrimaryUserFromSuperTokensUser,
    getPrimaryUserUsingEmail,
};
