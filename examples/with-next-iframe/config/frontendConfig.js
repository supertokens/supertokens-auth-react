import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";

export const frontendConfig = () => {
    return {
        appInfo,
        recipeList: [
            EmailPassword.init({
                emailVerificationFeature: {
                    mode: "REQUIRED",
                },
            }),
            Session.init({
                isInIframe: true,
            }),
        ],
    };
};
