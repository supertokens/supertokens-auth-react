import ThirdPartyEmailPasswordReact, {
  Google,
  Github,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword"
import SessionReact from "supertokens-auth-react/recipe/session"
import ThirdPartyEmailPasswordNode, {
  Google as GoogleNode,
  Github as GithubNode,
} from "supertokens-node/recipe/thirdpartyemailpassword"
import SessionNode from "supertokens-node/recipe/session"

let appInfo = {
  appName: "SuperTokens Demo Blitz", // TODO: Your app name
  websiteDomain: "http://localhost:3000", // TODO: Add your website domain
  apiDomain: "http://localhost:3000", // TODO: should be equal to `websiteDomain` in case using the `api` folder for APIs
  apiBasePath: "/api/auth/", // /api/auth/* will be where APIs like sign out, sign in will be exposed
}

export let frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        signInAndUpFeature: {
          providers: [Google.init(), Github.init()],
        },
      }),
      SessionReact.init(),
    ],
  }
}

export let backendConfig = () => {
  return {
    supertokens: {
      connectionURI: "https://try.supertokens.io",
    },
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordNode.init({
        providers: [
          // We have provided you with development keys which you can use for testing.
          // IMPORTANT: Please replace them with your own OAuth keys for production use.
          GoogleNode({
            clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
            clientSecret: "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",
          }),
          GithubNode({
            clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
            clientId: "467101b197249757c71f",
          }),
        ],
      }),
      SessionNode.init(),
    ],
    isInServerlessEnv: true,
  }
}
