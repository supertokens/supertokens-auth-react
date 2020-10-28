"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _recipeModule = _interopRequireDefault(require("../recipeModule"));

var _utils = require("../../utils");

var _constants = require("../../constants");

var _signInFeature = _interopRequireDefault(require("./signInFeature"));

var _signUpFeature = _interopRequireDefault(require("./signUpFeature"));

var _SignInAndUp = _interopRequireDefault(require("./components/SignInAndUp"));

var _httpRequest = _interopRequireDefault(require("../../httpRequest"));

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

        var features = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, EmailPassword);

        _this = _super.call(this, config);

        _this.getSignInFeature = function() {
            return _this.signInFeature;
        };

        _this.getSignUpFeature = function() {
            return _this.signUpFeature;
        };

        _this.getOnSuccessRedirectURL = function() {
            return _this.onSuccessRedirectURL;
        };

        _this.signUpApi = function(requestJson, headers) {
            return _this.httpRequest.post("/signup", {
                body: JSON.stringify(requestJson),
                headers: headers
            });
        };

        _this.signInApi = function(requestJson, headers) {
            return _this.httpRequest.post("/signin", {
                body: JSON.stringify(requestJson),
                headers: headers
            });
        };

        var signInAndUpConfig = EmailPassword.getSignInAndUpConfig(config);

        if (signInAndUpConfig !== undefined && signInAndUpConfig.onSuccessRedirectURL !== undefined) {
            _this.onSuccessRedirectURL = signInAndUpConfig.onSuccessRedirectURL;
        } else {
            _this.onSuccessRedirectURL = "/";
        }

        _this.httpRequest = new _httpRequest["default"](config.appInfo);
        var signUpForm = undefined;
        var signInForm = undefined;

        if (signInAndUpConfig !== undefined) {
            signUpForm = signInAndUpConfig.signUpForm;
            signInForm = signInAndUpConfig.signInForm;
        }

        _this.signUpFeature = new _signUpFeature["default"](signUpForm);
        /*
         * Default Sign In corresponds tocomputed Sign Up fields filtered by email and password only.
         * i.e. If the user overrides sign Up fields, that is propagated to default sign In fields.
         */

        var defaultSignInFields = _this.signUpFeature.formFields.filter(function(field) {
            return _constants.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id);
        });

        _this.signInFeature = new _signInFeature["default"](defaultSignInFields, signInForm);
        return _this;
    }
    /*
     * Instance methods.
     */

    _createClass(EmailPassword, null, [
        {
            key: "init",

            /*
             * Static methods.
             */
            value: function init(config) {
                return function(appInfo) {
                    /*
                     * This needs to happen before the constructor is called
                     * See https://github.com/microsoft/TypeScript/issues/8277
                     */
                    var features = {};
                    if (config === undefined) config = {};
                    var signInAndUpConfig = EmailPassword.getSignInAndUpConfig(config);

                    if (!EmailPassword.hasDisabledSignInAndUpDefaultImplementation(signInAndUpConfig)) {
                        features = {
                            "/": _SignInAndUp["default"]
                        };
                    }

                    EmailPassword.instance = new EmailPassword(
                        _objectSpread(
                            _objectSpread({}, config),
                            {},
                            {
                                appInfo: appInfo,
                                features: features,
                                recipeId: "email-password"
                            }
                        )
                    );
                    return EmailPassword.instance;
                };
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
        },
        {
            key: "getSignInAndUpConfig",
            value: function getSignInAndUpConfig(config) {
                if (config === undefined) {
                    return undefined;
                }

                return config.signInAndUpFeature;
            }
        },
        {
            key: "hasDisabledSignInAndUpDefaultImplementation",
            value: function hasDisabledSignInAndUpDefaultImplementation(signInAndUpConfig) {
                if (signInAndUpConfig === undefined) {
                    return false;
                }

                return signInAndUpConfig.disableDefaultImplementation === true;
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
    ]);

    return EmailPassword;
})(_recipeModule["default"]);

exports["default"] = EmailPassword;
