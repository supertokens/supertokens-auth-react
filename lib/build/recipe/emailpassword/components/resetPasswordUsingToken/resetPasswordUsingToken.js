"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _emailPassword = _interopRequireDefault(require("../../emailPassword"));

var _ = require("../..");

var _featureWrapper = _interopRequireDefault(require("../../../components/featureWrapper"));

var _core = require("@emotion/core");

var _styles = require("../../styles/styles");

var _constants = require("../../constants");

var _utils = require("../../../../utils");

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
var ResetPasswordUsingToken = /*#__PURE__*/ (function(_Component) {
    _inherits(ResetPasswordUsingToken, _Component);

    var _super = _createSuper(ResetPasswordUsingToken);

    /*
     * Constructor.
     */
    function ResetPasswordUsingToken(props) {
        var _this;

        _classCallCheck(this, ResetPasswordUsingToken);

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

        _this.submitNewPassword = /*#__PURE__*/ (function() {
            var _ref = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee(formFields) {
                    var validationErrors;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch ((_context.prev = _context.next)) {
                                case 0:
                                    _context.next = 2;
                                    return _this.getRecipeInstanceOrThrow().submitNewPasswordValidate(formFields);

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
                                    if (!(formFields[0].value !== formFields[1].value)) {
                                        _context.next = 7;
                                        break;
                                    }

                                    return _context.abrupt("return", {
                                        status: _constants.API_RESPONSE_STATUS.FIELD_ERROR,
                                        formFields: [
                                            {
                                                id: "confirm-password",
                                                error: "Confirmation password doesn't match"
                                            }
                                        ]
                                    });

                                case 7:
                                    _context.next = 9;
                                    return _this.submitNewPasswordAPI([formFields[0]]);

                                case 9:
                                    return _context.abrupt("return", _context.sent);

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

        _this.submitNewPasswordAPI = /*#__PURE__*/ (function() {
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
                                        return _this.onCallSubmitNewPasswordAPI(
                                            {
                                                formFields: formFields,
                                                token: _this.state.token
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
                                            status: _constants.API_RESPONSE_STATUS.FIELD_ERROR,
                                            formFields: responseJson.formFields
                                        });

                                    case 7:
                                        if (
                                            !(
                                                responseJson.status ===
                                                _constants.API_RESPONSE_STATUS.RESET_PASSWORD_INVALID_TOKEN_ERROR
                                            )
                                        ) {
                                            _context2.next = 9;
                                            break;
                                        }

                                        return _context2.abrupt("return", {
                                            status: _constants.API_RESPONSE_STATUS.RESET_PASSWORD_INVALID_TOKEN_ERROR
                                        });

                                    case 9:
                                        return _context2.abrupt("return", {
                                            status: _constants.API_RESPONSE_STATUS.OK
                                        });

                                    case 12:
                                        _context2.prev = 12;
                                        _context2.t0 = _context2["catch"](0);
                                        return _context2.abrupt("return", {
                                            status: _constants.API_RESPONSE_STATUS.OK // message: "Something went wrong. Please try again"
                                        });

                                    case 15:
                                    case "end":
                                        return _context2.stop();
                                }
                            }
                        },
                        _callee2,
                        null,
                        [[0, 12]]
                    );
                })
            );

            return function(_x2) {
                return _ref2.apply(this, arguments);
            };
        })();

        _this.onSubmitNewPasswordFormSuccess = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch ((_context3.prev = _context3.next)) {
                            case 0:
                                _context3.next = 2;
                                return _this.onHandleSuccess({
                                    action: _constants.SUCCESS_ACTION.PASSWORD_RESET_SUCCESSFUL
                                });

                            case 2:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3);
            })
        );

        _this.enterEmail = /*#__PURE__*/ (function() {
            var _ref4 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee4(formFields) {
                    var validationErrors;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch ((_context4.prev = _context4.next)) {
                                case 0:
                                    _context4.next = 2;
                                    return _this.getRecipeInstanceOrThrow().enterEmailValidate(formFields);

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
                                    return _this.enterEmailAPI(formFields);

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

            return function(_x3) {
                return _ref4.apply(this, arguments);
            };
        })();

        _this.enterEmailAPI = /*#__PURE__*/ (function() {
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
                                        return _this.onCallEnterEmailAPI(
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
                                            status: _constants.API_RESPONSE_STATUS.FIELD_ERROR,
                                            formFields: responseJson.formFields
                                        });

                                    case 7:
                                        if (!(responseJson.status === _constants.API_RESPONSE_STATUS.OK)) {
                                            _context5.next = 9;
                                            break;
                                        }

                                        return _context5.abrupt("return", {
                                            status: _constants.API_RESPONSE_STATUS.OK
                                        });

                                    case 9:
                                        return _context5.abrupt("return", {
                                            status: _constants.API_RESPONSE_STATUS.GENERAL_ERROR,
                                            message: "Something went wrong. Please try again"
                                        });

                                    case 12:
                                        _context5.prev = 12;
                                        _context5.t0 = _context5["catch"](0);
                                        return _context5.abrupt("return", {
                                            status: _constants.API_RESPONSE_STATUS.GENERAL_ERROR,
                                            message: "Something went wrong. Please try again"
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

        _this.onEnterEmailFormSuccess = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch ((_context6.prev = _context6.next)) {
                            case 0:
                                _context6.next = 2;
                                return _this.onHandleSuccess({
                                    action: _constants.SUCCESS_ACTION.RESET_PASSWORD_EMAIL_SENT
                                });

                            case 2:
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
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch ((_context7.prev = _context7.next)) {
                                case 0:
                                    if (!_this.props.onHandleSuccess) {
                                        _context7.next = 3;
                                        break;
                                    }

                                    _context7.next = 3;
                                    return _this.props.onHandleSuccess(context);

                                case 3:
                                case "end":
                                    return _context7.stop();
                            }
                        }
                    }, _callee7);
                })
            );

            return function(_x5) {
                return _ref7.apply(this, arguments);
            };
        })();

        _this.onSignInClicked = function() {
            // Otherwise, use default, redirect to onSuccessRedirectURL
            var onSuccessRedirectURL = _this.getRecipeInstanceOrThrow().getConfig().resetPasswordUsingTokenFeature
                .onSuccessRedirectURL;

            (0, _utils.redirectToInApp)(onSuccessRedirectURL, "Sign In", _this.props.history);
        };

        _this.onCallEnterEmailAPI = function(requestJson, headers) {
            // If props provided by user.
            if (_this.props.onCallEnterEmailAPI) {
                return _this.props.onCallEnterEmailAPI(requestJson, headers);
            } // Otherwise, use default.

            return _this.getRecipeInstanceOrThrow().enterEmailAPI(requestJson, headers);
        };

        _this.onCallSubmitNewPasswordAPI = function(requestJson, headers) {
            // If props provided by user.
            if (_this.props.onCallSubmitNewPasswordAPI) {
                return _this.props.onCallSubmitNewPasswordAPI(requestJson, headers);
            } // Otherwise, use default.

            return _this.getRecipeInstanceOrThrow().submitNewPasswordAPI(requestJson, headers);
        };

        _this.render = function() {
            var enterEmailFormFeature = _this.getRecipeInstanceOrThrow().getConfig().resetPasswordUsingTokenFeature
                .enterEmailForm;

            var submitNewPasswordFormFeature = _this.getRecipeInstanceOrThrow().getConfig()
                .resetPasswordUsingTokenFeature.submitNewPasswordForm;

            var defaultStyles = (0, _styles.getDefaultStyles)(_this.getRecipeInstanceOrThrow().getConfig().palette);

            var palette = _this.getRecipeInstanceOrThrow().getConfig().palette;

            var submitNewPasswordForm = {
                styleFromInit: submitNewPasswordFormFeature.style,
                formFields: submitNewPasswordFormFeature.formFields,
                callAPI: _this.submitNewPassword,
                onSuccess: _this.onSubmitNewPasswordFormSuccess,
                defaultStyles: defaultStyles,
                palette: palette,
                onSignInClicked: _this.onSignInClicked
            };
            var enterEmailForm = {
                styleFromInit: enterEmailFormFeature.style,
                formFields: enterEmailFormFeature.formFields,
                onSuccess: _this.onEnterEmailFormSuccess,
                callAPI: _this.enterEmail,
                defaultStyles: defaultStyles,
                palette: palette
            };
            var hasToken = _this.state.token.length !== 0;
            /*
             * Render.
             */

            return (0, _core.jsx)(
                _featureWrapper["default"],
                {
                    defaultStyles: defaultStyles
                },
                (0, _core.jsx)(
                    React.Fragment,
                    null,
                    _this.props.children === undefined &&
                        (0, _core.jsx)(_.ResetPasswordUsingTokenTheme, {
                            submitNewPassword: submitNewPasswordForm,
                            enterEmail: enterEmailForm,
                            hasToken: hasToken
                        }),
                    _this.props.children &&
                        /*#__PURE__*/ React.cloneElement(_this.props.children, {
                            submitNewPasswordForm: submitNewPasswordForm,
                            enterEmailForm: enterEmailForm,
                            hasToken: hasToken
                        })
                )
            );
        };

        var urlParams = new URLSearchParams(window.location.search);
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

    return ResetPasswordUsingToken;
})(React.Component);

var _default = ResetPasswordUsingToken;
exports["default"] = _default;
