import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

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
                    mode: "REQUIRED"
                }
            }),
            Session.init()
        ]
    });
}