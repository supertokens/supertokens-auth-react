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

        _this.signOut = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(
                    function _callee$(_context) {
                        while (1) {
                            switch ((_context.prev = _context.next)) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return (0, _.signOut)();

                                case 3:
                                    _context.next = 5;
                                    return _this.getRecipeInstanceOrThrow().redirect(
                                        {
                                            action: _constants.EMAIL_PASSWORD_REDIRECTION_URL_ACTION.SIGN_IN_AND_UP
                                        },
                                        _this.props.history
                                    );

                                case 5:
                                    return _context.abrupt("return", _context.sent);

                                case 8:
                                    _context.prev = 8;
                                    _context.t0 = _context["catch"](0);

                                case 10:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    },
                    _callee,
                    null,
                    [[0, 8]]
                );
            })
        );
        _this.onTokenInvalidRedirect = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
                var response;
                return regeneratorRuntime.wrap(
                    function _callee2$(_context2) {
                        while (1) {
                            switch ((_context2.prev = _context2.next)) {
                                case 0:
                                    if (!(_this.getRecipeInstanceOrThrow().doesSessionExist() !== true)) {
                                        _context2.next = 4;
                                        break;
                                    }

                                    _context2.next = 3;
                                    return _this.getRecipeInstanceOrThrow().redirect(
                                        {
                                            action: _constants.EMAIL_PASSWORD_REDIRECTION_URL_ACTION.SIGN_IN_AND_UP
                                        },
                                        _this.props.history
                                    );

                                case 3:
                                    return _context2.abrupt("return", _context2.sent);

                                case 4:
                                    _context2.prev = 4;
                                    _context2.next = 7;
                                    return (0, _api.sendVerifyEmailAPI)(_this.getRecipeInstanceOrThrow());

                                case 7:
                                    response = _context2.sent;

                                    if (
                                        !(
                                            response.status ===
                                            _constants.API_RESPONSE_STATUS.EMAIL_ALREADY_VERIFIED_ERROR
                                        )
                                    ) {
                                        _context2.next = 12;
                                        break;
                                    }

                                    _context2.next = 11;
                                    return _this.getRecipeInstanceOrThrow().redirect(
                                        {
                                            action: _constants.EMAIL_PASSWORD_REDIRECTION_URL_ACTION.SUCCESS
                                        },
                                        _this.props.history
                                    );

                                case 11:
                                    return _context2.abrupt("return", _context2.sent);

                                case 12:
                                    _context2.next = 16;
                                    break;

                                case 14:
                                    _context2.prev = 14;
                                    _context2.t0 = _context2["catch"](4);

                                case 16:
                                    _this.setState(function() {
                                        return {
                                            token: ""
                                        };
                                    });

                                case 17:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    },
                    _callee2,
                    null,
                    [[4, 14]]
                );
            })
        );

        _this.render = function() {
            var sendVerifyEmailScreenFeature = _this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature
                .sendVerifyEmailScreen;

            var sendVerifyEmailScreen = {
                styleFromInit: sendVerifyEmailScreenFeature.style,
                sendVerifyEmailAPI: (function() {
                    var _sendVerifyEmailAPI2 = _asyncToGenerator(
                        /*#__PURE__*/ regeneratorRuntime.mark(function _callee3() {
                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                    switch ((_context3.prev = _context3.next)) {
                                        case 0:
                                            _context3.next = 2;
                                            return (0, _api.sendVerifyEmailAPI)(_this.getRecipeInstanceOrThrow());

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

                    function sendVerifyEmailAPI() {
                        return _sendVerifyEmailAPI2.apply(this, arguments);
                    }

                    return sendVerifyEmailAPI;
                })(),
                signOut: _this.signOut,
                onSuccess: function onSuccess() {
                    return _this.getRecipeInstanceOrThrow().onHandleEvent({
                        action: _constants.SUCCESS_ACTION.VERIFY_EMAIL_SENT
                    });
                },
                onEmailAlreadyVerified: function onEmailAlreadyVerified() {
                    return _this.getRecipeInstanceOrThrow().redirect(
                        {
                            action: _constants.EMAIL_PASSWORD_REDIRECTION_URL_ACTION.SUCCESS
                        },
                        _this.props.history
                    );
                }
            };

            var verifyEmailLinkClickedScreenFeature = _this.getRecipeInstanceOrThrow().getConfig()
                .emailVerificationFeature.verifyEmailLinkClickedScreen;

            var verifyEmailLinkClickedScreen = {
                styleFromInit: verifyEmailLinkClickedScreenFeature.style,
                onTokenInvalidRedirect: _this.onTokenInvalidRedirect,
                onSuccess: function onSuccess() {
                    return _this.getRecipeInstanceOrThrow().onHandleEvent({
                        action: _constants.SUCCESS_ACTION.EMAIL_VERIFIED_SUCCESSFUL
                    });
                },
                onContinueClicked: function onContinueClicked() {
                    return _this.getRecipeInstanceOrThrow().redirect(
                        {
                            action: _constants.EMAIL_PASSWORD_REDIRECTION_URL_ACTION.SUCCESS
                        },
                        _this.props.history
                    );
                },
                verifyEmailAPI: (function() {
                    var _verifyEmailAPI2 = _asyncToGenerator(
                        /*#__PURE__*/ regeneratorRuntime.mark(function _callee4() {
                            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                while (1) {
                                    switch ((_context4.prev = _context4.next)) {
                                        case 0:
                                            _context4.next = 2;
                                            return (0, _api.verifyEmailAPI)(
                                                _this.getRecipeInstanceOrThrow(),
                                                _this.state.token
                                            );

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

                    function verifyEmailAPI() {
                        return _verifyEmailAPI2.apply(this, arguments);
                    }

                    return verifyEmailAPI;
                })()
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
            key: "componentDidMount",
            value: (function() {
                var _componentDidMount = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee5() {
                        var hasToken, sessionExists, response;
                        return regeneratorRuntime.wrap(
                            function _callee5$(_context5) {
                                while (1) {
                                    switch ((_context5.prev = _context5.next)) {
                                        case 0:
                                            if (
                                                !(
                                                    this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature
                                                        .mode !== _constants.EMAIL_VERIFICATION_MODE.REQUIRED
                                                )
                                            ) {
                                                _context5.next = 4;
                                                break;
                                            }

                                            _context5.next = 3;
                                            return this.getRecipeInstanceOrThrow().redirect(
                                                {
                                                    action: _constants.EMAIL_PASSWORD_REDIRECTION_URL_ACTION.SUCCESS
                                                },
                                                this.props.history
                                            );

                                        case 3:
                                            return _context5.abrupt("return", _context5.sent);

                                        case 4:
                                            hasToken = this.state.token.length !== 0; // Redirect to login if no existing session and no token in URL.

                                            sessionExists = this.getRecipeInstanceOrThrow().doesSessionExist();

                                            if (!(sessionExists === false && hasToken === false)) {
                                                _context5.next = 10;
                                                break;
                                            }

                                            _context5.next = 9;
                                            return this.getRecipeInstanceOrThrow().redirect(
                                                {
                                                    action:
                                                        _constants.EMAIL_PASSWORD_REDIRECTION_URL_ACTION.SIGN_IN_AND_UP
                                                },
                                                this.props.history
                                            );

                                        case 9:
                                            return _context5.abrupt("return", _context5.sent);

                                        case 10:
                                            _context5.prev = 10;

                                            if (!(hasToken === false)) {
                                                _context5.next = 19;
                                                break;
                                            }

                                            _context5.next = 14;
                                            return (0, _api.sendVerifyEmailAPI)(this.getRecipeInstanceOrThrow());

                                        case 14:
                                            response = _context5.sent;

                                            if (
                                                !(
                                                    response.status ===
                                                    _constants.API_RESPONSE_STATUS.EMAIL_ALREADY_VERIFIED_ERROR
                                                )
                                            ) {
                                                _context5.next = 19;
                                                break;
                                            }

                                            _context5.next = 18;
                                            return this.getRecipeInstanceOrThrow().redirect(
                                                {
                                                    action: _constants.EMAIL_PASSWORD_REDIRECTION_URL_ACTION.SUCCESS
                                                },
                                                this.props.history
                                            );

                                        case 18:
                                            return _context5.abrupt("return", _context5.sent);

                                        case 19:
                                            _context5.next = 23;
                                            break;

                                        case 21:
                                            _context5.prev = 21;
                                            _context5.t0 = _context5["catch"](10);

                                        case 23:
                                        case "end":
                                            return _context5.stop();
                                    }
                                }
                            },
                            _callee5,
                            this,
                            [[10, 21]]
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
