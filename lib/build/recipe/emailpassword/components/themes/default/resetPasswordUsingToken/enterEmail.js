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
                                    className: "primaryText enterEmailSuccessMessage",
                                    css: [
                                        styles.primaryText,
                                        styles.enterEmailSuccessMessage,
                                        process.env.NODE_ENV === "production" ? "" : ";label:EnterEmailTheme;",
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvcmVzZXRQYXNzd29yZFVzaW5nVG9rZW4vZW50ZXJFbWFpbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEU0QiIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L3Jlc2V0UGFzc3dvcmRVc2luZ1Rva2VuL2VudGVyRW1haWwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLypcbiAqIEltcG9ydHMuXG4gKi9cbmltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBFbnRlckVtYWlsVGhlbWVQcm9wcywgRW50ZXJFbWFpbFRoZW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXNcIjtcblxuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCBGb3JtQmFzZSBmcm9tIFwiLi4vLi4vLi4vbGlicmFyeS9Gb3JtQmFzZVwiO1xuXG4vKlxuICogQ29tcG9uZW50LlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGVyRW1haWxUaGVtZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8RW50ZXJFbWFpbFRoZW1lUHJvcHMsIEVudGVyRW1haWxUaGVtZVN0YXRlPiB7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlID0gU3R5bGVDb250ZXh0O1xuICAgIC8qXG4gICAgICogQ29uc3RydWN0b3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJvcHM6IEVudGVyRW1haWxUaGVtZVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGVtYWlsU2VudDogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIE1ldGhvZHMuXG4gICAgICovXG5cbiAgICBvblN1Y2Nlc3MgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIGVtYWlsU2VudDogdHJ1ZVxuICAgICAgICB9KSk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VjY2VzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJlc2VuZCA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoKSA9PiAoe1xuICAgICAgICAgICAgZW1haWxTZW50OiBmYWxzZVxuICAgICAgICB9KSk7XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogUmVuZGVyLlxuICAgICAqL1xuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgeyBmb3JtRmllbGRzLCBjYWxsQVBJIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCB7IGVtYWlsU2VudCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICAvLyBJZiBlbWFpbCBzZW50LCBzaG93IHN1Y2Nlc3MgVUkuXG4gICAgICAgIGlmIChlbWFpbFNlbnQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIiBjc3M9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIGNzcz17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJpbWFyeVRleHQgZW50ZXJFbWFpbFN1Y2Nlc3NNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMucHJpbWFyeVRleHQsIHN0eWxlcy5lbnRlckVtYWlsU3VjY2Vzc01lc3NhZ2VdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQbGVhc2UgY2hlY2sgeW91ciBlbWFpbCBmb3IgdGhlIHBhc3N3b3JkIHJlY292ZXJ5IGxpbmsue1wiIFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxpbmtcIiBjc3M9e3N0eWxlcy5saW5rfSBvbkNsaWNrPXt0aGlzLnJlc2VuZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc2VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPdGhlcndpc2UsIHJldHVybiBGb3JtLlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZvcm1CYXNlXG4gICAgICAgICAgICAgICAgZm9ybUZpZWxkcz17Zm9ybUZpZWxkc31cbiAgICAgICAgICAgICAgICBidXR0b25MYWJlbD17XCJFbWFpbCBtZVwifVxuICAgICAgICAgICAgICAgIG9uU3VjY2Vzcz17dGhpcy5vblN1Y2Nlc3N9XG4gICAgICAgICAgICAgICAgY2FsbEFQST17Y2FsbEFQSX1cbiAgICAgICAgICAgICAgICBzaG93TGFiZWxzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICB2YWxpZGF0ZU9uQmx1cj17dHJ1ZX1cbiAgICAgICAgICAgICAgICBoZWFkZXI9e1xuICAgICAgICAgICAgICAgICAgICA8RnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclRpdGxlXCIgY3NzPXtzdHlsZXMuaGVhZGVyVGl0bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc2V0IHlvdXIgcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJTdWJ0aXRsZVwiIGNzcz17c3R5bGVzLmhlYWRlclN1YnRpdGxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY29uZGFyeVRleHRcIiBjc3M9e3N0eWxlcy5zZWNvbmRhcnlUZXh0fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2Ugd2lsbCBzZW5kIHlvdSBhbiBlbWFpbCB0byByZXNldCB5b3VyIHBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
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
