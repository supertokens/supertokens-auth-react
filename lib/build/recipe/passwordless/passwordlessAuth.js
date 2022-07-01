"use strict";
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var superTokens_1 = __importDefault(require("../../superTokens"));
var userContextWrapper_1 = __importDefault(require("../../usercontext/userContextWrapper"));
var sessionAuth_1 = __importDefault(require("../session/sessionAuth"));
var recipe_1 = __importDefault(require("./recipe"));
function PasswordlessAuth(props) {
    if (props.requireAuth === false) {
        return (0, jsx_runtime_1.jsx)(
            sessionAuth_1.default,
            __assign({ onSessionExpired: props.onSessionExpired }, { children: props.children })
        );
    }
    return (0, jsx_runtime_1.jsx)(
        sessionAuth_1.default,
        __assign(
            {
                redirectToLogin: function () {
                    return recipe_1.default
                        .getInstanceOrThrow()
                        .redirectToAuthWithRedirectToPath(undefined, props.history);
                },
                requireAuth: true,
                onSessionExpired: props.onSessionExpired,
            },
            { children: props.children }
        )
    );
}
var PasswordlessAuthMemo = (0, react_1.memo)(PasswordlessAuth);
function PasswordlessAuthWrapper(_a) {
    var children = _a.children,
        requireAuth = _a.requireAuth,
        onSessionExpired = _a.onSessionExpired,
        userContext = _a.userContext;
    var routerInfo = superTokens_1.default.getReactRouterDomWithCustomHistory();
    var history = routerInfo === undefined ? undefined : routerInfo.useHistoryCustom();
    return (0, jsx_runtime_1.jsx)(
        userContextWrapper_1.default,
        __assign(
            { userContext: userContext },
            {
                children: (0, jsx_runtime_1.jsx)(
                    PasswordlessAuthMemo,
                    __assign(
                        { history: history, onSessionExpired: onSessionExpired, requireAuth: requireAuth },
                        { children: children }
                    )
                ),
            }
        )
    );
}
exports.default = PasswordlessAuthWrapper;
