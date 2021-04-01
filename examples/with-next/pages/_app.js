import '../styles/globals.css'
import React from 'react'
import SuperTokensReact from "supertokens-auth-react";
import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
import SuperTokensNode from "supertokens-node"
import SessionNode from "supertokens-node/recipe/session"
import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword"

const port = process.env.APP_PORT || 3000
const websiteDomain = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${port}`
const apiBasePath = '/api/auth/'

if (typeof window !== "undefined") {
  // Here we initialise supertokens on the frontend.

  SuperTokensReact.init({
    useReactRouterDom: false,
    appInfo: {
      appName: "SuperTokens Demo Next", // your app name
      websiteDomain, // the domain of your website. For example, "https://example.com"
      apiDomain: websiteDomain,
      apiBasePath // The path prefix to calling APIs on your backend. Value is /api/auth/.
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
        },
      }),
      SessionReact.init()
    ]
  });
} else {
  // Here we initialise supertokens on the backend.

  require('dotenv').config();

  SuperTokensNode.init({
    supertokens: {
      // info to connect to supertokens core
      connectionURI: "https://try.supertokens.io",
    },
    appInfo: { // this is the same as in the above init function call
      appName: "SuperTokens Demo App",
      apiDomain: websiteDomain,
      websiteDomain,
      apiBasePath
    },
    recipeList: [
      ThirdPartyEmailPasswordNode.init({
        providers: [

          // we provide the various secrets for each of the social providers
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
  });
}


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
