import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import Session from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";

export const frontendConfig = () => {
    return {
        appInfo,
        recipeList: [
            EmailVerification.init({
                mode: "REQUIRED",
            }),
            EmailPassword.init(),
            Session.init({
                isInIframe: true,
                tokenTransferMethod: "header",
            }),
        ],
    };
};
