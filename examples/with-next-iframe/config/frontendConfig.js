import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import Session from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";
import getCookieHandler from "./cookieHandler";
import getWindowHandler from "./windowHandler";

export const frontendConfig = () => {
    return {
        appInfo,
        cookieHandler: getCookieHandler,
        windowHandler: getWindowHandler,
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
