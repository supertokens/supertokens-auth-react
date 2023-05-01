import ThirdParty, { Google, Github, Apple } from "supertokens-auth-react/recipe/thirdparty";
import Session from "supertokens-auth-react/recipe/session";

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
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [Google.init(), Github.init(), Apple.init()],
            },

            override: {
                functions: (oI) => {
                    return {
                        ...oI,
                        getAuthCodeFromURL: (input) => {
                            if (input.userContext.oneTap) {
                                const code = window.localStorage.getItem("oneTapCredential");
                                window.localStorage.removeItem("oneTapCredential");
                                return `${code}`;
                            }
                            return oI.getAuthCodeFromURL(input);
                        },
                        getAuthStateFromURL: (input) => {
                            if (input.userContext.oneTap) {
                                const state = window.localStorage.getItem("oneTapState");
                                window.localStorage.removeItem("oneTapState");
                                return `${state}`;
                            }
                            return oI.getAuthStateFromURL(input)
                        }
                    }
                },
            }
        }),
        Session.init(),
    ],
};

export const recipeDetails = {
    docsLink: "https://supertokens.com/docs/thirdparty/introduction",
};
