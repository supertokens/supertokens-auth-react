import React from "react";
import SuperTokens from "../superTokens";
import { ComponentWithRecipeAndMatchingMethod } from "../types";
import NormalisedURLPath from "../normalisedURLPath";

export function RoutingComponent(props: { supertokensInstance: SuperTokens; path: string }): JSX.Element | null {
    const [componentToRender, setComponentToRender] = React.useState<ComponentWithRecipeAndMatchingMethod | undefined>(
        undefined
    );
    React.useEffect(() => {
        setComponentToRender(
            props.supertokensInstance.getMatchingComponentForRouteAndRecipeId(new NormalisedURLPath(props.path))
        );
    }, [props]);

    const history = props.supertokensInstance.getReactRouterDom()?.useHistoryCustom();

    if (componentToRender === undefined) {
        return null;
    }

    return <componentToRender.component history={history} />;
}
