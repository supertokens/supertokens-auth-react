import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";

import { appInfo } from "./appInfo";

export const backendConfig = () => {
    return {
        framework: "express",
        supertokens: {
            connectionURI: "https://try.supertokens.com",
        },
        appInfo,
        recipeList: [
            EmailPassword.init(),
            Session.init({
                cookieSameSite: "none",
                antiCsrf: "VIA_TOKEN",
            }),
        ],
        isInServerlessEnv: true,
    };
};
