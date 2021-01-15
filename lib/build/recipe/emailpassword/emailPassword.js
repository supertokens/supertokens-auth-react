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

var _recipeModule = _interopRequireDefault(require("../recipeModule"));

var _utils = require("../../utils");

var _utils2 = require("./utils");

var _ = require(".");

var _normalisedURLPath = _interopRequireDefault(require("../../normalisedURLPath"));

var _constants = require("./constants");

var _constants2 = require("../../constants");

var _superTokens = _interopRequireDefault(require("../../superTokens"));

var _api = require("./components/features/emailVerification/api");

var _api2 = require("./components/features/signOut/api");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
    }
    return target;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
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
 * Class.
 */
var EmailPassword = /*#__PURE__*/ (function(_RecipeModule) {
    _inherits(EmailPassword, _RecipeModule);

    var _super = _createSuper(EmailPassword);

    /*
     * Static Attributes.
     */

    /*
     * Instance Attributes.
     */

    /*
     * Constructor.
     */
    function EmailPassword(config) {
        var _this;

        _classCallCheck(this, EmailPassword);

        _this = _super.call(this, config);

        _this.getConfig = function() {
            return _this.config;
        };

        _this.getFeatures = function() {
            var features = {};

            if (_this.config.signInAndUpFeature.disableDefaultImplementation !== true) {
                var normalisedFullPath = _this
                    .getAppInfo()
                    .websiteBasePath.appendPath(new _normalisedURLPath["default"]("/"));

                features[normalisedFullPath.getAsStringDangerous()] = _.SignInAndUp;
            }

            if (_this.config.resetPasswordUsingTokenFeature.disableDefaultImplementation !== true) {
                var _normalisedFullPath = _this
                    .getAppInfo()
                    .websiteBasePath.appendPath(
                        new _normalisedURLPath["default"](_constants.DEFAULT_RESET_PASSWORD_PATH)
                    );

                features[_normalisedFullPath.getAsStringDangerous()] = _.ResetPasswordUsingToken;
            }

            if (
                _this.config.emailVerificationFeature.disableDefaultImplementation !== true &&
                _this.config.emailVerificationFeature.mode !== _constants.EMAIL_VERIFICATION_MODE.OFF
            ) {
                var _normalisedFullPath2 = _this
                    .getAppInfo()
                    .websiteBasePath.appendPath(
                        new _normalisedURLPath["default"](_constants.DEFAULT_VERIFY_EMAIL_PATH)
                    );

                features[_normalisedFullPath2.getAsStringDangerous()] = _.EmailVerification;
            }

            return features;
        };

        _this.getDefaultRedirectionURL = /*#__PURE__*/ (function() {
            var _ref = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee(context) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch ((_context.prev = _context.next)) {
                                case 0:
                                    _context.t0 = context.action;
                                    _context.next =
                                        _context.t0 === _constants.EMAIL_PASSWORD_REDIRECTION_URL_ACTION.SIGN_IN_AND_UP
                                            ? 3
                                            : _context.t0 ===
                                              _constants.EMAIL_PASSWORD_REDIRECTION_URL_ACTION.VERIFY_EMAIL
                                            ? 4
                                            : _context.t0 ===
                                              _constants.EMAIL_PASSWORD_REDIRECTION_URL_ACTION.RESET_PASSWORD
                                            ? 5
                                            : _context.t0 === _constants.EMAIL_PASSWORD_REDIRECTION_URL_ACTION.SUCCESS
                                            ? 6
                                            : 6;
                                    break;

                                case 3:
                                    return _context.abrupt(
                                        "return",
                                        ""
                                            .concat(_this.getAppInfo().websiteBasePath.getAsStringDangerous(), "?rid=")
                                            .concat(_this.getRecipeId())
                                    );

                                case 4:
                                    return _context.abrupt(
                                        "return",
                                        ""
                                            .concat(_this.getAppInfo().websiteBasePath.getAsStringDangerous())
                                            .concat(_constants.DEFAULT_VERIFY_EMAIL_PATH, "?rid=")
                                            .concat(_this.getRecipeId())
                                    );

                                case 5:
                                    return _context.abrupt(
                                        "return",
                                        ""
                                            .concat(_this.getAppInfo().websiteBasePath.getAsStringDangerous())
                                            .concat(_constants.DEFAULT_RESET_PASSWORD_PATH, "?rid=")
                                            .concat(_this.getRecipeId())
                                    );

                                case 6:
                                    return _context.abrupt("return", "/");

                                case 7:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee);
                })
            );

            return function(_x) {
                return _ref.apply(this, arguments);
            };
        })();

        _this.getSessionRecipe = function() {
            return _superTokens["default"].getInstanceOrThrow().getDefaultSessionRecipe();
        };

        _this.doesSessionExist = function() {
            var sessionRecipe = _this.getSessionRecipe();

            if (sessionRecipe !== undefined) {
                return sessionRecipe.doesSessionExist();
            } // Otherwise, return false.

            return false;
        };

        _this.signOut = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch ((_context2.prev = _context2.next)) {
                            case 0:
                                _context2.next = 2;
                                return (0, _api2.signOut)(_assertThisInitialized(_this));

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
        _this.config = (0, _utils2.normaliseEmailPasswordConfig)(config);
        return _this;
    }
    /*
     * Instance methods.
     */

    _createClass(
        EmailPassword,
        [
            {
                key: "isEmailVerified",

                /*
                 * Email Verification
                 */
                value: (function() {
                    var _isEmailVerified = _asyncToGenerator(
                        /*#__PURE__*/ regeneratorRuntime.mark(function _callee3() {
                            return regeneratorRuntime.wrap(
                                function _callee3$(_context3) {
                                    while (1) {
                                        switch ((_context3.prev = _context3.next)) {
                                            case 0:
                                                _context3.next = 2;
                                                return (0, _api.isEmailVerifiedAPI)(this);

                                            case 2:
                                                return _context3.abrupt("return", _context3.sent);

                                            case 3:
                                            case "end":
                                                return _context3.stop();
                                        }
                                    }
                                },
                                _callee3,
                                this
                            );
                        })
                    );

                    function isEmailVerified() {
                        return _isEmailVerified.apply(this, arguments);
                    }

                    return isEmailVerified;
                })()
                /*
                 * Static methods.
                 */
            }
        ],
        [
            {
                key: "init",
                value: function init(config) {
                    return function(appInfo) {
                        EmailPassword.instance = new EmailPassword(
                            _objectSpread(
                                _objectSpread({}, config),
                                {},
                                {
                                    appInfo: appInfo,
                                    recipeId: EmailPassword.RECIPE_ID
                                }
                            )
                        );
                        return EmailPassword.instance;
                    };
                }
            },
            {
                key: "signOut",
                value: function signOut() {
                    return EmailPassword.getInstanceOrThrow().signOut();
                }
            },
            {
                key: "isEmailVerified",
                value: (function() {
                    var _isEmailVerified2 = _asyncToGenerator(
                        /*#__PURE__*/ regeneratorRuntime.mark(function _callee4() {
                            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                while (1) {
                                    switch ((_context4.prev = _context4.next)) {
                                        case 0:
                                            _context4.next = 2;
                                            return EmailPassword.getInstanceOrThrow().isEmailVerified();

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

                    function isEmailVerified() {
                        return _isEmailVerified2.apply(this, arguments);
                    }

                    return isEmailVerified;
                })()
            },
            {
                key: "getInstanceOrThrow",
                value: function getInstanceOrThrow() {
                    if (EmailPassword.instance === undefined) {
                        var error =
                            "No instance of EmailPassword found. Make sure to call the EmailPassword.init method." +
                            "See https://supertokens.io/docs/emailpassword/starter-guide/frontend"; // eslint-disable-next-line supertokens-auth-react/no-direct-window-object

                        if (typeof window === "undefined") {
                            error = error + _constants2.SSR_ERROR;
                        }

                        throw Error(error);
                    }

                    return EmailPassword.instance;
                }
                /*
                 * Tests methods.
                 */
            },
            {
                key: "reset",
                value: function reset() {
                    if (!(0, _utils.isTest)()) {
                        return;
                    }

                    EmailPassword.instance = undefined;
                    return;
                }
            }
        ]
    );

    return EmailPassword;
})(_recipeModule["default"]);

exports["default"] = EmailPassword;
EmailPassword.RECIPE_ID = "emailpassword";
