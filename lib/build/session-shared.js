"use strict";

var superTokens = require("./superTokens.js");
var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var uiEntry = require("./index2.js");
var userContextWrapper = require("./userContextWrapper.js");
var recipe = require("./session-shared2.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefault(React);

var SessionContext = React__default.default.createContext({
    loading: true,
    isDefault: true,
});

var SessionAuth = function (_a) {
    var _b;
    var children = _a.children,
        props = superTokens.__rest(_a, ["children"]);
    var requireAuth = React.useRef(props.requireAuth);
    if (props.requireAuth !== requireAuth.current) {
        throw new Error(
            // eslint-disable-next-line @typescript-eslint/quotes
            'requireAuth prop should not change. If you are seeing this, it probably means that you are using SessionAuth in multiple routes with different values for requireAuth. To solve this, try adding the "key" prop to all uses of SessionAuth like <SessionAuth key="someUniqueKeyPerRoute" requireAuth={...}>'
        );
    }
    // Reusing the parent context was removed because it caused a redirect loop in an edge case
    // because it'd also reuse the invalid claims part until it loaded.
    var _c = React.useState({ loading: true }),
        context = _c[0],
        setContext = _c[1];
    var session = React.useRef();
    // We store this here, to prevent the list of called hooks changing even if a history hook is added later to SuperTokens.
    var historyHookRef = React.useRef(
        (_b = uiEntry.UI.getReactRouterDomWithCustomHistory()) === null || _b === void 0 ? void 0 : _b.useHistoryCustom
    );
    var history;
    try {
        if (historyHookRef.current) {
            history = historyHookRef.current();
        }
    } catch (_d) {
        // We catch and ignore errors here, because this is may throw if
        // the app is using react-router-dom but added a session auth outside of the router.
    }
    var userContext = userContextWrapper.useUserContext();
    var redirectToLogin = React.useCallback(function () {
        void superTokens.SuperTokens.getInstanceOrThrow().redirectToAuth({ history: history, redirectBack: true });
    }, []);
    var buildContext = React.useCallback(function () {
        return superTokens.__awaiter(void 0, void 0, void 0, function () {
            var sessionExists, invalidClaims, err_1, err_2;
            var _a;
            return superTokens.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (session.current === undefined) {
                            session.current = recipe.Session.getInstanceOrThrow();
                        }
                        return [
                            4 /*yield*/,
                            session.current.doesSessionExist({
                                userContext: userContext,
                            }),
                        ];
                    case 1:
                        sessionExists = _b.sent();
                        if (sessionExists === false) {
                            return [
                                2 /*return*/,
                                {
                                    loading: false,
                                    doesSessionExist: false,
                                    accessTokenPayload: {},
                                    invalidClaims: [],
                                    userId: "",
                                },
                            ];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 6]);
                        return [
                            4 /*yield*/,
                            session.current.validateClaims({
                                overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                                userContext: userContext,
                            }),
                        ];
                    case 3:
                        invalidClaims = _b.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _b.sent();
                        return [
                            4 /*yield*/,
                            session.current.doesSessionExist({
                                userContext: userContext,
                            }),
                        ];
                    case 5:
                        // These errors should only come from getAccessTokenPayloadSecurely inside validateClaims if refreshing a claim cleared the session
                        // Which means that the session was most likely cleared, meaning returning false is right.
                        // This might also happen if the user provides an override or a custom claim validator that throws (or if we have a bug)
                        // In which case the session will not be cleared so we rethrow the error
                        if (_b.sent()) {
                            throw err_1;
                        }
                        return [
                            2 /*return*/,
                            {
                                loading: false,
                                doesSessionExist: false,
                                accessTokenPayload: {},
                                invalidClaims: [],
                                userId: "",
                            },
                        ];
                    case 6:
                        _b.trys.push([6, 9, , 11]);
                        _a = {
                            loading: false,
                            doesSessionExist: true,
                            invalidClaims: invalidClaims,
                        };
                        return [
                            4 /*yield*/,
                            session.current.getAccessTokenPayloadSecurely({
                                userContext: userContext,
                            }),
                        ];
                    case 7:
                        _a.accessTokenPayload = _b.sent();
                        return [
                            4 /*yield*/,
                            session.current.getUserId({
                                userContext: userContext,
                            }),
                        ];
                    case 8:
                        return [2 /*return*/, ((_a.userId = _b.sent()), _a)];
                    case 9:
                        err_2 = _b.sent();
                        return [
                            4 /*yield*/,
                            session.current.doesSessionExist({
                                userContext: userContext,
                            }),
                        ];
                    case 10:
                        if (_b.sent()) {
                            throw err_2;
                        }
                        // This means that loading the access token or the userId failed
                        // This may happen if the server cleared the error since the validation was done which should be extremely rare
                        return [
                            2 /*return*/,
                            {
                                loading: false,
                                doesSessionExist: false,
                                accessTokenPayload: {},
                                invalidClaims: [],
                                userId: "",
                            },
                        ];
                    case 11:
                        return [2 /*return*/];
                }
            });
        });
    }, []);
    var setInitialContextAndMaybeRedirect = React.useCallback(
        function (toSetContext) {
            return superTokens.__awaiter(void 0, void 0, void 0, function () {
                var failureRedirectInfo;
                return superTokens.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (context.loading === false) {
                                return [2 /*return*/];
                            }
                            if (!(props.doRedirection !== false)) return [3 /*break*/, 4];
                            if (!toSetContext.doesSessionExist && props.requireAuth !== false) {
                                redirectToLogin();
                                return [2 /*return*/];
                            }
                            if (!(toSetContext.invalidClaims.length !== 0)) return [3 /*break*/, 4];
                            return [
                                4 /*yield*/,
                                recipe.getFailureRedirectionInfo({
                                    invalidClaims: toSetContext.invalidClaims,
                                    overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                                    userContext: userContext,
                                }),
                            ];
                        case 1:
                            failureRedirectInfo = _a.sent();
                            if (!(failureRedirectInfo.redirectPath !== undefined)) return [3 /*break*/, 3];
                            setContext(toSetContext);
                            return [
                                4 /*yield*/,
                                superTokens.SuperTokens.getInstanceOrThrow().redirectToUrl(
                                    failureRedirectInfo.redirectPath,
                                    history
                                ),
                            ];
                        case 2:
                            return [2 /*return*/, _a.sent()];
                        case 3:
                            if (
                                props.accessDeniedScreen !== undefined &&
                                failureRedirectInfo.failedClaim !== undefined
                            ) {
                                console.warn({
                                    message: "Showing access denied screen because a claim validator failed",
                                    claimValidationError: failureRedirectInfo.failedClaim,
                                });
                                return [
                                    2 /*return*/,
                                    setContext(
                                        superTokens.__assign(superTokens.__assign({}, toSetContext), {
                                            accessDeniedValidatorError: failureRedirectInfo.failedClaim,
                                        })
                                    ),
                                ];
                            }
                            _a.label = 4;
                        case 4:
                            setContext(toSetContext);
                            return [2 /*return*/];
                    }
                });
            });
        },
        [
            context.loading,
            props.doRedirection,
            props.requireAuth,
            props.overrideGlobalClaimValidators,
            props.accessDeniedScreen,
            redirectToLogin,
            userContext,
            history,
        ]
    );
    superTokens.useOnMountAPICall(buildContext, setInitialContextAndMaybeRedirect);
    // subscribe to events on mount
    React.useEffect(
        function () {
            function onHandleEvent(event) {
                return superTokens.__awaiter(this, void 0, void 0, function () {
                    var _a, invalidClaims, failureRedirectInfo;
                    return superTokens.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = event.action;
                                switch (_a) {
                                    case "SESSION_CREATED":
                                        return [3 /*break*/, 1];
                                    case "REFRESH_SESSION":
                                        return [3 /*break*/, 1];
                                    case "ACCESS_TOKEN_PAYLOAD_UPDATED":
                                        return [3 /*break*/, 1];
                                    case "API_INVALID_CLAIM":
                                        return [3 /*break*/, 1];
                                    case "SIGN_OUT":
                                        return [3 /*break*/, 7];
                                    case "UNAUTHORISED":
                                        return [3 /*break*/, 8];
                                }
                                return [3 /*break*/, 9];
                            case 1:
                                return [
                                    4 /*yield*/,
                                    session.current.validateClaims({
                                        overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                                        userContext: userContext,
                                    }),
                                ];
                            case 2:
                                invalidClaims = _b.sent();
                                if (!(props.doRedirection !== false)) return [3 /*break*/, 6];
                                return [
                                    4 /*yield*/,
                                    recipe.getFailureRedirectionInfo({
                                        invalidClaims: invalidClaims,
                                        overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                                        userContext: userContext,
                                    }),
                                ];
                            case 3:
                                failureRedirectInfo = _b.sent();
                                if (!failureRedirectInfo.redirectPath) return [3 /*break*/, 5];
                                setContext(
                                    superTokens.__assign(superTokens.__assign({}, event.sessionContext), {
                                        loading: false,
                                        invalidClaims: invalidClaims,
                                    })
                                );
                                return [
                                    4 /*yield*/,
                                    superTokens.SuperTokens.getInstanceOrThrow().redirectToUrl(
                                        failureRedirectInfo.redirectPath,
                                        history
                                    ),
                                ];
                            case 4:
                                return [2 /*return*/, _b.sent()];
                            case 5:
                                if (
                                    props.accessDeniedScreen !== undefined &&
                                    failureRedirectInfo.failedClaim !== undefined
                                ) {
                                    console.warn({
                                        message: "Showing access denied screen because a claim validator failed",
                                        claimValidationError: failureRedirectInfo.failedClaim,
                                    });
                                    return [
                                        2 /*return*/,
                                        setContext(
                                            superTokens.__assign(superTokens.__assign({}, event.sessionContext), {
                                                loading: false,
                                                invalidClaims: invalidClaims,
                                                accessDeniedValidatorError: failureRedirectInfo.failedClaim,
                                            })
                                        ),
                                    ];
                                }
                                _b.label = 6;
                            case 6:
                                setContext(
                                    superTokens.__assign(superTokens.__assign({}, event.sessionContext), {
                                        loading: false,
                                        invalidClaims: invalidClaims,
                                    })
                                );
                                return [2 /*return*/];
                            case 7:
                                setContext(
                                    superTokens.__assign(superTokens.__assign({}, event.sessionContext), {
                                        loading: false,
                                        invalidClaims: [],
                                    })
                                );
                                return [2 /*return*/];
                            case 8:
                                setContext(
                                    superTokens.__assign(superTokens.__assign({}, event.sessionContext), {
                                        loading: false,
                                        invalidClaims: [],
                                    })
                                );
                                if (props.onSessionExpired !== undefined) {
                                    props.onSessionExpired();
                                } else if (props.requireAuth !== false && props.doRedirection !== false) {
                                    redirectToLogin();
                                }
                                return [2 /*return*/];
                            case 9:
                                return [2 /*return*/];
                        }
                    });
                });
            }
            if (session.current === undefined) {
                session.current = recipe.Session.getInstanceOrThrow();
            }
            if (context.loading === false) {
                // we return here cause addEventListener returns a function that removes
                // the listener, and this function will be called by useEffect when
                // onHandleEvent changes or if the component is unmounting.
                return session.current.addEventListener(onHandleEvent);
            }
            return undefined;
        },
        [props, setContext, context.loading, userContext, history, redirectToLogin]
    );
    if (props.requireAuth !== false && (context.loading || !context.doesSessionExist)) {
        return null;
    }
    if (!context.loading && context.accessDeniedValidatorError && props.accessDeniedScreen) {
        return jsxRuntime.jsx(props.accessDeniedScreen, {
            userContext: userContext,
            history: history,
            validationError: context.accessDeniedValidatorError,
        });
    }
    return jsxRuntime.jsx(SessionContext.Provider, superTokens.__assign({ value: context }, { children: children }));
};
var SessionAuthWrapper = function (props) {
    return jsxRuntime.jsx(
        userContextWrapper.UserContextWrapper,
        superTokens.__assign(
            { userContext: props.userContext },
            { children: jsxRuntime.jsx(SessionAuth, superTokens.__assign({}, props)) }
        )
    );
};

exports.SessionAuthWrapper = SessionAuthWrapper;
exports.SessionContext = SessionContext;
