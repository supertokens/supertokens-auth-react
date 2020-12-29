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
 * Styles.
 */
function getStyles(palette) {
    return {
        headerTitle: {
            fontSize: palette.fonts.size[2],
            lineHeight: "40px",
            letterSpacing: "0.58px",
            fontWeight: 600,
            color: palette.colors.textTitle
        },
        headerSubTitle: {
            marginTop: "9px",
            marginBottom: "21px"
        },
        successMessage: {
            marginBottom: "15px"
        }
    };
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
                var componentStyles = getStyles(styles.palette);
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
                                        componentStyles.successMessage,
                                        styles.successMessage,
                                        process.env.NODE_ENV === "production" ? "" : ";label:EnterEmailTheme;",
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvcmVzZXRQYXNzd29yZFVzaW5nVG9rZW4vZW50ZXJFbWFpbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0c0QiIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L3Jlc2V0UGFzc3dvcmRVc2luZ1Rva2VuL2VudGVyRW1haWwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLypcbiAqIEltcG9ydHMuXG4gKi9cbmltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBFbnRlckVtYWlsVGhlbWVQcm9wcywgRW50ZXJFbWFpbFRoZW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IENTU09iamVjdCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdC90eXBlc1wiO1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IEZvcm1CYXNlIGZyb20gXCIuLi8uLi8uLi9saWJyYXJ5L0Zvcm1CYXNlXCI7XG5pbXBvcnQgeyBTdHlsZXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IE5vcm1hbGlzZWRQYWxldHRlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbi8qXG4gKiBTdHlsZXMuXG4gKi9cbmZ1bmN0aW9uIGdldFN0eWxlcyhwYWxldHRlOiBOb3JtYWxpc2VkUGFsZXR0ZSk6IFN0eWxlcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVhZGVyVGl0bGU6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiBwYWxldHRlLmZvbnRzLnNpemVbMl0sXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiBcIjQwcHhcIixcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IFwiMC41OHB4XCIsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICBjb2xvcjogcGFsZXR0ZS5jb2xvcnMudGV4dFRpdGxlXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0LFxuXG4gICAgICAgIGhlYWRlclN1YlRpdGxlOiB7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6IFwiOXB4XCIsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjFweFwiXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0LFxuXG4gICAgICAgIHN1Y2Nlc3NNZXNzYWdlOiB7XG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMTVweFwiXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0XG4gICAgfTtcbn1cblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRlckVtYWlsVGhlbWUgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PEVudGVyRW1haWxUaGVtZVByb3BzLCBFbnRlckVtYWlsVGhlbWVTdGF0ZT4ge1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZSA9IFN0eWxlQ29udGV4dDtcbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBFbnRlckVtYWlsVGhlbWVQcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBlbWFpbFNlbnQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBNZXRob2RzLlxuICAgICAqL1xuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBlbWFpbFNlbnQ6IHRydWVcbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblN1Y2Nlc3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblN1Y2Nlc3MoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXNlbmQgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIGVtYWlsU2VudDogZmFsc2VcbiAgICAgICAgfSkpO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFN0eWxlcyA9IGdldFN0eWxlcyhzdHlsZXMucGFsZXR0ZSk7XG4gICAgICAgIGNvbnN0IHsgZm9ybUZpZWxkcywgY2FsbEFQSSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgeyBlbWFpbFNlbnQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgLy8gSWYgZW1haWwgc2VudCwgc2hvdyBzdWNjZXNzIFVJLlxuICAgICAgICBpZiAoZW1haWxTZW50ID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBjc3M9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInByaW1hcnlUZXh0IHN1Y2Nlc3NNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMucHJpbWFyeVRleHQsIGNvbXBvbmVudFN0eWxlcy5zdWNjZXNzTWVzc2FnZSwgc3R5bGVzLnN1Y2Nlc3NNZXNzYWdlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGxlYXNlIGNoZWNrIHlvdXIgZW1haWwgZm9yIHRoZSBwYXNzd29yZCByZWNvdmVyeSBsaW5rLntcIiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsaW5rXCIgY3NzPXtzdHlsZXMubGlua30gb25DbGljaz17dGhpcy5yZXNlbmR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCByZXR1cm4gRm9ybS5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxGb3JtQmFzZVxuICAgICAgICAgICAgICAgIGZvcm1GaWVsZHM9e2Zvcm1GaWVsZHN9XG4gICAgICAgICAgICAgICAgYnV0dG9uTGFiZWw9e1wiRW1haWwgbWVcIn1cbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3M9e3RoaXMub25TdWNjZXNzfVxuICAgICAgICAgICAgICAgIGNhbGxBUEk9e2NhbGxBUEl9XG4gICAgICAgICAgICAgICAgc2hvd0xhYmVscz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVPbkJsdXI9e3RydWV9XG4gICAgICAgICAgICAgICAgaGVhZGVyPXtcbiAgICAgICAgICAgICAgICAgICAgPEZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJUaXRsZVwiIGNzcz17W2NvbXBvbmVudFN0eWxlcy5oZWFkZXJUaXRsZSwgc3R5bGVzLmhlYWRlclRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzZXQgeW91ciBwYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclN1YnRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclN1YlRpdGxlLCBzdHlsZXMuaGVhZGVyU3VidGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY29uZGFyeVRleHRcIiBjc3M9e3N0eWxlcy5zZWNvbmRhcnlUZXh0fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2Ugd2lsbCBzZW5kIHlvdSBhbiBlbWFpbCB0byByZXNldCB5b3VyIHBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
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
                                css: [
                                    componentStyles.headerTitle,
                                    styles.headerTitle,
                                    process.env.NODE_ENV === "production" ? "" : ";label:EnterEmailTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvcmVzZXRQYXNzd29yZFVzaW5nVG9rZW4vZW50ZXJFbWFpbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOEhxRCIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L3Jlc2V0UGFzc3dvcmRVc2luZ1Rva2VuL2VudGVyRW1haWwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLypcbiAqIEltcG9ydHMuXG4gKi9cbmltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBFbnRlckVtYWlsVGhlbWVQcm9wcywgRW50ZXJFbWFpbFRoZW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IENTU09iamVjdCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdC90eXBlc1wiO1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IEZvcm1CYXNlIGZyb20gXCIuLi8uLi8uLi9saWJyYXJ5L0Zvcm1CYXNlXCI7XG5pbXBvcnQgeyBTdHlsZXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IE5vcm1hbGlzZWRQYWxldHRlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbi8qXG4gKiBTdHlsZXMuXG4gKi9cbmZ1bmN0aW9uIGdldFN0eWxlcyhwYWxldHRlOiBOb3JtYWxpc2VkUGFsZXR0ZSk6IFN0eWxlcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVhZGVyVGl0bGU6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiBwYWxldHRlLmZvbnRzLnNpemVbMl0sXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiBcIjQwcHhcIixcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IFwiMC41OHB4XCIsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICBjb2xvcjogcGFsZXR0ZS5jb2xvcnMudGV4dFRpdGxlXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0LFxuXG4gICAgICAgIGhlYWRlclN1YlRpdGxlOiB7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6IFwiOXB4XCIsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjFweFwiXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0LFxuXG4gICAgICAgIHN1Y2Nlc3NNZXNzYWdlOiB7XG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMTVweFwiXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0XG4gICAgfTtcbn1cblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRlckVtYWlsVGhlbWUgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PEVudGVyRW1haWxUaGVtZVByb3BzLCBFbnRlckVtYWlsVGhlbWVTdGF0ZT4ge1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZSA9IFN0eWxlQ29udGV4dDtcbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBFbnRlckVtYWlsVGhlbWVQcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBlbWFpbFNlbnQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBNZXRob2RzLlxuICAgICAqL1xuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBlbWFpbFNlbnQ6IHRydWVcbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblN1Y2Nlc3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblN1Y2Nlc3MoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXNlbmQgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIGVtYWlsU2VudDogZmFsc2VcbiAgICAgICAgfSkpO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFN0eWxlcyA9IGdldFN0eWxlcyhzdHlsZXMucGFsZXR0ZSk7XG4gICAgICAgIGNvbnN0IHsgZm9ybUZpZWxkcywgY2FsbEFQSSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgeyBlbWFpbFNlbnQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgLy8gSWYgZW1haWwgc2VudCwgc2hvdyBzdWNjZXNzIFVJLlxuICAgICAgICBpZiAoZW1haWxTZW50ID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBjc3M9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInByaW1hcnlUZXh0IHN1Y2Nlc3NNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMucHJpbWFyeVRleHQsIGNvbXBvbmVudFN0eWxlcy5zdWNjZXNzTWVzc2FnZSwgc3R5bGVzLnN1Y2Nlc3NNZXNzYWdlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGxlYXNlIGNoZWNrIHlvdXIgZW1haWwgZm9yIHRoZSBwYXNzd29yZCByZWNvdmVyeSBsaW5rLntcIiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsaW5rXCIgY3NzPXtzdHlsZXMubGlua30gb25DbGljaz17dGhpcy5yZXNlbmR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCByZXR1cm4gRm9ybS5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxGb3JtQmFzZVxuICAgICAgICAgICAgICAgIGZvcm1GaWVsZHM9e2Zvcm1GaWVsZHN9XG4gICAgICAgICAgICAgICAgYnV0dG9uTGFiZWw9e1wiRW1haWwgbWVcIn1cbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3M9e3RoaXMub25TdWNjZXNzfVxuICAgICAgICAgICAgICAgIGNhbGxBUEk9e2NhbGxBUEl9XG4gICAgICAgICAgICAgICAgc2hvd0xhYmVscz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVPbkJsdXI9e3RydWV9XG4gICAgICAgICAgICAgICAgaGVhZGVyPXtcbiAgICAgICAgICAgICAgICAgICAgPEZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJUaXRsZVwiIGNzcz17W2NvbXBvbmVudFN0eWxlcy5oZWFkZXJUaXRsZSwgc3R5bGVzLmhlYWRlclRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzZXQgeW91ciBwYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclN1YnRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclN1YlRpdGxlLCBzdHlsZXMuaGVhZGVyU3VidGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY29uZGFyeVRleHRcIiBjc3M9e3N0eWxlcy5zZWNvbmRhcnlUZXh0fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2Ugd2lsbCBzZW5kIHlvdSBhbiBlbWFpbCB0byByZXNldCB5b3VyIHBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                ]
                            },
                            "Reset your password"
                        ),
                        (0, _react2.jsx)(
                            "div",
                            {
                                className: "headerSubtitle",
                                css: [
                                    componentStyles.headerSubTitle,
                                    styles.headerSubtitle,
                                    process.env.NODE_ENV === "production" ? "" : ";label:EnterEmailTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvcmVzZXRQYXNzd29yZFVzaW5nVG9rZW4vZW50ZXJFbWFpbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUl3RCIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L3Jlc2V0UGFzc3dvcmRVc2luZ1Rva2VuL2VudGVyRW1haWwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLypcbiAqIEltcG9ydHMuXG4gKi9cbmltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBFbnRlckVtYWlsVGhlbWVQcm9wcywgRW50ZXJFbWFpbFRoZW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IENTU09iamVjdCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdC90eXBlc1wiO1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IEZvcm1CYXNlIGZyb20gXCIuLi8uLi8uLi9saWJyYXJ5L0Zvcm1CYXNlXCI7XG5pbXBvcnQgeyBTdHlsZXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IE5vcm1hbGlzZWRQYWxldHRlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbi8qXG4gKiBTdHlsZXMuXG4gKi9cbmZ1bmN0aW9uIGdldFN0eWxlcyhwYWxldHRlOiBOb3JtYWxpc2VkUGFsZXR0ZSk6IFN0eWxlcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVhZGVyVGl0bGU6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiBwYWxldHRlLmZvbnRzLnNpemVbMl0sXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiBcIjQwcHhcIixcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IFwiMC41OHB4XCIsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICBjb2xvcjogcGFsZXR0ZS5jb2xvcnMudGV4dFRpdGxlXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0LFxuXG4gICAgICAgIGhlYWRlclN1YlRpdGxlOiB7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6IFwiOXB4XCIsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjFweFwiXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0LFxuXG4gICAgICAgIHN1Y2Nlc3NNZXNzYWdlOiB7XG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMTVweFwiXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0XG4gICAgfTtcbn1cblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRlckVtYWlsVGhlbWUgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PEVudGVyRW1haWxUaGVtZVByb3BzLCBFbnRlckVtYWlsVGhlbWVTdGF0ZT4ge1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZSA9IFN0eWxlQ29udGV4dDtcbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBFbnRlckVtYWlsVGhlbWVQcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBlbWFpbFNlbnQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBNZXRob2RzLlxuICAgICAqL1xuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBlbWFpbFNlbnQ6IHRydWVcbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblN1Y2Nlc3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblN1Y2Nlc3MoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXNlbmQgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIGVtYWlsU2VudDogZmFsc2VcbiAgICAgICAgfSkpO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFN0eWxlcyA9IGdldFN0eWxlcyhzdHlsZXMucGFsZXR0ZSk7XG4gICAgICAgIGNvbnN0IHsgZm9ybUZpZWxkcywgY2FsbEFQSSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgeyBlbWFpbFNlbnQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgLy8gSWYgZW1haWwgc2VudCwgc2hvdyBzdWNjZXNzIFVJLlxuICAgICAgICBpZiAoZW1haWxTZW50ID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBjc3M9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInByaW1hcnlUZXh0IHN1Y2Nlc3NNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMucHJpbWFyeVRleHQsIGNvbXBvbmVudFN0eWxlcy5zdWNjZXNzTWVzc2FnZSwgc3R5bGVzLnN1Y2Nlc3NNZXNzYWdlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGxlYXNlIGNoZWNrIHlvdXIgZW1haWwgZm9yIHRoZSBwYXNzd29yZCByZWNvdmVyeSBsaW5rLntcIiBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsaW5rXCIgY3NzPXtzdHlsZXMubGlua30gb25DbGljaz17dGhpcy5yZXNlbmR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCByZXR1cm4gRm9ybS5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxGb3JtQmFzZVxuICAgICAgICAgICAgICAgIGZvcm1GaWVsZHM9e2Zvcm1GaWVsZHN9XG4gICAgICAgICAgICAgICAgYnV0dG9uTGFiZWw9e1wiRW1haWwgbWVcIn1cbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3M9e3RoaXMub25TdWNjZXNzfVxuICAgICAgICAgICAgICAgIGNhbGxBUEk9e2NhbGxBUEl9XG4gICAgICAgICAgICAgICAgc2hvd0xhYmVscz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVPbkJsdXI9e3RydWV9XG4gICAgICAgICAgICAgICAgaGVhZGVyPXtcbiAgICAgICAgICAgICAgICAgICAgPEZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJUaXRsZVwiIGNzcz17W2NvbXBvbmVudFN0eWxlcy5oZWFkZXJUaXRsZSwgc3R5bGVzLmhlYWRlclRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzZXQgeW91ciBwYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclN1YnRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclN1YlRpdGxlLCBzdHlsZXMuaGVhZGVyU3VidGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY29uZGFyeVRleHRcIiBjc3M9e3N0eWxlcy5zZWNvbmRhcnlUZXh0fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2Ugd2lsbCBzZW5kIHlvdSBhbiBlbWFpbCB0byByZXNldCB5b3VyIHBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                ]
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
