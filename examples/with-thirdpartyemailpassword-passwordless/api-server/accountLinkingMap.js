/**
 * Primary user ID => {contactInfo (email or phone number), id (primary User ID), time joined, pwlessUserId, tpepUserIds }
 * Primary key: user ID,
 * Unique: contactInfo,
 *
 * This will map an email or phone number to a primary user. That primary user will then be used
 * for all users that have the same contact info, regardless of which login method they used.
 */
const primaryUserStore = new Map();

/**
 * This function takes a supertokens thirdpartyemailpassword or passwordless user
 * and creates a new primary user if it doesn't already exist for the given user ID.
 *
 * If the email or phonenumber of the supertokens user was already used before,
 * then we do not create a new primary user, but just associate the old primary
 * user with this new supertokens user.
 *
 */
function createPrimaryUserFromSuperTokensUser(user) {
    const contactInfo = user.email || user.phoneNumber;
    const stId = user.id;
    let primaryId;
    let timeJoined = user.timeJoined;
    const isPasswordless = user.thirdParty === undefined;

    let createdNewUser = false;
    let storedPrimaryUser = Array.from(primaryUserStore.values()).find((u) => u.contactInfo === contactInfo);

    if (storedPrimaryUser === undefined) {
        // this email or phonenumber has never been seen before, so we create a
        // new primary user that will be associated with it.
        primaryId = getNewPrimaryUserId();
        createdNewUser = true;
        primaryUserStore.set(primaryId, {
            id: primaryId,
            contactInfo,
            pwlessUserId: undefined,
            tpepUserIds: [],
            timeJoined,
        });
        storedPrimaryUser = primaryUserStore.get(primaryId);
    } else {
        // this email was already used to sign up from another method,
        // so we do not create a new primary user.
        primaryId = storedPrimaryUser.id;
        timeJoined = storedPrimaryUser.timeJoined;
    }

    if (isPasswordless) {
        storedPrimaryUser.pwlessUserId = stId;
    } else {
        storedPrimaryUser.tpepUserIds = Array.from(new Set(storedPrimaryUser.tpepUserIds).add(stId));
    }

    return createdNewUser;
}

function getTPEPSuperTokensIdFromPrimaryId(primaryId) {
    const storedPrimaryUser = primaryUserStore.get(primaryId);

    return storedPrimaryUser !== undefined && storedPrimaryUser.tpepUserIds !== undefined
        ? storedPrimaryUser.tpepUserIds[0]
        : undefined;
}

function getPwlessSuperTokensIdFromPrimaryId(primaryId) {
    const storedPrimaryUser = primaryUserStore.get(primaryId);

    return storedPrimaryUser !== undefined ? storedPrimaryUser.pwlessUserId : undefined;
}

function getPrimaryUserFromSuperTokensId(stId) {
    return Array.from(primaryUserStore.values()).find((u) => u.pwlessUserId === stId || u.tpepUserIds.includes(stId));
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
    getTPEPSuperTokensIdFromPrimaryId,
    getPwlessSuperTokensIdFromPrimaryId,
    createPrimaryUserFromSuperTokensUser,
    getPrimaryUserFromSuperTokensId,
};
