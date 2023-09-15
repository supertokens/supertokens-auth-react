import EmailPassword from "supertokens-node/recipe/emailpassword";
import EmailVerification from "supertokens-node/recipe/emailverification";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";

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
                        verifyEmailPOST: async function (input) {
                            let response = await oI.verifyEmailPOST!(input);
                            if (response.status === "OK") {
                                // This will update the email of the user to the one
                                // that was just marked as verified by the token.
                                await EmailPassword.updateEmailOrPassword({
                                    recipeUserId: response.user.recipeUserId,
                                    email: response.user.email,
                                });
                            }
                            return response;
                        },
                    };
                },
            },
        }),
    ],
};
