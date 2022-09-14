import { AfterViewInit, Component } from "@angular/core";

import * as Session from "supertokens-web-js/recipe/session";
import * as EmailVerification from "supertokens-web-js/recipe/emailverification";

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
    public emailVerificationStatus = "";

    ngAfterViewInit() {
        this.getUserInfo();
    }

    async getUserInfo() {
        this.session = await Session.doesSessionExist();
        if (this.session) {
            this.userId = await Session.getUserId();
            const accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
            const emailVerificationValue =
                EmailVerification.EmailVerificationClaim.getValueFromPayload(accessTokenPayload);
            if (emailVerificationValue === true) {
                this.emailVerificationStatus = "Email verified";
            } else if (emailVerificationValue === false) {
                this.emailVerificationStatus = "Email not verified";
            } else {
                this.emailVerificationStatus = "Email verification status is unknown";
            }
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
