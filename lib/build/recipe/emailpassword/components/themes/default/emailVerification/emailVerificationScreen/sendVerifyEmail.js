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

var _emailLargeIcon = _interopRequireDefault(require("../../../../../assets/emailLargeIcon"));

var _arrowRightIcon = _interopRequireDefault(require("../../../../../assets/arrowRightIcon"));

var _constants = require("../../../../../constants");

var _constants2 = require("../../../../../../../constants");

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
var SendVerifyEmailTheme = /*#__PURE__*/ (function(_PureComponent) {
    _inherits(SendVerifyEmailTheme, _PureComponent);

    var _super = _createSuper(SendVerifyEmailTheme);

    /*
     * Constructor.
     */
    function SendVerifyEmailTheme(props) {
        var _this;

        _classCallCheck(this, SendVerifyEmailTheme);

        _this = _super.call(this, props);

        _this.onSuccess = function() {
            _this.setState(function() {
                return {
                    status: _constants.SEND_VERIFY_EMAIL_STATUS.SUCCESS
                };
            });

            if (_this.props.onSuccess !== undefined) {
                _this.props.onSuccess();
            }
        };

        _this.sendEmail = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                var callAPI, response;
                return regeneratorRuntime.wrap(
                    function _callee$(_context) {
                        while (1) {
                            switch ((_context.prev = _context.next)) {
                                case 0:
                                    callAPI = _this.props.callAPI;
                                    _context.prev = 1;
                                    _context.next = 4;
                                    return callAPI();

                                case 4:
                                    response = _context.sent;

                                    if (!(response.status === _constants.API_RESPONSE_STATUS.OK)) {
                                        _context.next = 8;
                                        break;
                                    }

                                    _this.setState({
                                        status: _constants.SEND_VERIFY_EMAIL_STATUS.SUCCESS
                                    });

                                    return _context.abrupt("return");

                                case 8:
                                    _this.setState({
                                        status: _constants.SEND_VERIFY_EMAIL_STATUS.ERROR
                                    });

                                    _context.next = 14;
                                    break;

                                case 11:
                                    _context.prev = 11;
                                    _context.t0 = _context["catch"](1);

                                    _this.setState({
                                        status: _constants.SEND_VERIFY_EMAIL_STATUS.ERROR
                                    });

                                case 14:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    },
                    _callee,
                    null,
                    [[1, 11]]
                );
            })
        );
        _this.state = {
            status: _constants.SEND_VERIFY_EMAIL_STATUS.READY
        };
        return _this;
    }
    /*
     * Methods.
     */

    _createClass(SendVerifyEmailTheme, [
        {
            key: "render",

            /*
             * Render.
             */
            value: function render() {
                var styles = this.context;
                var signOut = this.props.signOut;
                var status = this.state.status;
                return (0, _react2.jsx)(
                    "div",
                    {
                        "data-supertokens": "container",
                        css: styles.container
                    },
                    (0, _react2.jsx)(
                        "div",
                        {
                            "data-supertokens": "row",
                            css: styles.row
                        },
                        status === _constants.SEND_VERIFY_EMAIL_STATUS.ERROR &&
                            (0, _react2.jsx)(
                                "div",
                                {
                                    "data-supertokens": "generalError",
                                    css: styles.generalError
                                },
                                _constants2.SOMETHING_WENT_WRONG_ERROR
                            ),
                        status === _constants.SEND_VERIFY_EMAIL_STATUS.SUCCESS &&
                            (0, _react2.jsx)(
                                "div",
                                {
                                    "data-supertokens": "generalSuccess",
                                    css: styles.generalSuccess
                                },
                                "Email resent"
                            ),
                        (0, _react2.jsx)(
                            "div",
                            {
                                "data-supertokens": "sendVerifyEmailIcon",
                                css: styles.sendVerifyEmailIcon
                            },
                            (0, _react2.jsx)(_emailLargeIcon["default"], null)
                        ),
                        (0, _react2.jsx)(
                            "div",
                            {
                                "data-supertokens": "headerTitle headerTinyTitle",
                                css: [
                                    styles.headerTitle,
                                    styles.headerTinyTitle,
                                    process.env.NODE_ENV === "production" ? "" : ";label:SendVerifyEmailTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vc2VuZFZlcmlmeUVtYWlsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwR3dCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vc2VuZFZlcmlmeUVtYWlsLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAoYykgMjAyMCwgVlJBSSBMYWJzIGFuZC9vciBpdHMgYWZmaWxpYXRlcy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpIGFzIHB1Ymxpc2hlZCBieSB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24uXG4gKlxuICogWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5XG4gKiBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBTZW5kVmVyaWZ5RW1haWxUaGVtZVByb3BzLCBTZW5kVmVyaWZ5RW1haWxUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3R5cGVzXCI7XG5cbi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgRW1haWxJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvZW1haWxMYXJnZUljb25cIjtcbmltcG9ydCBBcnJvd1JpZ2h0SWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2Fycm93UmlnaHRJY29uXCI7XG5pbXBvcnQgeyBBUElfUkVTUE9OU0VfU1RBVFVTLCBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTT01FVEhJTkdfV0VOVF9XUk9OR19FUlJPUiB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25zdGFudHNcIjtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZW5kVmVyaWZ5RW1haWxUaGVtZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8U2VuZFZlcmlmeUVtYWlsVGhlbWVQcm9wcywgU2VuZFZlcmlmeUVtYWlsVGhlbWVTdGF0ZT4ge1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZSA9IFN0eWxlQ29udGV4dDtcbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBTZW5kVmVyaWZ5RW1haWxUaGVtZVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLlJFQURZXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBNZXRob2RzLlxuICAgICAqL1xuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTXG4gICAgICAgIH0pKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWNjZXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TdWNjZXNzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VuZEVtYWlsID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCB7IGNhbGxBUEkgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBUEkoKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gQVBJX1JFU1BPTlNFX1NUQVRVUy5PSykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5FUlJPUlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLkVSUk9SXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IHsgc2lnbk91dCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwicm93XCIgY3NzPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICAgICAge3N0YXR1cyA9PT0gU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLkVSUk9SICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImdlbmVyYWxFcnJvclwiIGNzcz17c3R5bGVzLmdlbmVyYWxFcnJvcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1NPTUVUSElOR19XRU5UX1dST05HX0VSUk9SfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtzdGF0dXMgPT09IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImdlbmVyYWxTdWNjZXNzXCIgY3NzPXtzdHlsZXMuZ2VuZXJhbFN1Y2Nlc3N9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVtYWlsIHJlc2VudFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInNlbmRWZXJpZnlFbWFpbEljb25cIiBjc3M9e3N0eWxlcy5zZW5kVmVyaWZ5RW1haWxJY29ufT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFbWFpbEljb24gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGlueVRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBWZXJpZnkgeW91ciBlbWFpbCBhZGRyZXNzXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwicHJpbWFyeVRleHQgc2VuZFZlcmlmeUVtYWlsVGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMucHJpbWFyeVRleHQsIHN0eWxlcy5zZW5kVmVyaWZ5RW1haWxUZXh0XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPlBsZWFzZSBjbGljayBvbiB0aGUgbGluazwvc3Ryb25nPiBpbiB0aGUgZW1haWwgd2UganVzdCBzZW50IHlvdSB0byBjb25maXJtIHlvdXIgZW1haWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7c3RhdHVzICE9PSBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMuU1VDQ0VTUyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1zdXBlcnRva2Vucz1cImxpbmsgc2VuZFZlcmlmeUVtYWlsUmVzZW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMubGluaywgc3R5bGVzLnNlbmRWZXJpZnlFbWFpbFJlc2VuZF19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZW5kRW1haWx9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc2VuZCBFbWFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwic2Vjb25kYXJ5VGV4dCBzZWNvbmRhcnlMaW5rV2l0aEFycm93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuc2Vjb25kYXJ5VGV4dCwgc3R5bGVzLnNlY29uZGFyeUxpbmtXaXRoQXJyb3ddfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNpZ25PdXQoKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nb3V0IDxBcnJvd1JpZ2h0SWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                ]
                            },
                            "Verify your email address"
                        ),
                        (0, _react2.jsx)(
                            "div",
                            {
                                "data-supertokens": "primaryText sendVerifyEmailText",
                                css: [
                                    styles.primaryText,
                                    styles.sendVerifyEmailText,
                                    process.env.NODE_ENV === "production" ? "" : ";label:SendVerifyEmailTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vc2VuZFZlcmlmeUVtYWlsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErR3dCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vc2VuZFZlcmlmeUVtYWlsLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAoYykgMjAyMCwgVlJBSSBMYWJzIGFuZC9vciBpdHMgYWZmaWxpYXRlcy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpIGFzIHB1Ymxpc2hlZCBieSB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24uXG4gKlxuICogWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5XG4gKiBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBTZW5kVmVyaWZ5RW1haWxUaGVtZVByb3BzLCBTZW5kVmVyaWZ5RW1haWxUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3R5cGVzXCI7XG5cbi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgRW1haWxJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvZW1haWxMYXJnZUljb25cIjtcbmltcG9ydCBBcnJvd1JpZ2h0SWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2Fycm93UmlnaHRJY29uXCI7XG5pbXBvcnQgeyBBUElfUkVTUE9OU0VfU1RBVFVTLCBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTT01FVEhJTkdfV0VOVF9XUk9OR19FUlJPUiB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25zdGFudHNcIjtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZW5kVmVyaWZ5RW1haWxUaGVtZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8U2VuZFZlcmlmeUVtYWlsVGhlbWVQcm9wcywgU2VuZFZlcmlmeUVtYWlsVGhlbWVTdGF0ZT4ge1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZSA9IFN0eWxlQ29udGV4dDtcbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBTZW5kVmVyaWZ5RW1haWxUaGVtZVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLlJFQURZXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBNZXRob2RzLlxuICAgICAqL1xuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTXG4gICAgICAgIH0pKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWNjZXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TdWNjZXNzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VuZEVtYWlsID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCB7IGNhbGxBUEkgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBUEkoKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gQVBJX1JFU1BPTlNFX1NUQVRVUy5PSykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5FUlJPUlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLkVSUk9SXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IHsgc2lnbk91dCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwicm93XCIgY3NzPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICAgICAge3N0YXR1cyA9PT0gU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLkVSUk9SICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImdlbmVyYWxFcnJvclwiIGNzcz17c3R5bGVzLmdlbmVyYWxFcnJvcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1NPTUVUSElOR19XRU5UX1dST05HX0VSUk9SfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtzdGF0dXMgPT09IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImdlbmVyYWxTdWNjZXNzXCIgY3NzPXtzdHlsZXMuZ2VuZXJhbFN1Y2Nlc3N9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVtYWlsIHJlc2VudFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInNlbmRWZXJpZnlFbWFpbEljb25cIiBjc3M9e3N0eWxlcy5zZW5kVmVyaWZ5RW1haWxJY29ufT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFbWFpbEljb24gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGlueVRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBWZXJpZnkgeW91ciBlbWFpbCBhZGRyZXNzXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwicHJpbWFyeVRleHQgc2VuZFZlcmlmeUVtYWlsVGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMucHJpbWFyeVRleHQsIHN0eWxlcy5zZW5kVmVyaWZ5RW1haWxUZXh0XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPlBsZWFzZSBjbGljayBvbiB0aGUgbGluazwvc3Ryb25nPiBpbiB0aGUgZW1haWwgd2UganVzdCBzZW50IHlvdSB0byBjb25maXJtIHlvdXIgZW1haWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7c3RhdHVzICE9PSBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMuU1VDQ0VTUyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1zdXBlcnRva2Vucz1cImxpbmsgc2VuZFZlcmlmeUVtYWlsUmVzZW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMubGluaywgc3R5bGVzLnNlbmRWZXJpZnlFbWFpbFJlc2VuZF19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZW5kRW1haWx9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc2VuZCBFbWFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwic2Vjb25kYXJ5VGV4dCBzZWNvbmRhcnlMaW5rV2l0aEFycm93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuc2Vjb25kYXJ5VGV4dCwgc3R5bGVzLnNlY29uZGFyeUxpbmtXaXRoQXJyb3ddfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNpZ25PdXQoKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nb3V0IDxBcnJvd1JpZ2h0SWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                ]
                            },
                            (0, _react2.jsx)("strong", null, "Please click on the link"),
                            " in the email we just sent you to confirm your email address."
                        ),
                        status !== _constants.SEND_VERIFY_EMAIL_STATUS.SUCCESS &&
                            (0, _react2.jsx)(
                                "div",
                                {
                                    "data-supertokens": "link sendVerifyEmailResend",
                                    css: [
                                        styles.link,
                                        styles.sendVerifyEmailResend,
                                        process.env.NODE_ENV === "production" ? "" : ";label:SendVerifyEmailTheme;",
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vc2VuZFZlcmlmeUVtYWlsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzSDRCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vc2VuZFZlcmlmeUVtYWlsLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAoYykgMjAyMCwgVlJBSSBMYWJzIGFuZC9vciBpdHMgYWZmaWxpYXRlcy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpIGFzIHB1Ymxpc2hlZCBieSB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24uXG4gKlxuICogWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5XG4gKiBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBTZW5kVmVyaWZ5RW1haWxUaGVtZVByb3BzLCBTZW5kVmVyaWZ5RW1haWxUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3R5cGVzXCI7XG5cbi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgRW1haWxJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvZW1haWxMYXJnZUljb25cIjtcbmltcG9ydCBBcnJvd1JpZ2h0SWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2Fycm93UmlnaHRJY29uXCI7XG5pbXBvcnQgeyBBUElfUkVTUE9OU0VfU1RBVFVTLCBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTT01FVEhJTkdfV0VOVF9XUk9OR19FUlJPUiB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25zdGFudHNcIjtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZW5kVmVyaWZ5RW1haWxUaGVtZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8U2VuZFZlcmlmeUVtYWlsVGhlbWVQcm9wcywgU2VuZFZlcmlmeUVtYWlsVGhlbWVTdGF0ZT4ge1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZSA9IFN0eWxlQ29udGV4dDtcbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBTZW5kVmVyaWZ5RW1haWxUaGVtZVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLlJFQURZXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBNZXRob2RzLlxuICAgICAqL1xuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTXG4gICAgICAgIH0pKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWNjZXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TdWNjZXNzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VuZEVtYWlsID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCB7IGNhbGxBUEkgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBUEkoKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gQVBJX1JFU1BPTlNFX1NUQVRVUy5PSykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5FUlJPUlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLkVSUk9SXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IHsgc2lnbk91dCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwicm93XCIgY3NzPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICAgICAge3N0YXR1cyA9PT0gU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLkVSUk9SICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImdlbmVyYWxFcnJvclwiIGNzcz17c3R5bGVzLmdlbmVyYWxFcnJvcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1NPTUVUSElOR19XRU5UX1dST05HX0VSUk9SfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtzdGF0dXMgPT09IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImdlbmVyYWxTdWNjZXNzXCIgY3NzPXtzdHlsZXMuZ2VuZXJhbFN1Y2Nlc3N9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVtYWlsIHJlc2VudFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInNlbmRWZXJpZnlFbWFpbEljb25cIiBjc3M9e3N0eWxlcy5zZW5kVmVyaWZ5RW1haWxJY29ufT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFbWFpbEljb24gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGlueVRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBWZXJpZnkgeW91ciBlbWFpbCBhZGRyZXNzXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwicHJpbWFyeVRleHQgc2VuZFZlcmlmeUVtYWlsVGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMucHJpbWFyeVRleHQsIHN0eWxlcy5zZW5kVmVyaWZ5RW1haWxUZXh0XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPlBsZWFzZSBjbGljayBvbiB0aGUgbGluazwvc3Ryb25nPiBpbiB0aGUgZW1haWwgd2UganVzdCBzZW50IHlvdSB0byBjb25maXJtIHlvdXIgZW1haWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7c3RhdHVzICE9PSBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMuU1VDQ0VTUyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1zdXBlcnRva2Vucz1cImxpbmsgc2VuZFZlcmlmeUVtYWlsUmVzZW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMubGluaywgc3R5bGVzLnNlbmRWZXJpZnlFbWFpbFJlc2VuZF19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZW5kRW1haWx9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc2VuZCBFbWFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwic2Vjb25kYXJ5VGV4dCBzZWNvbmRhcnlMaW5rV2l0aEFycm93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuc2Vjb25kYXJ5VGV4dCwgc3R5bGVzLnNlY29uZGFyeUxpbmtXaXRoQXJyb3ddfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNpZ25PdXQoKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nb3V0IDxBcnJvd1JpZ2h0SWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                    ],
                                    onClick: this.sendEmail
                                },
                                "Resend Email"
                            ),
                        (0, _react2.jsx)(
                            "div",
                            {
                                "data-supertokens": "secondaryText secondaryLinkWithArrow",
                                css: [
                                    styles.secondaryText,
                                    styles.secondaryLinkWithArrow,
                                    process.env.NODE_ENV === "production" ? "" : ";label:SendVerifyEmailTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vc2VuZFZlcmlmeUVtYWlsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE4SDRCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vc2VuZFZlcmlmeUVtYWlsLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAoYykgMjAyMCwgVlJBSSBMYWJzIGFuZC9vciBpdHMgYWZmaWxpYXRlcy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpIGFzIHB1Ymxpc2hlZCBieSB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24uXG4gKlxuICogWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5XG4gKiBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBTZW5kVmVyaWZ5RW1haWxUaGVtZVByb3BzLCBTZW5kVmVyaWZ5RW1haWxUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3R5cGVzXCI7XG5cbi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgRW1haWxJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvZW1haWxMYXJnZUljb25cIjtcbmltcG9ydCBBcnJvd1JpZ2h0SWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2Fycm93UmlnaHRJY29uXCI7XG5pbXBvcnQgeyBBUElfUkVTUE9OU0VfU1RBVFVTLCBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTT01FVEhJTkdfV0VOVF9XUk9OR19FUlJPUiB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25zdGFudHNcIjtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZW5kVmVyaWZ5RW1haWxUaGVtZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8U2VuZFZlcmlmeUVtYWlsVGhlbWVQcm9wcywgU2VuZFZlcmlmeUVtYWlsVGhlbWVTdGF0ZT4ge1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZSA9IFN0eWxlQ29udGV4dDtcbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBTZW5kVmVyaWZ5RW1haWxUaGVtZVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLlJFQURZXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBNZXRob2RzLlxuICAgICAqL1xuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTXG4gICAgICAgIH0pKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWNjZXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TdWNjZXNzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VuZEVtYWlsID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCB7IGNhbGxBUEkgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBUEkoKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gQVBJX1JFU1BPTlNFX1NUQVRVUy5PSykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5FUlJPUlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLkVSUk9SXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IHsgc2lnbk91dCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwicm93XCIgY3NzPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICAgICAge3N0YXR1cyA9PT0gU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLkVSUk9SICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImdlbmVyYWxFcnJvclwiIGNzcz17c3R5bGVzLmdlbmVyYWxFcnJvcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1NPTUVUSElOR19XRU5UX1dST05HX0VSUk9SfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtzdGF0dXMgPT09IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImdlbmVyYWxTdWNjZXNzXCIgY3NzPXtzdHlsZXMuZ2VuZXJhbFN1Y2Nlc3N9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVtYWlsIHJlc2VudFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInNlbmRWZXJpZnlFbWFpbEljb25cIiBjc3M9e3N0eWxlcy5zZW5kVmVyaWZ5RW1haWxJY29ufT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxFbWFpbEljb24gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtbc3R5bGVzLmhlYWRlclRpdGxlLCBzdHlsZXMuaGVhZGVyVGlueVRpdGxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBWZXJpZnkgeW91ciBlbWFpbCBhZGRyZXNzXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwicHJpbWFyeVRleHQgc2VuZFZlcmlmeUVtYWlsVGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMucHJpbWFyeVRleHQsIHN0eWxlcy5zZW5kVmVyaWZ5RW1haWxUZXh0XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPlBsZWFzZSBjbGljayBvbiB0aGUgbGluazwvc3Ryb25nPiBpbiB0aGUgZW1haWwgd2UganVzdCBzZW50IHlvdSB0byBjb25maXJtIHlvdXIgZW1haWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7c3RhdHVzICE9PSBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMuU1VDQ0VTUyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1zdXBlcnRva2Vucz1cImxpbmsgc2VuZFZlcmlmeUVtYWlsUmVzZW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMubGluaywgc3R5bGVzLnNlbmRWZXJpZnlFbWFpbFJlc2VuZF19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZW5kRW1haWx9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc2VuZCBFbWFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwic2Vjb25kYXJ5VGV4dCBzZWNvbmRhcnlMaW5rV2l0aEFycm93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuc2Vjb25kYXJ5VGV4dCwgc3R5bGVzLnNlY29uZGFyeUxpbmtXaXRoQXJyb3ddfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNpZ25PdXQoKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nb3V0IDxBcnJvd1JpZ2h0SWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnRleHRQcmltYXJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                ],
                                onClick: function onClick() {
                                    return signOut();
                                }
                            },
                            "Logout ",
                            (0, _react2.jsx)(_arrowRightIcon["default"], {
                                color: styles.palette.colors.textPrimary
                            })
                        )
                    )
                );
            }
        }
    ]);

    return SendVerifyEmailTheme;
})(_react.PureComponent);

exports["default"] = SendVerifyEmailTheme;
SendVerifyEmailTheme.contextType = _styleContext["default"];
