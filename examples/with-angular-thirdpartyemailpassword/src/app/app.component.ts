import { Component } from "@angular/core";

import * as SuperTokens from "supertokens-website";

SuperTokens.init({
    apiDomain: "http://localhost:3001",
});

@Component({
    selector: "app-root",
    template: "<router-outlet></router-outlet>",
})
export class AppComponent {
    title = "with-angular-thirdpartyemailpassword";
}
