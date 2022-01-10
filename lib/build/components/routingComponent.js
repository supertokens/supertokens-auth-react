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
    var _b = react_1.default.useState(undefined),
        componentToRender = _b[0],
        setComponentToRender = _b[1];
    react_1.default.useEffect(
        function () {
            setComponentToRender(
                props.supertokensInstance.getMatchingComponentForRouteAndRecipeId(
                    new normalisedURLPath_1.default(props.path)
                )
            );
        },
        [props]
    );
    var history =
        (_a = props.supertokensInstance.getReactRouterDom()) === null || _a === void 0 ? void 0 : _a.useHistoryCustom();
    if (componentToRender === undefined) {
        return null;
    }
    return react_1.default.createElement(componentToRender.component, { history: history });
}
exports.RoutingComponent = RoutingComponent;
