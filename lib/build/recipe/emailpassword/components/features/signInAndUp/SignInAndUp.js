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

var _api = require("./api");

var _emailPassword = _interopRequireDefault(require("../../../emailPassword"));

var _ = require("../../..");

var _constants = require("../../../../../constants");

var _featureWrapper = _interopRequireDefault(require("../../../../components/featureWrapper"));

var _constants2 = require("../../../constants");

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
 * Component.
 */
var SignInAndUp = /*#__PURE__*/ (function(_PureComponent) {
    _inherits(SignInAndUp, _PureComponent);

    var _super = _createSuper(SignInAndUp);

    /*
     * Constructor.
     */
    function SignInAndUp(props) {
        var _this;

        _classCallCheck(this, SignInAndUp);

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

        _this.signIn = /*#__PURE__*/ (function() {
            var _ref = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee(formFields) {
                    var validationErrors, normalisedAPIResponse;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch ((_context.prev = _context.next)) {
                                case 0:
                                    _context.next = 2;
                                    return _this.getRecipeInstanceOrThrow().signInValidate(formFields);

                                case 2:
                                    validationErrors = _context.sent;

                                    if (!(validationErrors.length > 0)) {
                                        _context.next = 5;
                                        break;
                                    }

                                    return _context.abrupt("return", {
                                        status: _constants2.API_RESPONSE_STATUS.FIELD_ERROR,
                                        formFields: validationErrors
                                    });

                                case 5:
                                    _context.next = 7;
                                    return (0, _api.handleSignInAPI)(
                                        formFields,
                                        _this.getRecipeInstanceOrThrow().getRecipeId(),
                                        _this.getRecipeInstanceOrThrow().signInAPI
                                    );

                                case 7:
                                    normalisedAPIResponse = _context.sent;

                                    _this.setStateOnSuccessfulAPICall(normalisedAPIResponse);

                                    return _context.abrupt("return", normalisedAPIResponse);

                                case 10:
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

        _this.onSignInSuccess = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch ((_context2.prev = _context2.next)) {
                            case 0:
                                if (!(_this.state.status !== _constants2.SIGN_IN_AND_UP_STATUS.SUCCESSFUL)) {
                                    _context2.next = 2;
                                    break;
                                }

                                throw Error(_constants.SOMETHING_WENT_WRONG_ERROR);

                            case 2:
                                _this.getRecipeInstanceOrThrow().onHandleEvent({
                                    action: _constants2.SUCCESS_ACTION.SIGN_IN_COMPLETE,
                                    user: _this.state.user,
                                    responseJson: _this.state.responseJson
                                });

                                _context2.next = 5;
                                return _this.getRecipeInstanceOrThrow().redirect({
                                    action: _constants2.GET_REDIRECTION_URL_ACTION.SUCCESS
                                });

                            case 5:
                                return _context2.abrupt("return", _context2.sent);

                            case 6:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2);
            })
        );

        _this.signUp = /*#__PURE__*/ (function() {
            var _ref3 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(formFields) {
                    var validationErrors, normalisedAPIResponse;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch ((_context3.prev = _context3.next)) {
                                case 0:
                                    _context3.next = 2;
                                    return _this.getRecipeInstanceOrThrow().signUpValidate(formFields);

                                case 2:
                                    validationErrors = _context3.sent;

                                    if (!(validationErrors.length > 0)) {
                                        _context3.next = 5;
                                        break;
                                    }

                                    return _context3.abrupt("return", {
                                        status: _constants2.API_RESPONSE_STATUS.FIELD_ERROR,
                                        formFields: validationErrors
                                    });

                                case 5:
                                    _context3.next = 7;
                                    return (0, _api.handleSignUpAPI)(
                                        formFields,
                                        _this.getRecipeInstanceOrThrow().getRecipeId(),
                                        _this.getRecipeInstanceOrThrow().signUpAPI
                                    );

                                case 7:
                                    normalisedAPIResponse = _context3.sent;

                                    _this.setStateOnSuccessfulAPICall(normalisedAPIResponse);

                                    return _context3.abrupt("return", normalisedAPIResponse);

                                case 10:
                                case "end":
                                    return _context3.stop();
                            }
                        }
                    }, _callee3);
                })
            );

            return function(_x2) {
                return _ref3.apply(this, arguments);
            };
        })();

        _this.onSignUpSuccess = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee4() {
                var action;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch ((_context4.prev = _context4.next)) {
                            case 0:
                                if (!(_this.state.status !== _constants2.SIGN_IN_AND_UP_STATUS.SUCCESSFUL)) {
                                    _context4.next = 2;
                                    break;
                                }

                                throw Error(_constants.SOMETHING_WENT_WRONG_ERROR);

                            case 2:
                                _this.getRecipeInstanceOrThrow().onHandleEvent({
                                    action: _constants2.SUCCESS_ACTION.SIGN_UP_COMPLETE,
                                    user: _this.state.user,
                                    responseJson: _this.state.responseJson
                                }); // Otherwise, redirect to email verification screen if sign up and email verification mode is required.

                                action = _constants2.GET_REDIRECTION_URL_ACTION.SUCCESS;

                                if (
                                    _this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature.mode ===
                                    _constants2.EMAIL_VERIFICATION_MODE.REQUIRED
                                ) {
                                    action = _constants2.GET_REDIRECTION_URL_ACTION.VERIFY_EMAIL;
                                }

                                _context4.next = 7;
                                return _this.getRecipeInstanceOrThrow().redirect({
                                    action: action
                                });

                            case 7:
                                return _context4.abrupt("return", _context4.sent);

                            case 8:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4);
            })
        );
        _this.onHandleForgotPasswordClicked = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch ((_context5.prev = _context5.next)) {
                            case 0:
                                return _context5.abrupt(
                                    "return",
                                    _this.getRecipeInstanceOrThrow().redirect(
                                        {
                                            action: _constants2.GET_REDIRECTION_URL_ACTION.RESET_PASSWORD
                                        },
                                        false,
                                        "Reset password",
                                        _this.props.history
                                    )
                                );

                            case 1:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5);
            })
        );

        _this.doesEmailExist = /*#__PURE__*/ (function() {
            var _ref6 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee6(value) {
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch ((_context6.prev = _context6.next)) {
                                case 0:
                                    _context6.next = 2;
                                    return (0, _api.handleEmailExistsAPICall)(
                                        value,
                                        _this.getRecipeInstanceOrThrow().getRecipeId(),
                                        _this.getRecipeInstanceOrThrow().emailExistsAPI
                                    );

                                case 2:
                                    return _context6.abrupt("return", _context6.sent);

                                case 3:
                                case "end":
                                    return _context6.stop();
                            }
                        }
                    }, _callee6);
                })
            );

            return function(_x3) {
                return _ref6.apply(this, arguments);
            };
        })();

        _this.componentDidMount = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee7() {
                var sessionExists;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch ((_context7.prev = _context7.next)) {
                            case 0:
                                sessionExists = _this.getRecipeInstanceOrThrow().doesSessionExist();

                                if (!sessionExists) {
                                    _context7.next = 6;
                                    break;
                                }

                                _this.getRecipeInstanceOrThrow().onHandleEvent({
                                    action: _constants2.SUCCESS_ACTION.SESSION_ALREADY_EXISTS
                                });

                                _context7.next = 5;
                                return _this.getRecipeInstanceOrThrow().redirect(
                                    {
                                        action: _constants2.GET_REDIRECTION_URL_ACTION.SUCCESS
                                    },
                                    false,
                                    undefined,
                                    _this.props.history
                                );

                            case 5:
                                return _context7.abrupt("return", _context7.sent);

                            case 6:
                                _this.setState(function(oldState) {
                                    if (oldState.status !== _constants2.SIGN_IN_AND_UP_STATUS.LOADING) {
                                        return oldState;
                                    }

                                    return _objectSpread(
                                        _objectSpread({}, oldState),
                                        {},
                                        {
                                            status: _constants2.SIGN_IN_AND_UP_STATUS.READY
                                        }
                                    );
                                });

                            case 7:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7);
            })
        );

        _this.render = function() {
            var signInAndUpFeature = _this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature;

            var signUpFeature = signInAndUpFeature.signUpForm;
            var signInFeature = signInAndUpFeature.signInForm;
            var signInForm = {
                styleFromInit: signInFeature.style,
                formFields: signInFeature.formFields,
                resetPasswordURL: signInFeature.resetPasswordURL,
                callAPI: _this.signIn,
                onSuccess: _this.onSignInSuccess,
                forgotPasswordClick: _this.onHandleForgotPasswordClicked
            };
            var signUpForm = {
                styleFromInit: signUpFeature.style,
                formFields: _this.getThemeSignUpFeatureFormFields(signUpFeature.formFields),
                privacyPolicyLink: signUpFeature.privacyPolicyLink,
                termsOfServiceLink: signUpFeature.termsOfServiceLink,
                onSuccess: _this.onSignUpSuccess,
                callAPI: _this.signUp
            };

            var useShadowDom = _this.getRecipeInstanceOrThrow().getConfig().useShadowDom; // Before session is verified, return empty fragment, prevent UI glitch.

            if (_this.state.status === _constants2.SIGN_IN_AND_UP_STATUS.LOADING) {
                return (0, _react2.jsx)(React.Fragment, null);
            }
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
                        (0, _react2.jsx)(_.SignInAndUpTheme, {
                            defaultToSignUp: signInAndUpFeature.defaultToSignUp,
                            signInForm: signInForm,
                            signUpForm: signUpForm
                        }),
                    _this.props.children &&
                        /*#__PURE__*/ React.cloneElement(_this.props.children, {
                            defaultToSignUp: signInAndUpFeature.defaultToSignUp,
                            signInForm: signInForm,
                            signUpForm: signUpForm
                        })
                )
            );
        };

        _this.state = {
            status: _constants2.SIGN_IN_AND_UP_STATUS.LOADING
        };
        return _this;
    }
    /*
     * Methods.
     */

    _createClass(SignInAndUp, [
        {
            key: "setStateOnSuccessfulAPICall",
            value: function setStateOnSuccessfulAPICall(normalisedAPIResponse) {
                this.setState(function(oldState) {
                    if (
                        oldState.status !== _constants2.SIGN_IN_AND_UP_STATUS.READY ||
                        normalisedAPIResponse.status !== _constants2.API_RESPONSE_STATUS.OK
                    ) {
                        return oldState;
                    }

                    return {
                        status: _constants2.SIGN_IN_AND_UP_STATUS.SUCCESSFUL,
                        responseJson: normalisedAPIResponse,
                        user: {
                            id: normalisedAPIResponse.user.id,
                            email: normalisedAPIResponse.user.email
                        }
                    };
                });
            }
        },
        {
            key: "getThemeSignUpFeatureFormFields",
            value: function getThemeSignUpFeatureFormFields(formFields) {
                var _this2 = this;

                var emailPasswordOnly = formFields.length === 2;
                return formFields.map(function(field) {
                    return _objectSpread(
                        _objectSpread({}, field),
                        {},
                        {
                            showIsRequired: (function() {
                                // If email and password only, do not show required indicator (*).
                                if (emailPasswordOnly) {
                                    return false;
                                } // Otherwise, show for all non optional fields (including email and password).

                                return field.optional === false;
                            })(),
                            validate: (function() {
                                // If field is not email, return field validate unchanged.
                                if (field.id !== _constants2.MANDATORY_FORM_FIELDS_ID.EMAIL) {
                                    return field.validate;
                                } // Otherwise, if email, use syntax validate method and check if email exists.

                                return /*#__PURE__*/ (function() {
                                    var _ref8 = _asyncToGenerator(
                                        /*#__PURE__*/ regeneratorRuntime.mark(function _callee8(value) {
                                            var syntaxError;
                                            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                                while (1) {
                                                    switch ((_context8.prev = _context8.next)) {
                                                        case 0:
                                                            _context8.next = 2;
                                                            return field.validate(value);

                                                        case 2:
                                                            syntaxError = _context8.sent;

                                                            if (!(syntaxError !== undefined)) {
                                                                _context8.next = 5;
                                                                break;
                                                            }

                                                            return _context8.abrupt("return", syntaxError);

                                                        case 5:
                                                            if (!(typeof value !== "string")) {
                                                                _context8.next = 7;
                                                                break;
                                                            }

                                                            return _context8.abrupt(
                                                                "return",
                                                                "Email must be of type string"
                                                            );

                                                        case 7:
                                                            _context8.next = 9;
                                                            return _this2.doesEmailExist(value);

                                                        case 9:
                                                            return _context8.abrupt("return", _context8.sent);

                                                        case 10:
                                                        case "end":
                                                            return _context8.stop();
                                                    }
                                                }
                                            }, _callee8);
                                        })
                                    );

                                    return function(_x4) {
                                        return _ref8.apply(this, arguments);
                                    };
                                })();
                            })()
                        }
                    );
                });
            }
            /*
             * Init.
             */
        }
    ]);

    return SignInAndUp;
})(React.PureComponent);

var _default = SignInAndUp;
exports["default"] = _default;
