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

var _emotion = _interopRequireDefault(require("react-shadow/emotion"));

var _styles = require("../../../styles/styles");

var _core = require("@emotion/core");

var _constants = require("../../../constants");

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

    var getRecipeInstanceOrThrow = function getRecipeInstanceOrThrow() {
        var instance;

        if (props.__internal !== undefined && props.__internal.instance !== undefined) {
            instance = props.__internal.instance;
        } else {
            instance = _emailPassword["default"].getInstanceOrThrow();
        }

        return instance;
    };

    var signInAPI = (0, React.useCallback)(
        /*#__PURE__*/ (function() {
            var _ref = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(formFields) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch ((_context2.prev = _context2.next)) {
                                case 0:
                                    _context2.next = 2;
                                    return (function() {
                                        var _ref2 = _asyncToGenerator(
                                            /*#__PURE__*/ regeneratorRuntime.mark(function _callee(formFields) {
                                                var headers, result, _yield$result$json, data, user;

                                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                                    while (1) {
                                                        switch ((_context.prev = _context.next)) {
                                                            case 0:
                                                                headers = {
                                                                    rid: getRecipeInstanceOrThrow().getRecipeId()
                                                                };
                                                                _context.next = 3;
                                                                return onCallSignInAPI(
                                                                    {
                                                                        formFields: formFields
                                                                    },
                                                                    headers
                                                                );

                                                            case 3:
                                                                result = _context.sent;
                                                                _context.next = 6;
                                                                return result.json();

                                                            case 6:
                                                                _yield$result$json = _context.sent;
                                                                data = _yield$result$json.data;

                                                                if (!(result.status >= 300)) {
                                                                    _context.next = 10;
                                                                    break;
                                                                }

                                                                return _context.abrupt(
                                                                    "return",
                                                                    new Promise(function(resolve) {
                                                                        resolve({
                                                                            status:
                                                                                _constants.API_RESPONSE_STATUS
                                                                                    .GENERAL_ERROR,
                                                                            message: data.message
                                                                        });
                                                                    })
                                                                );

                                                            case 10:
                                                                if (
                                                                    !(
                                                                        data.status ===
                                                                        _constants.API_RESPONSE_STATUS.FIELD_ERROR
                                                                    )
                                                                ) {
                                                                    _context.next = 12;
                                                                    break;
                                                                }

                                                                return _context.abrupt(
                                                                    "return",
                                                                    new Promise(function(resolve) {
                                                                        resolve({
                                                                            status:
                                                                                _constants.API_RESPONSE_STATUS
                                                                                    .FIELD_ERROR,
                                                                            fields: data.fields
                                                                        });
                                                                    })
                                                                );

                                                            case 12:
                                                                if (
                                                                    !(
                                                                        data.status ===
                                                                        _constants.API_RESPONSE_STATUS
                                                                            .WRONG_CREDENTIALS_ERROR
                                                                    )
                                                                ) {
                                                                    _context.next = 14;
                                                                    break;
                                                                }

                                                                return _context.abrupt(
                                                                    "return",
                                                                    new Promise(function(resolve) {
                                                                        resolve({
                                                                            status:
                                                                                _constants.API_RESPONSE_STATUS
                                                                                    .WRONG_CREDENTIALS_ERROR
                                                                        });
                                                                    })
                                                                );

                                                            case 14:
                                                                // Otherwise, status === OK, update state wit huser and responseJSON.
                                                                user = {
                                                                    id: data.user.id,
                                                                    email: data.user.email
                                                                };
                                                                setUser(user);
                                                                setResponseJson(data);
                                                                return _context.abrupt(
                                                                    "return",
                                                                    new Promise(function(resolve) {
                                                                        resolve({
                                                                            status: _constants.API_RESPONSE_STATUS.OK
                                                                        });
                                                                    })
                                                                );

                                                            case 18:
                                                            case "end":
                                                                return _context.stop();
                                                        }
                                                    }
                                                }, _callee);
                                            })
                                        );

                                        return function(_x2) {
                                            return _ref2.apply(this, arguments);
                                        };
                                    })()(formFields);

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

            return function(_x) {
                return _ref.apply(this, arguments);
            };
        })(),
        [getRecipeInstanceOrThrow, setUser, setResponseJson]
    );

    var onSignInSuccess = /*#__PURE__*/ (function() {
        var _ref3 = _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch ((_context3.prev = _context3.next)) {
                            case 0:
                                _context3.next = 2;
                                return onHandleSuccess(
                                    {
                                        action: _constants.SuccessAction.SIGN_IN_COMPLETE
                                    },
                                    user,
                                    responseJson
                                );

                            case 2:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3);
            })
        );

        return function onSignInSuccess() {
            return _ref3.apply(this, arguments);
        };
    })();

    var signUpAPI = /*#__PURE__*/ (function() {
        var _ref4 = _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee4(formFields) {
                var headers;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch ((_context4.prev = _context4.next)) {
                            case 0:
                                headers = new Headers({
                                    rid: getRecipeInstanceOrThrow().getRecipeId()
                                });
                                return _context4.abrupt(
                                    "return",
                                    onCallSignUpAPI(
                                        {
                                            formFields: formFields
                                        },
                                        headers
                                    )
                                );

                            case 2:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4);
            })
        );

        return function signUpAPI(_x3) {
            return _ref4.apply(this, arguments);
        };
    })();

    var onSignUpSuccess = /*#__PURE__*/ (function() {
        var _ref5 = _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch ((_context5.prev = _context5.next)) {
                            case 0:
                                _context5.next = 2;
                                return onHandleSuccess(
                                    {
                                        action: _constants.SuccessAction.SIGN_UP_COMPLETE
                                    },
                                    user,
                                    responseJson
                                );

                            case 2:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5);
            })
        );

        return function onSignUpSuccess() {
            return _ref5.apply(this, arguments);
        };
    })();

    var doesSessionExist = /*#__PURE__*/ (function() {
        var _ref6 = _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch ((_context6.prev = _context6.next)) {
                            case 0:
                                if (!props.doesSessionExist) {
                                    _context6.next = 4;
                                    break;
                                }

                                _context6.next = 3;
                                return props.doesSessionExist();

                            case 3:
                                return _context6.abrupt("return", _context6.sent);

                            case 4:
                                return _context6.abrupt(
                                    "return",
                                    new Promise(function(resolve) {
                                        return resolve(false);
                                    })
                                );

                            case 5:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6);
            })
        );

        return function doesSessionExist() {
            return _ref6.apply(this, arguments);
        };
    })();

    var onHandleForgotPasswordClicked = /*#__PURE__*/ (function() {
        var _ref7 = _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee7() {
                var isHandledByUser, onResetPasswordUrl;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch ((_context7.prev = _context7.next)) {
                            case 0:
                                if (!props.onHandleForgotPasswordClicked) {
                                    _context7.next = 6;
                                    break;
                                }

                                _context7.next = 3;
                                return props.onHandleForgotPasswordClicked();

                            case 3:
                                isHandledByUser = _context7.sent;

                                if (!isHandledByUser) {
                                    _context7.next = 6;
                                    break;
                                }

                                return _context7.abrupt("return");

                            case 6:
                                // Otherwise, use default, redirect to resetPasswordURL
                                onResetPasswordUrl = getRecipeInstanceOrThrow().getSignInFeature().getResetPasswordURL; // TODO What if user uses react-router-dom history? => take router from props correctly (see withOrWithoutRouter)

                                window.history.pushState(onResetPasswordUrl, "");
                                return _context7.abrupt("return");

                            case 9:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7);
            })
        );

        return function onHandleForgotPasswordClicked() {
            return _ref7.apply(this, arguments);
        };
    })();

    var onHandleSuccess = /*#__PURE__*/ (function() {
        var _ref8 = _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee8(context, user, responseJson) {
                var isHandledByUser, onSuccessRedirectURL;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch ((_context8.prev = _context8.next)) {
                            case 0:
                                if (!props.onHandleSuccess) {
                                    _context8.next = 6;
                                    break;
                                }

                                _context8.next = 3;
                                return props.onHandleSuccess(context, user, responseJson);

                            case 3:
                                isHandledByUser = _context8.sent;

                                if (!isHandledByUser) {
                                    _context8.next = 6;
                                    break;
                                }

                                return _context8.abrupt("return");

                            case 6:
                                // Otherwise, use default, redirect to onSuccessRedirectURL
                                onSuccessRedirectURL = getRecipeInstanceOrThrow().getOnSuccessRedirectURL(); // TODO What if user uses react-router-dom history? => take router from props correctly (see withOrWithoutRouter)

                                window.history.pushState(onSuccessRedirectURL, "");

                            case 8:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8);
            })
        );

        return function onHandleSuccess(_x4, _x5, _x6) {
            return _ref8.apply(this, arguments);
        };
    })();

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
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee9() {
                    var sessionExists;
                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while (1) {
                            switch ((_context9.prev = _context9.next)) {
                                case 0:
                                    _context9.next = 2;
                                    return doesSessionExist();

                                case 2:
                                    sessionExists = _context9.sent;

                                    if (!sessionExists) {
                                        _context9.next = 6;
                                        break;
                                    }

                                    _context9.next = 6;
                                    return onHandleSuccess({
                                        action: "SESSION_ALREADY_EXISTS"
                                    });

                                case 6:
                                case "end":
                                    return _context9.stop();
                            }
                        }
                    }, _callee9);
                })
            )();
        },
        [doesSessionExist, onHandleSuccess]
    );
    var signUpFeature = getRecipeInstanceOrThrow().getSignUpFeature();
    var privacyPolicyLink = signUpFeature.getPrivacyPolicyLink();
    var termsAndConditionsLink = signUpFeature.getTermsAndConditionsLink();
    var signUpFormFields = signUpFeature.getFormFields();
    var signInFeature = getRecipeInstanceOrThrow().getSignInFeature();
    var resetPasswordURL = signInFeature.getResetPasswordURL();
    var signInFormFields = signInFeature.getFormFields();
    /*
     * Render.
     */

    return (0, _core.jsx)(
        _emotion["default"].div,
        {
            css: _styles.defaultStyles.root,
            id: _constants.ST_ROOT_CONTAINER
        },
        (0, _core.jsx)(_.SignInAndUpTheme, {
            signInForm: {
                formFields: signInFormFields,
                resetPasswordURL: resetPasswordURL,
                callAPI: signInAPI,
                onSuccess: onSignInSuccess
            },
            signUpForm: {
                formFields: signUpFormFields,
                privacyPolicyLink: privacyPolicyLink,
                termsAndConditionsLink: termsAndConditionsLink,
                onSuccess: onSignUpSuccess,
                callAPI: signUpAPI
            }
        })
    );
}

var _default = SignInAndUp;
exports["default"] = _default;
