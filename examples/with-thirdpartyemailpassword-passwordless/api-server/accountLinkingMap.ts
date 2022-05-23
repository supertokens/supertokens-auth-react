/**
 * Primary user ID => {contactInfo (email or phone number), id (primary User ID), time joined, pwlessUserId, tpepUserIds }
 * Primary key: user ID,
 * Unique: contactInfo,
 *
 * This will map an email or phone number to a primary user. That primary user will then be used
 * for all users that have the same contact info, regardless of which login method they used.
 */
import fs from "fs";
import Passwordless from "supertokens-node/recipe/passwordless";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
if (!fs.existsSync("./api-server/primaryUserStore.json")) {
    fs.writeFileSync("./api-server/primaryUserStore.json", JSON.stringify({}), { encoding: "utf8", flag: "w" });
}
let primaryUserStoreJSON = JSON.parse(fs.readFileSync("./api-server/primaryUserStore.json", "utf8"));

function saveStoreToFile() {
    fs.writeFileSync(
        "./api-server/primaryUserStore.json",
        JSON.stringify({
            count: userCount,
            store: primaryUserStore,
        }),
        { encoding: "utf8", flag: "w" }
    );
}

const primaryUserStore: { [key: string]: PrimaryUser[] } =
    primaryUserStoreJSON["store"] === undefined ? {} : primaryUserStoreJSON["store"];

function getNewPrimaryUserId() {
    try {
        userCount++;
        return "user" + userCount;
    } finally {
        saveStoreToFile();
    }
}

let userCount = primaryUserStoreJSON["count"] === undefined ? 0 : primaryUserStoreJSON["count"];
console.log("Loaded store: ", primaryUserStore);
console.log("Loaded count: ", userCount);

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
    try {
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
            setInPrimaryStore(existingPrimaryUserId, [primaryUser]);
        } else {
            // user used another login method to sign up
            let existingPrimaryUserInfo = getAllLinkedAccounts(existingPrimaryUserId)!;
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
            setInPrimaryStore(existingPrimaryUserId, existingPrimaryUserInfo);
        }
        return getPrimaryUserIdFromRecipeUserId(userId);
    } finally {
        saveStoreToFile();
    }
}

function setInPrimaryStore(userId: string, value: PrimaryUser[]) {
    try {
        primaryUserStore[getPrimaryUserIdFromString(userId)] = value;
    } finally {
        saveStoreToFile();
    }
}

export function shouldAllowSignUp(identifyingInfo: string): boolean {
    try {
        let existingPrimaryUserId = findPrimaryUserIdIdentifyingInfo(identifyingInfo, false);
        if (existingPrimaryUserId === undefined) {
            return true;
        }
        let result = true;
        let existingPrimaryUserInfo = getAllLinkedAccounts(existingPrimaryUserId)!;

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
    } finally {
        saveStoreToFile();
    }
}

export function findPrimaryUserIdIdentifyingInfo(identifyingInfo: string, shouldVerified: boolean): string | undefined {
    try {
        let recipeUserId: string | undefined = undefined;

        // we loop through all primary users
        Object.keys(primaryUserStore).forEach((userId) => {
            let linkedAccount = getAllLinkedAccounts(userId)!;
            let resultTemp: string | undefined = undefined;

            // we loop through all linked accounts for this primary user
            linkedAccount.forEach((element) => {
                let arrToLoop = shouldVerified ? element.verifiedIdentifyingIds : element.unverifiedIdentifyingIds;

                // we loop through all identifyingInfo for this linked account
                arrToLoop.forEach((i) => {
                    if (i === identifyingInfo) {
                        if (recipeUserId !== undefined) {
                            // it should never come here.. it's there only to catch bugs in the code.
                            throw new Error("Seems like multiple primary users have the same identifying info..");
                        }
                        resultTemp = element.recipeUserId;
                    }
                });
            });

            if (resultTemp !== undefined) {
                recipeUserId = resultTemp;
            }
        });
        return recipeUserId === undefined ? undefined : getPrimaryUserIdFromRecipeUserId(recipeUserId);
    } finally {
        saveStoreToFile();
    }
}

export function getPrimaryUserIdFromRecipeUserId(recipeUserId: string): string {
    try {
        let result: string | undefined = undefined;
        Object.keys(primaryUserStore).forEach((primaryUserId) => {
            let primaryUserInfo = getAllLinkedAccounts(primaryUserId)!;
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
    } finally {
        saveStoreToFile();
    }
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

export function getPrimaryUserIdFromString(str: string) {
    if (str.includes("|")) {
        return str.split("|")[0];
    }
    return str;
}

export function getAllLinkedAccounts(primaryUserId: string): PrimaryUser[] | undefined {
    return primaryUserStore[getPrimaryUserIdFromString(primaryUserId)];
}

/**
 * This should also be run in a cronjob for all the primary user IDs and their recipeIDs
 */
export async function updateIdentifierArraysForRecipeUserId(recipeUserId: string) {
    try {
        let keys = Object.keys(primaryUserStore);
        for (let i = 0; i < keys.length; i++) {
            let primaryUserId = keys[i];
            let allLinkedAccounts = getAllLinkedAccounts(primaryUserId)!;
            for (let y = 0; y < allLinkedAccounts.length; y++) {
                let linkedAccount = allLinkedAccounts[y];
                if (linkedAccount.recipeUserId !== recipeUserId) {
                    continue;
                }
                if (linkedAccount.recipeId === "passwordless") {
                    let user = await Passwordless.getUserById({
                        userId: recipeUserId,
                    });
                    if (user !== undefined) {
                        linkedAccount.unverifiedIdentifyingIds = [];
                        linkedAccount.verifiedIdentifyingIds = [];
                        if (user.email !== undefined) {
                            linkedAccount.isAccountFullyLinked = true;
                            linkedAccount.verifiedIdentifyingIds.push(user.email);
                        }
                        if (user.phoneNumber !== undefined) {
                            linkedAccount.isAccountFullyLinked = true;
                            linkedAccount.verifiedIdentifyingIds.push(user.phoneNumber);
                        }
                    }
                } else if (linkedAccount.recipeId === "emailpassword" || linkedAccount.recipeId === "thirdparty") {
                    let user = await ThirdPartyEmailPassword.getUserById(recipeUserId);
                    if (user !== undefined) {
                        let isEmailVerified = await ThirdPartyEmailPassword.isEmailVerified(recipeUserId);
                        linkedAccount.unverifiedIdentifyingIds = [];
                        linkedAccount.verifiedIdentifyingIds = [];
                        if (isEmailVerified) {
                            linkedAccount.isAccountFullyLinked = true;
                            linkedAccount.verifiedIdentifyingIds = [user.email];
                        } else {
                            linkedAccount.unverifiedIdentifyingIds = [user.email];
                        }
                    }
                } else {
                    throw new Error("Should never come here");
                }
            }
        }
    } finally {
        saveStoreToFile();
    }
}
