/**
 * email ID => {primary user ID, time joined}
 * primary key (email ID)
 *
 * This will map an email ID to a primary user. That primary user will then be used
 * for all users that have the same email, regardless of which login method they used.
 */
let emailToPrimaryUserMap = {};

/**
 * supertokens user ID => {primary user ID, time joined}
 * primary key (supertokens user ID)
 */

let superTokensUserIdToPrimaryUserMap = {};

/**
 * This function takes a supertokens thirdpartyemailpassword or passwordless user
 * and creates a new primary user if it doesn't already exist for the given user ID.
 *
 * If the email of the supertokens user was already used before,
 * then we do not create a new primary user, but just associate the old primary
 * user with this new supertokens user.
 *
 */
function createPrimaryUserFromSuperTokensUser(user) {
    let primaryUser = getPrimaryUserFromSuperTokensId(user.id);
    if (primaryUser !== undefined) {
        return false;
    }

    let primaryUserID = undefined;
    let email = user.email;
    let id = user.id;
    let timeJoined = user.timeJoined;
    let createdNewUser = false;

    if (email !== undefined) {
        if (emailToPrimaryUserMap[email] === undefined) {
            // this email has never been seen before, so we create a
            // new primary user that will be associated with this email.
            primaryUserID = getNewPrimaryUserId();
            createdNewUser = true;
            // this is a new email ID
            emailToPrimaryUserMap[email] = {
                id: primaryUserID,
                timeJoined,
            };
        } else {
            // this email was already used to sign up from another method,
            // so we do not create a new primary user.
            primaryUserID = emailToPrimaryUserMap[email].id;
            timeJoined = emailToPrimaryUserMap[email].timeJoined;
        }
    } else {
        // this is passwordless sign in via phone number
        primaryUserID = getNewPrimaryUserId();
        createdNewUser = true;
    }
    superTokensUserIdToPrimaryUserMap[id] = { id: primaryUserID, timeJoined };
    return createdNewUser;
}

function getSuperTokensIdFromPrimaryId(primaryId) {
    for (const stId in superTokensUserIdToPrimaryUserMap) {
        if (superTokensUserIdToPrimaryUserMap[stId].id === primaryId) {
            return stId;
        }
    }
}

function getPrimaryUserFromSuperTokensId(stId) {
    return superTokensUserIdToPrimaryUserMap[stId];
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
    createPrimaryUserFromSuperTokensUser,
    getPrimaryUserFromSuperTokensId,
};
