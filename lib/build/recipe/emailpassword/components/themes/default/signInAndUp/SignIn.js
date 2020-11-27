"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styleContext = _interopRequireDefault(require("../../../styles/styleContext"));

var _core = require("@emotion/core");

var _FormBase = _interopRequireDefault(require("../../../library/FormBase"));

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
 * Styles.
 */
function getStyles(palette) {
    return {
        headerTitle: {
            fontSize: palette.fonts.size[2],
            lineHeight: "40px",
            letterSpacing: "0.58px",
            fontWeight: 800,
            color: palette.colors.textTitle
        },
        headerSubTitle: {
            marginTop: "9px",
            marginBottom: "21px"
        },
        forgotPasswordLink: {
            marginTop: "10px"
        }
    };
}
/*
 * Component.
 */

var SignInTheme = /*#__PURE__*/ (function(_PureComponent) {
    _inherits(SignInTheme, _PureComponent);

    var _super = _createSuper(SignInTheme);

    /*
     * Constructor.
     */
    function SignInTheme(props) {
        var _this;

        _classCallCheck(this, SignInTheme);

        _this = _super.call(this, props);
        var formFields = props.formFields.map(function(field) {
            return _objectSpread(
                _objectSpread({}, field),
                {},
                {
                    ref: /*#__PURE__*/ (0, _react.createRef)(),
                    validated: false
                }
            );
        });
        _this.state = {
            formFields: formFields
        };
        return _this;
    }
    /*
     * Render.
     */

    _createClass(SignInTheme, [
        {
            key: "render",
            value: function render() {
                var styles = this.context;
                var componentStyle = getStyles(styles.palette);
                var _this$props = this.props,
                    signUpClicked = _this$props.signUpClicked,
                    forgotPasswordClick = _this$props.forgotPasswordClick,
                    onSuccess = _this$props.onSuccess,
                    callAPI = _this$props.callAPI;
                var formFields = this.state.formFields;
                return (0, _core.jsx)(_FormBase["default"], {
                    formFields: formFields,
                    buttonLabel: "SIGN IN",
                    onSuccess: onSuccess,
                    callAPI: callAPI,
                    showLabels: true,
                    noValidateOnBlur: true,
                    header: (0, _core.jsx)(
                        _react.Fragment,
                        null,
                        (0, _core.jsx)(
                            "div",
                            {
                                className: "headerTitle",
                                css: [componentStyle.headerTitle, styles.headerTitle]
                            },
                            "Sign In"
                        ),
                        (0, _core.jsx)(
                            "div",
                            {
                                className: "headerSubtitle",
                                css: [componentStyle.headerSubTitle, styles.headerSubtitle]
                            },
                            (0, _core.jsx)(
                                "div",
                                {
                                    className: "secondaryText",
                                    css: styles.secondaryText
                                },
                                "Not registered yet?",
                                (0, _core.jsx)(
                                    "span",
                                    {
                                        className: "link",
                                        onClick: signUpClicked,
                                        css: styles.link
                                    },
                                    "Sign Up"
                                )
                            )
                        ),
                        (0, _core.jsx)("div", {
                            className: "divider",
                            css: styles.divider
                        })
                    ),
                    footer: (0, _core.jsx)(
                        "div",
                        {
                            className: "link secondaryText forgotPasswordLink",
                            css: [
                                styles.link,
                                styles.secondaryText,
                                componentStyle.forgotPasswordLink,
                                styles.forgotPasswordLink
                            ],
                            onClick: forgotPasswordClick
                        },
                        "Forgot password?"
                    )
                });
            }
        }
    ]);

    return SignInTheme;
})(_react.PureComponent);

exports["default"] = SignInTheme;
SignInTheme.contextType = _styleContext["default"];
