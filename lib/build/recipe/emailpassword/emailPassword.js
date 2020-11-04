"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _recipeModule = _interopRequireDefault(require("../recipeModule"));

var _utils = require("../../utils");

var _httpRequest = _interopRequireDefault(require("../../httpRequest"));

var _utils2 = require("./utils");

var _ = require(".");

var _normalisedURLPath = _interopRequireDefault(require("../../normalisedURLPath"));

var _resetPasswordUsingToken = _interopRequireDefault(
    require("./components/resetPasswordUsingToken/resetPasswordUsingToken")
);

var _constants = require("./constants");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

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

                features[_normalisedFullPath.getAsStringDangerous()] = _resetPasswordUsingToken["default"];
            }

            return features;
        };

        _this.signUpAPI = /*#__PURE__*/ (function() {
            var _ref = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee(requestJson, headers) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch ((_context.prev = _context.next)) {
                                case 0:
                                    return _context.abrupt(
                                        "return",
                                        _this.httpRequest.post("/signup", {
                                            body: JSON.stringify(requestJson),
                                            headers: headers
                                        })
                                    );

                                case 1:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee);
                })
            );

            return function(_x, _x2) {
                return _ref.apply(this, arguments);
            };
        })();

        _this.signInAPI = /*#__PURE__*/ (function() {
            var _ref2 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(requestJson, headers) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch ((_context2.prev = _context2.next)) {
                                case 0:
                                    return _context2.abrupt(
                                        "return",
                                        _this.httpRequest.post("/signin", {
                                            body: JSON.stringify(requestJson),
                                            headers: headers
                                        })
                                    );

                                case 1:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2);
                })
            );

            return function(_x3, _x4) {
                return _ref2.apply(this, arguments);
            };
        })();

        _this.submitNewPasswordAPI = /*#__PURE__*/ (function() {
            var _ref3 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(requestJson, headers) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch ((_context3.prev = _context3.next)) {
                                case 0:
                                    return _context3.abrupt(
                                        "return",
                                        _this.httpRequest.post("/user/password/reset", {
                                            body: JSON.stringify(requestJson),
                                            headers: headers
                                        })
                                    );

                                case 1:
                                case "end":
                                    return _context3.stop();
                            }
                        }
                    }, _callee3);
                })
            );

            return function(_x5, _x6) {
                return _ref3.apply(this, arguments);
            };
        })();

        _this.enterEmailAPI = /*#__PURE__*/ (function() {
            var _ref4 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee4(requestJson, headers) {
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch ((_context4.prev = _context4.next)) {
                                case 0:
                                    return _context4.abrupt(
                                        "return",
                                        _this.httpRequest.post("/user/password/reset/token", {
                                            body: JSON.stringify(requestJson),
                                            headers: headers
                                        })
                                    );

                                case 1:
                                case "end":
                                    return _context4.stop();
                            }
                        }
                    }, _callee4);
                })
            );

            return function(_x7, _x8) {
                return _ref4.apply(this, arguments);
            };
        })();

        _this.signOut = function() {
            return _this.httpRequest.post("/signout", {
                body: JSON.stringify({}),
                headers: {
                    rid: EmailPassword.RECIPE_ID
                }
            });
        };

        _this.config = (0, _utils2.normaliseEmailPasswordConfig)(config);
        _this.httpRequest = new _httpRequest["default"](config.appInfo);
        return _this;
    }
    /*
     * Instance methods.
     */

    _createClass(
        EmailPassword,
        [
            {
                key: "signUpValidate",

                /*
                 * Validate
                 */

                /*
                 * SignIn/SignUp
                 */
                value: (function() {
                    var _signUpValidate = _asyncToGenerator(
                        /*#__PURE__*/ regeneratorRuntime.mark(function _callee5(input) {
                            return regeneratorRuntime.wrap(
                                function _callee5$(_context5) {
                                    while (1) {
                                        switch ((_context5.prev = _context5.next)) {
                                            case 0:
                                                _context5.next = 2;
                                                return (0, _utils.validateFormOrThrow)(
                                                    input,
                                                    this.config.signInAndUpFeature.signUpForm.formFields
                                                );

                                            case 2:
                                                return _context5.abrupt("return", _context5.sent);

                                            case 3:
                                            case "end":
                                                return _context5.stop();
                                        }
                                    }
                                },
                                _callee5,
                                this
                            );
                        })
                    );

                    function signUpValidate(_x9) {
                        return _signUpValidate.apply(this, arguments);
                    }

                    return signUpValidate;
                })()
            },
            {
                key: "signInValidate",
                value: (function() {
                    var _signInValidate = _asyncToGenerator(
                        /*#__PURE__*/ regeneratorRuntime.mark(function _callee6(input) {
                            return regeneratorRuntime.wrap(
                                function _callee6$(_context6) {
                                    while (1) {
                                        switch ((_context6.prev = _context6.next)) {
                                            case 0:
                                                _context6.next = 2;
                                                return (0, _utils.validateFormOrThrow)(
                                                    input,
                                                    this.config.signInAndUpFeature.signInForm.formFields
                                                );

                                            case 2:
                                                return _context6.abrupt("return", _context6.sent);

                                            case 3:
                                            case "end":
                                                return _context6.stop();
                                        }
                                    }
                                },
                                _callee6,
                                this
                            );
                        })
                    );

                    function signInValidate(_x10) {
                        return _signInValidate.apply(this, arguments);
                    }

                    return signInValidate;
                })()
                /*
                 * Reset Password
                 */
            },
            {
                key: "submitNewPasswordValidate",
                value: (function() {
                    var _submitNewPasswordValidate = _asyncToGenerator(
                        /*#__PURE__*/ regeneratorRuntime.mark(function _callee7(input) {
                            return regeneratorRuntime.wrap(
                                function _callee7$(_context7) {
                                    while (1) {
                                        switch ((_context7.prev = _context7.next)) {
                                            case 0:
                                                _context7.next = 2;
                                                return (0, _utils.validateFormOrThrow)(
                                                    input,
                                                    this.config.resetPasswordUsingTokenFeature.submitNewPasswordForm
                                                        .formFields
                                                );

                                            case 2:
                                                return _context7.abrupt("return", _context7.sent);

                                            case 3:
                                            case "end":
                                                return _context7.stop();
                                        }
                                    }
                                },
                                _callee7,
                                this
                            );
                        })
                    );

                    function submitNewPasswordValidate(_x11) {
                        return _submitNewPasswordValidate.apply(this, arguments);
                    }

                    return submitNewPasswordValidate;
                })()
            },
            {
                key: "enterEmailValidate",
                value: (function() {
                    var _enterEmailValidate = _asyncToGenerator(
                        /*#__PURE__*/ regeneratorRuntime.mark(function _callee8(input) {
                            return regeneratorRuntime.wrap(
                                function _callee8$(_context8) {
                                    while (1) {
                                        switch ((_context8.prev = _context8.next)) {
                                            case 0:
                                                _context8.next = 2;
                                                return (0, _utils.validateFormOrThrow)(
                                                    input,
                                                    this.config.resetPasswordUsingTokenFeature.enterEmailForm.formFields
                                                );

                                            case 2:
                                                return _context8.abrupt("return", _context8.sent);

                                            case 3:
                                            case "end":
                                                return _context8.stop();
                                        }
                                    }
                                },
                                _callee8,
                                this
                            );
                        })
                    );

                    function enterEmailValidate(_x12) {
                        return _enterEmailValidate.apply(this, arguments);
                    }

                    return enterEmailValidate;
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
                key: "getInstanceOrThrow",
                value: function getInstanceOrThrow() {
                    if (EmailPassword.instance === undefined) {
                        throw Error(
                            "No instance of ".concat(
                                EmailPassword.constructor.name,
                                ' found. Make sure to call the "init" method.'
                            )
                        ); // TODO Add relevant doc.
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
EmailPassword.RECIPE_ID = "email-password";
