"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _constants = require("../../../constants");

var _emailPassword = _interopRequireDefault(require("../emailPassword"));

var _ = require("..");

var _emotion = _interopRequireDefault(require("react-shadow/emotion"));

var _styles = require("../../../styles/styles");

var _core = require("@emotion/core");

var _types = require("../../../types");

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
var SignInAndUp = /*#__PURE__*/ (function(_React$Component) {
    _inherits(SignInAndUp, _React$Component);

    var _super = _createSuper(SignInAndUp);

    function SignInAndUp() {
        var _temp, _this;

        _classCallCheck(this, SignInAndUp);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _possibleConstructorReturn(
            _this,
            ((_temp = _this = _super.call.apply(_super, [this].concat(args))),
            (_this.getRecipeInstanceOrThrow = function() {
                var instance;

                if (_this.props.__internal !== undefined && _this.props.__internal.instance !== undefined) {
                    instance = _this.props.__internal.instance;
                } else {
                    instance = _emailPassword["default"].getInstanceOrThrow();
                }

                return instance;
            }),
            (_this.signInAPI = /*#__PURE__*/ (function() {
                var _ref = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(formFields) {
                        var headers, result, _yield$result$json, data, user;

                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch ((_context.prev = _context.next)) {
                                    case 0:
                                        headers = {
                                            rid: _this.getRecipeInstanceOrThrow().getRecipeId()
                                        };
                                        _context.next = 3;
                                        return _this.onCallSignInAPI(
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
                                                    status: _types.APIStatus.GENERAL_ERROR,
                                                    message: data.message
                                                });
                                            })
                                        );

                                    case 10:
                                        if (!(data.status === _types.APIStatus.FIELD_ERROR)) {
                                            _context.next = 12;
                                            break;
                                        }

                                        return _context.abrupt(
                                            "return",
                                            new Promise(function(resolve) {
                                                resolve({
                                                    status: _types.APIStatus.FIELD_ERROR,
                                                    fields: data.fields
                                                });
                                            })
                                        );

                                    case 12:
                                        if (!(data.status === _types.APIStatus.WRONG_CREDENTIALS_ERROR)) {
                                            _context.next = 14;
                                            break;
                                        }

                                        return _context.abrupt(
                                            "return",
                                            new Promise(function(resolve) {
                                                resolve({
                                                    status: _types.APIStatus.WRONG_CREDENTIALS_ERROR
                                                });
                                            })
                                        );

                                    case 14:
                                        // Otherwise, status === OK.
                                        user = {
                                            id: data.user.id,
                                            email: data.user.email
                                        }; // Call onHandleSuccess, and return OK.

                                        _context.next = 17;
                                        return _this.onHandleSuccess(
                                            {
                                                action: _types.SuccessAction.SIGN_IN_COMPLETE
                                            },
                                            user,
                                            data
                                        );

                                    case 17:
                                        return _context.abrupt(
                                            "return",
                                            new Promise(function(resolve) {
                                                resolve({
                                                    status: _types.APIStatus.OK
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

                return function(_x) {
                    return _ref.apply(this, arguments);
                };
            })()),
            (_this.signUpAPI = /*#__PURE__*/ (function() {
                var _ref2 = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(formFields) {
                        var headers;
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                            while (1) {
                                switch ((_context2.prev = _context2.next)) {
                                    case 0:
                                        headers = new Headers({
                                            rid: _this.getRecipeInstanceOrThrow().getRecipeId()
                                        });
                                        return _context2.abrupt(
                                            "return",
                                            _this.onCallSignUpAPI(
                                                {
                                                    formFields: formFields
                                                },
                                                headers
                                            )
                                        );

                                    case 2:
                                    case "end":
                                        return _context2.stop();
                                }
                            }
                        }, _callee2);
                    })
                );

                return function(_x2) {
                    return _ref2.apply(this, arguments);
                };
            })()),
            (_this.doesSessionExist = /*#__PURE__*/ _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee3() {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch ((_context3.prev = _context3.next)) {
                                case 0:
                                    if (!_this.props.doesSessionExist) {
                                        _context3.next = 4;
                                        break;
                                    }

                                    _context3.next = 3;
                                    return _this.props.doesSessionExist();

                                case 3:
                                    return _context3.abrupt("return", _context3.sent);

                                case 4:
                                    return _context3.abrupt(
                                        "return",
                                        new Promise(function(resolve) {
                                            return resolve(false);
                                        })
                                    );

                                case 5:
                                case "end":
                                    return _context3.stop();
                            }
                        }
                    }, _callee3);
                })
            )),
            (_this.onHandleForgotPasswordClicked = /*#__PURE__*/ _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee4() {
                    var isHandledByUser, onResetPasswordUrl;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch ((_context4.prev = _context4.next)) {
                                case 0:
                                    if (!_this.props.onHandleForgotPasswordClicked) {
                                        _context4.next = 6;
                                        break;
                                    }

                                    _context4.next = 3;
                                    return _this.props.onHandleForgotPasswordClicked();

                                case 3:
                                    isHandledByUser = _context4.sent;

                                    if (!isHandledByUser) {
                                        _context4.next = 6;
                                        break;
                                    }

                                    return _context4.abrupt("return");

                                case 6:
                                    // Otherwise, use default, redirect to resetPasswordURL
                                    onResetPasswordUrl = _this.getRecipeInstanceOrThrow().getSignInFeature()
                                        .getResetPasswordURL; // TODO What if user uses react-router-dom history? => take router from props correctly (see withOrWithoutRouter)

                                    window.history.pushState(onResetPasswordUrl, "");
                                    return _context4.abrupt("return");

                                case 9:
                                case "end":
                                    return _context4.stop();
                            }
                        }
                    }, _callee4);
                })
            )),
            (_this.onHandleSuccess = /*#__PURE__*/ (function() {
                var _ref5 = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee5(context, user, responseJson) {
                        var isHandledByUser, onSuccessRedirectURL;
                        return regeneratorRuntime.wrap(function _callee5$(_context5) {
                            while (1) {
                                switch ((_context5.prev = _context5.next)) {
                                    case 0:
                                        if (!_this.props.onHandleSuccess) {
                                            _context5.next = 6;
                                            break;
                                        }

                                        _context5.next = 3;
                                        return _this.props.onHandleSuccess(context, user, responseJson);

                                    case 3:
                                        isHandledByUser = _context5.sent;

                                        if (!isHandledByUser) {
                                            _context5.next = 6;
                                            break;
                                        }

                                        return _context5.abrupt("return");

                                    case 6:
                                        // Otherwise, use default, redirect to onSuccessRedirectURL
                                        onSuccessRedirectURL = _this
                                            .getRecipeInstanceOrThrow()
                                            .getOnSuccessRedirectURL(); // TODO What if user uses react-router-dom history? => take router from props correctly (see withOrWithoutRouter)

                                        window.history.pushState(onSuccessRedirectURL, "");

                                    case 8:
                                    case "end":
                                        return _context5.stop();
                                }
                            }
                        }, _callee5);
                    })
                );

                return function(_x3, _x4, _x5) {
                    return _ref5.apply(this, arguments);
                };
            })()),
            (_this.onCallSignUpAPI = function(requestJson, headers) {
                // If props provided by user.
                if (_this.props.onCallSignUpAPI) {
                    return _this.props.onCallSignUpAPI(requestJson, headers);
                }

                return _this.getRecipeInstanceOrThrow().signUpApi(requestJson, headers);
            }),
            (_this.onCallSignInAPI = function(requestJson, headers) {
                if (_this.props.onCallSignInAPI) {
                    return _this.props.onCallSignInAPI(requestJson, headers);
                }

                return _this.getRecipeInstanceOrThrow().signInApi(requestJson, headers);
            }),
            _temp)
        );
    }

    _createClass(SignInAndUp, [
        {
            key: "componentDidMount",
            value: (function() {
                var _componentDidMount = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee6() {
                        var hasSession;
                        return regeneratorRuntime.wrap(
                            function _callee6$(_context6) {
                                while (1) {
                                    switch ((_context6.prev = _context6.next)) {
                                        case 0:
                                            _context6.next = 2;
                                            return this.doesSessionExist();

                                        case 2:
                                            hasSession = _context6.sent;

                                            if (hasSession) {
                                                this.onHandleSuccess({
                                                    action: "SESSION_ALREADY_EXISTS"
                                                });
                                            }

                                        case 4:
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

                function componentDidMount() {
                    return _componentDidMount.apply(this, arguments);
                }

                return componentDidMount;
            })()
        },
        {
            key: "render",
            value: function render() {
                var signUpFeature = this.getRecipeInstanceOrThrow().getSignUpFeature();
                var privacyPolicyLink = signUpFeature.getPrivacyPolicyLink();
                var termsAndConditionsLink = signUpFeature.getTermsAndConditionsLink();
                var signUpFormFields = signUpFeature.getFormFields();
                var signInFeature = this.getRecipeInstanceOrThrow().getSignInFeature();
                var resetPasswordURL = signInFeature.getResetPasswordURL();
                var signInFormFields = signInFeature.getFormFields();
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
                            callAPI: this.signInAPI
                        },
                        signUpForm: {
                            formFields: signUpFormFields,
                            privacyPolicyLink: privacyPolicyLink,
                            termsAndConditionsLink: termsAndConditionsLink,
                            callAPI: this.signUpAPI
                        }
                    })
                );
            }
        }
    ]);

    return SignInAndUp;
})(React.Component);

var _default = SignInAndUp;
exports["default"] = _default;
