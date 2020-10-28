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

var _emailPassword = _interopRequireDefault(require("../emailPassword"));

var _ = require("..");

var _constants = require("../../../constants");

var _featureWrapper = _interopRequireDefault(require("../../components/featureWrapper"));

var _core = require("@emotion/core");

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

function _slicedToArray(arr, i) {
    return (
        _arrayWithHoles(arr) ||
        _iterableToArrayLimit(arr, i) ||
        _unsupportedIterableToArray(arr, i) ||
        _nonIterableRest()
    );
}

function _nonIterableRest() {
    throw new TypeError(
        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
}

function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally {
            if (_d) throw _e;
        }
    }
    return _arr;
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

/*
 * Component.
 */
function SignInAndUp(props) {
    /*
     * States.
     */
    var _useState = (0, React.useState)(undefined),
        _useState2 = _slicedToArray(_useState, 2),
        user = _useState2[0],
        setUser = _useState2[1];

    var _useState3 = (0, React.useState)(undefined),
        _useState4 = _slicedToArray(_useState3, 2),
        responseJson = _useState4[0],
        setResponseJson = _useState4[1];
    /*
     * Methods.
     */

    var getRecipeInstanceOrThrow = (0, React.useCallback)(
        function() {
            var instance;

            if (props.__internal !== undefined && props.__internal.instance !== undefined) {
                instance = props.__internal.instance;
            } else {
                instance = _emailPassword["default"].getInstanceOrThrow();
            }

            return instance;
        },
        [props.__internal]
    );

    var signInAPI = /*#__PURE__*/ (function() {
        var _ref = _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee(formFields) {
                var validationErrors, headers, result, _yield$result$json, data, _user;

                return regeneratorRuntime.wrap(
                    function _callee$(_context) {
                        while (1) {
                            switch ((_context.prev = _context.next)) {
                                case 0:
                                    _context.next = 2;
                                    return getRecipeInstanceOrThrow()
                                        .getSignInFeature()
                                        .validate(formFields);

                                case 2:
                                    validationErrors = _context.sent;

                                    if (!(validationErrors.length > 0)) {
                                        _context.next = 5;
                                        break;
                                    }

                                    return _context.abrupt("return", {
                                        status: _constants.API_RESPONSE_STATUS.FIELD_ERROR,
                                        fields: validationErrors
                                    });

                                case 5:
                                    _context.prev = 5;
                                    headers = {
                                        rid: getRecipeInstanceOrThrow().getRecipeId()
                                    };
                                    _context.next = 9;
                                    return onCallSignInAPI(
                                        {
                                            formFields: formFields
                                        },
                                        headers
                                    );

                                case 9:
                                    result = _context.sent;
                                    _context.next = 12;
                                    return result.json();

                                case 12:
                                    _yield$result$json = _context.sent;
                                    data = _yield$result$json.data;

                                    if (!(result.status >= 300)) {
                                        _context.next = 16;
                                        break;
                                    }

                                    return _context.abrupt("return", {
                                        status: _constants.API_RESPONSE_STATUS.GENERAL_ERROR,
                                        message: data.message
                                    });

                                case 16:
                                    if (!(data.status === _constants.API_RESPONSE_STATUS.FIELD_ERROR)) {
                                        _context.next = 18;
                                        break;
                                    }

                                    return _context.abrupt("return", {
                                        status: _constants.API_RESPONSE_STATUS.FIELD_ERROR,
                                        fields: data.fields
                                    });

                                case 18:
                                    if (!(data.status === _constants.API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR)) {
                                        _context.next = 20;
                                        break;
                                    }

                                    return _context.abrupt("return", {
                                        status: _constants.API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR,
                                        message: "Incorrect email & password combination"
                                    });

                                case 20:
                                    // Otherwise, status === OK, update state wit huser and responseJSON.
                                    _user = {
                                        id: data.user.id,
                                        email: data.user.email
                                    };
                                    setUser(_user);
                                    setResponseJson(data);
                                    return _context.abrupt("return", {
                                        status: _constants.API_RESPONSE_STATUS.OK
                                    });

                                case 26:
                                    _context.prev = 26;
                                    _context.t0 = _context["catch"](5);
                                    return _context.abrupt("return", {
                                        status: _constants.API_RESPONSE_STATUS.GENERAL_ERROR,
                                        message: "Something went wrong. Please try again"
                                    });

                                case 29:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    },
                    _callee,
                    null,
                    [[5, 26]]
                );
            })
        );

        return function signInAPI(_x) {
            return _ref.apply(this, arguments);
        };
    })();

    var onSignInSuccess = /*#__PURE__*/ (function() {
        var _ref2 = _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch ((_context2.prev = _context2.next)) {
                            case 0:
                                _context2.next = 2;
                                return onHandleSuccess(
                                    {
                                        action: _constants.SUCCESS_ACTION.SIGN_IN_COMPLETE
                                    },
                                    user,
                                    responseJson
                                );

                            case 2:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2);
            })
        );

        return function onSignInSuccess() {
            return _ref2.apply(this, arguments);
        };
    })();

    var signUpAPI = /*#__PURE__*/ (function() {
        var _ref3 = _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(formFields) {
                var validationErrors, headers, result, _yield$result$json2, data, _user2;

                return regeneratorRuntime.wrap(
                    function _callee3$(_context3) {
                        while (1) {
                            switch ((_context3.prev = _context3.next)) {
                                case 0:
                                    _context3.next = 2;
                                    return getRecipeInstanceOrThrow()
                                        .getSignUpFeature()
                                        .validate(formFields);

                                case 2:
                                    validationErrors = _context3.sent;

                                    if (!(validationErrors.length > 0)) {
                                        _context3.next = 5;
                                        break;
                                    }

                                    return _context3.abrupt("return", {
                                        status: _constants.API_RESPONSE_STATUS.FIELD_ERROR,
                                        fields: validationErrors
                                    });

                                case 5:
                                    _context3.prev = 5;
                                    headers = {
                                        rid: getRecipeInstanceOrThrow().getRecipeId()
                                    };
                                    _context3.next = 9;
                                    return onCallSignUpAPI(
                                        {
                                            formFields: formFields
                                        },
                                        headers
                                    );

                                case 9:
                                    result = _context3.sent;
                                    _context3.next = 12;
                                    return result.json();

                                case 12:
                                    _yield$result$json2 = _context3.sent;
                                    data = _yield$result$json2.data;

                                    if (!(result.status >= 300)) {
                                        _context3.next = 16;
                                        break;
                                    }

                                    return _context3.abrupt("return", {
                                        status: _constants.API_RESPONSE_STATUS.GENERAL_ERROR,
                                        message: data.message
                                    });

                                case 16:
                                    if (!(data.status === _constants.API_RESPONSE_STATUS.FIELD_ERROR)) {
                                        _context3.next = 18;
                                        break;
                                    }

                                    return _context3.abrupt("return", {
                                        status: _constants.API_RESPONSE_STATUS.FIELD_ERROR,
                                        fields: data.fields
                                    });

                                case 18:
                                    // Otherwise, status === OK, update state wit huser and responseJSON.
                                    _user2 = {
                                        id: data.user.id,
                                        email: data.user.email
                                    };
                                    setUser(_user2);
                                    setResponseJson(data);
                                    return _context3.abrupt("return", {
                                        status: _constants.API_RESPONSE_STATUS.OK
                                    });

                                case 24:
                                    _context3.prev = 24;
                                    _context3.t0 = _context3["catch"](5);
                                    return _context3.abrupt("return", {
                                        status: _constants.API_RESPONSE_STATUS.GENERAL_ERROR,
                                        message: "Something went wrong. Please try again"
                                    });

                                case 27:
                                case "end":
                                    return _context3.stop();
                            }
                        }
                    },
                    _callee3,
                    null,
                    [[5, 24]]
                );
            })
        );

        return function signUpAPI(_x2) {
            return _ref3.apply(this, arguments);
        };
    })();

    var onSignUpSuccess = /*#__PURE__*/ (function() {
        var _ref4 = _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch ((_context4.prev = _context4.next)) {
                            case 0:
                                _context4.next = 2;
                                return onHandleSuccess(
                                    {
                                        action: _constants.SUCCESS_ACTION.SIGN_UP_COMPLETE
                                    },
                                    user,
                                    responseJson
                                );

                            case 2:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4);
            })
        );

        return function onSignUpSuccess() {
            return _ref4.apply(this, arguments);
        };
    })();

    var doesSessionExist = (0, React.useCallback)(
        /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch ((_context5.prev = _context5.next)) {
                            case 0:
                                if (!props.doesSessionExist) {
                                    _context5.next = 4;
                                    break;
                                }

                                _context5.next = 3;
                                return props.doesSessionExist();

                            case 3:
                                return _context5.abrupt("return", _context5.sent);

                            case 4:
                                return _context5.abrupt("return", false);

                            case 5:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5);
            })
        ),
        [props]
    );

    var onHandleForgotPasswordClicked = /*#__PURE__*/ (function() {
        var _ref6 = _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee6() {
                var isHandledByUser, resetPasswordUrl;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch ((_context6.prev = _context6.next)) {
                            case 0:
                                if (!props.onHandleForgotPasswordClicked) {
                                    _context6.next = 6;
                                    break;
                                }

                                _context6.next = 3;
                                return props.onHandleForgotPasswordClicked();

                            case 3:
                                isHandledByUser = _context6.sent;

                                if (!isHandledByUser) {
                                    _context6.next = 6;
                                    break;
                                }

                                return _context6.abrupt("return");

                            case 6:
                                // Otherwise, redirect to resetPasswordURL if defined.
                                resetPasswordUrl = getRecipeInstanceOrThrow()
                                    .getSignInFeature()
                                    .getResetPasswordURL();

                                if (!(resetPasswordUrl === undefined)) {
                                    _context6.next = 9;
                                    break;
                                }

                                return _context6.abrupt("return");

                            case 9:
                                window.history.pushState(null, "", resetPasswordUrl);

                            case 10:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6);
            })
        );

        return function onHandleForgotPasswordClicked() {
            return _ref6.apply(this, arguments);
        };
    })();

    var onHandleSuccess = (0, React.useCallback)(
        /*#__PURE__*/ (function() {
            var _ref7 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee7(context, user, responseJson) {
                    var isHandledByUser, onSuccessRedirectURL;
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch ((_context7.prev = _context7.next)) {
                                case 0:
                                    if (!props.onHandleSuccess) {
                                        _context7.next = 6;
                                        break;
                                    }

                                    _context7.next = 3;
                                    return props.onHandleSuccess(context, user, responseJson);

                                case 3:
                                    isHandledByUser = _context7.sent;

                                    if (!isHandledByUser) {
                                        _context7.next = 6;
                                        break;
                                    }

                                    return _context7.abrupt("return");

                                case 6:
                                    // Otherwise, use default, redirect to onSuccessRedirectURL
                                    onSuccessRedirectURL = getRecipeInstanceOrThrow().getOnSuccessRedirectURL();
                                    window.history.pushState(null, "", onSuccessRedirectURL);

                                case 8:
                                case "end":
                                    return _context7.stop();
                            }
                        }
                    }, _callee7);
                })
            );

            return function(_x3, _x4, _x5) {
                return _ref7.apply(this, arguments);
            };
        })(),
        [props, getRecipeInstanceOrThrow]
    );

    var onCallSignUpAPI = function onCallSignUpAPI(requestJson, headers) {
        // If props provided by user.
        if (props.onCallSignUpAPI) {
            return props.onCallSignUpAPI(requestJson, headers);
        }

        return getRecipeInstanceOrThrow().signUpApi(requestJson, headers);
    };

    var onCallSignInAPI = function onCallSignInAPI(requestJson, headers) {
        if (props.onCallSignInAPI) {
            return props.onCallSignInAPI(requestJson, headers);
        }

        return getRecipeInstanceOrThrow().signInApi(requestJson, headers);
    };
    /*
     * Init.
     */

    (0, React.useEffect)(
        function() {
            _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee8() {
                    var sessionExists;
                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch ((_context8.prev = _context8.next)) {
                                case 0:
                                    _context8.next = 2;
                                    return doesSessionExist();

                                case 2:
                                    sessionExists = _context8.sent;

                                    if (!sessionExists) {
                                        _context8.next = 6;
                                        break;
                                    }

                                    _context8.next = 6;
                                    return onHandleSuccess({
                                        action: "SESSION_ALREADY_EXISTS"
                                    });

                                case 6:
                                case "end":
                                    return _context8.stop();
                            }
                        }
                    }, _callee8);
                })
            )();
        },
        [doesSessionExist, onHandleSuccess]
    );
    var signUpFeature = getRecipeInstanceOrThrow().getSignUpFeature();
    var signInFeature = getRecipeInstanceOrThrow().getSignInFeature();
    var signInForm = {
        styleFromInit: signInFeature.getStyle(),
        formFields: signInFeature.getFormFields(),
        resetPasswordURL: signInFeature.getResetPasswordURL(),
        callAPI: signInAPI,
        onSuccess: onSignInSuccess,
        forgotPasswordClick: onHandleForgotPasswordClicked
    };
    var signUpForm = {
        styleFromInit: signUpFeature.getStyle(),
        formFields: signUpFeature.getFormFields(),
        privacyPolicyLink: signUpFeature.getPrivacyPolicyLink(),
        termsAndConditionsLink: signUpFeature.getTermsAndConditionsLink(),
        onSuccess: onSignUpSuccess,
        callAPI: signUpAPI
    };
    /*
     * Render.
     */

    return (0, _core.jsx)(
        _featureWrapper["default"],
        null,
        (0, _core.jsx)(
            React.Fragment,
            null,
            props.children === undefined &&
                (0, _core.jsx)(_.SignInAndUpTheme, {
                    signInForm: signInForm,
                    signUpForm: signUpForm
                }),
            props.children &&
                /*#__PURE__*/ React.cloneElement(props.children, {
                    signInForm: signInForm,
                    signUpForm: signUpForm
                })
        )
    );
}

var _default = SignInAndUp;
exports["default"] = _default;
