import ThirdPartyReact from "supertokens-auth-react/recipe/thirdparty";
import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
import EmailVerificationReact from "supertokens-auth-react/recipe/emailverification";
import { appInfo } from "./appInfo";

export let frontendConfig = () => {
    return {
        appInfo,
        recipeList: [
            EmailVerificationReact.init({
                mode: "REQUIRED",
            }),
            ThirdPartyReact.init({
                signInAndUpFeature: {
                    providers: [
                        ThirdPartyReact.Google.init(),
                        ThirdPartyReact.Github.init(),
                        ThirdPartyReact.Apple.init(),
                    ],
                },
            }),
            EmailPasswordReact.init(),
            SessionReact.init(),
        ],
    };
};
