import { RecipeInterface } from "supertokens-node/recipe/emailpassword";
import { getPrimaryEmailFromInputEmail } from "./emailLinkingMap";

export function epOverride(oI: RecipeInterface): RecipeInterface {
    return {
        ...oI,
        signIn: async function (input) {
            let primaryEmail = getPrimaryEmailFromInputEmail(input.email);
            if (primaryEmail !== undefined) {
                input.email = primaryEmail;
            }
            return oI.signIn(input);
        },
        signUp: async function (input) {
            let primaryEmail = getPrimaryEmailFromInputEmail(input.email);
            if (primaryEmail !== undefined) {
                input.email = primaryEmail;
            }
            return oI.signUp(input);
        },
        getUserByEmail: async function (input) {
            let primaryEmail = getPrimaryEmailFromInputEmail(input.email);
            if (primaryEmail !== undefined) {
                input.email = primaryEmail;
            }
            return oI.getUserByEmail(input);
        },
    };
}
