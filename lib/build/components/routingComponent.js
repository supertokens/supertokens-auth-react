"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var normalisedURLPath_1 = __importDefault(require("../normalisedURLPath"));
function RoutingComponent(props) {
    var _a;
    var stInstance = props.supertokensInstance;
    var path = props.path;
    var componentToRender = react_1.default.useMemo(
        function () {
            return stInstance.getMatchingComponentForRouteAndRecipeId(new normalisedURLPath_1.default(path));
        },
        [stInstance, path]
    );
    var history =
        (_a = props.supertokensInstance.getReactRouterDomWithCustomHistory()) === null || _a === void 0
            ? void 0
            : _a.useHistoryCustom();
    if (componentToRender === undefined) {
        return null;
    }
    return react_1.default.createElement(componentToRender.component, { history: history });
}
exports.RoutingComponent = RoutingComponent;
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
