/**
 * Primary email => [email1, email2, ...]
 * Where email1, email2 are secondary emails added by this user.
 */
import fs from "fs";

if (!fs.existsSync("./api-server/primaryUserStore.json")) {
    fs.writeFileSync("./api-server/primaryUserStore.json", JSON.stringify({}), { encoding: "utf8", flag: "w" });
}
let primaryUserStore: { [key: string]: string[] } = JSON.parse(
    fs.readFileSync("./api-server/primaryUserStore.json", "utf8")
);

function saveStoreToFile() {
    fs.writeFileSync("./api-server/primaryUserStore.json", JSON.stringify(primaryUserStore), {
        encoding: "utf8",
        flag: "w",
    });
}

console.log("Loaded store: ", primaryUserStore);

export function associateNewEmailWithPrimaryEmail(newEmail: string, primaryEmail: string): boolean {
    try {
        let existingPrimaryEmail = getPrimaryEmailFromInputEmail(newEmail);
        if (existingPrimaryEmail !== undefined) {
            return existingPrimaryEmail === primaryEmail;
        }

        let existingList = primaryUserStore[primaryEmail];
        if (existingList === undefined) {
            existingList = [];
        }
        existingList = [...existingList, newEmail];
        primaryUserStore[primaryEmail] = existingList;
        return true;
    } finally {
        saveStoreToFile();
    }
}

// the input email can be a primary or non primary one.
export function getPrimaryEmailFromInputEmail(inputEmail: string): string | undefined {
    let keys = Object.keys(primaryUserStore);
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === inputEmail) {
            // the input itself is the primary key
            return keys[i];
        }
        // we get the list of associated emails for the current primary email
        let secondaryEmails = primaryUserStore[keys[i]];
        for (let y = 0; y < secondaryEmails.length; y++) {
            if (secondaryEmails[y] === inputEmail) {
                return keys[i];
            }
        }
    }
    return undefined;
}

export function getAllAssociatedEmailsWithPrimaryEmail(primaryEmail: string): string[] {
    let result = primaryUserStore[primaryEmail];
    if (result === undefined) {
        return [primaryEmail];
    }
    return [primaryEmail, ...result];
}
