import ThirdPartyEmailPassword, { Google, Github, Apple } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import MultiFactorAuth from "supertokens-auth-react/recipe/multifactorauth";
import { MultiFactorAuthPreBuiltUI } from "supertokens-auth-react/recipe/multifactorauth/prebuiltui";
import TOTP from "supertokens-auth-react/recipe/totp";
import { TOTPPreBuiltUI } from "supertokens-auth-react/recipe/totp/prebuiltui";

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
        MultiFactorAuth.init({
            getRedirectionURL: async (ctx) => {
                if (await Passwordless.getLoginAttemptInfo()) {
                    return;
                }

                if (
                    ctx.action === "GO_TO_FACTOR" &&
                    ctx.factorId === MultiFactorAuth.FactorIds.OTP_PHONE &&
                    !ctx.forceSetup
                ) {
                    return "/select-phone";
                }
            },
        }),
        ThirdPartyEmailPassword.init({
            signInAndUpFeature: {
                providers: [Github.init(), Google.init()],
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

export const PreBuiltUIList = [
    ThirdPartyEmailPasswordPreBuiltUI,
    PasswordlessPreBuiltUI,
    EmailVerificationPreBuiltUI,
    MultiFactorAuthPreBuiltUI,
];
