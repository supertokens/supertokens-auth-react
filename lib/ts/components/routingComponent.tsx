import React from "react";
import SuperTokens from "../superTokens";
import NormalisedURLPath from "../normalisedURLPath";

export function RoutingComponent(props: { supertokensInstance: SuperTokens; path: string }): JSX.Element | null {
    console.log("Rerendering routing component");
    const componentToRender = React.useMemo(() => {
        console.log("Calculating routes!!");
        return props.supertokensInstance.getMatchingComponentForRouteAndRecipeId(new NormalisedURLPath(props.path));
    }, [props]);

    const history = props.supertokensInstance.getReactRouterDomWithCustomHistory()?.useHistoryCustom();

    if (componentToRender === undefined) {
        return null;
    }

    return <componentToRender.component history={history} />;
}
