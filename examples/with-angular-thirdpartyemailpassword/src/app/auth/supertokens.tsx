import * as React from "react";
import * as SuperTokens from "supertokens-auth-react";

import * as ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";

import { Github, Google } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App", // TODO: Your app name
        apiDomain: "http://localhost:3001", // TODO: Change to your app's API domain
        websiteDomain: "http://localhost:4200", // TODO: Change to your app's website domain
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            signInAndUpFeature: {
                providers: [Github.init(), Google.init()],
            },
            emailVerificationFeature: {
                mode: "REQUIRED",
            },
        }),
        Session.init(),
    ],
});

class SuperTokensReactComponent extends React.Component {
    override render() {
        if (SuperTokens.canHandleRoute()) {
            return SuperTokens.getRoutingComponent();
        }
        return "Route not found";
    }
}

export default SuperTokensReactComponent;
