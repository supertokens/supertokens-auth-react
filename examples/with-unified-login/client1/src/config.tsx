import Session from "supertokens-auth-react/recipe/session";

export function getApiDomain() {
    const apiPort = 3001;
    const apiUrl = `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = 3011;
    const websiteUrl = `http://localhost:${websitePort}`;
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
        Session.init({
            tokenTransferMethod: "header",
        }),
    ],
};

export const recipeDetails = {
    docsLink: "https://supertokens.com/docs/thirdparty/introduction",
};

export const PreBuiltUIList = [];

export const ComponentWrapper = (props: { children: JSX.Element }): JSX.Element => {
    return props.children;
};
