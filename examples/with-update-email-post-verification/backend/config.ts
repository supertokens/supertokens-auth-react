import EmailPassword from "supertokens-node/recipe/emailpassword";
import EmailVerification from "supertokens-node/recipe/emailverification";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import supertokens from "supertokens-node";

export function getApiDomain() {
    const apiPort = process.env.REACT_APP_API_PORT || 3001;
    const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return websiteUrl;
}

function getEmailFromUserContext(userContext: any): string | undefined {
    let request = supertokens.getRequestFromUserContext(userContext);
    if (request !== undefined) {
        let email = request.getKeyValueFromQuery("email");
        if (email !== undefined) {
            // we check if the email is a valid email here
            let regexp = new RegExp(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

            if (regexp.test(email)) {
                return email;
            }
        }
    }
    return undefined;
}

export const SuperTokensConfig: TypeInput = {
    supertokens: {
        // this is the location of the SuperTokens core.
        connectionURI: "https://try.supertokens.com",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getWebsiteDomain(),
    },
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
        EmailPassword.init(),
        Session.init(),
        Dashboard.init(),
        EmailVerification.init({
            mode: "REQUIRED",
            override: {
                apis: (oI) => {
                    return {
                        ...oI,
                        isEmailVerifiedGET: async function (input) {
                            let response = await oI.isEmailVerifiedGET!(input);
                            if (response.status === "OK" && response.isVerified) {
                                let email = getEmailFromUserContext(input.userContext);
                                if (email !== undefined) {
                                    await EmailPassword.updateEmailOrPassword({
                                        userId: input.session.getUserId(),
                                        email,
                                    });
                                }
                            }
                            return response;
                        },
                        verifyEmailPOST: async function (input) {
                            let response = await oI.verifyEmailPOST!(input);
                            if (response.status === "OK") {
                                await EmailPassword.updateEmailOrPassword({
                                    userId: response.user.id,
                                    email: response.user.email,
                                });
                            }
                            return response;
                        },
                    };
                },
            },
            getEmailForUserId: async (userId, userContext) => {
                let email = getEmailFromUserContext(userContext);
                if (email !== undefined) {
                    return {
                        status: "OK",
                        email,
                    };
                }
                // this means that we will let the default implementation of getEmailForUserId
                // get the email for the user from the other initialized auth recipes (in this case
                // EmailPassword recipe).
                return {
                    status: "UNKNOWN_USER_ID_ERROR",
                };
            },
        }),
    ],
};
