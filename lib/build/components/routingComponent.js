"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingComponent = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var normalisedURLPath_1 = __importDefault(require("supertokens-web-js/utils/normalisedURLPath"));
function RoutingComponent(props) {
    var _a;
    var stInstance = props.supertokensInstance;
    var path = props.path;
    var componentToRender = react_1.default.useMemo(
        function () {
            // During development, this runs twice so as to warn devs of if there
            // are any side effects that happen here. So in tests, it will result in
            // the console log twice
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
    return (0, jsx_runtime_1.jsx)(componentToRender.component, { history: history });
}
exports.RoutingComponent = RoutingComponent;
