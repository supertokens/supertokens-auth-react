"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _emailPassword = _interopRequireDefault(require("../../emailPassword"));

var _ = require("../..");

var _constants = require("../../constants");

var _featureWrapper = _interopRequireDefault(require("../../../components/featureWrapper"));

var _core = require("@emotion/core");

var _styles = require("../../styles/styles");

var _utils = require("../../../../utils");

var _superTokens = _interopRequireDefault(require("../../../../superTokens"));

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
var SignInAndUp = /*#__PURE__*/ (function(_Component) {
    _inherits(SignInAndUp, _Component);

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
                    var validationErrors, _yield$_this$signInAP, response, responseJson, user;

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
                                    return _this.signInAPI(formFields);

                                case 7:
                                    _yield$_this$signInAP = _context.sent;
                                    response = _yield$_this$signInAP.response;
                                    responseJson = _yield$_this$signInAP.responseJson;

                                    if (responseJson !== undefined && responseJson.user !== undefined) {
                                        user = {
                                            id: responseJson.user.id,
                                            email: responseJson.user.email
                                        };

                                        _this.setState({
                                            user: user,
                                            responseJson: responseJson
                                        });
                                    }

                                    return _context.abrupt("return", response);

                                case 12:
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

        _this.signInAPI = /*#__PURE__*/ (function() {
            var _ref2 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(formFields) {
                    var headers, responseJson;
                    return regeneratorRuntime.wrap(
                        function _callee2$(_context2) {
                            while (1) {
                                switch ((_context2.prev = _context2.next)) {
                                    case 0:
                                        _context2.prev = 0;
                                        headers = {
                                            rid: _this.getRecipeInstanceOrThrow().getRecipeId()
                                        };
                                        _context2.next = 4;
                                        return _this.onCallSignInAPI(
                                            {
                                                formFields: formFields
                                            },
                                            headers
                                        );

                                    case 4:
                                        responseJson = _context2.sent;

                                        if (!(responseJson.status === _constants.API_RESPONSE_STATUS.FIELD_ERROR)) {
                                            _context2.next = 7;
                                            break;
                                        }

                                        return _context2.abrupt("return", {
                                            response: {
                                                status: _constants.API_RESPONSE_STATUS.FIELD_ERROR,
                                                formFields: responseJson.formFields
                                            }
                                        });

                                    case 7:
                                        if (
                                            !(
                                                responseJson.status ===
                                                _constants.API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR
                                            )
                                        ) {
                                            _context2.next = 9;
                                            break;
                                        }

                                        return _context2.abrupt("return", {
                                            response: {
                                                status: _constants.API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR,
                                                message: "Incorrect email & password combination"
                                            }
                                        });

                                    case 9:
                                        if (!(responseJson.status === _constants.API_RESPONSE_STATUS.OK)) {
                                            _context2.next = 11;
                                            break;
                                        }

                                        return _context2.abrupt("return", {
                                            response: {
                                                status: _constants.API_RESPONSE_STATUS.OK
                                            },
                                            responseJson: responseJson
                                        });

                                    case 11:
                                        return _context2.abrupt("return", {
                                            response: {
                                                status: _constants.API_RESPONSE_STATUS.GENERAL_ERROR,
                                                message: "Something went wrong. Please try again"
                                            }
                                        });

                                    case 14:
                                        _context2.prev = 14;
                                        _context2.t0 = _context2["catch"](0);
                                        return _context2.abrupt("return", {
                                            response: {
                                                status: _constants.API_RESPONSE_STATUS.GENERAL_ERROR,
                                                message: "Something went wrong. Please try again"
                                            }
                                        });

                                    case 17:
                                    case "end":
                                        return _context2.stop();
                                }
                            }
                        },
                        _callee2,
                        null,
                        [[0, 14]]
                    );
                })
            );

            return function(_x2) {
                return _ref2.apply(this, arguments);
            };
        })();

        _this.onSignInSuccess = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch ((_context3.prev = _context3.next)) {
                            case 0:
                                if (!(_this.state.user === undefined)) {
                                    _context3.next = 2;
                                    break;
                                }

                                throw Error("Something went wrong. Please try again");

                            case 2:
                                _context3.next = 4;
                                return _this.onHandleSuccess({
                                    action: _constants.SUCCESS_ACTION.SIGN_IN_COMPLETE,
                                    user: _this.state.user,
                                    responseJson: _this.state.responseJson
                                });

                            case 4:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3);
            })
        );

        _this.signUp = /*#__PURE__*/ (function() {
            var _ref4 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee4(formFields) {
                    var validationErrors, _yield$_this$signUpAP, response, responseJson, user;

                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch ((_context4.prev = _context4.next)) {
                                case 0:
                                    _context4.next = 2;
                                    return _this.getRecipeInstanceOrThrow().signUpValidate(formFields);

                                case 2:
                                    validationErrors = _context4.sent;

                                    if (!(validationErrors.length > 0)) {
                                        _context4.next = 5;
                                        break;
                                    }

                                    return _context4.abrupt("return", {
                                        status: _constants.API_RESPONSE_STATUS.FIELD_ERROR,
                                        formFields: validationErrors
                                    });

                                case 5:
                                    _context4.next = 7;
                                    return _this.signUpAPI(formFields);

                                case 7:
                                    _yield$_this$signUpAP = _context4.sent;
                                    response = _yield$_this$signUpAP.response;
                                    responseJson = _yield$_this$signUpAP.responseJson;

                                    if (responseJson !== undefined && responseJson.user !== undefined) {
                                        user = {
                                            id: responseJson.user.id,
                                            email: responseJson.user.email
                                        };

                                        _this.setState({
                                            user: user,
                                            responseJson: responseJson
                                        });
                                    }

                                    return _context4.abrupt("return", response);

                                case 12:
                                case "end":
                                    return _context4.stop();
                            }
                        }
                    }, _callee4);
                })
            );

            return function(_x3) {
                return _ref4.apply(this, arguments);
            };
        })();

        _this.signUpAPI = /*#__PURE__*/ (function() {
            var _ref5 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee5(formFields) {
                    var headers, responseJson;
                    return regeneratorRuntime.wrap(
                        function _callee5$(_context5) {
                            while (1) {
                                switch ((_context5.prev = _context5.next)) {
                                    case 0:
                                        _context5.prev = 0;
                                        headers = {
                                            rid: _this.getRecipeInstanceOrThrow().getRecipeId()
                                        };
                                        _context5.next = 4;
                                        return _this.onCallSignUpAPI(
                                            {
                                                formFields: formFields
                                            },
                                            headers
                                        );

                                    case 4:
                                        responseJson = _context5.sent;

                                        if (!(responseJson.status === _constants.API_RESPONSE_STATUS.FIELD_ERROR)) {
                                            _context5.next = 7;
                                            break;
                                        }

                                        return _context5.abrupt("return", {
                                            response: {
                                                status: _constants.API_RESPONSE_STATUS.FIELD_ERROR,
                                                formFields: responseJson.formFields
                                            }
                                        });

                                    case 7:
                                        if (!(responseJson.status === _constants.API_RESPONSE_STATUS.OK)) {
                                            _context5.next = 9;
                                            break;
                                        }

                                        return _context5.abrupt("return", {
                                            response: {
                                                status: _constants.API_RESPONSE_STATUS.OK
                                            },
                                            responseJson: responseJson
                                        });

                                    case 9:
                                        return _context5.abrupt("return", {
                                            response: {
                                                status: _constants.API_RESPONSE_STATUS.GENERAL_ERROR,
                                                message: "Something went wrong. Please try again"
                                            }
                                        });

                                    case 12:
                                        _context5.prev = 12;
                                        _context5.t0 = _context5["catch"](0);
                                        return _context5.abrupt("return", {
                                            response: {
                                                status: _constants.API_RESPONSE_STATUS.GENERAL_ERROR,
                                                message: "Something went wrong. Please try again"
                                            }
                                        });

                                    case 15:
                                    case "end":
                                        return _context5.stop();
                                }
                            }
                        },
                        _callee5,
                        null,
                        [[0, 12]]
                    );
                })
            );

            return function(_x4) {
                return _ref5.apply(this, arguments);
            };
        })();

        _this.onSignUpSuccess = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch ((_context6.prev = _context6.next)) {
                            case 0:
                                if (!(_this.state.user === undefined)) {
                                    _context6.next = 2;
                                    break;
                                }

                                throw Error("Something went wrong. Please try again");

                            case 2:
                                _context6.next = 4;
                                return _this.onHandleSuccess({
                                    action: _constants.SUCCESS_ACTION.SIGN_UP_COMPLETE,
                                    user: _this.state.user,
                                    responseJson: _this.state.responseJson
                                });

                            case 4:
                                return _context6.abrupt("return", _context6.sent);

                            case 5:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6);
            })
        );
        _this.doesSessionExist = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee7() {
                var sessionRecipe;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch ((_context7.prev = _context7.next)) {
                            case 0:
                                if (!_this.props.doesSessionExist) {
                                    _context7.next = 4;
                                    break;
                                }

                                _context7.next = 3;
                                return _this.props.doesSessionExist();

                            case 3:
                                return _context7.abrupt("return", _context7.sent);

                            case 4:
                                sessionRecipe = _this.getSessionRecipe();

                                if (!(sessionRecipe !== undefined)) {
                                    _context7.next = 7;
                                    break;
                                }

                                return _context7.abrupt("return", sessionRecipe.doesSessionExist());

                            case 7:
                                return _context7.abrupt("return", false);

                            case 8:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7);
            })
        );
        _this.onHandleForgotPasswordClicked = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee8() {
                var isHandledByUser, resetPasswordUrl;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch ((_context8.prev = _context8.next)) {
                            case 0:
                                if (!_this.props.onHandleForgotPasswordClicked) {
                                    _context8.next = 6;
                                    break;
                                }

                                _context8.next = 3;
                                return _this.props.onHandleForgotPasswordClicked();

                            case 3:
                                isHandledByUser = _context8.sent;

                                if (!isHandledByUser) {
                                    _context8.next = 6;
                                    break;
                                }

                                return _context8.abrupt("return");

                            case 6:
                                // Otherwise, redirect to resetPasswordURL if defined.
                                resetPasswordUrl = _this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature
                                    .signInForm.resetPasswordURL;

                                if (!(resetPasswordUrl === undefined)) {
                                    _context8.next = 9;
                                    break;
                                }

                                return _context8.abrupt("return");

                            case 9:
                                (0, _utils.redirectToInApp)(resetPasswordUrl, "Reset password", _this.props.history);

                            case 10:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8);
            })
        );

        _this.onHandleSuccess = /*#__PURE__*/ (function() {
            var _ref9 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee9(context) {
                    var isHandledByUser, onSuccessRedirectURL;
                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while (1) {
                            switch ((_context9.prev = _context9.next)) {
                                case 0:
                                    if (!_this.props.onHandleSuccess) {
                                        _context9.next = 6;
                                        break;
                                    }

                                    _context9.next = 3;
                                    return _this.props.onHandleSuccess(context);

                                case 3:
                                    isHandledByUser = _context9.sent;

                                    if (!isHandledByUser) {
                                        _context9.next = 6;
                                        break;
                                    }

                                    return _context9.abrupt("return");

                                case 6:
                                    // Otherwise, use default, redirect to onSuccessRedirectURL
                                    onSuccessRedirectURL = _this.getRecipeInstanceOrThrow().getConfig()
                                        .signInAndUpFeature.onSuccessRedirectURL;
                                    (0, _utils.redirectToWithReload)(onSuccessRedirectURL);

                                case 8:
                                case "end":
                                    return _context9.stop();
                            }
                        }
                    }, _callee9);
                })
            );

            return function(_x5) {
                return _ref9.apply(this, arguments);
            };
        })();

        _this.onCallSignUpAPI = function(requestJson, headers) {
            // If props provided by user.
            if (_this.props.onCallSignUpAPI) {
                return _this.props.onCallSignUpAPI(requestJson, headers);
            } // Otherwise, use default.

            return _this.getRecipeInstanceOrThrow().signUpAPI(requestJson, headers);
        };

        _this.onCallSignInAPI = function(requestJson, headers) {
            // If props provided by user.
            if (_this.props.onCallSignInAPI) {
                return _this.props.onCallSignInAPI(requestJson, headers);
            } // Otherwise, use default.

            return _this.getRecipeInstanceOrThrow().signInAPI(requestJson, headers);
        };

        _this.componentDidMount = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee10() {
                var sessionExists;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch ((_context10.prev = _context10.next)) {
                            case 0:
                                _context10.next = 2;
                                return _this.doesSessionExist();

                            case 2:
                                sessionExists = _context10.sent;

                                if (!sessionExists) {
                                    _context10.next = 7;
                                    break;
                                }

                                _context10.next = 6;
                                return _this.onHandleSuccess({
                                    action: _constants.SUCCESS_ACTION.SESSION_ALREADY_EXISTS
                                });

                            case 6:
                                return _context10.abrupt("return", _context10.sent);

                            case 7:
                                _this.setState({
                                    isLoading: false
                                });

                            case 8:
                            case "end":
                                return _context10.stop();
                        }
                    }
                }, _callee10);
            })
        );

        _this.render = function() {
            var signUpFeature = _this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature.signUpForm;

            var signInFeature = _this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature.signInForm;

            var defaultStyles = (0, _styles.getDefaultStyles)(_this.getRecipeInstanceOrThrow().getConfig().palette);

            var palette = _this.getRecipeInstanceOrThrow().getConfig().palette;

            var signInForm = {
                styleFromInit: signInFeature.style,
                formFields: signInFeature.formFields,
                resetPasswordURL: signInFeature.resetPasswordURL,
                callAPI: _this.signIn,
                onSuccess: _this.onSignInSuccess,
                forgotPasswordClick: _this.onHandleForgotPasswordClicked,
                defaultStyles: defaultStyles,
                palette: palette
            };
            var signUpForm = {
                styleFromInit: signUpFeature.style,
                formFields: signUpFeature.formFields,
                privacyPolicyLink: signUpFeature.privacyPolicyLink,
                termsAndConditionsLink: signUpFeature.termsAndConditionsLink,
                onSuccess: _this.onSignUpSuccess,
                callAPI: _this.signUp,
                defaultStyles: defaultStyles,
                palette: palette
            };

            var useShadowDom = _this.getRecipeInstanceOrThrow().getConfig().useShadowDom;

            var isLoading = _this.state.isLoading; // Before session is verified, return empty fragment, prevent UI glitch.

            if (isLoading) {
                return (0, _core.jsx)(React.Fragment, null);
            }
            /*
             * Render.
             */

            return (0, _core.jsx)(
                _featureWrapper["default"],
                {
                    useShadowDom: useShadowDom,
                    defaultStyles: defaultStyles
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
            );
        };

        _this.state = {
            isLoading: true,
            user: undefined,
            responseJson: undefined
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
        }
    ]);

    return SignInAndUp;
})(React.Component);

var _default = (0, _utils.WithRouter)(SignInAndUp);

exports["default"] = _default;
