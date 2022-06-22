import { Component, OnDestroy, OnInit } from "@angular/core";
import * as React from "react";

import * as ReactDOM from "react-dom";

import SuperTokensReactComponent from "./supertokens";

@Component({
    selector: "app-auth",
    template: '<div [id]="rootId"></div>',
})
export class AuthComponent implements OnDestroy, OnInit {
    title = "angularreactapp";

    public rootId = "rootId";

    // We use the ngOnInit lifecycle hook to render the React component when the Angular component gets initialized
    ngOnInit(){
        this.render()
    }

    // We use the ngOnDestroy lifecycle hook to unmount the React component when the Angular wrapper component is destroyed.
    ngOnDestroy() {
        ReactDOM.unmountComponentAtNode(document.getElementById(this.rootId) as Element);
    }

    private render() {
        ReactDOM.render(React.createElement(SuperTokensReactComponent), document.getElementById(this.rootId));
    }
}
