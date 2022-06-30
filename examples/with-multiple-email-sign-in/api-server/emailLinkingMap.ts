/**
 * Primary user ID => {contactInfo (email or phone number), id (primary User ID), time joined, pwlessUserId, tpepUserIds }
 * Primary key: user ID,
 * Unique: contactInfo,
 *
 * This will map an email or phone number to a primary user. That primary user will then be used
 * for all users that have the same contact info, regardless of which login method they used.
 */
import fs from "fs";

if (!fs.existsSync("./api-server/primaryUserStore.json")) {
    fs.writeFileSync("./api-server/primaryUserStore.json", JSON.stringify({}), { encoding: "utf8", flag: "w" });
}
let primaryUserStore = JSON.parse(fs.readFileSync("./api-server/primaryUserStore.json", "utf8"));

function saveStoreToFile() {
    fs.writeFileSync("./api-server/primaryUserStore.json", JSON.stringify(primaryUserStore), {
        encoding: "utf8",
        flag: "w",
    });
}

console.log("Loaded store: ", primaryUserStore);
