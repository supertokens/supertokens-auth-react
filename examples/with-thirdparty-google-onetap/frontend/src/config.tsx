import ThirdParty, { Github, Apple } from "supertokens-auth-react/recipe/thirdparty";
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
            style: `
                [data-supertokens~=container] {
                    width: 500px;
                }
            `,
            useShadowDom: false,
            signInAndUpFeature: {
                providers: [Github.init(), Apple.init()],
            },

            override: {
                functions: (oI) => {
                    return {
                        ...oI,
                        getAuthStateFromURL: (input) => {
                            if (input.userContext.state) {
                                return input.userContext.state;
                            }
                            return oI.getAuthStateFromURL(input);
                        },
                    };
                },
            },
            preAPIHook: async (context) => {
                if (context.action === "THIRD_PARTY_SIGN_IN_UP") {
                    if (typeof context.requestInit.body !== "string") {
                        throw new Error("should not happen");
                    }
                    let body = JSON.parse(context.requestInit.body);

                    body!.redirectURIInfo = undefined;
                    body!.oAuthTokens = { id_token: context.userContext.id_token };

                    context.requestInit.body = JSON.stringify(body);
                }
                return context;
            },
        }),
        Session.init(),
    ],
};

export const recipeDetails = {
    docsLink: "https://supertokens.com/docs/thirdparty/introduction",
};
