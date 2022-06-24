import { AfterViewInit, Component } from "@angular/core";

import * as Session from "supertokens-web-js/recipe/session";

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
        this.session = await Session.doesSessionExist();
        if (this.session) {
            this.userId = await Session.getUserId();
        }
    }

    async onLogout() {
        await Session.signOut();
        window.location.reload();
    }

    redirectToLogin() {
        window.location.href = "auth";
    }
}
