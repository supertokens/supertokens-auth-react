"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _styles = require("../../styles/styles");

var _core = require("@emotion/core");

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
var SignInAndUpTheme = /*#__PURE__*/ (function(_React$Component) {
    _inherits(SignInAndUpTheme, _React$Component);

    var _super = _createSuper(SignInAndUpTheme);

    function SignInAndUpTheme() {
        _classCallCheck(this, SignInAndUpTheme);

        return _super.apply(this, arguments);
    }

    _createClass(SignInAndUpTheme, [
        {
            key: "render",
            value: function render() {
                return (0, _core.jsx)(
                    "div",
                    {
                        css: _styles.defaultStyles.container
                    },
                    (0, _core.jsx)(
                        "div",
                        {
                            css: _styles.defaultStyles.row
                        },
                        (0, _core.jsx)(
                            "div",
                            {
                                css: styles.header
                            },
                            (0, _core.jsx)(
                                "div",
                                {
                                    css: styles.headerTitle
                                },
                                "Sign In"
                            ),
                            (0, _core.jsx)(
                                "div",
                                {
                                    css: styles.headerSubtitle
                                },
                                (0, _core.jsx)("div", null, "Not registered yet?"),
                                (0, _core.jsx)(
                                    "div",
                                    {
                                        css: styles.signUpLink
                                    },
                                    "Sign up"
                                )
                            )
                        ),
                        (0, _core.jsx)("div", {
                            css: _styles.defaultStyles.divider
                        }),
                        (0, _core.jsx)(
                            "form",
                            null,
                            this.props.formFields.map(function(field) {
                                return (0, _core.jsx)(
                                    "div",
                                    {
                                        key: field.id
                                    },
                                    (0, _core.jsx)("label", null, field.label),
                                    (0, _core.jsx)("input", {
                                        name: field.id,
                                        placeholder: field.placeholder
                                    })
                                );
                            })
                        ),
                        (0, _core.jsx)("button", null, " Sign In "),
                        (0, _core.jsx)("div", null, "Forgot password?")
                    )
                );
            }
        }
    ]);

    return SignInAndUpTheme;
})(React.Component);

var styles = {
    header: {
        height: "141px"
    },
    headerTitle: {
        paddingTop: "49px",
        fontSize: _styles.palette.fonts.size[1],
        lineHeight: "40px",
        letterSpacing: "0.28px",
        fontWeight: 700,
        fontFamily: _styles.palette.fonts.primary,
        color: _styles.palette.colors.primary
    },
    headerSubtitle: {
        fontSize: _styles.palette.fonts.size[0],
        fontWeight: 400,
        color: _styles.palette.colors.secondary,
        fontFamily: _styles.palette.fonts.primary
    },
    signUpLink: {
        color: "blue"
    }
};
var _default = SignInAndUpTheme;
exports["default"] = _default;
