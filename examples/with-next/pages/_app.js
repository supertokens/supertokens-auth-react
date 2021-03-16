import "../styles/globals.css";
import React from "react";
import SuperTokensReact from "supertokens-auth-react";
import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
import SuperTokensNode from "supertokens-node";
import SessionNode from "supertokens-node/recipe/session";
import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword";

const port = process.env.APP_PORT || 3000;
const websiteDomain = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${port}`;
const apiBasePath = "/api/auth/";

if (typeof window !== "undefined") {
    SuperTokensReact.init({
        useReactRouterDom: false,
        appInfo: {
            appName: "SuperTokens Demo Next",
            websiteDomain,
            apiDomain: websiteDomain,
            apiBasePath
        },
        recipeList: [
            ThirdPartyEmailPasswordReact.init({
                signInAndUpFeature: {
                    providers: [
                        ThirdPartyEmailPasswordReact.Facebook.init(),
                        ThirdPartyEmailPasswordReact.Google.init(),
                        ThirdPartyEmailPasswordReact.Github.init()
                    ]
                },
                emailVerificationFeature: {
                    mode: "REQUIRED"
                }
            }),
            SessionReact.init()
        ]
    });
} else {
    /*
     * Get .env variables.
     */
    require("dotenv").config();

    SuperTokensNode.init({
        supertokens: {
            connectionURI: "https://try.supertokens.io"
        },
        appInfo: {
            appName: "SuperTokens Demo App",
            apiDomain: websiteDomain,
            websiteDomain,
            apiBasePath
        },
        recipeList: [
            ThirdPartyEmailPasswordNode.init({
                providers: [
                    ThirdPartyEmailPasswordNode.Google({
                        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                        clientId: process.env.GOOGLE_CLIENT_ID
                    }),
                    ThirdPartyEmailPasswordNode.Github({
                        clientSecret: process.env.GITHUB_CLIENT_SECRET,
                        clientId: process.env.GITHUB_CLIENT_ID
                    }),
                    ThirdPartyEmailPasswordNode.Facebook({
                        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                        clientId: process.env.FACEBOOK_CLIENT_ID
                    })
                ]
            }),
            SessionNode.init()
        ],
        isInServerlessEnv: true
    });
}

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
