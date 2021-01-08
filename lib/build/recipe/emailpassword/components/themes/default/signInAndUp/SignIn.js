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

var _react = _interopRequireWildcard(require("react"));

var _styleContext = _interopRequireDefault(require("../../../styles/styleContext"));

var _react2 = require("@emotion/react");

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
var SignInTheme = /*#__PURE__*/ (function(_PureComponent) {
    _inherits(SignInTheme, _PureComponent);

    var _super = _createSuper(SignInTheme);

    function SignInTheme() {
        _classCallCheck(this, SignInTheme);

        return _super.apply(this, arguments);
    }

    _createClass(SignInTheme, [
        {
            key: "render",

            /*
             * Render.
             */
            value: function render() {
                var styles = this.context;
                var _this$props = this.props,
                    signUpClicked = _this$props.signUpClicked,
                    forgotPasswordClick = _this$props.forgotPasswordClick,
                    onSuccess = _this$props.onSuccess,
                    callAPI = _this$props.callAPI;
                var formFields = this.props.formFields;
                return (0, _react2.jsx)(_FormBase["default"], {
                    formFields: formFields,
                    buttonLabel: "SIGN IN",
                    onSuccess: onSuccess,
                    callAPI: callAPI,
                    showLabels: true,
                    header: (0, _react2.jsx)(
                        _react.Fragment,
                        null,
                        (0, _react2.jsx)(
                            "div",
                            {
                                "data-supertokens": "headerTitle",
                                css: styles.headerTitle
                            },
                            "Sign In"
                        ),
                        (0, _react2.jsx)(
                            "div",
                            {
                                "data-supertokens": "headerSubtitle",
                                css: styles.headerSubtitle
                            },
                            (0, _react2.jsx)(
                                "div",
                                {
                                    "data-supertokens": "secondaryText",
                                    css: styles.secondaryText
                                },
                                "Not registered yet?",
                                (0, _react2.jsx)(
                                    "span",
                                    {
                                        "data-supertokens": "link",
                                        onClick: signUpClicked,
                                        css: styles.link
                                    },
                                    "Sign Up"
                                )
                            )
                        ),
                        (0, _react2.jsx)("div", {
                            "data-supertokens": "divider",
                            css: styles.divider
                        })
                    ),
                    footer: (0, _react2.jsx)(
                        "div",
                        {
                            "data-supertokens": "link secondaryText forgotPasswordLink",
                            css: [
                                styles.link,
                                styles.secondaryText,
                                styles.forgotPasswordLink,
                                process.env.NODE_ENV === "production" ? "" : ";label:SignInTheme;",
                                process.env.NODE_ENV === "production"
                                    ? ""
                                    : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvc2lnbkluQW5kVXAvU2lnbkluLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1RXdCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvc2lnbkluQW5kVXAvU2lnbkluLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAoYykgMjAyMCwgVlJBSSBMYWJzIGFuZC9vciBpdHMgYWZmaWxpYXRlcy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpIGFzIHB1Ymxpc2hlZCBieSB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24uXG4gKlxuICogWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5XG4gKiBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLypcbiAqIEltcG9ydHMuXG4gKi9cbmltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBTaWduSW5UaGVtZVByb3BzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5cbi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5cbmltcG9ydCBGb3JtQmFzZSBmcm9tIFwiLi4vLi4vLi4vbGlicmFyeS9Gb3JtQmFzZVwiO1xuXG4vKlxuICogQ29tcG9uZW50LlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZ25JblRoZW1lIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxTaWduSW5UaGVtZVByb3BzPiB7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlID0gU3R5bGVDb250ZXh0O1xuXG4gICAgLypcbiAgICAgKiBSZW5kZXIuXG4gICAgICovXG5cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG5cbiAgICAgICAgY29uc3QgeyBzaWduVXBDbGlja2VkLCBmb3Jnb3RQYXNzd29yZENsaWNrLCBvblN1Y2Nlc3MsIGNhbGxBUEkgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHsgZm9ybUZpZWxkcyB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZvcm1CYXNlXG4gICAgICAgICAgICAgICAgZm9ybUZpZWxkcz17Zm9ybUZpZWxkc31cbiAgICAgICAgICAgICAgICBidXR0b25MYWJlbD17XCJTSUdOIElOXCJ9XG4gICAgICAgICAgICAgICAgb25TdWNjZXNzPXtvblN1Y2Nlc3N9XG4gICAgICAgICAgICAgICAgY2FsbEFQST17Y2FsbEFQSX1cbiAgICAgICAgICAgICAgICBzaG93TGFiZWxzPXt0cnVlfVxuICAgICAgICAgICAgICAgIGhlYWRlcj17XG4gICAgICAgICAgICAgICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImhlYWRlclRpdGxlXCIgY3NzPXtzdHlsZXMuaGVhZGVyVGl0bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpZ24gSW5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiaGVhZGVyU3VidGl0bGVcIiBjc3M9e3N0eWxlcy5oZWFkZXJTdWJ0aXRsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwic2Vjb25kYXJ5VGV4dFwiIGNzcz17c3R5bGVzLnNlY29uZGFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOb3QgcmVnaXN0ZXJlZCB5ZXQ/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtc3VwZXJ0b2tlbnM9XCJsaW5rXCIgb25DbGljaz17c2lnblVwQ2xpY2tlZH0gY3NzPXtzdHlsZXMubGlua30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaWduIFVwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiZGl2aWRlclwiIGNzcz17c3R5bGVzLmRpdmlkZXJ9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L0ZyYWdtZW50PlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb290ZXI9e1xuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwibGluayBzZWNvbmRhcnlUZXh0IGZvcmdvdFBhc3N3b3JkTGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMubGluaywgc3R5bGVzLnNlY29uZGFyeVRleHQsIHN0eWxlcy5mb3Jnb3RQYXNzd29yZExpbmtdfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17Zm9yZ290UGFzc3dvcmRDbGlja30+XG4gICAgICAgICAgICAgICAgICAgICAgICBGb3Jnb3QgcGFzc3dvcmQ/XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19 */"
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
