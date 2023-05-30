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
                            let payload = input.session.getAccessTokenPayload();
                            if (payload.toUpdateEmail !== undefined) {
                                input.userContext.toUpdateEmail = payload.toUpdateEmail;
                            }
                            let response = await oI.isEmailVerifiedGET!(input);
                            if (
                                response.status === "OK" &&
                                response.isVerified &&
                                payload.toUpdateEmail !== undefined
                            ) {
                                // we have this here in case the user verifies the email
                                // on another browser.
                                await input.session.mergeIntoAccessTokenPayload({
                                    toUpdateEmail: null,
                                });
                                await EmailPassword.updateEmailOrPassword({
                                    userId: input.session.getUserId(),
                                    email: payload.toUpdateEmail,
                                });
                            }
                            return response;
                        },
                        generateEmailVerifyTokenPOST: async function (input) {
                            let payload = input.session.getAccessTokenPayload();
                            if (payload.toUpdateEmail !== undefined) {
                                input.userContext.toUpdateEmail = payload.toUpdateEmail;
                            }
                            return oI.generateEmailVerifyTokenPOST!(input);
                        },
                        verifyEmailPOST: async function (input) {
                            let response = await oI.verifyEmailPOST!(input);
                            if (response.status === "OK") {
                                if (input.session !== undefined) {
                                    // session can be undefined if the user verifies the email
                                    // using a different browser.
                                    await input.session.mergeIntoAccessTokenPayload({
                                        toUpdateEmail: null,
                                    });
                                }
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
                if (userContext.toUpdateEmail !== undefined) {
                    return {
                        status: "OK",
                        email: userContext.toUpdateEmail,
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
