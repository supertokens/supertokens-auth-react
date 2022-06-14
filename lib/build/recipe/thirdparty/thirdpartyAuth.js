"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var recipe_1 = tslib_1.__importDefault(require("./recipe"));
var sessionAuth_1 = tslib_1.__importDefault(require("../session/sessionAuth"));
var emailVerificationAuth_1 = tslib_1.__importDefault(require("../emailverification/emailVerificationAuth"));
var superTokens_1 = tslib_1.__importDefault(require("../../superTokens"));
var userContextWrapper_1 = tslib_1.__importDefault(require("../../usercontext/userContextWrapper"));
function ThirdPartyAuth(props) {
    var emailVerification = (0, jsx_runtime_1.jsx)(
        emailVerificationAuth_1.default,
        tslib_1.__assign(
            { recipe: props.recipe.emailVerification, history: props.history },
            { children: props.children }
        )
    );
    if (props.requireAuth === false) {
        return (0, jsx_runtime_1.jsx)(
            sessionAuth_1.default,
            tslib_1.__assign({ onSessionExpired: props.onSessionExpired }, { children: emailVerification })
        );
    }
    return (0, jsx_runtime_1.jsx)(
        sessionAuth_1.default,
        tslib_1.__assign(
            {
                redirectToLogin: function () {
                    void recipe_1.default
                        .getInstanceOrThrow()
                        .redirectToAuthWithRedirectToPath(undefined, props.history);
                },
                requireAuth: true,
                onSessionExpired: props.onSessionExpired,
            },
            { children: emailVerification }
        )
    );
}
var ThirdPartyAuthMemo = (0, react_1.memo)(ThirdPartyAuth);
var ThirdPartyAuthWrapper = function (_a) {
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
                    ThirdPartyAuthMemo,
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
};
exports.default = ThirdPartyAuthWrapper;
