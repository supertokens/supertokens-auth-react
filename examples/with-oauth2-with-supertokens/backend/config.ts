import OAuth2Client from "supertokens-node/recipe/oauth2client";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";

const AUTH_SERVER_URL = process.env.REACT_APP_AUTH_SERVER_API_URL || "http://localhost.com:3006";

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
        OAuth2Client.init({
            providerConfig: {
                clientId: "REPLACE_WITH_YOUR_CLIENT_ID",
                oidcDiscoveryEndpoint: `${AUTH_SERVER_URL}/auth/.well-known/openid-configuration`,
            },
        }),
        Session.init(),
    ],
};
