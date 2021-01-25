import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

// TODO Remove and replace with a constant with 0.5.
import { EMAIL_VERIFICATION_MODE } from "supertokens-auth-react/lib/build/recipe/emailpassword/constants";

if (typeof window !== "undefined") {
    SuperTokens.init({
        appInfo: {
            appName: "SuperTokens Demo Blitz",
            websiteDomain: "http://localhost:3000",
            apiDomain: "http://localhost:3000",
            apiBasePath: "/api/auth"
        },
        recipeList: [
            EmailPassword.init({
                emailVerificationFeature: {
                    mode: EMAIL_VERIFICATION_MODE.REQUIRED
                }
            }),
            Session.init()
        ]
    });
}