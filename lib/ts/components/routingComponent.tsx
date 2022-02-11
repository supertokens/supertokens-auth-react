import React from "react";
import SuperTokens from "../superTokens";
import NormalisedURLPath from "../normalisedURLPath";

export function RoutingComponent(props: { supertokensInstance: SuperTokens; path: string }): JSX.Element | null {
    const stInstance = props.supertokensInstance;
    const path = props.path;
    const componentToRender = React.useMemo(() => {
        return stInstance.getMatchingComponentForRouteAndRecipeId(new NormalisedURLPath(path));
    }, [stInstance, path]);

    const history = props.supertokensInstance.getReactRouterDomWithCustomHistory()?.useHistoryCustom();

    if (componentToRender === undefined) {
        return null;
    }

    return <componentToRender.component history={history} />;
}

// import React from "react";
// import SuperTokens from "../superTokens";
// import { ComponentWithRecipeAndMatchingMethod } from "../types";
// import NormalisedURLPath from "../normalisedURLPath";

// export function RoutingComponent(props: { supertokensInstance: SuperTokens; path: string }): JSX.Element | null {
//     const stInstance = props.supertokensInstance;
//     const path = props.path;
//     const [componentToRender, setComponentToRender] = React.useState<ComponentWithRecipeAndMatchingMethod | undefined>(
//         undefined
//     );
//     React.useEffect(() => {
//         setComponentToRender(
//             stInstance.getMatchingComponentForRouteAndRecipeId(new NormalisedURLPath(path))
//         );
//     }, [stInstance, path]);

//     const history = props.supertokensInstance.getReactRouterDomWithCustomHistory()?.useHistoryCustom();

//     if (componentToRender === undefined) {
//         return null;
//     }

//     return <componentToRender.component history={history} />;
// }
