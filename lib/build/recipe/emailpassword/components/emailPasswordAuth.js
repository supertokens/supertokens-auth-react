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

var _react2 = require("@emotion/react");

var _superTokens = _interopRequireDefault(require("../../../superTokens"));

var _utils = require("../../../utils");

var _emailPassword = _interopRequireDefault(require("../emailPassword"));

var _constants = require("../constants");

var _spinnerIcon = _interopRequireDefault(require("../assets/spinnerIcon"));

var _styles = require("./themes/default/styles/styles");

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
var EmailPasswordAuth = /*#__PURE__*/ (function(_PureComponent) {
    _inherits(EmailPasswordAuth, _PureComponent);

    var _super = _createSuper(EmailPasswordAuth);

    /*
     * Constructor.
     */
    function EmailPasswordAuth(props) {
        var _this;

        _classCallCheck(this, EmailPasswordAuth);

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

        _this.doesSessionExist = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                var sessionRecipe;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch ((_context.prev = _context.next)) {
                            case 0:
                                sessionRecipe = _this.getSessionRecipe();

                                if (!(sessionRecipe !== undefined)) {
                                    _context.next = 3;
                                    break;
                                }

                                return _context.abrupt("return", sessionRecipe.doesSessionExist());

                            case 3:
                                return _context.abrupt("return", false);

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee);
            })
        );
        _this.isEmailVerifiedAPI = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
                var response;
                return regeneratorRuntime.wrap(
                    function _callee2$(_context2) {
                        while (1) {
                            switch ((_context2.prev = _context2.next)) {
                                case 0:
                                    _context2.prev = 0;
                                    _context2.next = 3;
                                    return _this.getRecipeInstanceOrThrow().isEmailVerifiedAPI({
                                        rid: _this.getRecipeInstanceOrThrow().getRecipeId()
                                    });

                                case 3:
                                    response = _context2.sent;
                                    return _context2.abrupt("return", response.isVerified);

                                case 7:
                                    _context2.prev = 7;
                                    _context2.t0 = _context2["catch"](0);
                                    return _context2.abrupt("return", true);

                                case 10:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    },
                    _callee2,
                    null,
                    [[0, 7]]
                );
            })
        );
        _this.onHandleShowEmailVerificationScreen = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee3() {
                var handled;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch ((_context3.prev = _context3.next)) {
                            case 0:
                                if (!_this.props.onHandleShowEmailVerificationScreen) {
                                    _context3.next = 6;
                                    break;
                                }

                                _context3.next = 3;
                                return _this.props.onHandleShowEmailVerificationScreen();

                            case 3:
                                handled = _context3.sent;

                                if (!(handled === true)) {
                                    _context3.next = 6;
                                    break;
                                }

                                return _context3.abrupt("return");

                            case 6:
                                // Otherwise, redirect to default email verification screen.
                                (0, _utils.redirectToInApp)(
                                    ""
                                        .concat(
                                            _this
                                                .getRecipeInstanceOrThrow()
                                                .getAppInfo()
                                                .websiteBasePath.getAsStringDangerous()
                                        )
                                        .concat(_constants.DEFAULT_VERIFY_EMAIL_PATH, "?rid=")
                                        .concat(_this.getRecipeInstanceOrThrow().getRecipeId()),
                                    undefined,
                                    _this.props.history
                                );
                                return _context3.abrupt("return");

                            case 8:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3);
            })
        );

        _this.render = function() {
            var primary =
                _emailPassword["default"].getInstanceOrThrow().getConfig().palette.primary ||
                _styles.defaultPalette.colors.primary;

            if (_this.state.status === _constants.EMAIL_PASSWORD_AUTH.LOADING) {
                return (0, _react2.jsx)(
                    "div",
                    {
                        style: {
                            left: "50%",
                            position: "absolute",
                            top: "50%",
                            width: "100px",
                            height: "auto",
                            transform: "translateX(-50%) translateY(-50%)"
                        }
                    },
                    (0, _react2.jsx)(_spinnerIcon["default"], {
                        color: primary
                    })
                );
            }

            return _this.props.children;
        };

        _this.state = {
            status: _constants.EMAIL_PASSWORD_AUTH.LOADING
        };
        return _this;
    }
    /*
     * Methods.
     */

    _createClass(EmailPasswordAuth, [
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
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee4() {
                        var hasValidSession, isEmailVerified;
                        return regeneratorRuntime.wrap(
                            function _callee4$(_context4) {
                                while (1) {
                                    switch ((_context4.prev = _context4.next)) {
                                        case 0:
                                            _context4.next = 2;
                                            return this.doesSessionExist();

                                        case 2:
                                            hasValidSession = _context4.sent;

                                            if (!(hasValidSession === false)) {
                                                _context4.next = 6;
                                                break;
                                            }

                                            (0, _utils.redirectToInApp)(
                                                this.getRecipeInstanceOrThrow()
                                                    .getAppInfo()
                                                    .websiteBasePath.getAsStringDangerous(),
                                                undefined,
                                                this.props.history
                                            );
                                            return _context4.abrupt("return");

                                        case 6:
                                            // Update status to ready.
                                            this.setState({
                                                status: _constants.EMAIL_PASSWORD_AUTH.READY
                                            }); // If email verification mode is off or optional, return.

                                            if (
                                                !(
                                                    this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature
                                                        .mode !== _constants.EMAIL_VERIFICATION_MODE.REQUIRED
                                                )
                                            ) {
                                                _context4.next = 9;
                                                break;
                                            }

                                            return _context4.abrupt("return");

                                        case 9:
                                            _context4.next = 11;
                                            return this.isEmailVerifiedAPI();

                                        case 11:
                                            isEmailVerified = _context4.sent;

                                            if (!(isEmailVerified === false)) {
                                                _context4.next = 14;
                                                break;
                                            }

                                            return _context4.abrupt(
                                                "return",
                                                this.onHandleShowEmailVerificationScreen()
                                            );

                                        case 14:
                                            return _context4.abrupt("return");

                                        case 15:
                                        case "end":
                                            return _context4.stop();
                                    }
                                }
                            },
                            _callee4,
                            this
                        );
                    })
                );

                function componentDidMount() {
                    return _componentDidMount.apply(this, arguments);
                }

                return componentDidMount;
            })()
            /*
             * Render.
             */
        }
    ]);

    return EmailPasswordAuth;
})(React.PureComponent);

var _default = EmailPasswordAuth;
exports["default"] = _default;
