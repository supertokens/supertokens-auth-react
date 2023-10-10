import ThirdPartyEmailPassword, { Google, Github, Apple } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";
import Passwordless from "supertokens-auth-react/recipe/passwordless";

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

export const SuperTokensConfig = {
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getWebsiteDomain(),
    },
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
        EmailVerification.init({
            mode: "REQUIRED",
        }),
        ThirdPartyEmailPassword.init({
            signInAndUpFeature: {
                providers: [
                    Github.init({
                        getRedirectURL: (id) => {
                            if (window.location.pathname.startsWith("/link")) {
                                return `${getWebsiteDomain()}/link/tpcallback/${id}`;
                            }
                            return `${getWebsiteDomain()}/auth/callback/${id}`;
                        },
                    }),
                    Google.init({
                        getRedirectURL: (id) => {
                            if (window.location.pathname.startsWith("/link")) {
                                return `${getWebsiteDomain()}/link/tpcallback/${id}`;
                            }
                            return `${getWebsiteDomain()}/auth/callback/${id}`;
                        },
                    }),
                ],
            },
        }),
        Passwordless.init({
            contactMethod: "EMAIL_OR_PHONE",
        }),
        Session.init(),
    ],
};

export const recipeDetails = {
    docsLink: "https://supertokens.com/docs/thirdpartyemailpassword/introduction",
};

export const PreBuiltUIList = [ThirdPartyEmailPasswordPreBuiltUI, PasswordlessPreBuiltUI, EmailVerificationPreBuiltUI];
