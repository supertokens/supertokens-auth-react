import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword";
import SessionNode from "supertokens-node/recipe/session";

import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";

// const port = process.env.APP_PORT || 3000;
export const websiteDomain = "https://dd1f-45-127-45-122.ngrok.io";
const apiBasePath = "/api/auth/";

let appInfo = {
    appName: "SuperTokens Demo App",
    websiteDomain,
    apiDomain: websiteDomain,
    apiBasePath,
};

export let backendConfig = () => {
    return {
        framework: "express",
        supertokens: {
            connectionURI: "https://try.supertokens.io",
        },
        appInfo,
        recipeList: [
            ThirdPartyEmailPasswordNode.init({
                providers: [
                    // We have provided you with development keys which you can use for testing.
                    // IMPORTANT: Please replace them with your own OAuth keys for production use.
                    ThirdPartyEmailPasswordNode.Google({
                        clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                        clientSecret: "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",
                    }),
                    ThirdPartyEmailPasswordNode.Github({
                        clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
                        clientId: "467101b197249757c71f",
                    }),
                    // ThirdPartyEmailPasswordNode.Facebook({
                    //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "PLACEHOLDER",
                    //     clientId: process.env.FACEBOOK_CLIENT_ID || "PLACEHOLDER",
                    // }),
                ],
            }),
            SessionNode.init({
                cookieSameSite: "none",
                antiCsrf: "VIA_TOKEN",
            }),
        ],
        isInServerlessEnv: true,
    };
};

export let frontendConfig = () => {
    return {
        appInfo,
        recipeList: [
            ThirdPartyEmailPasswordReact.init({
                emailVerificationFeature: {
                    mode: "REQUIRED",
                },
                signInAndUpFeature: {
                    providers: [ThirdPartyEmailPasswordReact.Google.init(), ThirdPartyEmailPasswordReact.Github.init()],
                },
            }),
            SessionReact.init({
                isInIframe: true,
            }),
        ],
    };
};
