/**
 * Primary user ID => {contactInfo (email or phone number), id (primary User ID), time joined, pwlessUserId, tpepUserIds }
 * Primary key: user ID,
 * Unique: contactInfo,
 *
 * This will map an email or phone number to a primary user. That primary user will then be used
 * for all users that have the same contact info, regardless of which login method they used.
 */

const primaryUserStore: { [key: string]: PrimaryUser[] } = {};

type PrimaryUser = {
    recipeId: string;
    recipeUserId: string;
    verifiedIdentifyingIds: string[];
    unverifiedIdentifyingIds: string[];
    isAccountFullyLinked: boolean; // TODO: perhaps a better name??
};

// to be called only during sign up
export function linkNewAccountAndGetPrimaryUserId(
    recipeId: string,
    userId: string,
    identifyingInfo: string,
    isVerified: boolean
): string {
    let primaryUser: PrimaryUser = {
        recipeId,
        recipeUserId: userId,
        isAccountFullyLinked: isVerified,
        verifiedIdentifyingIds: [],
        unverifiedIdentifyingIds: [],
    };
    if (isVerified) {
        primaryUser.verifiedIdentifyingIds = [identifyingInfo];
    } else {
        primaryUser.unverifiedIdentifyingIds = [identifyingInfo];
    }

    let existingPrimaryUserId = findPrimaryUserIdIdentifyingInfo(identifyingInfo, true);

    if (existingPrimaryUserId === undefined) {
        existingPrimaryUserId = getNewPrimaryUserId();
        // this is a new primary user
        primaryUserStore[existingPrimaryUserId] = [primaryUser];
    } else {
        // user used another login method to sign up
        let existingPrimaryUserInfo = primaryUserStore[existingPrimaryUserId]!;
        // we loop through all the linked accounts to see if any of them have a userId match (with its recipeUserId)
        let added = false;
        existingPrimaryUserInfo.forEach((linkedAccount) => {
            if (linkedAccount.recipeUserId === userId && linkedAccount.recipeId === recipeId) {
                added = true;
                if (isVerified) {
                    if (!linkedAccount.verifiedIdentifyingIds.includes(identifyingInfo)) {
                        linkedAccount.verifiedIdentifyingIds.push(identifyingInfo);
                    }
                    linkedAccount.isAccountFullyLinked = true;
                } else {
                    if (!linkedAccount.unverifiedIdentifyingIds.includes(identifyingInfo)) {
                        linkedAccount.unverifiedIdentifyingIds.push(identifyingInfo);
                    }
                }
            }
        });
        if (!added) {
            // this means this is a new recipe sign up
            existingPrimaryUserInfo.push(primaryUser);
        }
        primaryUserStore[existingPrimaryUserId] = existingPrimaryUserInfo;
    }
    return existingPrimaryUserId + "|" + userId;
}

export function shouldAllowSignUp(identifyingInfo: string): boolean {
    let existingPrimaryUserId = findPrimaryUserIdIdentifyingInfo(identifyingInfo, false);
    if (existingPrimaryUserId === undefined) {
        return true;
    }
    let result = true;
    let existingPrimaryUserInfo = primaryUserStore[existingPrimaryUserId]!;

    // we see if this primary user has a linked account
    // that has the input identifyingInfo in their unverifiedIdentifyingIds
    existingPrimaryUserInfo.forEach((linkedAccount) => {
        linkedAccount.unverifiedIdentifyingIds.forEach((i) => {
            if (i === identifyingInfo) {
                /**
                 * This means that some primary user had signed up / changed one
                 * of their accounts to have this same identifying info.
                 * If we allow sign up in this case, then the new user account may be
                 * linked to this account or a new primary user will be created.
                 *
                 * In this case, we may end up having a situation where two different linked
                 * accounts will have the same identifying info which breaks our data model (and can also be a security issue).
                 */
                result = false;
            }
        });
    });
    return result;
}

export function findPrimaryUserIdIdentifyingInfo(identifyingInfo: string, shouldVerified: boolean): string | undefined {
    let result: string | undefined = undefined;

    // we loop through all primary users
    Object.keys(primaryUserStore).forEach((userId) => {
        let linkedAccount = primaryUserStore[userId];
        let resultTemp: string | undefined = undefined;

        // we loop through all linked accounts for this primary user
        linkedAccount.forEach((element) => {
            let arrToLoop = shouldVerified ? element.verifiedIdentifyingIds : element.unverifiedIdentifyingIds;

            // we loop through all identifyingInfo for this linked account
            arrToLoop.forEach((i) => {
                if (i === identifyingInfo) {
                    if (result !== undefined) {
                        // it should never come here.. it's there only to catch bugs in the code.
                        throw new Error("Seems like multiple primary users have the same identifying info..");
                    }
                    resultTemp = userId + "|" + element.recipeUserId;
                }
            });
        });

        if (resultTemp !== undefined) {
            result = resultTemp;
        }
    });
    return result;
}

export function getPrimaryUserIdFromRecipeUserId(recipeUserId: string): string {
    let result: string | undefined = undefined;
    Object.keys(primaryUserStore).forEach((primaryUserId) => {
        let primaryUserInfo = primaryUserStore[primaryUserId];
        primaryUserInfo.forEach((linkedAccount) => {
            if (linkedAccount.recipeUserId === recipeUserId && linkedAccount.isAccountFullyLinked) {
                if (result !== undefined) {
                    throw new Error("Seems like multiple primary users have the same recipe user ID and recipe ID");
                }
                result = primaryUserId;
            }
        });
    });
    return result === undefined ? recipeUserId : result + "|" + recipeUserId;
}

/**
 * This function should return the input userID in case we can't find this in the primary
 * user store. This is cause it may actually be a recipeId which is not linked.
 */
export function getRecipeUserIdFromPrimaryUserId(primaryUserId: string) {
    if (primaryUserId.includes("|")) {
        return primaryUserId.split("|")[1];
    } else {
        return primaryUserId;
    }
}

export function getAllLinkedAccounts(primaryUserId: string): PrimaryUser[] | undefined {
    if (primaryUserId.includes("|")) {
        primaryUserId = primaryUserId.split("|")[1];
    }
    return primaryUserStore[primaryUserId];
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

/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
/**
 * This function takes a supertokens thirdpartyemailpassword or passwordless user
 * and creates a new primary user if it doesn't already exist for the given user ID.
 *
 * If the email or phonenumber of the supertokens user was already used before,
 * then we do not create a new primary user, but just associate the old primary
 * user with this new supertokens user.
 *
 */
// export function createPrimaryUserFromSuperTokensUser(user: TPUser | PlessUser, isPasswordless: boolean) {
//     const contactInfo: string | undefined = user.email || ("phoneNumber" in user ? user.phoneNumber : undefined);
//     if (contactInfo === undefined) {
//         throw new Error("Should never come here");
//     }
//     const stId = user.id;
//     let primaryId;
//     let timeJoined = user.timeJoined;

//     let createdNewUser = false;
//     let storedPrimaryUser = Array.from(primaryUserStore.values()).find((u) => u.contactInfo === contactInfo);

//     if (storedPrimaryUser === undefined) {
//         // this email or phonenumber has never been seen before, so we create a
//         // new primary user that will be associated with it.
//         primaryId = getNewPrimaryUserId();
//         createdNewUser = true;
//         let primaryUser: PrimaryUser = {
//             id: primaryId,
//             contactInfo,
//             pwlessUserId: undefined,
//             tpepUserIds: [],
//             timeJoined,
//         };
//         primaryUserStore.set(primaryId, primaryUser);
//         storedPrimaryUser = primaryUser;
//     } else {
//         // this email was already used to sign up from another method,
//         // so we do not create a new primary user.
//         primaryId = storedPrimaryUser.id;
//         timeJoined = storedPrimaryUser.timeJoined;
//     }

//     if (isPasswordless) {
//         storedPrimaryUser.pwlessUserId = stId;
//     } else {
//         storedPrimaryUser.tpepUserIds = Array.from(new Set(storedPrimaryUser.tpepUserIds).add(stId));
//     }

//     return createdNewUser;
// }

// export function getTPEPSuperTokensIdFromPrimaryId(primaryId: string): string | undefined {
//     const storedPrimaryUser = primaryUserStore.get(primaryId);

//     return storedPrimaryUser !== undefined && storedPrimaryUser.tpepUserIds.length > 0
//         ? storedPrimaryUser.tpepUserIds[0]
//         : undefined;
// }

// export function getPwlessSuperTokensIdFromPrimaryId(primaryId: string): string | undefined {
//     const storedPrimaryUser = primaryUserStore.get(primaryId);

//     return storedPrimaryUser !== undefined ? storedPrimaryUser.pwlessUserId : undefined;
// }

// export function getPrimaryUserFromSuperTokensId(stId: string): PrimaryUser | undefined {
//     return Array.from(primaryUserStore.values()).find((u) => u.pwlessUserId === stId || u.tpepUserIds.includes(stId));
// }
