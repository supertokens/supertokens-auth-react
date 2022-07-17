import { RecipeInterface } from "supertokens-node/recipe/emailverification";
import { getAllAssociatedEmailsWithPrimaryEmail } from "./emailLinkingMap";

/**
 * We override the default implementation of email verification
 * to loop through all the associated emails of a user when running the functions.
 *
 * The looping order is important here.
 */

export function evOverride(oI: RecipeInterface): RecipeInterface {
    return {
        ...oI,
        createEmailVerificationToken: async function (input) {
            // associatedEmails will also contain the primary email
            let associatedEmails = getAllAssociatedEmailsWithPrimaryEmail(input.email);
            let unverifiedEmail: string | undefined = undefined;
            for (let i = 0; i < associatedEmails.length; i++) {
                let email = associatedEmails[i];
                if (
                    unverifiedEmail === undefined &&
                    !(await oI.isEmailVerified({
                        ...input,
                        email,
                    }))
                ) {
                    unverifiedEmail = email;
                }
            }
            if (unverifiedEmail === undefined) {
                return {
                    status: "EMAIL_ALREADY_VERIFIED_ERROR",
                };
            }
            // we set this userContext here so that the function that sends the email
            // can read the actual unverified email ID instead of reading the primary email ID
            input.userContext.unverifiedAssociatedEmail = unverifiedEmail;
            return oI.createEmailVerificationToken({
                ...input,
                email: unverifiedEmail,
            });
        },
        isEmailVerified: async function (input) {
            // associatedEmails will also contain the primary email
            let associatedEmails = getAllAssociatedEmailsWithPrimaryEmail(input.email);
            for (let i = 0; i < associatedEmails.length; i++) {
                let email = associatedEmails[i];
                if (
                    !(await oI.isEmailVerified({
                        ...input,
                        email,
                    }))
                ) {
                    return false;
                }
            }
            return true;
        },
    };
}
