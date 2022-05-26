import { AfterViewInit, Component } from "@angular/core";

import * as SuperTokens from "supertokens-website";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent implements AfterViewInit {
    title = "angularreactapp";

    public rootId = "rootId";
    public userId = "";
    public session = false;

    ngAfterViewInit() {
        this.getUserInfo();
    }

    async getUserInfo() {
        this.session = await SuperTokens.doesSessionExist();
        if (this.session) {
            this.userId = await SuperTokens.getUserId();
        }
    }

    async onLogout() {
        await SuperTokens.signOut();
        window.location.reload();
    }

    redirectToLogin() {
        window.location.href = "auth";
    }
}
