import { Component, OnDestroy, AfterViewInit } from "@angular/core";
import * as React from "react";

import * as ReactDOM from "react-dom";

import SuperTokensReactComponent from "./supertokens";

@Component({
    selector: "app-auth",
    template: '<div [id]="rootId"></div>',
})
export class AuthComponent implements OnDestroy, AfterViewInit {
    title = "angularreactapp";

    public rootId = "rootId";

    // We use the ngAfterViewInit lifecycle hook to render the React component after the Angular component  view gets initialized
    ngAfterViewInit() {
        ReactDOM.render(React.createElement(SuperTokensReactComponent), document.getElementById(this.rootId));
    }

    // We use the ngOnDestroy lifecycle hook to unmount the React component when the Angular wrapper component is destroyed.
    ngOnDestroy() {
        ReactDOM.unmountComponentAtNode(document.getElementById(this.rootId) as Element);
    }
}
