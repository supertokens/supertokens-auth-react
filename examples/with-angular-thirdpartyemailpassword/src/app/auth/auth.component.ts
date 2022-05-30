import { AfterViewInit, Component, OnChanges, OnDestroy } from "@angular/core";
import * as React from "react";

import * as ReactDOM from "react-dom";

import SuperTokensReactComponent from "./supertokens";

@Component({
    selector: "app-auth",
    template: '<div [id]="rootId"></div>',
})
export class AuthComponent implements AfterViewInit, OnChanges, OnDestroy {
    title = "angularreactapp";

    public rootId = "rootId";

    // We use ngOnChanges and ngAfterViewInit lifecycle hooks to render and re-render the React component
    ngOnChanges() {
        this.render();
    }

    ngAfterViewInit() {
        this.render();
    }

    // We use the ngOnDestroy lifecycle hook to unmount the React component when the Angular wrapper component is destroyed.
    ngOnDestroy() {
        ReactDOM.unmountComponentAtNode(document.getElementById(this.rootId) as Element);
    }

    private render() {
        ReactDOM.render(React.createElement(SuperTokensReactComponent), document.getElementById(this.rootId));
    }
}
