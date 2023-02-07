import React from "react";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import type SuperTokens from "../superTokens";

export function RoutingComponent(props: { supertokensInstance: SuperTokens; path: string }): JSX.Element | null {
    const stInstance = props.supertokensInstance;
    const path = props.path;
    const componentToRender = React.useMemo(() => {
        // During development, this runs twice so as to warn devs of if there
        // are any side effects that happen here. So in tests, it will result in
        // the console log twice
        return stInstance.getMatchingComponentForRouteAndRecipeId(new NormalisedURLPath(path));
    }, [stInstance, path]);

    const history = props.supertokensInstance.getReactRouterDomWithCustomHistory()?.useHistoryCustom();

    if (componentToRender === undefined) {
        return null;
    }

    return <componentToRender.component history={history} />;
}
