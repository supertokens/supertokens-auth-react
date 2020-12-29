"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styleContext = _interopRequireDefault(require("../../../styles/styleContext"));

var _react2 = require("@emotion/react");

var _library = require("../../../library");

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
            marginTop: "15px",
            marginBottom: "15px"
        }
    };
}
/*
 * Component.
 */

var SubmitNewPasswordTheme = /*#__PURE__*/ (function(_PureComponent) {
    _inherits(SubmitNewPasswordTheme, _PureComponent);

    var _super = _createSuper(SubmitNewPasswordTheme);

    /*
     * Constructor.
     */
    function SubmitNewPasswordTheme(props) {
        var _this;

        _classCallCheck(this, SubmitNewPasswordTheme);

        _this = _super.call(this, props);

        _this.onSuccess = function() {
            _this.setState(function() {
                return {
                    hasNewPassword: true
                };
            });

            if (_this.props.onSuccess !== undefined) {
                _this.props.onSuccess();
            }
        };

        _this.state = {
            hasNewPassword: false
        };
        return _this;
    }

    _createClass(SubmitNewPasswordTheme, [
        {
            key: "render",

            /*
             * Render.
             */
            value: function render() {
                var styles = this.context;
                var componentStyles = getStyles(styles.palette);
                var _this$props = this.props,
                    callAPI = _this$props.callAPI,
                    formFields = _this$props.formFields,
                    onSignInClicked = _this$props.onSignInClicked;
                var hasNewPassword = this.state.hasNewPassword;

                if (hasNewPassword === true) {
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
                                    className: "headerTitle",
                                    css: [
                                        componentStyles.headerTitle,
                                        styles.headerTitle,
                                        process.env.NODE_ENV === "production" ? "" : ";label:SubmitNewPasswordTheme;",
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvcmVzZXRQYXNzd29yZFVzaW5nVG9rZW4vc3VibWl0TmV3UGFzc3dvcmQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFHcUQiLCJmaWxlIjoiLi4vLi4vLi4vLi4vLi4vLi4vLi4vdHMvcmVjaXBlL2VtYWlscGFzc3dvcmQvY29tcG9uZW50cy90aGVtZXMvZGVmYXVsdC9yZXNldFBhc3N3b3JkVXNpbmdUb2tlbi9zdWJtaXROZXdQYXNzd29yZC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgKGMpIDIwMjAsIFZSQUkgTGFicyBhbmQvb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiAqIFwiTGljZW5zZVwiKSBhcyBwdWJsaXNoZWQgYnkgdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLlxuICpcbiAqIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heVxuICogb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVRcbiAqIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZVxuICogTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCwgRnJhZ21lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdHlsZUNvbnRleHQgZnJvbSBcIi4uLy4uLy4uL3N0eWxlcy9zdHlsZUNvbnRleHRcIjtcblxuaW1wb3J0IHsgQ1NTT2JqZWN0IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0L3R5cGVzXCI7XG5cbi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyBTdHlsZXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IFN1Ym1pdE5ld1Bhc3N3b3JkVGhlbWVQcm9wcywgU3VibWl0TmV3UGFzc3dvcmRUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBGb3JtUm93LCBCdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vbGlicmFyeVwiO1xuaW1wb3J0IEZvcm1CYXNlIGZyb20gXCIuLi8uLi8uLi9saWJyYXJ5L0Zvcm1CYXNlXCI7XG5pbXBvcnQgeyBOb3JtYWxpc2VkUGFsZXR0ZSB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG4vKlxuICogU3R5bGVzLlxuICovXG5cbmZ1bmN0aW9uIGdldFN0eWxlcyhwYWxldHRlOiBOb3JtYWxpc2VkUGFsZXR0ZSk6IFN0eWxlcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVhZGVyVGl0bGU6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiBwYWxldHRlLmZvbnRzLnNpemVbMl0sXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiBcIjQwcHhcIixcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IFwiMC41OHB4XCIsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICBjb2xvcjogcGFsZXR0ZS5jb2xvcnMudGV4dFRpdGxlXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0LFxuXG4gICAgICAgIGhlYWRlclN1YlRpdGxlOiB7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6IFwiOXB4XCIsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjFweFwiXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0LFxuXG4gICAgICAgIHN1Y2Nlc3NNZXNzYWdlOiB7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6IFwiMTVweFwiLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjE1cHhcIlxuICAgICAgICB9IGFzIENTU09iamVjdFxuICAgIH07XG59XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VibWl0TmV3UGFzc3dvcmRUaGVtZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8XG4gICAgU3VibWl0TmV3UGFzc3dvcmRUaGVtZVByb3BzLFxuICAgIFN1Ym1pdE5ld1Bhc3N3b3JkVGhlbWVTdGF0ZVxuPiB7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlID0gU3R5bGVDb250ZXh0O1xuXG4gICAgLypcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogU3VibWl0TmV3UGFzc3dvcmRUaGVtZVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGhhc05ld1Bhc3N3b3JkOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uU3VjY2VzcyA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoKSA9PiAoe1xuICAgICAgICAgICAgaGFzTmV3UGFzc3dvcmQ6IHRydWVcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VjY2VzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogUmVuZGVyLlxuICAgICAqL1xuXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCBjb21wb25lbnRTdHlsZXMgPSBnZXRTdHlsZXMoc3R5bGVzLnBhbGV0dGUpO1xuICAgICAgICBjb25zdCB7IGNhbGxBUEksIGZvcm1GaWVsZHMsIG9uU2lnbkluQ2xpY2tlZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgeyBoYXNOZXdQYXNzd29yZCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBpZiAoaGFzTmV3UGFzc3dvcmQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIiBjc3M9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIGNzcz17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdWNjZXNzIVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybVJvdyBrZXk9XCJmb3JtLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJpbWFyeVRleHQgc3VjY2Vzc01lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLnByaW1hcnlUZXh0LCBjb21wb25lbnRTdHlsZXMuc3VjY2Vzc01lc3NhZ2UsIHN0eWxlcy5zdWNjZXNzTWVzc2FnZV19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91ciBwYXNzd29yZCBoYXMgYmVlbiB1cGRhdGVkIHN1Y2Nlc3NmdWxseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25TaWduSW5DbGlja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9e1wiU0lHTiBJTlwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Sb3c+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Rm9ybUJhc2VcbiAgICAgICAgICAgICAgICBmb3JtRmllbGRzPXtmb3JtRmllbGRzfVxuICAgICAgICAgICAgICAgIGJ1dHRvbkxhYmVsPXtcIkNoYW5nZSBwYXNzd29yZFwifVxuICAgICAgICAgICAgICAgIG9uU3VjY2Vzcz17dGhpcy5vblN1Y2Nlc3N9XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVPbkJsdXI9e3RydWV9XG4gICAgICAgICAgICAgICAgY2FsbEFQST17Y2FsbEFQSX1cbiAgICAgICAgICAgICAgICBzaG93TGFiZWxzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBoZWFkZXI9e1xuICAgICAgICAgICAgICAgICAgICA8RnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2UgeW91ciBwYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclN1YnRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclN1YlRpdGxlLCBzdHlsZXMuaGVhZGVyU3ViVGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY29uZGFyeVRleHRcIiBjc3M9e3N0eWxlcy5zZWNvbmRhcnlUZXh0fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW50ZXIgYSBuZXcgcGFzc3dvcmQgYmVsb3cgdG8gY2hhbmdlIHlvdXIgcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L0ZyYWdtZW50PlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19 */"
                                    ]
                                },
                                "Success!"
                            ),
                            (0, _react2.jsx)(
                                _library.FormRow,
                                {
                                    key: "form-button"
                                },
                                (0, _react2.jsx)(
                                    _react.Fragment,
                                    null,
                                    (0, _react2.jsx)(
                                        "div",
                                        {
                                            className: "primaryText successMessage",
                                            css: [
                                                styles.primaryText,
                                                componentStyles.successMessage,
                                                styles.successMessage,
                                                process.env.NODE_ENV === "production"
                                                    ? ""
                                                    : ";label:SubmitNewPasswordTheme;",
                                                process.env.NODE_ENV === "production"
                                                    ? ""
                                                    : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvcmVzZXRQYXNzd29yZFVzaW5nVG9rZW4vc3VibWl0TmV3UGFzc3dvcmQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRHb0MiLCJmaWxlIjoiLi4vLi4vLi4vLi4vLi4vLi4vLi4vdHMvcmVjaXBlL2VtYWlscGFzc3dvcmQvY29tcG9uZW50cy90aGVtZXMvZGVmYXVsdC9yZXNldFBhc3N3b3JkVXNpbmdUb2tlbi9zdWJtaXROZXdQYXNzd29yZC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgKGMpIDIwMjAsIFZSQUkgTGFicyBhbmQvb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiAqIFwiTGljZW5zZVwiKSBhcyBwdWJsaXNoZWQgYnkgdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLlxuICpcbiAqIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heVxuICogb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVRcbiAqIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZVxuICogTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCwgRnJhZ21lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdHlsZUNvbnRleHQgZnJvbSBcIi4uLy4uLy4uL3N0eWxlcy9zdHlsZUNvbnRleHRcIjtcblxuaW1wb3J0IHsgQ1NTT2JqZWN0IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0L3R5cGVzXCI7XG5cbi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyBTdHlsZXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IFN1Ym1pdE5ld1Bhc3N3b3JkVGhlbWVQcm9wcywgU3VibWl0TmV3UGFzc3dvcmRUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBGb3JtUm93LCBCdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vbGlicmFyeVwiO1xuaW1wb3J0IEZvcm1CYXNlIGZyb20gXCIuLi8uLi8uLi9saWJyYXJ5L0Zvcm1CYXNlXCI7XG5pbXBvcnQgeyBOb3JtYWxpc2VkUGFsZXR0ZSB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG4vKlxuICogU3R5bGVzLlxuICovXG5cbmZ1bmN0aW9uIGdldFN0eWxlcyhwYWxldHRlOiBOb3JtYWxpc2VkUGFsZXR0ZSk6IFN0eWxlcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVhZGVyVGl0bGU6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiBwYWxldHRlLmZvbnRzLnNpemVbMl0sXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiBcIjQwcHhcIixcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IFwiMC41OHB4XCIsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICBjb2xvcjogcGFsZXR0ZS5jb2xvcnMudGV4dFRpdGxlXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0LFxuXG4gICAgICAgIGhlYWRlclN1YlRpdGxlOiB7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6IFwiOXB4XCIsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjFweFwiXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0LFxuXG4gICAgICAgIHN1Y2Nlc3NNZXNzYWdlOiB7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6IFwiMTVweFwiLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjE1cHhcIlxuICAgICAgICB9IGFzIENTU09iamVjdFxuICAgIH07XG59XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VibWl0TmV3UGFzc3dvcmRUaGVtZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8XG4gICAgU3VibWl0TmV3UGFzc3dvcmRUaGVtZVByb3BzLFxuICAgIFN1Ym1pdE5ld1Bhc3N3b3JkVGhlbWVTdGF0ZVxuPiB7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlID0gU3R5bGVDb250ZXh0O1xuXG4gICAgLypcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogU3VibWl0TmV3UGFzc3dvcmRUaGVtZVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGhhc05ld1Bhc3N3b3JkOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uU3VjY2VzcyA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoKSA9PiAoe1xuICAgICAgICAgICAgaGFzTmV3UGFzc3dvcmQ6IHRydWVcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VjY2VzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogUmVuZGVyLlxuICAgICAqL1xuXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCBjb21wb25lbnRTdHlsZXMgPSBnZXRTdHlsZXMoc3R5bGVzLnBhbGV0dGUpO1xuICAgICAgICBjb25zdCB7IGNhbGxBUEksIGZvcm1GaWVsZHMsIG9uU2lnbkluQ2xpY2tlZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgeyBoYXNOZXdQYXNzd29yZCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBpZiAoaGFzTmV3UGFzc3dvcmQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIiBjc3M9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIGNzcz17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdWNjZXNzIVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybVJvdyBrZXk9XCJmb3JtLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJpbWFyeVRleHQgc3VjY2Vzc01lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLnByaW1hcnlUZXh0LCBjb21wb25lbnRTdHlsZXMuc3VjY2Vzc01lc3NhZ2UsIHN0eWxlcy5zdWNjZXNzTWVzc2FnZV19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91ciBwYXNzd29yZCBoYXMgYmVlbiB1cGRhdGVkIHN1Y2Nlc3NmdWxseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25TaWduSW5DbGlja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9e1wiU0lHTiBJTlwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Sb3c+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Rm9ybUJhc2VcbiAgICAgICAgICAgICAgICBmb3JtRmllbGRzPXtmb3JtRmllbGRzfVxuICAgICAgICAgICAgICAgIGJ1dHRvbkxhYmVsPXtcIkNoYW5nZSBwYXNzd29yZFwifVxuICAgICAgICAgICAgICAgIG9uU3VjY2Vzcz17dGhpcy5vblN1Y2Nlc3N9XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVPbkJsdXI9e3RydWV9XG4gICAgICAgICAgICAgICAgY2FsbEFQST17Y2FsbEFQSX1cbiAgICAgICAgICAgICAgICBzaG93TGFiZWxzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBoZWFkZXI9e1xuICAgICAgICAgICAgICAgICAgICA8RnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2UgeW91ciBwYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclN1YnRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclN1YlRpdGxlLCBzdHlsZXMuaGVhZGVyU3ViVGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY29uZGFyeVRleHRcIiBjc3M9e3N0eWxlcy5zZWNvbmRhcnlUZXh0fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW50ZXIgYSBuZXcgcGFzc3dvcmQgYmVsb3cgdG8gY2hhbmdlIHlvdXIgcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L0ZyYWdtZW50PlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19 */"
                                            ]
                                        },
                                        "Your password has been updated successfully"
                                    ),
                                    (0, _react2.jsx)(_library.Button, {
                                        disabled: false,
                                        isLoading: false,
                                        type: "button",
                                        onClick: onSignInClicked,
                                        label: "SIGN IN"
                                    })
                                )
                            )
                        )
                    );
                }

                return (0, _react2.jsx)(_FormBase["default"], {
                    formFields: formFields,
                    buttonLabel: "Change password",
                    onSuccess: this.onSuccess,
                    validateOnBlur: true,
                    callAPI: callAPI,
                    showLabels: false,
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
                                    process.env.NODE_ENV === "production" ? "" : ";label:SubmitNewPasswordTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvcmVzZXRQYXNzd29yZFVzaW5nVG9rZW4vc3VibWl0TmV3UGFzc3dvcmQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVJcUQiLCJmaWxlIjoiLi4vLi4vLi4vLi4vLi4vLi4vLi4vdHMvcmVjaXBlL2VtYWlscGFzc3dvcmQvY29tcG9uZW50cy90aGVtZXMvZGVmYXVsdC9yZXNldFBhc3N3b3JkVXNpbmdUb2tlbi9zdWJtaXROZXdQYXNzd29yZC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgKGMpIDIwMjAsIFZSQUkgTGFicyBhbmQvb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiAqIFwiTGljZW5zZVwiKSBhcyBwdWJsaXNoZWQgYnkgdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLlxuICpcbiAqIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heVxuICogb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVRcbiAqIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZVxuICogTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCwgRnJhZ21lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdHlsZUNvbnRleHQgZnJvbSBcIi4uLy4uLy4uL3N0eWxlcy9zdHlsZUNvbnRleHRcIjtcblxuaW1wb3J0IHsgQ1NTT2JqZWN0IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0L3R5cGVzXCI7XG5cbi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyBTdHlsZXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IFN1Ym1pdE5ld1Bhc3N3b3JkVGhlbWVQcm9wcywgU3VibWl0TmV3UGFzc3dvcmRUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBGb3JtUm93LCBCdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vbGlicmFyeVwiO1xuaW1wb3J0IEZvcm1CYXNlIGZyb20gXCIuLi8uLi8uLi9saWJyYXJ5L0Zvcm1CYXNlXCI7XG5pbXBvcnQgeyBOb3JtYWxpc2VkUGFsZXR0ZSB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG4vKlxuICogU3R5bGVzLlxuICovXG5cbmZ1bmN0aW9uIGdldFN0eWxlcyhwYWxldHRlOiBOb3JtYWxpc2VkUGFsZXR0ZSk6IFN0eWxlcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVhZGVyVGl0bGU6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiBwYWxldHRlLmZvbnRzLnNpemVbMl0sXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiBcIjQwcHhcIixcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IFwiMC41OHB4XCIsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICBjb2xvcjogcGFsZXR0ZS5jb2xvcnMudGV4dFRpdGxlXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0LFxuXG4gICAgICAgIGhlYWRlclN1YlRpdGxlOiB7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6IFwiOXB4XCIsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjFweFwiXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0LFxuXG4gICAgICAgIHN1Y2Nlc3NNZXNzYWdlOiB7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6IFwiMTVweFwiLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjE1cHhcIlxuICAgICAgICB9IGFzIENTU09iamVjdFxuICAgIH07XG59XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VibWl0TmV3UGFzc3dvcmRUaGVtZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8XG4gICAgU3VibWl0TmV3UGFzc3dvcmRUaGVtZVByb3BzLFxuICAgIFN1Ym1pdE5ld1Bhc3N3b3JkVGhlbWVTdGF0ZVxuPiB7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlID0gU3R5bGVDb250ZXh0O1xuXG4gICAgLypcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogU3VibWl0TmV3UGFzc3dvcmRUaGVtZVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGhhc05ld1Bhc3N3b3JkOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uU3VjY2VzcyA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoKSA9PiAoe1xuICAgICAgICAgICAgaGFzTmV3UGFzc3dvcmQ6IHRydWVcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VjY2VzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogUmVuZGVyLlxuICAgICAqL1xuXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCBjb21wb25lbnRTdHlsZXMgPSBnZXRTdHlsZXMoc3R5bGVzLnBhbGV0dGUpO1xuICAgICAgICBjb25zdCB7IGNhbGxBUEksIGZvcm1GaWVsZHMsIG9uU2lnbkluQ2xpY2tlZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgeyBoYXNOZXdQYXNzd29yZCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBpZiAoaGFzTmV3UGFzc3dvcmQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIiBjc3M9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIGNzcz17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdWNjZXNzIVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybVJvdyBrZXk9XCJmb3JtLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJpbWFyeVRleHQgc3VjY2Vzc01lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLnByaW1hcnlUZXh0LCBjb21wb25lbnRTdHlsZXMuc3VjY2Vzc01lc3NhZ2UsIHN0eWxlcy5zdWNjZXNzTWVzc2FnZV19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91ciBwYXNzd29yZCBoYXMgYmVlbiB1cGRhdGVkIHN1Y2Nlc3NmdWxseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25TaWduSW5DbGlja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9e1wiU0lHTiBJTlwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Sb3c+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Rm9ybUJhc2VcbiAgICAgICAgICAgICAgICBmb3JtRmllbGRzPXtmb3JtRmllbGRzfVxuICAgICAgICAgICAgICAgIGJ1dHRvbkxhYmVsPXtcIkNoYW5nZSBwYXNzd29yZFwifVxuICAgICAgICAgICAgICAgIG9uU3VjY2Vzcz17dGhpcy5vblN1Y2Nlc3N9XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVPbkJsdXI9e3RydWV9XG4gICAgICAgICAgICAgICAgY2FsbEFQST17Y2FsbEFQSX1cbiAgICAgICAgICAgICAgICBzaG93TGFiZWxzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBoZWFkZXI9e1xuICAgICAgICAgICAgICAgICAgICA8RnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2UgeW91ciBwYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclN1YnRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclN1YlRpdGxlLCBzdHlsZXMuaGVhZGVyU3ViVGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY29uZGFyeVRleHRcIiBjc3M9e3N0eWxlcy5zZWNvbmRhcnlUZXh0fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW50ZXIgYSBuZXcgcGFzc3dvcmQgYmVsb3cgdG8gY2hhbmdlIHlvdXIgcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L0ZyYWdtZW50PlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19 */"
                                ]
                            },
                            "Change your password"
                        ),
                        (0, _react2.jsx)(
                            "div",
                            {
                                className: "headerSubtitle",
                                css: [
                                    componentStyles.headerSubTitle,
                                    styles.headerSubTitle,
                                    process.env.NODE_ENV === "production" ? "" : ";label:SubmitNewPasswordTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvcmVzZXRQYXNzd29yZFVzaW5nVG9rZW4vc3VibWl0TmV3UGFzc3dvcmQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBJd0QiLCJmaWxlIjoiLi4vLi4vLi4vLi4vLi4vLi4vLi4vdHMvcmVjaXBlL2VtYWlscGFzc3dvcmQvY29tcG9uZW50cy90aGVtZXMvZGVmYXVsdC9yZXNldFBhc3N3b3JkVXNpbmdUb2tlbi9zdWJtaXROZXdQYXNzd29yZC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgKGMpIDIwMjAsIFZSQUkgTGFicyBhbmQvb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiAqIFwiTGljZW5zZVwiKSBhcyBwdWJsaXNoZWQgYnkgdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLlxuICpcbiAqIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heVxuICogb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVRcbiAqIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZVxuICogTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCwgRnJhZ21lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdHlsZUNvbnRleHQgZnJvbSBcIi4uLy4uLy4uL3N0eWxlcy9zdHlsZUNvbnRleHRcIjtcblxuaW1wb3J0IHsgQ1NTT2JqZWN0IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0L3R5cGVzXCI7XG5cbi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyBTdHlsZXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IFN1Ym1pdE5ld1Bhc3N3b3JkVGhlbWVQcm9wcywgU3VibWl0TmV3UGFzc3dvcmRUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBGb3JtUm93LCBCdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vbGlicmFyeVwiO1xuaW1wb3J0IEZvcm1CYXNlIGZyb20gXCIuLi8uLi8uLi9saWJyYXJ5L0Zvcm1CYXNlXCI7XG5pbXBvcnQgeyBOb3JtYWxpc2VkUGFsZXR0ZSB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG4vKlxuICogU3R5bGVzLlxuICovXG5cbmZ1bmN0aW9uIGdldFN0eWxlcyhwYWxldHRlOiBOb3JtYWxpc2VkUGFsZXR0ZSk6IFN0eWxlcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGVhZGVyVGl0bGU6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiBwYWxldHRlLmZvbnRzLnNpemVbMl0sXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiBcIjQwcHhcIixcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IFwiMC41OHB4XCIsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICBjb2xvcjogcGFsZXR0ZS5jb2xvcnMudGV4dFRpdGxlXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0LFxuXG4gICAgICAgIGhlYWRlclN1YlRpdGxlOiB7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6IFwiOXB4XCIsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjFweFwiXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0LFxuXG4gICAgICAgIHN1Y2Nlc3NNZXNzYWdlOiB7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6IFwiMTVweFwiLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjE1cHhcIlxuICAgICAgICB9IGFzIENTU09iamVjdFxuICAgIH07XG59XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VibWl0TmV3UGFzc3dvcmRUaGVtZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8XG4gICAgU3VibWl0TmV3UGFzc3dvcmRUaGVtZVByb3BzLFxuICAgIFN1Ym1pdE5ld1Bhc3N3b3JkVGhlbWVTdGF0ZVxuPiB7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlID0gU3R5bGVDb250ZXh0O1xuXG4gICAgLypcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogU3VibWl0TmV3UGFzc3dvcmRUaGVtZVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGhhc05ld1Bhc3N3b3JkOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uU3VjY2VzcyA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoKSA9PiAoe1xuICAgICAgICAgICAgaGFzTmV3UGFzc3dvcmQ6IHRydWVcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VjY2VzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogUmVuZGVyLlxuICAgICAqL1xuXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCBjb21wb25lbnRTdHlsZXMgPSBnZXRTdHlsZXMoc3R5bGVzLnBhbGV0dGUpO1xuICAgICAgICBjb25zdCB7IGNhbGxBUEksIGZvcm1GaWVsZHMsIG9uU2lnbkluQ2xpY2tlZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgeyBoYXNOZXdQYXNzd29yZCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBpZiAoaGFzTmV3UGFzc3dvcmQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIiBjc3M9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIGNzcz17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdWNjZXNzIVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybVJvdyBrZXk9XCJmb3JtLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJpbWFyeVRleHQgc3VjY2Vzc01lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLnByaW1hcnlUZXh0LCBjb21wb25lbnRTdHlsZXMuc3VjY2Vzc01lc3NhZ2UsIHN0eWxlcy5zdWNjZXNzTWVzc2FnZV19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91ciBwYXNzd29yZCBoYXMgYmVlbiB1cGRhdGVkIHN1Y2Nlc3NmdWxseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25TaWduSW5DbGlja2VkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9e1wiU0lHTiBJTlwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Sb3c+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Rm9ybUJhc2VcbiAgICAgICAgICAgICAgICBmb3JtRmllbGRzPXtmb3JtRmllbGRzfVxuICAgICAgICAgICAgICAgIGJ1dHRvbkxhYmVsPXtcIkNoYW5nZSBwYXNzd29yZFwifVxuICAgICAgICAgICAgICAgIG9uU3VjY2Vzcz17dGhpcy5vblN1Y2Nlc3N9XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVPbkJsdXI9e3RydWV9XG4gICAgICAgICAgICAgICAgY2FsbEFQST17Y2FsbEFQSX1cbiAgICAgICAgICAgICAgICBzaG93TGFiZWxzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBoZWFkZXI9e1xuICAgICAgICAgICAgICAgICAgICA8RnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2UgeW91ciBwYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclN1YnRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclN1YlRpdGxlLCBzdHlsZXMuaGVhZGVyU3ViVGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY29uZGFyeVRleHRcIiBjc3M9e3N0eWxlcy5zZWNvbmRhcnlUZXh0fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW50ZXIgYSBuZXcgcGFzc3dvcmQgYmVsb3cgdG8gY2hhbmdlIHlvdXIgcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L0ZyYWdtZW50PlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19 */"
                                ]
                            },
                            (0, _react2.jsx)(
                                "div",
                                {
                                    className: "secondaryText",
                                    css: styles.secondaryText
                                },
                                "Enter a new password below to change your password"
                            )
                        )
                    )
                });
            }
        }
    ]);

    return SubmitNewPasswordTheme;
})(_react.PureComponent);

exports["default"] = SubmitNewPasswordTheme;
SubmitNewPasswordTheme.contextType = _styleContext["default"];
