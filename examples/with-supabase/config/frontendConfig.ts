import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword";
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
            ThirdPartyEmailPasswordReact.init({
                signInAndUpFeature: {
                    providers: [
                        ThirdPartyEmailPasswordReact.Google.init(),
                        ThirdPartyEmailPasswordReact.Github.init(),
                        ThirdPartyEmailPasswordReact.Apple.init(),
                    ],
                },
            }),
            SessionReact.init(),
        ],
    };
};
