import * as React from "react";
import * as SuperTokens from "supertokens-auth-react";

class SuperTokensReactComponent extends React.Component {
    override render() {
        if (SuperTokens.canHandleRoute()) {
            return SuperTokens.getRoutingComponent();
        }
        return "Route not found";
    }
}

export default SuperTokensReactComponent;
