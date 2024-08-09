import EmailPassword from "supertokens-node/recipe/emailpassword";
import OAuth2Provider from "supertokens-node/recipe/oauth2provider";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";

export function getWebsiteDomain() {
    return process.env.REACT_APP_AUTH_SERVER_WEBSITE_URL || "http://localhost:3005";
}

export function getApiDomain() {
    return process.env.REACT_APP_AUTH_SERVER_API_URL || "http://localhost:3006";
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
    recipeList: [EmailPassword.init(), OAuth2Provider.init(), Session.init()],
};
