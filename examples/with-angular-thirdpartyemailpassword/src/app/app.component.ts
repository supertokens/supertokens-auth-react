import { Component } from "@angular/core";
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

@Component({
    selector: "app-root",
    template: "<router-outlet></router-outlet>",
})
export class AppComponent {
    title = "with-angular-thirdpartyemailpassword";
}
