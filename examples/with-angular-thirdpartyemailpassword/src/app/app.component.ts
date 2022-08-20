import { Component } from "@angular/core";

import * as SuperTokens from "supertokens-web-js";
import * as EmailVerification from "supertokens-web-js/recipe/emailverification";
import * as Session from "supertokens-web-js/recipe/session";

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo",
        apiDomain: "http://localhost:3001",
    },
    recipeList: [
        EmailVerification.init({}),
        Session.init({
            override: {
                functions: (oI) => ({
                    ...oI,
                    getGlobalClaimValidators(input) {
                        return [
                            ...input.claimValidatorsAddedByOtherRecipes,
                            EmailVerification.EmailVerificationClaim.validators.isVerified(),
                        ];
                    },
                }),
            },
        }),
    ],
});

@Component({
    selector: "app-root",
    template: "<router-outlet></router-outlet>",
})
export class AppComponent {
    title = "with-angular-thirdpartyemailpassword";
}
