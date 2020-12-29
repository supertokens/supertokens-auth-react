"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styleContext = _interopRequireDefault(require("../../../styles/styleContext"));

var _react2 = require("@emotion/react");

var _FormBase = _interopRequireDefault(require("../../../library/FormBase"));

var _SignUpFooter = _interopRequireDefault(require("./SignUpFooter"));

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
            fontWeight: 800,
            color: palette.colors.textTitle
        },
        headerSubTitle: {
            marginTop: "9px",
            marginBottom: "21px"
        },
        privacyPolicyAndTermsAndConditions: {
            marginTop: "10px"
        }
    };
}
/*
 * Component.
 */

var SignUpTheme = /*#__PURE__*/ (function(_PureComponent) {
    _inherits(SignUpTheme, _PureComponent);

    var _super = _createSuper(SignUpTheme);

    function SignUpTheme() {
        _classCallCheck(this, SignUpTheme);

        return _super.apply(this, arguments);
    }

    _createClass(SignUpTheme, [
        {
            key: "render",

            /*
             * Render.
             */
            value: function render() {
                var styles = this.context;
                var componentStyles = getStyles(styles.palette);
                var _this$props = this.props,
                    privacyPolicyLink = _this$props.privacyPolicyLink,
                    termsOfServiceLink = _this$props.termsOfServiceLink,
                    signInClicked = _this$props.signInClicked,
                    onSuccess = _this$props.onSuccess,
                    callAPI = _this$props.callAPI;
                var formFields = this.props.formFields;
                return (0, _react2.jsx)(_FormBase["default"], {
                    formFields: formFields,
                    buttonLabel: "SIGN UP",
                    onSuccess: onSuccess,
                    callAPI: callAPI,
                    validateOnBlur: true,
                    showLabels: true,
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
                                    process.env.NODE_ENV === "production" ? "" : ";label:SignUpTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvc2lnbkluQW5kVXAvU2lnblVwLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2RXFEIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvc2lnbkluQW5kVXAvU2lnblVwLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAoYykgMjAyMCwgVlJBSSBMYWJzIGFuZC9vciBpdHMgYWZmaWxpYXRlcy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpIGFzIHB1Ymxpc2hlZCBieSB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24uXG4gKlxuICogWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5XG4gKiBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCwgRnJhZ21lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdHlsZUNvbnRleHQgZnJvbSBcIi4uLy4uLy4uL3N0eWxlcy9zdHlsZUNvbnRleHRcIjtcbmltcG9ydCB7IFNpZ25VcFRoZW1lUHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IENTU09iamVjdCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdC90eXBlc1wiO1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IEZvcm1CYXNlIGZyb20gXCIuLi8uLi8uLi9saWJyYXJ5L0Zvcm1CYXNlXCI7XG5pbXBvcnQgU2lnblVwRm9vdGVyIGZyb20gXCIuL1NpZ25VcEZvb3RlclwiO1xuaW1wb3J0IHsgTm9ybWFsaXNlZFBhbGV0dGUgfSBmcm9tIFwiLi4vdHlwZXNcIjtcblxuLypcbiAqIFN0eWxlcy5cbiAqL1xuZnVuY3Rpb24gZ2V0U3R5bGVzKHBhbGV0dGU6IE5vcm1hbGlzZWRQYWxldHRlKTogYW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBoZWFkZXJUaXRsZToge1xuICAgICAgICAgICAgZm9udFNpemU6IHBhbGV0dGUuZm9udHMuc2l6ZVsyXSxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IFwiNDBweFwiLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogXCIwLjU4cHhcIixcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgIGNvbG9yOiBwYWxldHRlLmNvbG9ycy50ZXh0VGl0bGVcbiAgICAgICAgfSBhcyBDU1NPYmplY3QsXG5cbiAgICAgICAgaGVhZGVyU3ViVGl0bGU6IHtcbiAgICAgICAgICAgIG1hcmdpblRvcDogXCI5cHhcIixcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIyMXB4XCJcbiAgICAgICAgfSBhcyBDU1NPYmplY3QsXG5cbiAgICAgICAgcHJpdmFjeVBvbGljeUFuZFRlcm1zQW5kQ29uZGl0aW9uczoge1xuICAgICAgICAgICAgbWFyZ2luVG9wOiBcIjEwcHhcIlxuICAgICAgICB9IGFzIENTU09iamVjdFxuICAgIH07XG59XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lnblVwVGhlbWUgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFNpZ25VcFRoZW1lUHJvcHM+IHtcbiAgICBzdGF0aWMgY29udGV4dFR5cGUgPSBTdHlsZUNvbnRleHQ7XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFN0eWxlcyA9IGdldFN0eWxlcyhzdHlsZXMucGFsZXR0ZSBhcyBOb3JtYWxpc2VkUGFsZXR0ZSk7XG4gICAgICAgIGNvbnN0IHsgcHJpdmFjeVBvbGljeUxpbmssIHRlcm1zT2ZTZXJ2aWNlTGluaywgc2lnbkluQ2xpY2tlZCwgb25TdWNjZXNzLCBjYWxsQVBJIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCB7IGZvcm1GaWVsZHMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Rm9ybUJhc2VcbiAgICAgICAgICAgICAgICBmb3JtRmllbGRzPXtmb3JtRmllbGRzfVxuICAgICAgICAgICAgICAgIGJ1dHRvbkxhYmVsPXtcIlNJR04gVVBcIn1cbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3M9e29uU3VjY2Vzc31cbiAgICAgICAgICAgICAgICBjYWxsQVBJPXtjYWxsQVBJfVxuICAgICAgICAgICAgICAgIHZhbGlkYXRlT25CbHVyPXt0cnVlfVxuICAgICAgICAgICAgICAgIHNob3dMYWJlbHM9e3RydWV9XG4gICAgICAgICAgICAgICAgaGVhZGVyPXtcbiAgICAgICAgICAgICAgICAgICAgPEZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJUaXRsZVwiIGNzcz17W2NvbXBvbmVudFN0eWxlcy5oZWFkZXJUaXRsZSwgc3R5bGVzLmhlYWRlclRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2lnbiBVcFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclN1YnRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclN1YlRpdGxlLCBzdHlsZXMuaGVhZGVyU3VidGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY29uZGFyeVRleHRcIiBjc3M9e3N0eWxlcy5zZWNvbmRhcnlUZXh0fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWxyZWFkeSBoYXZlIGFuIGFjY291bnQ/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxpbmtcIiBvbkNsaWNrPXtzaWduSW5DbGlja2VkfSBjc3M9e3N0eWxlcy5saW5rfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpZ24gSW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpdmlkZXJcIiBjc3M9e3N0eWxlcy5kaXZpZGVyfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9vdGVyPXtcbiAgICAgICAgICAgICAgICAgICAgPFNpZ25VcEZvb3RlclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50U3R5bGVzPXtjb21wb25lbnRTdHlsZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICBwcml2YWN5UG9saWN5TGluaz17cHJpdmFjeVBvbGljeUxpbmt9XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXJtc09mU2VydmljZUxpbms9e3Rlcm1zT2ZTZXJ2aWNlTGlua31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                ]
                            },
                            "Sign Up"
                        ),
                        (0, _react2.jsx)(
                            "div",
                            {
                                className: "headerSubtitle",
                                css: [
                                    componentStyles.headerSubTitle,
                                    styles.headerSubtitle,
                                    process.env.NODE_ENV === "production" ? "" : ";label:SignUpTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvc2lnbkluQW5kVXAvU2lnblVwLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnRndEIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvc2lnbkluQW5kVXAvU2lnblVwLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAoYykgMjAyMCwgVlJBSSBMYWJzIGFuZC9vciBpdHMgYWZmaWxpYXRlcy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpIGFzIHB1Ymxpc2hlZCBieSB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24uXG4gKlxuICogWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5XG4gKiBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCwgRnJhZ21lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdHlsZUNvbnRleHQgZnJvbSBcIi4uLy4uLy4uL3N0eWxlcy9zdHlsZUNvbnRleHRcIjtcbmltcG9ydCB7IFNpZ25VcFRoZW1lUHJvcHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IENTU09iamVjdCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdC90eXBlc1wiO1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IEZvcm1CYXNlIGZyb20gXCIuLi8uLi8uLi9saWJyYXJ5L0Zvcm1CYXNlXCI7XG5pbXBvcnQgU2lnblVwRm9vdGVyIGZyb20gXCIuL1NpZ25VcEZvb3RlclwiO1xuaW1wb3J0IHsgTm9ybWFsaXNlZFBhbGV0dGUgfSBmcm9tIFwiLi4vdHlwZXNcIjtcblxuLypcbiAqIFN0eWxlcy5cbiAqL1xuZnVuY3Rpb24gZ2V0U3R5bGVzKHBhbGV0dGU6IE5vcm1hbGlzZWRQYWxldHRlKTogYW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBoZWFkZXJUaXRsZToge1xuICAgICAgICAgICAgZm9udFNpemU6IHBhbGV0dGUuZm9udHMuc2l6ZVsyXSxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IFwiNDBweFwiLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogXCIwLjU4cHhcIixcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgIGNvbG9yOiBwYWxldHRlLmNvbG9ycy50ZXh0VGl0bGVcbiAgICAgICAgfSBhcyBDU1NPYmplY3QsXG5cbiAgICAgICAgaGVhZGVyU3ViVGl0bGU6IHtcbiAgICAgICAgICAgIG1hcmdpblRvcDogXCI5cHhcIixcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIyMXB4XCJcbiAgICAgICAgfSBhcyBDU1NPYmplY3QsXG5cbiAgICAgICAgcHJpdmFjeVBvbGljeUFuZFRlcm1zQW5kQ29uZGl0aW9uczoge1xuICAgICAgICAgICAgbWFyZ2luVG9wOiBcIjEwcHhcIlxuICAgICAgICB9IGFzIENTU09iamVjdFxuICAgIH07XG59XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lnblVwVGhlbWUgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFNpZ25VcFRoZW1lUHJvcHM+IHtcbiAgICBzdGF0aWMgY29udGV4dFR5cGUgPSBTdHlsZUNvbnRleHQ7XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFN0eWxlcyA9IGdldFN0eWxlcyhzdHlsZXMucGFsZXR0ZSBhcyBOb3JtYWxpc2VkUGFsZXR0ZSk7XG4gICAgICAgIGNvbnN0IHsgcHJpdmFjeVBvbGljeUxpbmssIHRlcm1zT2ZTZXJ2aWNlTGluaywgc2lnbkluQ2xpY2tlZCwgb25TdWNjZXNzLCBjYWxsQVBJIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCB7IGZvcm1GaWVsZHMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Rm9ybUJhc2VcbiAgICAgICAgICAgICAgICBmb3JtRmllbGRzPXtmb3JtRmllbGRzfVxuICAgICAgICAgICAgICAgIGJ1dHRvbkxhYmVsPXtcIlNJR04gVVBcIn1cbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3M9e29uU3VjY2Vzc31cbiAgICAgICAgICAgICAgICBjYWxsQVBJPXtjYWxsQVBJfVxuICAgICAgICAgICAgICAgIHZhbGlkYXRlT25CbHVyPXt0cnVlfVxuICAgICAgICAgICAgICAgIHNob3dMYWJlbHM9e3RydWV9XG4gICAgICAgICAgICAgICAgaGVhZGVyPXtcbiAgICAgICAgICAgICAgICAgICAgPEZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJUaXRsZVwiIGNzcz17W2NvbXBvbmVudFN0eWxlcy5oZWFkZXJUaXRsZSwgc3R5bGVzLmhlYWRlclRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2lnbiBVcFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclN1YnRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGVzLmhlYWRlclN1YlRpdGxlLCBzdHlsZXMuaGVhZGVyU3VidGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY29uZGFyeVRleHRcIiBjc3M9e3N0eWxlcy5zZWNvbmRhcnlUZXh0fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWxyZWFkeSBoYXZlIGFuIGFjY291bnQ/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxpbmtcIiBvbkNsaWNrPXtzaWduSW5DbGlja2VkfSBjc3M9e3N0eWxlcy5saW5rfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpZ24gSW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpdmlkZXJcIiBjc3M9e3N0eWxlcy5kaXZpZGVyfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9vdGVyPXtcbiAgICAgICAgICAgICAgICAgICAgPFNpZ25VcEZvb3RlclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50U3R5bGVzPXtjb21wb25lbnRTdHlsZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICBwcml2YWN5UG9saWN5TGluaz17cHJpdmFjeVBvbGljeUxpbmt9XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXJtc09mU2VydmljZUxpbms9e3Rlcm1zT2ZTZXJ2aWNlTGlua31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                ]
                            },
                            (0, _react2.jsx)(
                                "div",
                                {
                                    className: "secondaryText",
                                    css: styles.secondaryText
                                },
                                "Already have an account?",
                                (0, _react2.jsx)(
                                    "span",
                                    {
                                        className: "link",
                                        onClick: signInClicked,
                                        css: styles.link
                                    },
                                    "Sign In"
                                )
                            )
                        ),
                        (0, _react2.jsx)("div", {
                            className: "divider",
                            css: styles.divider
                        })
                    ),
                    footer: (0, _react2.jsx)(_SignUpFooter["default"], {
                        componentStyles: componentStyles,
                        privacyPolicyLink: privacyPolicyLink,
                        termsOfServiceLink: termsOfServiceLink
                    })
                });
            }
        }
    ]);

    return SignUpTheme;
})(_react.PureComponent);

exports["default"] = SignUpTheme;
SignUpTheme.contextType = _styleContext["default"];
