"use strict";

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
var EnterEmailTheme = /*#__PURE__*/ (function(_PureComponent) {
    _inherits(EnterEmailTheme, _PureComponent);

    var _super = _createSuper(EnterEmailTheme);

    /*
     * Constructor.
     */
    function EnterEmailTheme(props) {
        var _this;

        _classCallCheck(this, EnterEmailTheme);

        _this = _super.call(this, props);

        _this.onSuccess = function() {
            _this.setState(function() {
                return {
                    emailSent: true
                };
            });

            if (_this.props.onSuccess !== undefined) {
                _this.props.onSuccess();
            }
        };

        _this.resend = function() {
            _this.setState(function() {
                return {
                    emailSent: false
                };
            });
        };

        _this.state = {
            emailSent: false
        };
        return _this;
    }
    /*
     * Methods.
     */

    _createClass(EnterEmailTheme, [
        {
            key: "render",

            /*
             * Render.
             */
            value: function render() {
                var styles = this.context;
                var _this$props = this.props,
                    formFields = _this$props.formFields,
                    callAPI = _this$props.callAPI;
                var emailSent = this.state.emailSent; // If email sent, show success UI.

                if (emailSent === true) {
                    return (0, _react2.jsx)(
                        "div",
                        {
                            className: "container",
                            css: styles.container
                        },
                        (0, _react2.jsx)(
                            "div",
                            {
                                className: "row",
                                css: styles.row
                            },
                            (0, _react2.jsx)(
                                "div",
                                {
                                    className: "primaryText successMessage",
                                    css: [
                                        styles.primaryText,
                                        styles.enterEmailSuccessMessage,
                                        process.env.NODE_ENV === "production" ? "" : ";label:EnterEmailTheme;",
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvcmVzZXRQYXNzd29yZFVzaW5nVG9rZW4vZW50ZXJFbWFpbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkU0QiIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L3Jlc2V0UGFzc3dvcmRVc2luZ1Rva2VuL2VudGVyRW1haWwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLypcbiAqIEltcG9ydHMuXG4gKi9cbmltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBFbnRlckVtYWlsVGhlbWVQcm9wcywgRW50ZXJFbWFpbFRoZW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXNcIjtcblxuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCBGb3JtQmFzZSBmcm9tIFwiLi4vLi4vLi4vbGlicmFyeS9Gb3JtQmFzZVwiO1xuXG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50ZXJFbWFpbFRoZW1lIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxFbnRlckVtYWlsVGhlbWVQcm9wcywgRW50ZXJFbWFpbFRoZW1lU3RhdGU+IHtcbiAgICBzdGF0aWMgY29udGV4dFR5cGUgPSBTdHlsZUNvbnRleHQ7XG4gICAgLypcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogRW50ZXJFbWFpbFRoZW1lUHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZW1haWxTZW50OiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qXG4gICAgICogTWV0aG9kcy5cbiAgICAgKi9cblxuICAgIG9uU3VjY2VzcyA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoKSA9PiAoe1xuICAgICAgICAgICAgZW1haWxTZW50OiB0cnVlXG4gICAgICAgIH0pKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWNjZXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TdWNjZXNzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVzZW5kID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBlbWFpbFNlbnQ6IGZhbHNlXG4gICAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBSZW5kZXIuXG4gICAgICovXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCB7IGZvcm1GaWVsZHMsIGNhbGxBUEkgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHsgZW1haWxTZW50IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIC8vIElmIGVtYWlsIHNlbnQsIHNob3cgc3VjY2VzcyBVSS5cbiAgICAgICAgaWYgKGVtYWlsU2VudCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgY3NzPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwcmltYXJ5VGV4dCBzdWNjZXNzTWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLnByaW1hcnlUZXh0LCBzdHlsZXMuZW50ZXJFbWFpbFN1Y2Nlc3NNZXNzYWdlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGxlYXNlIGNoZWNrIHlvdXIgZW1haWwgZm9yIHRoZSBwYXNzd29yZCByZWNvdmVyeSBsaW5rLntcIiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsaW5rXCIgY3NzPXtzdHlsZXMubGlua30gb25DbGljaz17dGhpcy5yZXNlbmR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCByZXR1cm4gRm9ybS5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxGb3JtQmFzZVxuICAgICAgICAgICAgICAgIGZvcm1GaWVsZHM9e2Zvcm1GaWVsZHN9XG4gICAgICAgICAgICAgICAgYnV0dG9uTGFiZWw9e1wiRW1haWwgbWVcIn1cbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3M9e3RoaXMub25TdWNjZXNzfVxuICAgICAgICAgICAgICAgIGNhbGxBUEk9e2NhbGxBUEl9XG4gICAgICAgICAgICAgICAgc2hvd0xhYmVscz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVPbkJsdXI9e3RydWV9XG4gICAgICAgICAgICAgICAgaGVhZGVyPXtcbiAgICAgICAgICAgICAgICAgICAgPEZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJUaXRsZVwiIGNzcz17c3R5bGVzLmhlYWRlclRpdGxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNldCB5b3VyIHBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyU3VidGl0bGVcIiBjc3M9e3N0eWxlcy5oZWFkZXJTdWJ0aXRsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWNvbmRhcnlUZXh0XCIgY3NzPXtzdHlsZXMuc2Vjb25kYXJ5VGV4dH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdlIHdpbGwgc2VuZCB5b3UgYW4gZW1haWwgdG8gcmVzZXQgeW91ciBwYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0= */"
                                    ]
                                },
                                "Please check your email for the password recovery link.",
                                " ",
                                (0, _react2.jsx)(
                                    "span",
                                    {
                                        className: "link",
                                        css: styles.link,
                                        onClick: this.resend
                                    },
                                    "Resend"
                                )
                            )
                        )
                    );
                } // Otherwise, return Form.

                return (0, _react2.jsx)(_FormBase["default"], {
                    formFields: formFields,
                    buttonLabel: "Email me",
                    onSuccess: this.onSuccess,
                    callAPI: callAPI,
                    showLabels: false,
                    validateOnBlur: true,
                    header: (0, _react2.jsx)(
                        _react.Fragment,
                        null,
                        (0, _react2.jsx)(
                            "div",
                            {
                                className: "headerTitle",
                                css: styles.headerTitle
                            },
                            "Reset your password"
                        ),
                        (0, _react2.jsx)(
                            "div",
                            {
                                className: "headerSubtitle",
                                css: styles.headerSubtitle
                            },
                            (0, _react2.jsx)(
                                "div",
                                {
                                    className: "secondaryText",
                                    css: styles.secondaryText
                                },
                                "We will send you an email to reset your password"
                            )
                        )
                    )
                });
            }
        }
    ]);

    return EnterEmailTheme;
})(_react.PureComponent);

exports["default"] = EnterEmailTheme;
EnterEmailTheme.contextType = _styleContext["default"];
