import { AfterViewInit, Component, OnChanges, OnDestroy, SimpleChanges } from "@angular/core";
import * as React from "react";

import * as ReactDOM from "react-dom";

import SuperTokensReactComponent from "./supertokens";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnChanges, AfterViewInit, OnDestroy {
    title = "angularreactapp";

    public rootId = "rootId";

    ngOnChanges(changes: SimpleChanges) {
        this.render();
    }

    ngAfterViewInit() {
        this.render();
    }

    ngOnDestroy() {}

    private render() {
        ReactDOM.render(React.createElement(SuperTokensReactComponent), document.getElementById(this.rootId));
    }
}
