import { APIInterface } from "supertokens-node/recipe/emailpassword";
import { getPrimaryEmailFromInputEmail } from "./emailLinkingMap";

export function epOverride(oI: APIInterface): APIInterface {
    return {
        ...oI,
        signInPOST: async function (input) {
            const emailField = input.formFields.find((f) => f.id === "email")!;

            let primaryEmail = getPrimaryEmailFromInputEmail(emailField.value as string);
            if (primaryEmail !== undefined) {
                emailField.value = primaryEmail;
            }
            return oI.signInPOST!(input);
        },
        signUpPOST: async function (input) {
            const emailField = input.formFields.find((f) => f.id === "email")!;

            let primaryEmail = getPrimaryEmailFromInputEmail(emailField.value as string);
            if (primaryEmail !== undefined) {
                emailField.value = primaryEmail;
            }

            return oI.signUpPOST!(input);
        },
    };
}
