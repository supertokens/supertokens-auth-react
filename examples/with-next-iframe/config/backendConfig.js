import EmailPassword from "supertokens-node/recipe/emailpassword";
import EmailVerification from "supertokens-node/recipe/emailverification";
import Session from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";

import { appInfo } from "./appInfo";

export const backendConfig = () => {
    return {
        framework: "express",
        supertokens: {
            connectionURI: "https://try.supertokens.com",
        },
        appInfo,
        recipeList: [
            EmailVerification.init({
                mode: "REQUIRED",
            }),
            EmailPassword.init(),
            Session.init({
                cookieSameSite: "none",
                antiCsrf: "VIA_TOKEN",
            }),
            Dashboard.init(),
        ],
        isInServerlessEnv: true,
    };
};
