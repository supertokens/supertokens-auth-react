import ThirdPartyEmailPasswordReact, { Google, Facebook } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
import ThirdPartyEmailPasswordNode, {
    Google as GoogleNode,
    Facebook as FacebookNode,
} from "supertokens-node/recipe/thirdpartyemailpassword";
import SessionNode from "supertokens-node/recipe/session";

let appInfo = {
    appName: "SuperTokens Demo Blitz", // TODO: Your app name
    websiteDomain: "http://localhost:3000", // TODO: Add your website domain
    apiDomain: "http://localhost:3000", // TODO: should be equal to `websiteDomain` in case using the `api` folder for APIs
    apiBasePath: "/api/auth/", // /api/auth/* will be where APIs like sign out, sign in will be exposed
};

export let frontendConfig = () => {
    return {
        useReactRouterDom: false,
        appInfo,
        recipeList: [
            ThirdPartyEmailPasswordReact.init({
                signInAndUpFeature: {
                    providers: [Google.init(), Facebook.init()],
                },
            }),
            SessionReact.init(),
        ],
    };
};

export let backendConfig = () => {
    return {
        supertokens: {
            connectionURI: "https://try.supertokens.io",
        },
        appInfo,
        recipeList: [
            ThirdPartyEmailPasswordNode.init({
                providers: [
                    GoogleNode({
                        clientSecret: "TODO ADD SECRET",
                        clientId: "TODO ADD SECRET",
                    }),
                    FacebookNode({
                        clientSecret: "TODO ADD SECRET",
                        clientId: "TODO ADD SECRET",
                    }),
                ],
            }),
            SessionNode.init(),
        ],
        isInServerlessEnv: true,
    };
};
