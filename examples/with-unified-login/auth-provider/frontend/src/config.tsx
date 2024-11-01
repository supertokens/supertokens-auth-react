import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import ThirdParty from "supertokens-auth-react/recipe/thirdparty";
import MultiTenancy from "supertokens-auth-react/recipe/multitenancy";
import OAuth2Provider from "supertokens-auth-react/recipe/oauth2provider";
import { OAuth2ProviderPreBuiltUI } from "supertokens-auth-react/recipe/oauth2provider/prebuiltui";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";
import React from "react";

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
    usesDynamicLoginMethods: true,
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getWebsiteDomain(),
    },
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
        EmailPassword.init(),
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    ThirdParty.Github.init(),
                    ThirdParty.Google.init(),
                    ThirdParty.Apple.init(),
                    ThirdParty.Twitter.init(),
                ],
            },
        }),
        Passwordless.init({
            contactMethod: "EMAIL_OR_PHONE",
        }),
        Session.init(),
        OAuth2Provider.init() as any,
        MultiTenancy.init(),
    ],
};

export const recipeDetails = {
    docsLink: "https://supertokens.com/docs/thirdpartypasswordless/introduction",
};

export const PreBuiltUIList = [
    EmailPasswordPreBuiltUI,
    ThirdPartyPreBuiltUI,
    PasswordlessPreBuiltUI,
    OAuth2ProviderPreBuiltUI as any,
];
