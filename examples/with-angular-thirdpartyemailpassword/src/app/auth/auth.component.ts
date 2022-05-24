import { AfterViewInit, Component } from "@angular/core";
import * as React from "react";

import * as ReactDOM from "react-dom";

import SuperTokensReactComponent from "./supertokens";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements AfterViewInit {
    title = "angularreactapp";

    public rootId = "rootId";

    ngAfterViewInit() {
        this.render();
    }

    private render() {
        ReactDOM.render(React.createElement(SuperTokensReactComponent), document.getElementById(this.rootId));
    }
}
