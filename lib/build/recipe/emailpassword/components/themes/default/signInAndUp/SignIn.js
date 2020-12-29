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
                var componentStyle = getStyles(styles.palette);
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
                                className: "headerTitle",
                                css: [
                                    componentStyle.headerTitle,
                                    styles.headerTitle,
                                    process.env.NODE_ENV === "production" ? "" : ";label:SignInTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvc2lnbkluQW5kVXAvU2lnbkluLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtRnFEIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvc2lnbkluQW5kVXAvU2lnbkluLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAoYykgMjAyMCwgVlJBSSBMYWJzIGFuZC9vciBpdHMgYWZmaWxpYXRlcy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpIGFzIHB1Ymxpc2hlZCBieSB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24uXG4gKlxuICogWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5XG4gKiBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLypcbiAqIEltcG9ydHMuXG4gKi9cbmltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBTaWduSW5UaGVtZVByb3BzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBDU1NPYmplY3QgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3QvdHlwZXNcIjtcblxuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcblxuaW1wb3J0IEZvcm1CYXNlIGZyb20gXCIuLi8uLi8uLi9saWJyYXJ5L0Zvcm1CYXNlXCI7XG5pbXBvcnQgeyBTdHlsZXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IE5vcm1hbGlzZWRQYWxldHRlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbi8qXG4gKiBTdHlsZXMuXG4gKi9cblxuZnVuY3Rpb24gZ2V0U3R5bGVzKHBhbGV0dGU6IE5vcm1hbGlzZWRQYWxldHRlKTogU3R5bGVzIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBoZWFkZXJUaXRsZToge1xuICAgICAgICAgICAgZm9udFNpemU6IHBhbGV0dGUuZm9udHMuc2l6ZVsyXSxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IFwiNDBweFwiLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogXCIwLjU4cHhcIixcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgIGNvbG9yOiBwYWxldHRlLmNvbG9ycy50ZXh0VGl0bGVcbiAgICAgICAgfSBhcyBDU1NPYmplY3QsXG5cbiAgICAgICAgaGVhZGVyU3ViVGl0bGU6IHtcbiAgICAgICAgICAgIG1hcmdpblRvcDogXCI5cHhcIixcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIyMXB4XCJcbiAgICAgICAgfSBhcyBDU1NPYmplY3QsXG5cbiAgICAgICAgZm9yZ290UGFzc3dvcmRMaW5rOiB7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6IFwiMTBweFwiXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0XG4gICAgfTtcbn1cblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWduSW5UaGVtZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8U2lnbkluVGhlbWVQcm9wcz4ge1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZSA9IFN0eWxlQ29udGV4dDtcblxuICAgIC8qXG4gICAgICogUmVuZGVyLlxuICAgICAqL1xuXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCBjb21wb25lbnRTdHlsZSA9IGdldFN0eWxlcyhzdHlsZXMucGFsZXR0ZSBhcyBOb3JtYWxpc2VkUGFsZXR0ZSk7XG5cbiAgICAgICAgY29uc3QgeyBzaWduVXBDbGlja2VkLCBmb3Jnb3RQYXNzd29yZENsaWNrLCBvblN1Y2Nlc3MsIGNhbGxBUEkgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHsgZm9ybUZpZWxkcyB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZvcm1CYXNlXG4gICAgICAgICAgICAgICAgZm9ybUZpZWxkcz17Zm9ybUZpZWxkc31cbiAgICAgICAgICAgICAgICBidXR0b25MYWJlbD17XCJTSUdOIElOXCJ9XG4gICAgICAgICAgICAgICAgb25TdWNjZXNzPXtvblN1Y2Nlc3N9XG4gICAgICAgICAgICAgICAgY2FsbEFQST17Y2FsbEFQSX1cbiAgICAgICAgICAgICAgICBzaG93TGFiZWxzPXt0cnVlfVxuICAgICAgICAgICAgICAgIGhlYWRlcj17XG4gICAgICAgICAgICAgICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyVGl0bGVcIiBjc3M9e1tjb21wb25lbnRTdHlsZS5oZWFkZXJUaXRsZSwgc3R5bGVzLmhlYWRlclRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2lnbiBJblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclN1YnRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGUuaGVhZGVyU3ViVGl0bGUsIHN0eWxlcy5oZWFkZXJTdWJ0aXRsZV19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2Vjb25kYXJ5VGV4dFwiIGNzcz17c3R5bGVzLnNlY29uZGFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOb3QgcmVnaXN0ZXJlZCB5ZXQ/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxpbmtcIiBvbkNsaWNrPXtzaWduVXBDbGlja2VkfSBjc3M9e3N0eWxlcy5saW5rfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpZ24gVXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpdmlkZXJcIiBjc3M9e3N0eWxlcy5kaXZpZGVyfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9vdGVyPXtcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGluayBzZWNvbmRhcnlUZXh0IGZvcmdvdFBhc3N3b3JkTGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXMubGluayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXMuc2Vjb25kYXJ5VGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRTdHlsZS5mb3Jnb3RQYXNzd29yZExpbmssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzLmZvcmdvdFBhc3N3b3JkTGlua1xuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2ZvcmdvdFBhc3N3b3JkQ2xpY2t9PlxuICAgICAgICAgICAgICAgICAgICAgICAgRm9yZ290IHBhc3N3b3JkP1xuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                ]
                            },
                            "Sign In"
                        ),
                        (0, _react2.jsx)(
                            "div",
                            {
                                className: "headerSubtitle",
                                css: [
                                    componentStyle.headerSubTitle,
                                    styles.headerSubtitle,
                                    process.env.NODE_ENV === "production" ? "" : ";label:SignInTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvc2lnbkluQW5kVXAvU2lnbkluLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzRndEIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvc2lnbkluQW5kVXAvU2lnbkluLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAoYykgMjAyMCwgVlJBSSBMYWJzIGFuZC9vciBpdHMgYWZmaWxpYXRlcy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpIGFzIHB1Ymxpc2hlZCBieSB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24uXG4gKlxuICogWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5XG4gKiBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLypcbiAqIEltcG9ydHMuXG4gKi9cbmltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBTaWduSW5UaGVtZVByb3BzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBDU1NPYmplY3QgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3QvdHlwZXNcIjtcblxuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcblxuaW1wb3J0IEZvcm1CYXNlIGZyb20gXCIuLi8uLi8uLi9saWJyYXJ5L0Zvcm1CYXNlXCI7XG5pbXBvcnQgeyBTdHlsZXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IE5vcm1hbGlzZWRQYWxldHRlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbi8qXG4gKiBTdHlsZXMuXG4gKi9cblxuZnVuY3Rpb24gZ2V0U3R5bGVzKHBhbGV0dGU6IE5vcm1hbGlzZWRQYWxldHRlKTogU3R5bGVzIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBoZWFkZXJUaXRsZToge1xuICAgICAgICAgICAgZm9udFNpemU6IHBhbGV0dGUuZm9udHMuc2l6ZVsyXSxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IFwiNDBweFwiLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogXCIwLjU4cHhcIixcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgIGNvbG9yOiBwYWxldHRlLmNvbG9ycy50ZXh0VGl0bGVcbiAgICAgICAgfSBhcyBDU1NPYmplY3QsXG5cbiAgICAgICAgaGVhZGVyU3ViVGl0bGU6IHtcbiAgICAgICAgICAgIG1hcmdpblRvcDogXCI5cHhcIixcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIyMXB4XCJcbiAgICAgICAgfSBhcyBDU1NPYmplY3QsXG5cbiAgICAgICAgZm9yZ290UGFzc3dvcmRMaW5rOiB7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6IFwiMTBweFwiXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0XG4gICAgfTtcbn1cblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWduSW5UaGVtZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8U2lnbkluVGhlbWVQcm9wcz4ge1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZSA9IFN0eWxlQ29udGV4dDtcblxuICAgIC8qXG4gICAgICogUmVuZGVyLlxuICAgICAqL1xuXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCBjb21wb25lbnRTdHlsZSA9IGdldFN0eWxlcyhzdHlsZXMucGFsZXR0ZSBhcyBOb3JtYWxpc2VkUGFsZXR0ZSk7XG5cbiAgICAgICAgY29uc3QgeyBzaWduVXBDbGlja2VkLCBmb3Jnb3RQYXNzd29yZENsaWNrLCBvblN1Y2Nlc3MsIGNhbGxBUEkgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHsgZm9ybUZpZWxkcyB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZvcm1CYXNlXG4gICAgICAgICAgICAgICAgZm9ybUZpZWxkcz17Zm9ybUZpZWxkc31cbiAgICAgICAgICAgICAgICBidXR0b25MYWJlbD17XCJTSUdOIElOXCJ9XG4gICAgICAgICAgICAgICAgb25TdWNjZXNzPXtvblN1Y2Nlc3N9XG4gICAgICAgICAgICAgICAgY2FsbEFQST17Y2FsbEFQSX1cbiAgICAgICAgICAgICAgICBzaG93TGFiZWxzPXt0cnVlfVxuICAgICAgICAgICAgICAgIGhlYWRlcj17XG4gICAgICAgICAgICAgICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyVGl0bGVcIiBjc3M9e1tjb21wb25lbnRTdHlsZS5oZWFkZXJUaXRsZSwgc3R5bGVzLmhlYWRlclRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2lnbiBJblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclN1YnRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGUuaGVhZGVyU3ViVGl0bGUsIHN0eWxlcy5oZWFkZXJTdWJ0aXRsZV19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2Vjb25kYXJ5VGV4dFwiIGNzcz17c3R5bGVzLnNlY29uZGFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOb3QgcmVnaXN0ZXJlZCB5ZXQ/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxpbmtcIiBvbkNsaWNrPXtzaWduVXBDbGlja2VkfSBjc3M9e3N0eWxlcy5saW5rfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpZ24gVXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpdmlkZXJcIiBjc3M9e3N0eWxlcy5kaXZpZGVyfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9vdGVyPXtcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGluayBzZWNvbmRhcnlUZXh0IGZvcmdvdFBhc3N3b3JkTGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXMubGluayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXMuc2Vjb25kYXJ5VGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRTdHlsZS5mb3Jnb3RQYXNzd29yZExpbmssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzLmZvcmdvdFBhc3N3b3JkTGlua1xuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2ZvcmdvdFBhc3N3b3JkQ2xpY2t9PlxuICAgICAgICAgICAgICAgICAgICAgICAgRm9yZ290IHBhc3N3b3JkP1xuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                ]
                            },
                            (0, _react2.jsx)(
                                "div",
                                {
                                    className: "secondaryText",
                                    css: styles.secondaryText
                                },
                                "Not registered yet?",
                                (0, _react2.jsx)(
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
                        (0, _react2.jsx)("div", {
                            className: "divider",
                            css: styles.divider
                        })
                    ),
                    footer: (0, _react2.jsx)(
                        "div",
                        {
                            className: "link secondaryText forgotPasswordLink",
                            css: [
                                styles.link,
                                styles.secondaryText,
                                componentStyle.forgotPasswordLink,
                                styles.forgotPasswordLink,
                                process.env.NODE_ENV === "production" ? "" : ";label:SignInTheme;",
                                process.env.NODE_ENV === "production"
                                    ? ""
                                    : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvc2lnbkluQW5kVXAvU2lnbkluLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvR3dCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvc2lnbkluQW5kVXAvU2lnbkluLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAoYykgMjAyMCwgVlJBSSBMYWJzIGFuZC9vciBpdHMgYWZmaWxpYXRlcy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpIGFzIHB1Ymxpc2hlZCBieSB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24uXG4gKlxuICogWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5XG4gKiBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLypcbiAqIEltcG9ydHMuXG4gKi9cbmltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBTaWduSW5UaGVtZVByb3BzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBDU1NPYmplY3QgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3QvdHlwZXNcIjtcblxuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcblxuaW1wb3J0IEZvcm1CYXNlIGZyb20gXCIuLi8uLi8uLi9saWJyYXJ5L0Zvcm1CYXNlXCI7XG5pbXBvcnQgeyBTdHlsZXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IE5vcm1hbGlzZWRQYWxldHRlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbi8qXG4gKiBTdHlsZXMuXG4gKi9cblxuZnVuY3Rpb24gZ2V0U3R5bGVzKHBhbGV0dGU6IE5vcm1hbGlzZWRQYWxldHRlKTogU3R5bGVzIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBoZWFkZXJUaXRsZToge1xuICAgICAgICAgICAgZm9udFNpemU6IHBhbGV0dGUuZm9udHMuc2l6ZVsyXSxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IFwiNDBweFwiLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogXCIwLjU4cHhcIixcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgIGNvbG9yOiBwYWxldHRlLmNvbG9ycy50ZXh0VGl0bGVcbiAgICAgICAgfSBhcyBDU1NPYmplY3QsXG5cbiAgICAgICAgaGVhZGVyU3ViVGl0bGU6IHtcbiAgICAgICAgICAgIG1hcmdpblRvcDogXCI5cHhcIixcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIyMXB4XCJcbiAgICAgICAgfSBhcyBDU1NPYmplY3QsXG5cbiAgICAgICAgZm9yZ290UGFzc3dvcmRMaW5rOiB7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6IFwiMTBweFwiXG4gICAgICAgIH0gYXMgQ1NTT2JqZWN0XG4gICAgfTtcbn1cblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWduSW5UaGVtZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8U2lnbkluVGhlbWVQcm9wcz4ge1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZSA9IFN0eWxlQ29udGV4dDtcblxuICAgIC8qXG4gICAgICogUmVuZGVyLlxuICAgICAqL1xuXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCBjb21wb25lbnRTdHlsZSA9IGdldFN0eWxlcyhzdHlsZXMucGFsZXR0ZSBhcyBOb3JtYWxpc2VkUGFsZXR0ZSk7XG5cbiAgICAgICAgY29uc3QgeyBzaWduVXBDbGlja2VkLCBmb3Jnb3RQYXNzd29yZENsaWNrLCBvblN1Y2Nlc3MsIGNhbGxBUEkgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHsgZm9ybUZpZWxkcyB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZvcm1CYXNlXG4gICAgICAgICAgICAgICAgZm9ybUZpZWxkcz17Zm9ybUZpZWxkc31cbiAgICAgICAgICAgICAgICBidXR0b25MYWJlbD17XCJTSUdOIElOXCJ9XG4gICAgICAgICAgICAgICAgb25TdWNjZXNzPXtvblN1Y2Nlc3N9XG4gICAgICAgICAgICAgICAgY2FsbEFQST17Y2FsbEFQSX1cbiAgICAgICAgICAgICAgICBzaG93TGFiZWxzPXt0cnVlfVxuICAgICAgICAgICAgICAgIGhlYWRlcj17XG4gICAgICAgICAgICAgICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyVGl0bGVcIiBjc3M9e1tjb21wb25lbnRTdHlsZS5oZWFkZXJUaXRsZSwgc3R5bGVzLmhlYWRlclRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2lnbiBJblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclN1YnRpdGxlXCIgY3NzPXtbY29tcG9uZW50U3R5bGUuaGVhZGVyU3ViVGl0bGUsIHN0eWxlcy5oZWFkZXJTdWJ0aXRsZV19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2Vjb25kYXJ5VGV4dFwiIGNzcz17c3R5bGVzLnNlY29uZGFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOb3QgcmVnaXN0ZXJlZCB5ZXQ/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxpbmtcIiBvbkNsaWNrPXtzaWduVXBDbGlja2VkfSBjc3M9e3N0eWxlcy5saW5rfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpZ24gVXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpdmlkZXJcIiBjc3M9e3N0eWxlcy5kaXZpZGVyfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9vdGVyPXtcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGluayBzZWNvbmRhcnlUZXh0IGZvcmdvdFBhc3N3b3JkTGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXMubGluayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXMuc2Vjb25kYXJ5VGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRTdHlsZS5mb3Jnb3RQYXNzd29yZExpbmssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzLmZvcmdvdFBhc3N3b3JkTGlua1xuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2ZvcmdvdFBhc3N3b3JkQ2xpY2t9PlxuICAgICAgICAgICAgICAgICAgICAgICAgRm9yZ290IHBhc3N3b3JkP1xuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
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
