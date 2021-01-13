"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _emailPassword = _interopRequireDefault(require("../../../emailPassword"));

var _ = require("../../..");

var _featureWrapper = _interopRequireDefault(require("../../../../components/featureWrapper"));

var _react2 = require("@emotion/react");

var _constants = require("../../../constants");

var _utils = require("../../../../../utils");

var _api = require("./api");

var _superTokens = _interopRequireDefault(require("../../../../../superTokens"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function _getRequireWildcardCache() {
        return cache;
    };
    return cache;
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || (_typeof(obj) !== "object" && typeof obj !== "function")) {
        return { default: obj };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj["default"] = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function() {
        var self = this,
            args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, writable: true, configurable: true }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf =
        Object.setPrototypeOf ||
        function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
    return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
            result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function _getPrototypeOf(o) {
              return o.__proto__ || Object.getPrototypeOf(o);
          };
    return _getPrototypeOf(o);
}

/*
 * Component.
 */
var EmailVerification = /*#__PURE__*/ (function(_PureComponent) {
    _inherits(EmailVerification, _PureComponent);

    var _super = _createSuper(EmailVerification);

    /*
     * Constructor.
     */
    function EmailVerification(props) {
        var _this;

        _classCallCheck(this, EmailVerification);

        _this = _super.call(this, props);

        _this.getRecipeInstanceOrThrow = function() {
            var instance;

            if (_this.props.__internal !== undefined && _this.props.__internal.instance !== undefined) {
                instance = _this.props.__internal.instance;
            } else {
                instance = _emailPassword["default"].getInstanceOrThrow();
            }

            return instance;
        };

        _this.verifyEmail = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch ((_context.prev = _context.next)) {
                            case 0:
                                _context.next = 2;
                                return (0, _api.handleVerifyEmailAPI)(
                                    _this.getRecipeInstanceOrThrow().getRecipeId(),
                                    _this.getRecipeInstanceOrThrow().verifyEmailAPI,
                                    _this.state.token
                                );

                            case 2:
                                return _context.abrupt("return", _context.sent);

                            case 3:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee);
            })
        );
        _this.onEmailVerifiedSuccess = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch ((_context2.prev = _context2.next)) {
                            case 0:
                                _context2.next = 2;
                                return _this.onHandleSuccess({
                                    action: _constants.SUCCESS_ACTION.EMAIL_VERIFIED_SUCCESSFUL
                                });

                            case 2:
                                return _context2.abrupt("return", _context2.sent);

                            case 3:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2);
            })
        );
        _this.sendVerifyEmail = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch ((_context3.prev = _context3.next)) {
                            case 0:
                                _context3.next = 2;
                                return (0, _api.handleSendVerifyEmailAPI)(
                                    _this.getRecipeInstanceOrThrow().getRecipeId(),
                                    _this.getRecipeInstanceOrThrow().sendVerificationEmailAPI
                                );

                            case 2:
                                return _context3.abrupt("return", _context3.sent);

                            case 3:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3);
            })
        );
        _this.onSendVerifyEmailSuccess = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch ((_context4.prev = _context4.next)) {
                            case 0:
                                _context4.next = 2;
                                return _this.onHandleSuccess({
                                    action: _constants.SUCCESS_ACTION.VERIFY_EMAIL_SENT
                                });

                            case 2:
                                return _context4.abrupt("return", _context4.sent);

                            case 3:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4);
            })
        );

        _this.onHandleSuccess = /*#__PURE__*/ (function() {
            var _ref5 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee5(context) {
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch ((_context5.prev = _context5.next)) {
                                case 0:
                                    if (!(_this.props.onHandleSuccess !== undefined)) {
                                        _context5.next = 3;
                                        break;
                                    }

                                    _context5.next = 3;
                                    return _this.props.onHandleSuccess(context);

                                case 3:
                                case "end":
                                    return _context5.stop();
                            }
                        }
                    }, _callee5);
                })
            );

            return function(_x) {
                return _ref5.apply(this, arguments);
            };
        })();

        _this.signOut = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(
                    function _callee6$(_context6) {
                        while (1) {
                            switch ((_context6.prev = _context6.next)) {
                                case 0:
                                    if (!(_this.props.signOut !== undefined)) {
                                        _context6.next = 4;
                                        break;
                                    }

                                    _context6.next = 3;
                                    return _this.props.signOut();

                                case 3:
                                    return _context6.abrupt("return");

                                case 4:
                                    _context6.prev = 4;
                                    _context6.next = 7;
                                    return (0, _.signOut)();

                                case 7:
                                    (0, _utils.redirectToInApp)(
                                        _this
                                            .getRecipeInstanceOrThrow()
                                            .getAppInfo()
                                            .websiteBasePath.getAsStringDangerous(),
                                        undefined,
                                        _this.props.history
                                    );
                                    _context6.next = 12;
                                    break;

                                case 10:
                                    _context6.prev = 10;
                                    _context6.t0 = _context6["catch"](4);

                                case 12:
                                case "end":
                                    return _context6.stop();
                            }
                        }
                    },
                    _callee6,
                    null,
                    [[4, 10]]
                );
            })
        );
        _this.doesSessionExist = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee7() {
                var sessionRecipe;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch ((_context7.prev = _context7.next)) {
                            case 0:
                                sessionRecipe = _this.getSessionRecipe();

                                if (!(sessionRecipe !== undefined)) {
                                    _context7.next = 3;
                                    break;
                                }

                                return _context7.abrupt("return", sessionRecipe.doesSessionExist());

                            case 3:
                                return _context7.abrupt("return", false);

                            case 4:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7);
            })
        );
        _this.redirectToVerifyEmailScreen = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee8() {
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch ((_context8.prev = _context8.next)) {
                            case 0:
                                return _context8.abrupt(
                                    "return",
                                    (0, _utils.redirectToInApp)(
                                        ""
                                            .concat((0, _utils.getWindowOrThrow)().location.pathname, "?rid=")
                                            .concat(_this.getRecipeInstanceOrThrow().getRecipeId()),
                                        undefined,
                                        undefined
                                    )
                                );

                            case 1:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8);
            })
        );
        _this.onSuccessRedirect = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee9() {
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch ((_context9.prev = _context9.next)) {
                            case 0:
                                (0, _utils.redirectToInApp)(
                                    _this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature
                                        .onSuccessRedirectURL,
                                    undefined,
                                    _this.props.history
                                );

                            case 1:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9);
            })
        );

        _this.render = function() {
            var verifyEmailLinkClickedScreenFeature = _this.getRecipeInstanceOrThrow().getConfig()
                .emailVerificationFeature.verifyEmailLinkClickedScreen;

            var sendVerifyEmailScreenFeature = _this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature
                .sendVerifyEmailScreen;

            var sendVerifyEmailScreen = {
                styleFromInit: sendVerifyEmailScreenFeature.style,
                callAPI: _this.sendVerifyEmail,
                signOut: _this.signOut,
                onSuccess: _this.onSendVerifyEmailSuccess,
                onEmailAlreadyVerified: _this.onSuccessRedirect
            };
            var verifyEmailLinkClickedScreen = {
                styleFromInit: verifyEmailLinkClickedScreenFeature.style,
                redirectToVerifyEmailScreen: _this.redirectToVerifyEmailScreen,
                callAPI: _this.verifyEmail,
                onSuccess: _this.onEmailVerifiedSuccess,
                onContinueClicked: _this.onSuccessRedirect
            };

            var useShadowDom = _this.getRecipeInstanceOrThrow().getConfig().useShadowDom;

            var hasToken = _this.state.token.length !== 0;
            /*
             * Render.
             */

            return (0, _react2.jsx)(
                _featureWrapper["default"],
                {
                    useShadowDom: useShadowDom
                },
                (0, _react2.jsx)(
                    React.Fragment,
                    null,
                    _this.props.children === undefined &&
                        (0, _react2.jsx)(_.EmailVerificationScreenTheme, {
                            sendVerifyEmailScreen: sendVerifyEmailScreen,
                            verifyEmailLinkClickedScreen: verifyEmailLinkClickedScreen,
                            hasToken: hasToken
                        }),
                    _this.props.children &&
                        /*#__PURE__*/ React.cloneElement(_this.props.children, {
                            sendVerifyEmailScreen: sendVerifyEmailScreen,
                            verifyEmailLinkClickedScreen: verifyEmailLinkClickedScreen,
                            hasToken: hasToken
                        })
                )
            );
        };

        var urlParams = new URLSearchParams((0, _utils.getWindowOrThrow)().location.search);
        var token = urlParams.get("token");

        if (token === null) {
            token = "";
        }

        _this.state = {
            token: token
        };
        return _this;
    }
    /*
     * Methods.
     */

    _createClass(EmailVerification, [
        {
            key: "getSessionRecipe",
            value: function getSessionRecipe() {
                return _superTokens["default"].getDefaultSessionRecipe();
            }
        },
        {
            key: "componentDidMount",
            value: (function() {
                var _componentDidMount = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee10() {
                        var hasToken, hasValidSession, response;
                        return regeneratorRuntime.wrap(
                            function _callee10$(_context10) {
                                while (1) {
                                    switch ((_context10.prev = _context10.next)) {
                                        case 0:
                                            if (
                                                !(
                                                    this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature
                                                        .mode !== _constants.EMAIL_VERIFICATION_MODE.REQUIRED
                                                )
                                            ) {
                                                _context10.next = 2;
                                                break;
                                            }

                                            return _context10.abrupt(
                                                "return",
                                                (0, _utils.redirectToInApp)(
                                                    this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature
                                                        .onSuccessRedirectURL,
                                                    undefined,
                                                    this.props.history
                                                )
                                            );

                                        case 2:
                                            hasToken = this.state.token.length !== 0; // Redirect to login if no existing session and no token in URL.

                                            _context10.next = 5;
                                            return this.doesSessionExist();

                                        case 5:
                                            hasValidSession = _context10.sent;

                                            if (!(hasValidSession === false && hasToken === false)) {
                                                _context10.next = 8;
                                                break;
                                            }

                                            return _context10.abrupt(
                                                "return",
                                                (0, _utils.redirectToInApp)(
                                                    this.getRecipeInstanceOrThrow()
                                                        .getAppInfo()
                                                        .websiteBasePath.getAsStringDangerous(),
                                                    undefined,
                                                    this.props.history
                                                )
                                            );

                                        case 8:
                                            _context10.prev = 8;

                                            if (!(hasToken === false)) {
                                                _context10.next = 15;
                                                break;
                                            }

                                            _context10.next = 12;
                                            return this.sendVerifyEmail();

                                        case 12:
                                            response = _context10.sent;

                                            if (
                                                !(
                                                    response.status ===
                                                    _constants.API_RESPONSE_STATUS.EMAIL_ALREADY_VERIFIED_ERROR
                                                )
                                            ) {
                                                _context10.next = 15;
                                                break;
                                            }

                                            return _context10.abrupt("return", this.onSuccessRedirect());

                                        case 15:
                                            _context10.next = 19;
                                            break;

                                        case 17:
                                            _context10.prev = 17;
                                            _context10.t0 = _context10["catch"](8);

                                        case 19:
                                        case "end":
                                            return _context10.stop();
                                    }
                                }
                            },
                            _callee10,
                            this,
                            [[8, 17]]
                        );
                    })
                );

                function componentDidMount() {
                    return _componentDidMount.apply(this, arguments);
                }

                return componentDidMount;
            })()
        }
    ]);

    return EmailVerification;
})(React.PureComponent);

var _default = EmailVerification;
exports["default"] = _default;
