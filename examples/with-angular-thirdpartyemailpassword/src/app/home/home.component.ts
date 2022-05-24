import { AfterViewInit, Component, OnChanges, OnDestroy, SimpleChanges } from "@angular/core";

import * as Session from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

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
        if (await Session.doesSessionExist()) {
            this.userId = await Session.getUserId();
        }
    }

    async onLogout() {
        await signOut();
        window.location.reload();
    }

    redirectToLogin() {
        window.location.href = "auth";
    }
}
