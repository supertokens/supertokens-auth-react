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

var _react = require("react");

var _emailPassword = _interopRequireDefault(require("../emailPassword"));

var _constants = require("../constants");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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

        _this.isEmailVerifiedAPI = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(
                    function _callee$(_context) {
                        while (1) {
                            switch ((_context.prev = _context.next)) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return _this.getRecipeInstanceOrThrow().isEmailVerified();

                                case 3:
                                    return _context.abrupt("return", _context.sent);

                                case 6:
                                    _context.prev = 6;
                                    _context.t0 = _context["catch"](0);
                                    return _context.abrupt("return", true);

                                case 9:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    },
                    _callee,
                    null,
                    [[0, 6]]
                );
            })
        );

        _this.render = function() {
            if (_this.state.status === _constants.EMAIL_PASSWORD_AUTH_STATE.LOADING) {
                return null;
            }

            return _this.props.children;
        };

        _this.state = {
            status: _constants.EMAIL_PASSWORD_AUTH_STATE.LOADING
        };
        return _this;
    }
    /*
     * Methods.
     */

    _createClass(EmailPasswordAuth, [
        {
            key: "componentDidMount",
            value: (function() {
                var _componentDidMount = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
                        var sessionExists, isEmailVerified;
                        return regeneratorRuntime.wrap(
                            function _callee2$(_context2) {
                                while (1) {
                                    switch ((_context2.prev = _context2.next)) {
                                        case 0:
                                            sessionExists = this.getRecipeInstanceOrThrow().doesSessionExist();

                                            if (!(sessionExists === false)) {
                                                _context2.next = 5;
                                                break;
                                            }

                                            _context2.next = 4;
                                            return this.getRecipeInstanceOrThrow().redirect(
                                                {
                                                    action:
                                                        _constants.EMAIL_PASSWORD_REDIRECTION_URL_ACTION.SIGN_IN_AND_UP
                                                },
                                                this.props.history
                                            );

                                        case 4:
                                            return _context2.abrupt("return", _context2.sent);

                                        case 5:
                                            // Update status to ready.
                                            this.setState({
                                                status: _constants.EMAIL_PASSWORD_AUTH_STATE.READY
                                            }); // If email verification mode is off or optional, return.

                                            if (
                                                !(
                                                    this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature
                                                        .mode !== _constants.EMAIL_VERIFICATION_MODE.REQUIRED
                                                )
                                            ) {
                                                _context2.next = 8;
                                                break;
                                            }

                                            return _context2.abrupt("return");

                                        case 8:
                                            _context2.next = 10;
                                            return this.isEmailVerifiedAPI();

                                        case 10:
                                            isEmailVerified = _context2.sent;

                                            if (!(isEmailVerified === false)) {
                                                _context2.next = 15;
                                                break;
                                            }

                                            _context2.next = 14;
                                            return this.getRecipeInstanceOrThrow().redirect(
                                                {
                                                    action:
                                                        _constants.EMAIL_PASSWORD_REDIRECTION_URL_ACTION.VERIFY_EMAIL
                                                },
                                                this.props.history
                                            );

                                        case 14:
                                            return _context2.abrupt("return", _context2.sent);

                                        case 15:
                                            return _context2.abrupt("return");

                                        case 16:
                                        case "end":
                                            return _context2.stop();
                                    }
                                }
                            },
                            _callee2,
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
})(_react.PureComponent);

var _default = EmailPasswordAuth;
exports["default"] = _default;
