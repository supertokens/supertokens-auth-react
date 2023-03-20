"use strict";

var utils = require("./recipeModule-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var recipe = require("./session-shared2.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefault(React);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);

var UserContextContext = React__default.default.createContext(undefined);
var useUserContext = function () {
    return React__default.default.useContext(UserContextContext);
};
var UserContextProvider = function (_a) {
    var children = _a.children,
        userContext = _a.userContext;
    var currentUserContext = React.useState(utils.getNormalisedUserContext(userContext))[0];
    return jsxRuntime.jsx(
        UserContextContext.Provider,
        utils.__assign({ value: currentUserContext }, { children: children })
    );
};

function UserContextWrapper(props) {
    /**
     * If we receive a userContext as a props we should assume that the user
     * is either trying to use a theme component as standalone or that they
     * want to override an existing value for userContext.
     *
     * In this case we should always return a Provider with the value of userContext
     */
    if (props.userContext !== undefined) {
        return jsxRuntime.jsx(
            UserContextProvider,
            utils.__assign({ userContext: props.userContext }, { children: props.children })
        );
    }
    return jsxRuntime.jsx(UserContextContext.Consumer, {
        children: function (value) {
            /**
             * value is undefined only if there is no Provider in the tree. In this case it is safe to
             * assume that the theme component is not being rendered by the SDK and that the user is not
             * using this as a child of one of the pre-built feature components.
             *
             * In this case we return a provider so that the userContext hook can be used by the children
             * of this theme component
             */
            if (value === undefined) {
                return jsxRuntime.jsx(UserContextProvider, { children: props.children });
            }
            /**
             * If value is not undefined then a provider exists in the tree. This means that this component
             * is either being rendered by the SDK or the user has added it as a child of the pre-built
             * feature components. In either case the userContext hook will be available so simply
             * return the theme component.
             */
            return props.children;
        },
    });
}

function RoutingComponent(props) {
    var _a, _b;
    var path = props.path;
    var location =
        (_a = props.recipeRoutesInstance.getReactRouterDomWithCustomHistory()) === null || _a === void 0
            ? void 0
            : _a.useLocation();
    var componentToRender = React__default.default.useMemo(
        function () {
            // During development, this runs twice so as to warn devs of if there
            // are any side effects that happen here. So in tests, it will result in
            // the console log twice
            return RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
                new NormalisedURLPath__default.default(path)
            );
        },
        [path, location]
    ); // location dependency needs to be kept in order to get new component on url change
    var history =
        (_b = props.recipeRoutesInstance.getReactRouterDomWithCustomHistory()) === null || _b === void 0
            ? void 0
            : _b.useHistoryCustom();
    if (componentToRender === undefined) {
        return null;
    }
    return jsxRuntime.jsx(componentToRender.component, { history: history });
}

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDom(recipeRoutesInstance) {
    var routerInfo = recipeRoutesInstance.getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    var Route = routerInfo.router.Route;
    var pathsToFeatureComponentWithRecipeIdMap = recipeRoutesInstance.getPathsToFeatureComponentWithRecipeIdMap();
    return Object.keys(pathsToFeatureComponentWithRecipeIdMap).map(function (path) {
        path = path === "" ? "/" : path;
        return jsxRuntime.jsx(
            Route,
            utils.__assign(
                { exact: true, path: path },
                {
                    children: jsxRuntime.jsx(RoutingComponent, {
                        recipeRoutesInstance: recipeRoutesInstance,
                        path: path,
                    }),
                }
            ),
            "st-".concat(path)
        );
    });
}

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDomV6(recipeRoutesInstance) {
    var routerInfo = recipeRoutesInstance.getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    var Route = routerInfo.router.Route;
    var pathsToFeatureComponentWithRecipeIdMap = recipeRoutesInstance.getPathsToFeatureComponentWithRecipeIdMap();
    return Object.keys(pathsToFeatureComponentWithRecipeIdMap).map(function (path) {
        path = path === "" ? "/" : path;
        return jsxRuntime.jsx(
            Route,
            {
                path: path,
                element: jsxRuntime.jsx(RoutingComponent, { recipeRoutesInstance: recipeRoutesInstance, path: path }),
            },
            "st-".concat(path)
        );
    });
}

var RecipeRouter = /** @class */ (function () {
    function RecipeRouter() {
        var _this = this;
        /*
         * Instance Methods.
         */
        this.canHandleRoute = function () {
            return _this.getMatchingComponentForRouteAndRecipeId(utils.getCurrentNormalisedUrlPath()) !== undefined;
        };
        this.getReactRouterDomWithCustomHistory = function () {
            return RecipeRouter.reactRouterDom;
        };
        this.getRoutingComponent = function () {
            return jsxRuntime.jsx(RoutingComponent, {
                path: utils.getCurrentNormalisedUrlPath().getAsStringDangerous(),
                recipeRoutesInstance: _this,
            });
        };
        this.getPathsToFeatureComponentWithRecipeIdMap = function () {
            // Memoized version of the map.
            if (_this.pathsToFeatureComponentWithRecipeIdMap !== undefined) {
                return _this.pathsToFeatureComponentWithRecipeIdMap;
            }
            var pathsToFeatureComponentWithRecipeIdMap = {};
            var features = _this.getFeatures();
            var featurePaths = Object.keys(features);
            for (var j = 0; j < featurePaths.length; j++) {
                // If no components yet for this route, initialize empty array.
                var featurePath = featurePaths[j];
                if (pathsToFeatureComponentWithRecipeIdMap[featurePath] === undefined) {
                    pathsToFeatureComponentWithRecipeIdMap[featurePath] = [];
                }
                pathsToFeatureComponentWithRecipeIdMap[featurePath].push(features[featurePath]);
            }
            _this.pathsToFeatureComponentWithRecipeIdMap = pathsToFeatureComponentWithRecipeIdMap;
            return _this.pathsToFeatureComponentWithRecipeIdMap;
        };
        this.getMatchingComponentForRouteAndRecipeId = function (normalisedUrl) {
            var path = normalisedUrl.getAsStringDangerous();
            var routeComponents = _this.getPathsToFeatureComponentWithRecipeIdMap()[path];
            if (routeComponents === undefined) {
                return undefined;
            }
            var component = routeComponents.find(function (c) {
                return c.matches();
            });
            if (component !== undefined) {
                return component;
            }
            // Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.
            return routeComponents[0];
        };
    }
    RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList = function (normalisedUrl) {
        var path = normalisedUrl.getAsStringDangerous();
        var routeComponents = RecipeRouter.preBuiltUIList.reduce(function (components, c) {
            var _a;
            var routes =
                (_a = c.getPathsToFeatureComponentWithRecipeIdMap) === null || _a === void 0
                    ? void 0
                    : _a.call(c)[path];
            return routes !== undefined ? components.concat(routes) : components;
        }, []);
        if (routeComponents === undefined) {
            return undefined;
        }
        var component = routeComponents.find(function (c) {
            return c.matches();
        });
        if (component !== undefined) {
            return component;
        }
        // Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.
        return routeComponents[0];
    };
    RecipeRouter.addPrebuiltUI = function (instance) {
        if (!RecipeRouter.preBuiltUIList.includes(instance)) {
            RecipeRouter.preBuiltUIList.push(instance);
        }
    };
    RecipeRouter.getRecipeRoutes = function (reactRouterDom, instance) {
        if (!RecipeRouter.preBuiltUIList.includes(instance)) {
            RecipeRouter.preBuiltUIList.push(instance);
        }
        if (reactRouterDom === undefined) {
            throw new Error(
                // eslint-disable-next-line @typescript-eslint/quotes
                'Please use getRecipeRoutes like getRecipeRoutes(require("react-router-dom")) in your render function'
            );
        }
        if (RecipeRouter.reactRouterDomIsV6 === undefined) {
            RecipeRouter.reactRouterDomIsV6 = reactRouterDom.withRouter === undefined;
        }
        if (RecipeRouter.reactRouterDomIsV6) {
            if (RecipeRouter.reactRouterDom === undefined) {
                // this function wraps the react-router-dom v6 useNavigate function in a way
                // that enforces that it runs within a useEffect. The reason we do this is
                // cause of https://github.com/remix-run/react-router/issues/7460
                // which gets shown when visiting a social auth callback url like
                // /auth/callback/github, without a valid code or state. This then
                // doesn't navigate the user to the auth page.
                var useNavigateHookForRRDV6 = function () {
                    var navigateHook = reactRouterDom.useNavigate();
                    var _a = React__default.default.useState(undefined),
                        to = _a[0],
                        setTo = _a[1];
                    React__default.default.useEffect(
                        function () {
                            if (to !== undefined) {
                                setTo(undefined);
                                navigateHook(to);
                            }
                        },
                        [to, navigateHook, setTo]
                    );
                    return setTo;
                };
                RecipeRouter.reactRouterDom = {
                    router: reactRouterDom,
                    useHistoryCustom: useNavigateHookForRRDV6,
                    useLocation: reactRouterDom.useLocation,
                };
            }
            return getSuperTokensRoutesForReactRouterDomV6(instance);
        }
        if (RecipeRouter.reactRouterDom === undefined) {
            RecipeRouter.reactRouterDom = {
                router: reactRouterDom,
                useHistoryCustom: reactRouterDom.useHistory,
                useLocation: reactRouterDom.useLocation,
            };
        }
        return getSuperTokensRoutesForReactRouterDom(instance);
    };
    RecipeRouter.reactRouterDomIsV6 = undefined;
    RecipeRouter.preBuiltUIList = [];
    RecipeRouter.getReactRouterDomWithCustomHistory = function () {
        return RecipeRouter.reactRouterDom;
    };
    return RecipeRouter;
})();

var SessionContext = React__default.default.createContext({
    loading: true,
    isDefault: true,
});

var SessionAuth = function (_a) {
    var _b;
    var children = _a.children,
        props = utils.__rest(_a, ["children"]);
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
        (_b = RecipeRouter.getReactRouterDomWithCustomHistory()) === null || _b === void 0
            ? void 0
            : _b.useHistoryCustom
    );
    var history;
    try {
        if (historyHookRef.current) {
            history = historyHookRef.current();
        }
    } catch (_d) {
        // We catch and ignore errors here, because if this is may throw if
        // the app is using react-router-dom but added a session auth outside of the router.
    }
    var userContext = useUserContext();
    var redirectToLogin = React.useCallback(function () {
        void utils.SuperTokens.getInstanceOrThrow().redirectToAuth({ history: history, redirectBack: true });
    }, []);
    var buildContext = React.useCallback(function () {
        return utils.__awaiter(void 0, void 0, void 0, function () {
            var sessionExists, invalidClaims, err_1, invalidClaimRedirectToPath, err_2;
            var _a;
            return utils.__generator(this, function (_b) {
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
                        invalidClaimRedirectToPath = utils.popInvalidClaimRedirectPathFromContext(userContext);
                        _b.label = 7;
                    case 7:
                        _b.trys.push([7, 10, , 12]);
                        _a = {
                            loading: false,
                            doesSessionExist: true,
                            invalidClaims: invalidClaims,
                            invalidClaimRedirectToPath: invalidClaimRedirectToPath,
                        };
                        return [
                            4 /*yield*/,
                            session.current.getAccessTokenPayloadSecurely({
                                userContext: userContext,
                            }),
                        ];
                    case 8:
                        _a.accessTokenPayload = _b.sent();
                        return [
                            4 /*yield*/,
                            session.current.getUserId({
                                userContext: userContext,
                            }),
                        ];
                    case 9:
                        return [2 /*return*/, ((_a.userId = _b.sent()), _a)];
                    case 10:
                        err_2 = _b.sent();
                        return [
                            4 /*yield*/,
                            session.current.doesSessionExist({
                                userContext: userContext,
                            }),
                        ];
                    case 11:
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
                    case 12:
                        return [2 /*return*/];
                }
            });
        });
    }, []);
    var setInitialContextAndMaybeRedirect = React.useCallback(
        function (toSetContext) {
            return utils.__awaiter(void 0, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (context.loading === false) {
                                return [2 /*return*/];
                            }
                            if (!(props.doRedirection !== false)) return [3 /*break*/, 3];
                            if (!(!toSetContext.doesSessionExist && props.requireAuth !== false))
                                return [3 /*break*/, 1];
                            redirectToLogin();
                            return [2 /*return*/];
                        case 1:
                            if (!(toSetContext.invalidClaimRedirectToPath !== undefined)) return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                utils.SuperTokens.getInstanceOrThrow().redirectToUrl(
                                    toSetContext.invalidClaimRedirectToPath,
                                    history
                                ),
                            ];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                        case 3:
                            delete toSetContext.invalidClaimRedirectToPath;
                            setContext(toSetContext);
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.doRedirection, props.requireAuth, redirectToLogin, context]
    );
    utils.useOnMountAPICall(buildContext, setInitialContextAndMaybeRedirect);
    // subscribe to events on mount
    React.useEffect(
        function () {
            function onHandleEvent(event) {
                return utils.__awaiter(this, void 0, void 0, function () {
                    var _a, invalidClaims, redirectPath;
                    return utils.__generator(this, function (_b) {
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
                                        return [3 /*break*/, 5];
                                    case "UNAUTHORISED":
                                        return [3 /*break*/, 6];
                                }
                                return [3 /*break*/, 7];
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
                                setContext(
                                    utils.__assign(utils.__assign({}, event.sessionContext), {
                                        loading: false,
                                        invalidClaims: invalidClaims,
                                    })
                                );
                                redirectPath = utils.popInvalidClaimRedirectPathFromContext(userContext);
                                if (!(props.doRedirection !== false && redirectPath)) return [3 /*break*/, 4];
                                return [
                                    4 /*yield*/,
                                    utils.SuperTokens.getInstanceOrThrow().redirectToUrl(redirectPath, history),
                                ];
                            case 3:
                                _b.sent();
                                _b.label = 4;
                            case 4:
                                return [2 /*return*/];
                            case 5:
                                setContext(
                                    utils.__assign(utils.__assign({}, event.sessionContext), {
                                        loading: false,
                                        invalidClaims: [],
                                    })
                                );
                                return [2 /*return*/];
                            case 6:
                                setContext(
                                    utils.__assign(utils.__assign({}, event.sessionContext), {
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
                            case 7:
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
        [props, setContext, context.loading]
    );
    if (props.requireAuth !== false && (context.loading || !context.doesSessionExist)) {
        return null;
    }
    return jsxRuntime.jsx(SessionContext.Provider, utils.__assign({ value: context }, { children: children }));
};
var SessionAuthWrapper = function (props) {
    return jsxRuntime.jsx(
        UserContextWrapper,
        utils.__assign(
            { userContext: props.userContext },
            { children: jsxRuntime.jsx(SessionAuth, utils.__assign({}, props)) }
        )
    );
};

exports.RecipeRouter = RecipeRouter;
exports.SessionAuthWrapper = SessionAuthWrapper;
exports.SessionContext = SessionContext;
exports.UserContextContext = UserContextContext;
exports.UserContextWrapper = UserContextWrapper;
exports.useUserContext = useUserContext;
//# sourceMappingURL=session-shared.js.map
