"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _types = require("../../types");

var _emailPassword = _interopRequireDefault(require("../../emailPassword"));

var _ = require("../..");

var _constants = require("../../constants");

var _featureWrapper = _interopRequireDefault(require("../../../components/featureWrapper"));

var _core = require("@emotion/core");

var _utils = require("../../../../utils");

var _superTokens = _interopRequireDefault(require("../../../../superTokens"));

var _api = require("./api");

var _constants2 = require("../../../../constants");

var _styleContext = require("../../styles/styleContext");

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
                                        status: _constants.API_RESPONSE_STATUS.FIELD_ERROR,
                                        formFields: validationErrors
                                    });

                                case 5:
                                    _context.next = 7;
                                    return (0, _api.handleSignInAPI)(
                                        formFields,
                                        _this.getRecipeInstanceOrThrow().getRecipeId(),
                                        _this.onCallSignInAPI
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
                                if (!(_this.state.status !== _types.SignInAndUpStateStatus.SUCCESSFUL)) {
                                    _context2.next = 2;
                                    break;
                                }

                                throw Error(_constants2.SOMETHING_WENT_WRONG_ERROR);

                            case 2:
                                _context2.next = 4;
                                return _this.onHandleSuccess({
                                    action: _constants.SUCCESS_ACTION.SIGN_IN_COMPLETE,
                                    user: _this.state.user,
                                    responseJson: _this.state.responseJson
                                });

                            case 4:
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
                                        status: _constants.API_RESPONSE_STATUS.FIELD_ERROR,
                                        formFields: validationErrors
                                    });

                                case 5:
                                    _context3.next = 7;
                                    return (0, _api.handleSignUpAPI)(
                                        formFields,
                                        _this.getRecipeInstanceOrThrow().getRecipeId(),
                                        _this.onCallSignUpAPI
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
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch ((_context4.prev = _context4.next)) {
                            case 0:
                                if (!(_this.state.status !== _types.SignInAndUpStateStatus.SUCCESSFUL)) {
                                    _context4.next = 2;
                                    break;
                                }

                                throw Error(_constants2.SOMETHING_WENT_WRONG_ERROR);

                            case 2:
                                _context4.next = 4;
                                return _this.onHandleSuccess({
                                    action: _constants.SUCCESS_ACTION.SIGN_UP_COMPLETE,
                                    user: _this.state.user,
                                    responseJson: _this.state.responseJson
                                });

                            case 4:
                                return _context4.abrupt("return", _context4.sent);

                            case 5:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4);
            })
        );
        _this.doesSessionExist = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee5() {
                var sessionRecipe;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch ((_context5.prev = _context5.next)) {
                            case 0:
                                if (!(_this.props.doesSessionExist !== undefined)) {
                                    _context5.next = 4;
                                    break;
                                }

                                _context5.next = 3;
                                return _this.props.doesSessionExist();

                            case 3:
                                return _context5.abrupt("return", _context5.sent);

                            case 4:
                                sessionRecipe = _this.getSessionRecipe();

                                if (!(sessionRecipe !== undefined)) {
                                    _context5.next = 7;
                                    break;
                                }

                                return _context5.abrupt("return", sessionRecipe.doesSessionExist());

                            case 7:
                                return _context5.abrupt("return", false);

                            case 8:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5);
            })
        );
        _this.onHandleForgotPasswordClicked = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee6() {
                var isHandledByUser, resetPasswordUrl;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch ((_context6.prev = _context6.next)) {
                            case 0:
                                if (!(_this.props.onHandleForgotPasswordClicked !== undefined)) {
                                    _context6.next = 6;
                                    break;
                                }

                                _context6.next = 3;
                                return _this.props.onHandleForgotPasswordClicked();

                            case 3:
                                isHandledByUser = _context6.sent;

                                if (!isHandledByUser) {
                                    _context6.next = 6;
                                    break;
                                }

                                return _context6.abrupt("return");

                            case 6:
                                // Otherwise, redirect to resetPasswordURL, if defined.
                                resetPasswordUrl = _this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature
                                    .signInForm.resetPasswordURL;

                                if (!(resetPasswordUrl === undefined)) {
                                    _context6.next = 9;
                                    break;
                                }

                                return _context6.abrupt("return");

                            case 9:
                                (0, _utils.redirectToInApp)(
                                    resetPasswordUrl.getAsStringDangerous(),
                                    "Reset password",
                                    _this.props.history
                                );

                            case 10:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6);
            })
        );

        _this.onHandleSuccess = /*#__PURE__*/ (function() {
            var _ref7 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee7(context) {
                    var isHandledByUser, onSuccessRedirectURL;
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch ((_context7.prev = _context7.next)) {
                                case 0:
                                    if (!(_this.props.onHandleSuccess !== undefined)) {
                                        _context7.next = 6;
                                        break;
                                    }

                                    _context7.next = 3;
                                    return _this.props.onHandleSuccess(context);

                                case 3:
                                    isHandledByUser = _context7.sent;

                                    if (!isHandledByUser) {
                                        _context7.next = 6;
                                        break;
                                    }

                                    return _context7.abrupt("return");

                                case 6:
                                    // Otherwise, use default, redirect to onSuccessRedirectURL
                                    onSuccessRedirectURL = _this.getRecipeInstanceOrThrow().getConfig()
                                        .signInAndUpFeature.onSuccessRedirectURL;
                                    (0, _utils.redirectToWithReload)(onSuccessRedirectURL);

                                case 8:
                                case "end":
                                    return _context7.stop();
                            }
                        }
                    }, _callee7);
                })
            );

            return function(_x3) {
                return _ref7.apply(this, arguments);
            };
        })();

        _this.onCallSignUpAPI = function(requestJson, headers) {
            // If props provided by user.
            if (_this.props.onCallSignUpAPI !== undefined) {
                return _this.props.onCallSignUpAPI(requestJson, headers);
            } // Otherwise, use default.

            return _this.getRecipeInstanceOrThrow().signUpAPI(requestJson, headers);
        };

        _this.onCallSignInAPI = function(requestJson, headers) {
            // If props provided by user.
            if (_this.props.onCallSignInAPI !== undefined) {
                return _this.props.onCallSignInAPI(requestJson, headers);
            } // Otherwise, use default.

            return _this.getRecipeInstanceOrThrow().signInAPI(requestJson, headers);
        };

        _this.componentDidMount = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee8() {
                var sessionExists;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch ((_context8.prev = _context8.next)) {
                            case 0:
                                _context8.next = 2;
                                return _this.doesSessionExist();

                            case 2:
                                sessionExists = _context8.sent;

                                if (!sessionExists) {
                                    _context8.next = 7;
                                    break;
                                }

                                _context8.next = 6;
                                return _this.onHandleSuccess({
                                    action: _constants.SUCCESS_ACTION.SESSION_ALREADY_EXISTS
                                });

                            case 6:
                                return _context8.abrupt("return", _context8.sent);

                            case 7:
                                _this.setState(function(oldState) {
                                    if (oldState.status !== _types.SignInAndUpStateStatus.LOADING) {
                                        return oldState;
                                    }

                                    return _objectSpread(
                                        _objectSpread({}, oldState),
                                        {},
                                        {
                                            status: _types.SignInAndUpStateStatus.READY
                                        }
                                    );
                                });

                            case 8:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8);
            })
        );

        _this.render = function() {
            var signUpFeature = _this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature.signUpForm;

            var signInFeature = _this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature.signInForm;

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
                formFields: signUpFeature.formFields,
                privacyPolicyLink: signUpFeature.privacyPolicyLink,
                termsAndConditionsLink: signUpFeature.termsAndConditionsLink,
                onSuccess: _this.onSignUpSuccess,
                callAPI: _this.signUp
            };

            var useShadowDom = _this.getRecipeInstanceOrThrow().getConfig().useShadowDom; // Before session is verified, return empty fragment, prevent UI glitch.

            if (_this.state.status === _types.SignInAndUpStateStatus.LOADING) {
                return (0, _core.jsx)(React.Fragment, null);
            }
            /*
             * Render.
             */

            return (0, _core.jsx)(
                _styleContext.StyleProvider,
                null,
                (0, _core.jsx)(
                    _featureWrapper["default"],
                    {
                        useShadowDom: useShadowDom
                    },
                    (0, _core.jsx)(
                        React.Fragment,
                        null,
                        _this.props.children === undefined &&
                            (0, _core.jsx)(_.SignInAndUpTheme, {
                                signInForm: signInForm,
                                signUpForm: signUpForm
                            }),
                        _this.props.children &&
                            /*#__PURE__*/ React.cloneElement(_this.props.children, {
                                signInForm: signInForm,
                                signUpForm: signUpForm
                            })
                    )
                )
            );
        };

        _this.state = {
            status: _types.SignInAndUpStateStatus.LOADING
        };
        return _this;
    }
    /*
     * Methods.
     */

    _createClass(SignInAndUp, [
        {
            key: "getSessionRecipe",
            value: function getSessionRecipe() {
                return _superTokens["default"].getDefaultSessionRecipe();
            }
        },
        {
            key: "setStateOnSuccessfulAPICall",
            value: function setStateOnSuccessfulAPICall(normalisedAPIResponse) {
                this.setState(function(oldState) {
                    if (
                        oldState.status !== _types.SignInAndUpStateStatus.READY ||
                        normalisedAPIResponse.status !== _constants.API_RESPONSE_STATUS.OK
                    ) {
                        return oldState;
                    }

                    return {
                        status: _types.SignInAndUpStateStatus.SUCCESSFUL,
                        responseJson: normalisedAPIResponse,
                        user: {
                            id: normalisedAPIResponse.user.id,
                            email: normalisedAPIResponse.user.email
                        }
                    };
                });
            }
        }
    ]);

    return SignInAndUp;
})(React.PureComponent);

var _default = (0, _utils.WithRouter)(SignInAndUp);

exports["default"] = _default;
