import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import OAuth2Provider from "supertokens-auth-react/recipe/oauth2provider";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";

export function getWebsiteDomain() {
    return process.env.REACT_APP_AUTH_SERVER_WEBSITE_URL || "http://localhost:3005";
}

export function getApiDomain() {
    return process.env.REACT_APP_AUTH_SERVER_API_URL || "http://localhost:3006";
}

export const SuperTokensConfig = {
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getWebsiteDomain(),
    },
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [EmailPassword.init(), OAuth2Provider.init(), Session.init()],
};

export const recipeDetails = {
    docsLink: "https://supertokens.com/docs/thirdparty/introduction",
};

export const PreBuiltUIList = [EmailPasswordPreBuiltUI];

export const ComponentWrapper = (props: { children: JSX.Element }): JSX.Element => {
    return props.children;
};
