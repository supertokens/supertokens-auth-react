"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var superTokens_1 = tslib_1.__importDefault(require("../../superTokens"));
var userContextWrapper_1 = tslib_1.__importDefault(require("../../usercontext/userContextWrapper"));
var sessionAuth_1 = tslib_1.__importDefault(require("../session/sessionAuth"));
var recipe_1 = tslib_1.__importDefault(require("./recipe"));
function PasswordlessAuth(props) {
    if (props.requireAuth === false) {
        return (0, jsx_runtime_1.jsx)(
            sessionAuth_1.default,
            tslib_1.__assign({ onSessionExpired: props.onSessionExpired }, { children: props.children })
        );
    }
    return (0, jsx_runtime_1.jsx)(
        sessionAuth_1.default,
        tslib_1.__assign(
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
    var routerInfo = superTokens_1.default.getInstanceOrThrow().getReactRouterDomWithCustomHistory();
    var history = routerInfo === undefined ? undefined : routerInfo.useHistoryCustom();
    return (0, jsx_runtime_1.jsx)(
        userContextWrapper_1.default,
        tslib_1.__assign(
            { userContext: userContext },
            {
                children: (0, jsx_runtime_1.jsx)(
                    PasswordlessAuthMemo,
                    tslib_1.__assign(
                        {
                            history: history,
                            onSessionExpired: onSessionExpired,
                            requireAuth: requireAuth,
                            recipe: recipe_1.default.getInstanceOrThrow(),
                        },
                        { children: children }
                    )
                ),
            }
        )
    );
}
exports.default = PasswordlessAuthWrapper;
