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

var _styleContext = _interopRequireDefault(require("../../../../styles/styleContext"));

var _react2 = require("@emotion/react");

var _spinnerIcon = _interopRequireDefault(require("../../../../../assets/spinnerIcon"));

var _constants = require("../../../../../constants");

var _errorLargeIcon = _interopRequireDefault(require("../../../../../assets/errorLargeIcon"));

var _arrowRightIcon = _interopRequireDefault(require("../../../../../assets/arrowRightIcon"));

var _library = require("../../../../library");

var _checkedRoundIcon = _interopRequireDefault(require("../../../../../assets/checkedRoundIcon"));

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
var VerifyEmailLinkClickedTheme = /*#__PURE__*/ (function(_PureComponent) {
    _inherits(VerifyEmailLinkClickedTheme, _PureComponent);

    var _super = _createSuper(VerifyEmailLinkClickedTheme);

    /*
     * Constructor.
     */
    function VerifyEmailLinkClickedTheme(props) {
        var _this;

        _classCallCheck(this, VerifyEmailLinkClickedTheme);

        _this = _super.call(this, props);

        _this.onSuccess = function() {
            _this.setState(function() {
                return {
                    status: _constants.VERIFY_EMAIL_LINK_CLICKED_STATUS.SUCCESSFUL
                };
            });

            if (_this.props.onSuccess !== undefined) {
                _this.props.onSuccess();
            }
        };

        _this.componentDidMount = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch ((_context.prev = _context.next)) {
                            case 0:
                                _context.next = 2;
                                return _this.props.callAPI();

                            case 2:
                                response = _context.sent;

                                _this.setState(function() {
                                    return {
                                        status: response.status
                                    };
                                });

                                return _context.abrupt("return");

                            case 5:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee);
            })
        );
        _this.state = {
            status: _constants.VERIFY_EMAIL_LINK_CLICKED_STATUS.LOADING
        };
        return _this;
    }

    _createClass(VerifyEmailLinkClickedTheme, [
        {
            key: "render",

            /*
             * Render.
             */
            value: function render() {
                var styles = this.context;
                var status = this.state.status;
                var _this$props = this.props,
                    redirectToVerifyEmailScreen = _this$props.redirectToVerifyEmailScreen,
                    onContinueClicked = _this$props.onContinueClicked;

                if (status === _constants.VERIFY_EMAIL_LINK_CLICKED_STATUS.LOADING) {
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
                                    className: "spinner",
                                    css: styles.spinner
                                },
                                (0, _react2.jsx)(_spinnerIcon["default"], {
                                    color: styles.palette.colors.primary
                                })
                            )
                        )
                    );
                }

                if (
                    status === _constants.VERIFY_EMAIL_LINK_CLICKED_STATUS.SUCCESSFUL ||
                    status === _constants.VERIFY_EMAIL_LINK_CLICKED_STATUS.ALREADY_VERIFIED
                ) {
                    var message = "Email verification successful!";

                    if (status === _constants.VERIFY_EMAIL_LINK_CLICKED_STATUS.ALREADY_VERIFIED) {
                        message = "Email already verified.";
                    }

                    return (0, _react2.jsx)(
                        "div",
                        {
                            className: "container",
                            css: styles.container
                        },
                        (0, _react2.jsx)(
                            "div",
                            {
                                className: "row noFormRow",
                                css: [
                                    styles.row,
                                    styles.noFormRow,
                                    process.env.NODE_ENV === "production" ? "" : ";label:VerifyEmailLinkClickedTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vdmVyaWZ5RW1haWxMaW5rQ2xpY2tlZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUdtRCIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L2VtYWlsVmVyaWZpY2F0aW9uL2VtYWlsVmVyaWZpY2F0aW9uU2NyZWVuL3ZlcmlmeUVtYWlsTGlua0NsaWNrZWQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdHlsZUNvbnRleHQgZnJvbSBcIi4uLy4uLy4uLy4uL3N0eWxlcy9zdHlsZUNvbnRleHRcIjtcblxuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVByb3BzLCBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi90eXBlc1wiO1xuaW1wb3J0IFNwaW5uZXJJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvc3Bpbm5lckljb25cIjtcbmltcG9ydCB7IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IEVycm9yTGFyZ2VJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvZXJyb3JMYXJnZUljb25cIjtcbmltcG9ydCBBcnJvd1JpZ2h0SWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2Fycm93UmlnaHRJY29uXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vLi4vbGlicmFyeVwiO1xuaW1wb3J0IENoZWNrZWRSb3VuZEljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jaGVja2VkUm91bmRJY29uXCI7XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxcbiAgICBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVQcm9wcyxcbiAgICBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVTdGF0ZVxuPiB7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlID0gU3R5bGVDb250ZXh0O1xuXG4gICAgLypcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lUHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RhdHVzOiBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5MT0FESU5HXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLlNVQ0NFU1NGVUxcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VjY2VzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbXBvbmVudERpZE1vdW50ID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucHJvcHMuY2FsbEFQSSgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBSZW5kZXIuXG4gICAgICovXG5cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IHsgc3RhdHVzIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB7IHJlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbiwgb25Db250aW51ZUNsaWNrZWQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMuTE9BRElORykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgY3NzPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3Bpbm5lclwiIGNzcz17c3R5bGVzLnNwaW5uZXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTcGlubmVySWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnByaW1hcnl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5TVUNDRVNTRlVMIHx8XG4gICAgICAgICAgICBzdGF0dXMgPT09IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLkFMUkVBRFlfVkVSSUZJRURcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IFwiRW1haWwgdmVyaWZpY2F0aW9uIHN1Y2Nlc3NmdWwhXCI7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5BTFJFQURZX1ZFUklGSUVEKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiRW1haWwgYWxyZWFkeSB2ZXJpZmllZC5cIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IG5vRm9ybVJvd1wiIGNzcz17W3N0eWxlcy5yb3csIHN0eWxlcy5ub0Zvcm1Sb3ddfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja2VkUm91bmRJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMuc3VjY2Vzc30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyVGl0bGUgaGVhZGVyVGlueVRpdGxlXCIgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGlueVRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge21lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyXCIgY3NzPXtzdHlsZXMuZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlzTG9hZGluZz17ZmFsc2V9IG9uQ2xpY2s9e29uQ29udGludWVDbGlja2VkfSB0eXBlPVwiYnV0dG9uXCIgbGFiZWw9e1wiQ09OVElOVUVcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5JTlZBTElEKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZW1haWwgdmVyaWZpY2F0aW9uIGxpbmsgaGFzIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3JlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzZWNvbmRhcnlUZXh0IHNlY29uZGFyeUxpbmtXaXRoQXJyb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5zZWNvbmRhcnlUZXh0LCBzdHlsZXMuc2Vjb25kYXJ5TGlua1dpdGhBcnJvd119PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRpbnVlIDxBcnJvd1JpZ2h0SWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclRpdGxlIGVycm9yXCIgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuZXJyb3JdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFcnJvckxhcmdlSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLmVycm9yfSAvPiBTb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWNvbmRhcnlUZXh0XCIgY3NzPXtzdHlsZXMucHJpbWFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci4gUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBmb3IgYXNzaXN0YW5jZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                ]
                            },
                            (0, _react2.jsx)(_checkedRoundIcon["default"], {
                                color: styles.palette.colors.success
                            }),
                            (0, _react2.jsx)(
                                "div",
                                {
                                    className: "headerTitle headerTinyTitle",
                                    css: [
                                        styles.headerTitle,
                                        styles.headerTinyTitle,
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : ";label:VerifyEmailLinkClickedTheme;",
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vdmVyaWZ5RW1haWxMaW5rQ2xpY2tlZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUdxRSIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L2VtYWlsVmVyaWZpY2F0aW9uL2VtYWlsVmVyaWZpY2F0aW9uU2NyZWVuL3ZlcmlmeUVtYWlsTGlua0NsaWNrZWQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdHlsZUNvbnRleHQgZnJvbSBcIi4uLy4uLy4uLy4uL3N0eWxlcy9zdHlsZUNvbnRleHRcIjtcblxuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVByb3BzLCBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi90eXBlc1wiO1xuaW1wb3J0IFNwaW5uZXJJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvc3Bpbm5lckljb25cIjtcbmltcG9ydCB7IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IEVycm9yTGFyZ2VJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvZXJyb3JMYXJnZUljb25cIjtcbmltcG9ydCBBcnJvd1JpZ2h0SWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2Fycm93UmlnaHRJY29uXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vLi4vbGlicmFyeVwiO1xuaW1wb3J0IENoZWNrZWRSb3VuZEljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jaGVja2VkUm91bmRJY29uXCI7XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxcbiAgICBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVQcm9wcyxcbiAgICBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVTdGF0ZVxuPiB7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlID0gU3R5bGVDb250ZXh0O1xuXG4gICAgLypcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lUHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RhdHVzOiBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5MT0FESU5HXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLlNVQ0NFU1NGVUxcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VjY2VzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbXBvbmVudERpZE1vdW50ID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucHJvcHMuY2FsbEFQSSgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBSZW5kZXIuXG4gICAgICovXG5cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IHsgc3RhdHVzIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB7IHJlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbiwgb25Db250aW51ZUNsaWNrZWQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMuTE9BRElORykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgY3NzPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3Bpbm5lclwiIGNzcz17c3R5bGVzLnNwaW5uZXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTcGlubmVySWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnByaW1hcnl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5TVUNDRVNTRlVMIHx8XG4gICAgICAgICAgICBzdGF0dXMgPT09IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLkFMUkVBRFlfVkVSSUZJRURcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IFwiRW1haWwgdmVyaWZpY2F0aW9uIHN1Y2Nlc3NmdWwhXCI7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5BTFJFQURZX1ZFUklGSUVEKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiRW1haWwgYWxyZWFkeSB2ZXJpZmllZC5cIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IG5vRm9ybVJvd1wiIGNzcz17W3N0eWxlcy5yb3csIHN0eWxlcy5ub0Zvcm1Sb3ddfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja2VkUm91bmRJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMuc3VjY2Vzc30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyVGl0bGUgaGVhZGVyVGlueVRpdGxlXCIgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGlueVRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge21lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyXCIgY3NzPXtzdHlsZXMuZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlzTG9hZGluZz17ZmFsc2V9IG9uQ2xpY2s9e29uQ29udGludWVDbGlja2VkfSB0eXBlPVwiYnV0dG9uXCIgbGFiZWw9e1wiQ09OVElOVUVcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5JTlZBTElEKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZW1haWwgdmVyaWZpY2F0aW9uIGxpbmsgaGFzIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3JlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzZWNvbmRhcnlUZXh0IHNlY29uZGFyeUxpbmtXaXRoQXJyb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5zZWNvbmRhcnlUZXh0LCBzdHlsZXMuc2Vjb25kYXJ5TGlua1dpdGhBcnJvd119PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRpbnVlIDxBcnJvd1JpZ2h0SWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclRpdGxlIGVycm9yXCIgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuZXJyb3JdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFcnJvckxhcmdlSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLmVycm9yfSAvPiBTb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWNvbmRhcnlUZXh0XCIgY3NzPXtzdHlsZXMucHJpbWFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci4gUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBmb3IgYXNzaXN0YW5jZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                    ]
                                },
                                message
                            ),
                            (0, _react2.jsx)(
                                "div",
                                {
                                    className: "emailVerificationButtonWrapper",
                                    css: styles.emailVerificationButtonWrapper
                                },
                                (0, _react2.jsx)(_library.Button, {
                                    isLoading: false,
                                    onClick: onContinueClicked,
                                    type: "button",
                                    label: "CONTINUE"
                                })
                            )
                        )
                    );
                }

                if (status === _constants.VERIFY_EMAIL_LINK_CLICKED_STATUS.INVALID) {
                    return (0, _react2.jsx)(
                        "div",
                        {
                            className: "container",
                            css: styles.container
                        },
                        (0, _react2.jsx)(
                            "div",
                            {
                                className: "row noFormRow",
                                css: [
                                    styles.row,
                                    styles.noFormRow,
                                    process.env.NODE_ENV === "production" ? "" : ";label:VerifyEmailLinkClickedTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vdmVyaWZ5RW1haWxMaW5rQ2xpY2tlZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUhtRCIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L2VtYWlsVmVyaWZpY2F0aW9uL2VtYWlsVmVyaWZpY2F0aW9uU2NyZWVuL3ZlcmlmeUVtYWlsTGlua0NsaWNrZWQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdHlsZUNvbnRleHQgZnJvbSBcIi4uLy4uLy4uLy4uL3N0eWxlcy9zdHlsZUNvbnRleHRcIjtcblxuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVByb3BzLCBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi90eXBlc1wiO1xuaW1wb3J0IFNwaW5uZXJJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvc3Bpbm5lckljb25cIjtcbmltcG9ydCB7IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IEVycm9yTGFyZ2VJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvZXJyb3JMYXJnZUljb25cIjtcbmltcG9ydCBBcnJvd1JpZ2h0SWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2Fycm93UmlnaHRJY29uXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vLi4vbGlicmFyeVwiO1xuaW1wb3J0IENoZWNrZWRSb3VuZEljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jaGVja2VkUm91bmRJY29uXCI7XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxcbiAgICBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVQcm9wcyxcbiAgICBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVTdGF0ZVxuPiB7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlID0gU3R5bGVDb250ZXh0O1xuXG4gICAgLypcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lUHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RhdHVzOiBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5MT0FESU5HXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLlNVQ0NFU1NGVUxcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VjY2VzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbXBvbmVudERpZE1vdW50ID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucHJvcHMuY2FsbEFQSSgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBSZW5kZXIuXG4gICAgICovXG5cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IHsgc3RhdHVzIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB7IHJlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbiwgb25Db250aW51ZUNsaWNrZWQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMuTE9BRElORykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgY3NzPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3Bpbm5lclwiIGNzcz17c3R5bGVzLnNwaW5uZXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTcGlubmVySWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnByaW1hcnl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5TVUNDRVNTRlVMIHx8XG4gICAgICAgICAgICBzdGF0dXMgPT09IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLkFMUkVBRFlfVkVSSUZJRURcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IFwiRW1haWwgdmVyaWZpY2F0aW9uIHN1Y2Nlc3NmdWwhXCI7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5BTFJFQURZX1ZFUklGSUVEKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiRW1haWwgYWxyZWFkeSB2ZXJpZmllZC5cIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IG5vRm9ybVJvd1wiIGNzcz17W3N0eWxlcy5yb3csIHN0eWxlcy5ub0Zvcm1Sb3ddfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja2VkUm91bmRJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMuc3VjY2Vzc30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyVGl0bGUgaGVhZGVyVGlueVRpdGxlXCIgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGlueVRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge21lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyXCIgY3NzPXtzdHlsZXMuZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlzTG9hZGluZz17ZmFsc2V9IG9uQ2xpY2s9e29uQ29udGludWVDbGlja2VkfSB0eXBlPVwiYnV0dG9uXCIgbGFiZWw9e1wiQ09OVElOVUVcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5JTlZBTElEKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZW1haWwgdmVyaWZpY2F0aW9uIGxpbmsgaGFzIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3JlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzZWNvbmRhcnlUZXh0IHNlY29uZGFyeUxpbmtXaXRoQXJyb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5zZWNvbmRhcnlUZXh0LCBzdHlsZXMuc2Vjb25kYXJ5TGlua1dpdGhBcnJvd119PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRpbnVlIDxBcnJvd1JpZ2h0SWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclRpdGxlIGVycm9yXCIgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuZXJyb3JdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFcnJvckxhcmdlSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLmVycm9yfSAvPiBTb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWNvbmRhcnlUZXh0XCIgY3NzPXtzdHlsZXMucHJpbWFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci4gUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBmb3IgYXNzaXN0YW5jZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                ]
                            },
                            (0, _react2.jsx)(
                                "div",
                                {
                                    className: "headerTitle headerTinyTitle",
                                    css: [
                                        styles.headerTitle,
                                        styles.headerTinyTitle,
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : ";label:VerifyEmailLinkClickedTheme;",
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vdmVyaWZ5RW1haWxMaW5rQ2xpY2tlZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0hxRSIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L2VtYWlsVmVyaWZpY2F0aW9uL2VtYWlsVmVyaWZpY2F0aW9uU2NyZWVuL3ZlcmlmeUVtYWlsTGlua0NsaWNrZWQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdHlsZUNvbnRleHQgZnJvbSBcIi4uLy4uLy4uLy4uL3N0eWxlcy9zdHlsZUNvbnRleHRcIjtcblxuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVByb3BzLCBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi90eXBlc1wiO1xuaW1wb3J0IFNwaW5uZXJJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvc3Bpbm5lckljb25cIjtcbmltcG9ydCB7IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IEVycm9yTGFyZ2VJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvZXJyb3JMYXJnZUljb25cIjtcbmltcG9ydCBBcnJvd1JpZ2h0SWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2Fycm93UmlnaHRJY29uXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vLi4vbGlicmFyeVwiO1xuaW1wb3J0IENoZWNrZWRSb3VuZEljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jaGVja2VkUm91bmRJY29uXCI7XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxcbiAgICBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVQcm9wcyxcbiAgICBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVTdGF0ZVxuPiB7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlID0gU3R5bGVDb250ZXh0O1xuXG4gICAgLypcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lUHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RhdHVzOiBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5MT0FESU5HXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLlNVQ0NFU1NGVUxcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VjY2VzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbXBvbmVudERpZE1vdW50ID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucHJvcHMuY2FsbEFQSSgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBSZW5kZXIuXG4gICAgICovXG5cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IHsgc3RhdHVzIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB7IHJlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbiwgb25Db250aW51ZUNsaWNrZWQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMuTE9BRElORykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgY3NzPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3Bpbm5lclwiIGNzcz17c3R5bGVzLnNwaW5uZXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTcGlubmVySWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnByaW1hcnl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5TVUNDRVNTRlVMIHx8XG4gICAgICAgICAgICBzdGF0dXMgPT09IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLkFMUkVBRFlfVkVSSUZJRURcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IFwiRW1haWwgdmVyaWZpY2F0aW9uIHN1Y2Nlc3NmdWwhXCI7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5BTFJFQURZX1ZFUklGSUVEKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiRW1haWwgYWxyZWFkeSB2ZXJpZmllZC5cIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IG5vRm9ybVJvd1wiIGNzcz17W3N0eWxlcy5yb3csIHN0eWxlcy5ub0Zvcm1Sb3ddfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja2VkUm91bmRJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMuc3VjY2Vzc30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyVGl0bGUgaGVhZGVyVGlueVRpdGxlXCIgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGlueVRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge21lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyXCIgY3NzPXtzdHlsZXMuZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlzTG9hZGluZz17ZmFsc2V9IG9uQ2xpY2s9e29uQ29udGludWVDbGlja2VkfSB0eXBlPVwiYnV0dG9uXCIgbGFiZWw9e1wiQ09OVElOVUVcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5JTlZBTElEKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZW1haWwgdmVyaWZpY2F0aW9uIGxpbmsgaGFzIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3JlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzZWNvbmRhcnlUZXh0IHNlY29uZGFyeUxpbmtXaXRoQXJyb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5zZWNvbmRhcnlUZXh0LCBzdHlsZXMuc2Vjb25kYXJ5TGlua1dpdGhBcnJvd119PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRpbnVlIDxBcnJvd1JpZ2h0SWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclRpdGxlIGVycm9yXCIgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuZXJyb3JdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFcnJvckxhcmdlSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLmVycm9yfSAvPiBTb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWNvbmRhcnlUZXh0XCIgY3NzPXtzdHlsZXMucHJpbWFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci4gUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBmb3IgYXNzaXN0YW5jZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                    ]
                                },
                                "The email verification link has expired"
                            ),
                            (0, _react2.jsx)(
                                "div",
                                {
                                    onClick: redirectToVerifyEmailScreen,
                                    className: "secondaryText secondaryLinkWithArrow",
                                    css: [
                                        styles.secondaryText,
                                        styles.secondaryLinkWithArrow,
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : ";label:VerifyEmailLinkClickedTheme;",
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vdmVyaWZ5RW1haWxMaW5rQ2xpY2tlZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEg0QiIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L2VtYWlsVmVyaWZpY2F0aW9uL2VtYWlsVmVyaWZpY2F0aW9uU2NyZWVuL3ZlcmlmeUVtYWlsTGlua0NsaWNrZWQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdHlsZUNvbnRleHQgZnJvbSBcIi4uLy4uLy4uLy4uL3N0eWxlcy9zdHlsZUNvbnRleHRcIjtcblxuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVByb3BzLCBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi90eXBlc1wiO1xuaW1wb3J0IFNwaW5uZXJJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvc3Bpbm5lckljb25cIjtcbmltcG9ydCB7IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IEVycm9yTGFyZ2VJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvZXJyb3JMYXJnZUljb25cIjtcbmltcG9ydCBBcnJvd1JpZ2h0SWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2Fycm93UmlnaHRJY29uXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vLi4vbGlicmFyeVwiO1xuaW1wb3J0IENoZWNrZWRSb3VuZEljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jaGVja2VkUm91bmRJY29uXCI7XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxcbiAgICBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVQcm9wcyxcbiAgICBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVTdGF0ZVxuPiB7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlID0gU3R5bGVDb250ZXh0O1xuXG4gICAgLypcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lUHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RhdHVzOiBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5MT0FESU5HXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLlNVQ0NFU1NGVUxcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VjY2VzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbXBvbmVudERpZE1vdW50ID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucHJvcHMuY2FsbEFQSSgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBSZW5kZXIuXG4gICAgICovXG5cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IHsgc3RhdHVzIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB7IHJlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbiwgb25Db250aW51ZUNsaWNrZWQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMuTE9BRElORykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgY3NzPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3Bpbm5lclwiIGNzcz17c3R5bGVzLnNwaW5uZXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTcGlubmVySWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnByaW1hcnl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5TVUNDRVNTRlVMIHx8XG4gICAgICAgICAgICBzdGF0dXMgPT09IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLkFMUkVBRFlfVkVSSUZJRURcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IFwiRW1haWwgdmVyaWZpY2F0aW9uIHN1Y2Nlc3NmdWwhXCI7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5BTFJFQURZX1ZFUklGSUVEKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiRW1haWwgYWxyZWFkeSB2ZXJpZmllZC5cIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IG5vRm9ybVJvd1wiIGNzcz17W3N0eWxlcy5yb3csIHN0eWxlcy5ub0Zvcm1Sb3ddfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja2VkUm91bmRJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMuc3VjY2Vzc30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyVGl0bGUgaGVhZGVyVGlueVRpdGxlXCIgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGlueVRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge21lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyXCIgY3NzPXtzdHlsZXMuZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlzTG9hZGluZz17ZmFsc2V9IG9uQ2xpY2s9e29uQ29udGludWVDbGlja2VkfSB0eXBlPVwiYnV0dG9uXCIgbGFiZWw9e1wiQ09OVElOVUVcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5JTlZBTElEKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZW1haWwgdmVyaWZpY2F0aW9uIGxpbmsgaGFzIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3JlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzZWNvbmRhcnlUZXh0IHNlY29uZGFyeUxpbmtXaXRoQXJyb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5zZWNvbmRhcnlUZXh0LCBzdHlsZXMuc2Vjb25kYXJ5TGlua1dpdGhBcnJvd119PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRpbnVlIDxBcnJvd1JpZ2h0SWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclRpdGxlIGVycm9yXCIgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuZXJyb3JdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFcnJvckxhcmdlSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLmVycm9yfSAvPiBTb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWNvbmRhcnlUZXh0XCIgY3NzPXtzdHlsZXMucHJpbWFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci4gUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBmb3IgYXNzaXN0YW5jZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                    ]
                                },
                                "Continue ",
                                (0, _react2.jsx)(_arrowRightIcon["default"], {
                                    color: styles.palette.colors.textPrimary
                                })
                            )
                        )
                    );
                }

                return (0, _react2.jsx)(
                    "div",
                    {
                        className: "container",
                        css: styles.container
                    },
                    (0, _react2.jsx)(
                        "div",
                        {
                            className: "row noFormRow",
                            css: [
                                styles.row,
                                styles.noFormRow,
                                process.env.NODE_ENV === "production" ? "" : ";label:VerifyEmailLinkClickedTheme;",
                                process.env.NODE_ENV === "production"
                                    ? ""
                                    : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vdmVyaWZ5RW1haWxMaW5rQ2xpY2tlZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0krQyIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L2VtYWlsVmVyaWZpY2F0aW9uL2VtYWlsVmVyaWZpY2F0aW9uU2NyZWVuL3ZlcmlmeUVtYWlsTGlua0NsaWNrZWQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdHlsZUNvbnRleHQgZnJvbSBcIi4uLy4uLy4uLy4uL3N0eWxlcy9zdHlsZUNvbnRleHRcIjtcblxuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVByb3BzLCBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi90eXBlc1wiO1xuaW1wb3J0IFNwaW5uZXJJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvc3Bpbm5lckljb25cIjtcbmltcG9ydCB7IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IEVycm9yTGFyZ2VJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvZXJyb3JMYXJnZUljb25cIjtcbmltcG9ydCBBcnJvd1JpZ2h0SWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2Fycm93UmlnaHRJY29uXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vLi4vbGlicmFyeVwiO1xuaW1wb3J0IENoZWNrZWRSb3VuZEljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jaGVja2VkUm91bmRJY29uXCI7XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxcbiAgICBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVQcm9wcyxcbiAgICBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVTdGF0ZVxuPiB7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlID0gU3R5bGVDb250ZXh0O1xuXG4gICAgLypcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lUHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RhdHVzOiBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5MT0FESU5HXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLlNVQ0NFU1NGVUxcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VjY2VzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbXBvbmVudERpZE1vdW50ID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucHJvcHMuY2FsbEFQSSgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBSZW5kZXIuXG4gICAgICovXG5cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IHsgc3RhdHVzIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB7IHJlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbiwgb25Db250aW51ZUNsaWNrZWQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMuTE9BRElORykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgY3NzPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3Bpbm5lclwiIGNzcz17c3R5bGVzLnNwaW5uZXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTcGlubmVySWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnByaW1hcnl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5TVUNDRVNTRlVMIHx8XG4gICAgICAgICAgICBzdGF0dXMgPT09IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLkFMUkVBRFlfVkVSSUZJRURcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IFwiRW1haWwgdmVyaWZpY2F0aW9uIHN1Y2Nlc3NmdWwhXCI7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5BTFJFQURZX1ZFUklGSUVEKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiRW1haWwgYWxyZWFkeSB2ZXJpZmllZC5cIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IG5vRm9ybVJvd1wiIGNzcz17W3N0eWxlcy5yb3csIHN0eWxlcy5ub0Zvcm1Sb3ddfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja2VkUm91bmRJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMuc3VjY2Vzc30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyVGl0bGUgaGVhZGVyVGlueVRpdGxlXCIgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGlueVRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge21lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyXCIgY3NzPXtzdHlsZXMuZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlzTG9hZGluZz17ZmFsc2V9IG9uQ2xpY2s9e29uQ29udGludWVDbGlja2VkfSB0eXBlPVwiYnV0dG9uXCIgbGFiZWw9e1wiQ09OVElOVUVcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5JTlZBTElEKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZW1haWwgdmVyaWZpY2F0aW9uIGxpbmsgaGFzIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3JlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzZWNvbmRhcnlUZXh0IHNlY29uZGFyeUxpbmtXaXRoQXJyb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5zZWNvbmRhcnlUZXh0LCBzdHlsZXMuc2Vjb25kYXJ5TGlua1dpdGhBcnJvd119PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRpbnVlIDxBcnJvd1JpZ2h0SWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclRpdGxlIGVycm9yXCIgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuZXJyb3JdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFcnJvckxhcmdlSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLmVycm9yfSAvPiBTb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWNvbmRhcnlUZXh0XCIgY3NzPXtzdHlsZXMucHJpbWFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci4gUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBmb3IgYXNzaXN0YW5jZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                            ]
                        },
                        (0, _react2.jsx)(
                            "div",
                            {
                                className: "headerTitle error",
                                css: [
                                    styles.headerTitle,
                                    styles.error,
                                    process.env.NODE_ENV === "production" ? "" : ";label:VerifyEmailLinkClickedTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vdmVyaWZ5RW1haWxMaW5rQ2xpY2tlZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUl1RCIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L2VtYWlsVmVyaWZpY2F0aW9uL2VtYWlsVmVyaWZpY2F0aW9uU2NyZWVuL3ZlcmlmeUVtYWlsTGlua0NsaWNrZWQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdHlsZUNvbnRleHQgZnJvbSBcIi4uLy4uLy4uLy4uL3N0eWxlcy9zdHlsZUNvbnRleHRcIjtcblxuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVByb3BzLCBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi90eXBlc1wiO1xuaW1wb3J0IFNwaW5uZXJJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvc3Bpbm5lckljb25cIjtcbmltcG9ydCB7IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IEVycm9yTGFyZ2VJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvZXJyb3JMYXJnZUljb25cIjtcbmltcG9ydCBBcnJvd1JpZ2h0SWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2Fycm93UmlnaHRJY29uXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vLi4vbGlicmFyeVwiO1xuaW1wb3J0IENoZWNrZWRSb3VuZEljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jaGVja2VkUm91bmRJY29uXCI7XG5cbi8qXG4gKiBDb21wb25lbnQuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxcbiAgICBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVQcm9wcyxcbiAgICBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVTdGF0ZVxuPiB7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlID0gU3R5bGVDb250ZXh0O1xuXG4gICAgLypcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lUHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RhdHVzOiBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5MT0FESU5HXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLlNVQ0NFU1NGVUxcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VjY2VzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbXBvbmVudERpZE1vdW50ID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucHJvcHMuY2FsbEFQSSgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBSZW5kZXIuXG4gICAgICovXG5cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IHsgc3RhdHVzIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB7IHJlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbiwgb25Db250aW51ZUNsaWNrZWQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMuTE9BRElORykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgY3NzPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3Bpbm5lclwiIGNzcz17c3R5bGVzLnNwaW5uZXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTcGlubmVySWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnByaW1hcnl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5TVUNDRVNTRlVMIHx8XG4gICAgICAgICAgICBzdGF0dXMgPT09IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLkFMUkVBRFlfVkVSSUZJRURcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IFwiRW1haWwgdmVyaWZpY2F0aW9uIHN1Y2Nlc3NmdWwhXCI7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5BTFJFQURZX1ZFUklGSUVEKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiRW1haWwgYWxyZWFkeSB2ZXJpZmllZC5cIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IG5vRm9ybVJvd1wiIGNzcz17W3N0eWxlcy5yb3csIHN0eWxlcy5ub0Zvcm1Sb3ddfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja2VkUm91bmRJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMuc3VjY2Vzc30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyVGl0bGUgaGVhZGVyVGlueVRpdGxlXCIgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGlueVRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge21lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyXCIgY3NzPXtzdHlsZXMuZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlzTG9hZGluZz17ZmFsc2V9IG9uQ2xpY2s9e29uQ29udGludWVDbGlja2VkfSB0eXBlPVwiYnV0dG9uXCIgbGFiZWw9e1wiQ09OVElOVUVcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5JTlZBTElEKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZW1haWwgdmVyaWZpY2F0aW9uIGxpbmsgaGFzIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3JlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzZWNvbmRhcnlUZXh0IHNlY29uZGFyeUxpbmtXaXRoQXJyb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5zZWNvbmRhcnlUZXh0LCBzdHlsZXMuc2Vjb25kYXJ5TGlua1dpdGhBcnJvd119PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRpbnVlIDxBcnJvd1JpZ2h0SWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclRpdGxlIGVycm9yXCIgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuZXJyb3JdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFcnJvckxhcmdlSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLmVycm9yfSAvPiBTb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWNvbmRhcnlUZXh0XCIgY3NzPXtzdHlsZXMucHJpbWFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci4gUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBmb3IgYXNzaXN0YW5jZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                ]
                            },
                            (0, _react2.jsx)(_errorLargeIcon["default"], {
                                color: styles.palette.colors.error
                            }),
                            " Something went wrong"
                        ),
                        (0, _react2.jsx)(
                            "div",
                            {
                                className: "secondaryText",
                                css: styles.primaryText
                            },
                            "We encountered an unexpected error. Please contact support for assistance"
                        )
                    )
                );
            }
        }
    ]);

    return VerifyEmailLinkClickedTheme;
})(_react.PureComponent);

exports["default"] = VerifyEmailLinkClickedTheme;
VerifyEmailLinkClickedTheme.contextType = _styleContext["default"];
