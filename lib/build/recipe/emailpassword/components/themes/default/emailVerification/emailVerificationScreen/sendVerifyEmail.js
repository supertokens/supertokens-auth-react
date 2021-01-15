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

            _this.props.onSuccess();
        };

        _this.sendEmail = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                var _this$props, sendVerifyEmailAPI, onEmailAlreadyVerified, response;

                return regeneratorRuntime.wrap(
                    function _callee$(_context) {
                        while (1) {
                            switch ((_context.prev = _context.next)) {
                                case 0:
                                    (_this$props = _this.props),
                                        (sendVerifyEmailAPI = _this$props.sendVerifyEmailAPI),
                                        (onEmailAlreadyVerified = _this$props.onEmailAlreadyVerified);
                                    _context.prev = 1;
                                    _context.next = 4;
                                    return sendVerifyEmailAPI();

                                case 4:
                                    response = _context.sent;

                                    if (
                                        !(
                                            response.status ===
                                            _constants.API_RESPONSE_STATUS.EMAIL_ALREADY_VERIFIED_ERROR
                                        )
                                    ) {
                                        _context.next = 7;
                                        break;
                                    }

                                    return _context.abrupt("return", onEmailAlreadyVerified());

                                case 7:
                                    if (!(response.status === _constants.API_RESPONSE_STATUS.OK)) {
                                        _context.next = 10;
                                        break;
                                    }

                                    _this.setState({
                                        status: _constants.SEND_VERIFY_EMAIL_STATUS.SUCCESS
                                    });

                                    return _context.abrupt("return");

                                case 10:
                                    _context.next = 15;
                                    break;

                                case 12:
                                    _context.prev = 12;
                                    _context.t0 = _context["catch"](1);

                                    _this.setState({
                                        status: _constants.SEND_VERIFY_EMAIL_STATUS.ERROR
                                    });

                                case 15:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    },
                    _callee,
                    null,
                    [[1, 12]]
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
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vc2VuZFZlcmlmeUVtYWlsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3R3dCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vc2VuZFZlcmlmeUVtYWlsLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAoYykgMjAyMCwgVlJBSSBMYWJzIGFuZC9vciBpdHMgYWZmaWxpYXRlcy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpIGFzIHB1Ymxpc2hlZCBieSB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24uXG4gKlxuICogWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5XG4gKiBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBTZW5kVmVyaWZ5RW1haWxUaGVtZVByb3BzLCBTZW5kVmVyaWZ5RW1haWxUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3R5cGVzXCI7XG5cbi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgRW1haWxJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvZW1haWxMYXJnZUljb25cIjtcbmltcG9ydCBBcnJvd1JpZ2h0SWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2Fycm93UmlnaHRJY29uXCI7XG5pbXBvcnQgeyBBUElfUkVTUE9OU0VfU1RBVFVTLCBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTT01FVEhJTkdfV0VOVF9XUk9OR19FUlJPUiB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25zdGFudHNcIjtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZW5kVmVyaWZ5RW1haWxUaGVtZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8U2VuZFZlcmlmeUVtYWlsVGhlbWVQcm9wcywgU2VuZFZlcmlmeUVtYWlsVGhlbWVTdGF0ZT4ge1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZSA9IFN0eWxlQ29udGV4dDtcbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBTZW5kVmVyaWZ5RW1haWxUaGVtZVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLlJFQURZXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBNZXRob2RzLlxuICAgICAqL1xuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Y2Nlc3MoKTtcbiAgICB9O1xuXG4gICAgc2VuZEVtYWlsID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCB7IHNlbmRWZXJpZnlFbWFpbEFQSSwgb25FbWFpbEFscmVhZHlWZXJpZmllZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2VuZFZlcmlmeUVtYWlsQVBJKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IEFQSV9SRVNQT05TRV9TVEFUVVMuRU1BSUxfQUxSRUFEWV9WRVJJRklFRF9FUlJPUikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvbkVtYWlsQWxyZWFkeVZlcmlmaWVkKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IEFQSV9SRVNQT05TRV9TVEFUVVMuT0spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMuU1VDQ0VTU1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMuRVJST1JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogUmVuZGVyLlxuICAgICAqL1xuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgeyBzaWduT3V0IH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCB7IHN0YXR1cyB9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJyb3dcIiBjc3M9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICAgICAgICB7c3RhdHVzID09PSBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMuRVJST1IgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiZ2VuZXJhbEVycm9yXCIgY3NzPXtzdHlsZXMuZ2VuZXJhbEVycm9yfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7U09NRVRISU5HX1dFTlRfV1JPTkdfRVJST1J9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge3N0YXR1cyA9PT0gU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLlNVQ0NFU1MgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiZ2VuZXJhbFN1Y2Nlc3NcIiBjc3M9e3N0eWxlcy5nZW5lcmFsU3VjY2Vzc30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW1haWwgcmVzZW50XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwic2VuZFZlcmlmeUVtYWlsSWNvblwiIGNzcz17c3R5bGVzLnNlbmRWZXJpZnlFbWFpbEljb259PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEVtYWlsSWNvbiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1zdXBlcnRva2Vucz1cImhlYWRlclRpdGxlIGhlYWRlclRpbnlUaXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIFZlcmlmeSB5b3VyIGVtYWlsIGFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJwcmltYXJ5VGV4dCBzZW5kVmVyaWZ5RW1haWxUZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5wcmltYXJ5VGV4dCwgc3R5bGVzLnNlbmRWZXJpZnlFbWFpbFRleHRdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+UGxlYXNlIGNsaWNrIG9uIHRoZSBsaW5rPC9zdHJvbmc+IGluIHRoZSBlbWFpbCB3ZSBqdXN0IHNlbnQgeW91IHRvIGNvbmZpcm0geW91ciBlbWFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzcy5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtzdGF0dXMgIT09IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwibGluayBzZW5kVmVyaWZ5RW1haWxSZXNlbmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5saW5rLCBzdHlsZXMuc2VuZFZlcmlmeUVtYWlsUmVzZW5kXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbmRFbWFpbH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzZW5kIEVtYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJzZWNvbmRhcnlUZXh0IHNlY29uZGFyeUxpbmtXaXRoQXJyb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5zZWNvbmRhcnlUZXh0LCBzdHlsZXMuc2Vjb25kYXJ5TGlua1dpdGhBcnJvd119XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2lnbk91dCgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dvdXQgPEFycm93UmlnaHRJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMudGV4dFByaW1hcnl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19 */"
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
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vc2VuZFZlcmlmeUVtYWlsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2R3dCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vc2VuZFZlcmlmeUVtYWlsLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAoYykgMjAyMCwgVlJBSSBMYWJzIGFuZC9vciBpdHMgYWZmaWxpYXRlcy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpIGFzIHB1Ymxpc2hlZCBieSB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24uXG4gKlxuICogWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5XG4gKiBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBTZW5kVmVyaWZ5RW1haWxUaGVtZVByb3BzLCBTZW5kVmVyaWZ5RW1haWxUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3R5cGVzXCI7XG5cbi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgRW1haWxJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvZW1haWxMYXJnZUljb25cIjtcbmltcG9ydCBBcnJvd1JpZ2h0SWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2Fycm93UmlnaHRJY29uXCI7XG5pbXBvcnQgeyBBUElfUkVTUE9OU0VfU1RBVFVTLCBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTT01FVEhJTkdfV0VOVF9XUk9OR19FUlJPUiB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25zdGFudHNcIjtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZW5kVmVyaWZ5RW1haWxUaGVtZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8U2VuZFZlcmlmeUVtYWlsVGhlbWVQcm9wcywgU2VuZFZlcmlmeUVtYWlsVGhlbWVTdGF0ZT4ge1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZSA9IFN0eWxlQ29udGV4dDtcbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBTZW5kVmVyaWZ5RW1haWxUaGVtZVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLlJFQURZXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBNZXRob2RzLlxuICAgICAqL1xuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Y2Nlc3MoKTtcbiAgICB9O1xuXG4gICAgc2VuZEVtYWlsID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCB7IHNlbmRWZXJpZnlFbWFpbEFQSSwgb25FbWFpbEFscmVhZHlWZXJpZmllZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2VuZFZlcmlmeUVtYWlsQVBJKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IEFQSV9SRVNQT05TRV9TVEFUVVMuRU1BSUxfQUxSRUFEWV9WRVJJRklFRF9FUlJPUikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvbkVtYWlsQWxyZWFkeVZlcmlmaWVkKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IEFQSV9SRVNQT05TRV9TVEFUVVMuT0spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMuU1VDQ0VTU1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMuRVJST1JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogUmVuZGVyLlxuICAgICAqL1xuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgeyBzaWduT3V0IH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCB7IHN0YXR1cyB9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJyb3dcIiBjc3M9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICAgICAgICB7c3RhdHVzID09PSBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMuRVJST1IgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiZ2VuZXJhbEVycm9yXCIgY3NzPXtzdHlsZXMuZ2VuZXJhbEVycm9yfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7U09NRVRISU5HX1dFTlRfV1JPTkdfRVJST1J9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge3N0YXR1cyA9PT0gU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLlNVQ0NFU1MgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiZ2VuZXJhbFN1Y2Nlc3NcIiBjc3M9e3N0eWxlcy5nZW5lcmFsU3VjY2Vzc30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW1haWwgcmVzZW50XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwic2VuZFZlcmlmeUVtYWlsSWNvblwiIGNzcz17c3R5bGVzLnNlbmRWZXJpZnlFbWFpbEljb259PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEVtYWlsSWNvbiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1zdXBlcnRva2Vucz1cImhlYWRlclRpdGxlIGhlYWRlclRpbnlUaXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIFZlcmlmeSB5b3VyIGVtYWlsIGFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJwcmltYXJ5VGV4dCBzZW5kVmVyaWZ5RW1haWxUZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5wcmltYXJ5VGV4dCwgc3R5bGVzLnNlbmRWZXJpZnlFbWFpbFRleHRdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+UGxlYXNlIGNsaWNrIG9uIHRoZSBsaW5rPC9zdHJvbmc+IGluIHRoZSBlbWFpbCB3ZSBqdXN0IHNlbnQgeW91IHRvIGNvbmZpcm0geW91ciBlbWFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzcy5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtzdGF0dXMgIT09IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwibGluayBzZW5kVmVyaWZ5RW1haWxSZXNlbmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5saW5rLCBzdHlsZXMuc2VuZFZlcmlmeUVtYWlsUmVzZW5kXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbmRFbWFpbH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzZW5kIEVtYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJzZWNvbmRhcnlUZXh0IHNlY29uZGFyeUxpbmtXaXRoQXJyb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5zZWNvbmRhcnlUZXh0LCBzdHlsZXMuc2Vjb25kYXJ5TGlua1dpdGhBcnJvd119XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2lnbk91dCgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dvdXQgPEFycm93UmlnaHRJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMudGV4dFByaW1hcnl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19 */"
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
                                            : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vc2VuZFZlcmlmeUVtYWlsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvSDRCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vc2VuZFZlcmlmeUVtYWlsLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAoYykgMjAyMCwgVlJBSSBMYWJzIGFuZC9vciBpdHMgYWZmaWxpYXRlcy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpIGFzIHB1Ymxpc2hlZCBieSB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24uXG4gKlxuICogWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5XG4gKiBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBTZW5kVmVyaWZ5RW1haWxUaGVtZVByb3BzLCBTZW5kVmVyaWZ5RW1haWxUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3R5cGVzXCI7XG5cbi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgRW1haWxJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvZW1haWxMYXJnZUljb25cIjtcbmltcG9ydCBBcnJvd1JpZ2h0SWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2Fycm93UmlnaHRJY29uXCI7XG5pbXBvcnQgeyBBUElfUkVTUE9OU0VfU1RBVFVTLCBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTT01FVEhJTkdfV0VOVF9XUk9OR19FUlJPUiB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25zdGFudHNcIjtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZW5kVmVyaWZ5RW1haWxUaGVtZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8U2VuZFZlcmlmeUVtYWlsVGhlbWVQcm9wcywgU2VuZFZlcmlmeUVtYWlsVGhlbWVTdGF0ZT4ge1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZSA9IFN0eWxlQ29udGV4dDtcbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBTZW5kVmVyaWZ5RW1haWxUaGVtZVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLlJFQURZXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBNZXRob2RzLlxuICAgICAqL1xuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Y2Nlc3MoKTtcbiAgICB9O1xuXG4gICAgc2VuZEVtYWlsID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCB7IHNlbmRWZXJpZnlFbWFpbEFQSSwgb25FbWFpbEFscmVhZHlWZXJpZmllZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2VuZFZlcmlmeUVtYWlsQVBJKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IEFQSV9SRVNQT05TRV9TVEFUVVMuRU1BSUxfQUxSRUFEWV9WRVJJRklFRF9FUlJPUikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvbkVtYWlsQWxyZWFkeVZlcmlmaWVkKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IEFQSV9SRVNQT05TRV9TVEFUVVMuT0spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMuU1VDQ0VTU1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMuRVJST1JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogUmVuZGVyLlxuICAgICAqL1xuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgeyBzaWduT3V0IH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCB7IHN0YXR1cyB9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJyb3dcIiBjc3M9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICAgICAgICB7c3RhdHVzID09PSBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMuRVJST1IgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiZ2VuZXJhbEVycm9yXCIgY3NzPXtzdHlsZXMuZ2VuZXJhbEVycm9yfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7U09NRVRISU5HX1dFTlRfV1JPTkdfRVJST1J9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge3N0YXR1cyA9PT0gU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLlNVQ0NFU1MgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiZ2VuZXJhbFN1Y2Nlc3NcIiBjc3M9e3N0eWxlcy5nZW5lcmFsU3VjY2Vzc30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW1haWwgcmVzZW50XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwic2VuZFZlcmlmeUVtYWlsSWNvblwiIGNzcz17c3R5bGVzLnNlbmRWZXJpZnlFbWFpbEljb259PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEVtYWlsSWNvbiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1zdXBlcnRva2Vucz1cImhlYWRlclRpdGxlIGhlYWRlclRpbnlUaXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIFZlcmlmeSB5b3VyIGVtYWlsIGFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJwcmltYXJ5VGV4dCBzZW5kVmVyaWZ5RW1haWxUZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5wcmltYXJ5VGV4dCwgc3R5bGVzLnNlbmRWZXJpZnlFbWFpbFRleHRdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+UGxlYXNlIGNsaWNrIG9uIHRoZSBsaW5rPC9zdHJvbmc+IGluIHRoZSBlbWFpbCB3ZSBqdXN0IHNlbnQgeW91IHRvIGNvbmZpcm0geW91ciBlbWFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzcy5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtzdGF0dXMgIT09IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwibGluayBzZW5kVmVyaWZ5RW1haWxSZXNlbmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5saW5rLCBzdHlsZXMuc2VuZFZlcmlmeUVtYWlsUmVzZW5kXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbmRFbWFpbH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzZW5kIEVtYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJzZWNvbmRhcnlUZXh0IHNlY29uZGFyeUxpbmtXaXRoQXJyb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5zZWNvbmRhcnlUZXh0LCBzdHlsZXMuc2Vjb25kYXJ5TGlua1dpdGhBcnJvd119XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2lnbk91dCgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dvdXQgPEFycm93UmlnaHRJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMudGV4dFByaW1hcnl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19 */"
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
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vc2VuZFZlcmlmeUVtYWlsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE0SDRCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vc2VuZFZlcmlmeUVtYWlsLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAoYykgMjAyMCwgVlJBSSBMYWJzIGFuZC9vciBpdHMgYWZmaWxpYXRlcy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpIGFzIHB1Ymxpc2hlZCBieSB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24uXG4gKlxuICogWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5XG4gKiBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG5pbXBvcnQgeyBTZW5kVmVyaWZ5RW1haWxUaGVtZVByb3BzLCBTZW5kVmVyaWZ5RW1haWxUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3R5cGVzXCI7XG5cbi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSBcIkBlbW90aW9uL3JlYWN0XCI7XG5pbXBvcnQgRW1haWxJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvZW1haWxMYXJnZUljb25cIjtcbmltcG9ydCBBcnJvd1JpZ2h0SWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2Fycm93UmlnaHRJY29uXCI7XG5pbXBvcnQgeyBBUElfUkVTUE9OU0VfU1RBVFVTLCBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTT01FVEhJTkdfV0VOVF9XUk9OR19FUlJPUiB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25zdGFudHNcIjtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZW5kVmVyaWZ5RW1haWxUaGVtZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8U2VuZFZlcmlmeUVtYWlsVGhlbWVQcm9wcywgU2VuZFZlcmlmeUVtYWlsVGhlbWVTdGF0ZT4ge1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZSA9IFN0eWxlQ29udGV4dDtcbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBTZW5kVmVyaWZ5RW1haWxUaGVtZVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLlJFQURZXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBNZXRob2RzLlxuICAgICAqL1xuXG4gICAgb25TdWNjZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Y2Nlc3MoKTtcbiAgICB9O1xuXG4gICAgc2VuZEVtYWlsID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCB7IHNlbmRWZXJpZnlFbWFpbEFQSSwgb25FbWFpbEFscmVhZHlWZXJpZmllZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2VuZFZlcmlmeUVtYWlsQVBJKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IEFQSV9SRVNQT05TRV9TVEFUVVMuRU1BSUxfQUxSRUFEWV9WRVJJRklFRF9FUlJPUikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvbkVtYWlsQWxyZWFkeVZlcmlmaWVkKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IEFQSV9SRVNQT05TRV9TVEFUVVMuT0spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMuU1VDQ0VTU1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMuRVJST1JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogUmVuZGVyLlxuICAgICAqL1xuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgeyBzaWduT3V0IH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCB7IHN0YXR1cyB9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJyb3dcIiBjc3M9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICAgICAgICB7c3RhdHVzID09PSBTRU5EX1ZFUklGWV9FTUFJTF9TVEFUVVMuRVJST1IgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiZ2VuZXJhbEVycm9yXCIgY3NzPXtzdHlsZXMuZ2VuZXJhbEVycm9yfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7U09NRVRISU5HX1dFTlRfV1JPTkdfRVJST1J9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge3N0YXR1cyA9PT0gU0VORF9WRVJJRllfRU1BSUxfU1RBVFVTLlNVQ0NFU1MgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiZ2VuZXJhbFN1Y2Nlc3NcIiBjc3M9e3N0eWxlcy5nZW5lcmFsU3VjY2Vzc30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW1haWwgcmVzZW50XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwic2VuZFZlcmlmeUVtYWlsSWNvblwiIGNzcz17c3R5bGVzLnNlbmRWZXJpZnlFbWFpbEljb259PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEVtYWlsSWNvbiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1zdXBlcnRva2Vucz1cImhlYWRlclRpdGxlIGhlYWRlclRpbnlUaXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIFZlcmlmeSB5b3VyIGVtYWlsIGFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJwcmltYXJ5VGV4dCBzZW5kVmVyaWZ5RW1haWxUZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5wcmltYXJ5VGV4dCwgc3R5bGVzLnNlbmRWZXJpZnlFbWFpbFRleHRdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+UGxlYXNlIGNsaWNrIG9uIHRoZSBsaW5rPC9zdHJvbmc+IGluIHRoZSBlbWFpbCB3ZSBqdXN0IHNlbnQgeW91IHRvIGNvbmZpcm0geW91ciBlbWFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzcy5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtzdGF0dXMgIT09IFNFTkRfVkVSSUZZX0VNQUlMX1NUQVRVUy5TVUNDRVNTICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwibGluayBzZW5kVmVyaWZ5RW1haWxSZXNlbmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5saW5rLCBzdHlsZXMuc2VuZFZlcmlmeUVtYWlsUmVzZW5kXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbmRFbWFpbH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzZW5kIEVtYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJzZWNvbmRhcnlUZXh0IHNlY29uZGFyeUxpbmtXaXRoQXJyb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5zZWNvbmRhcnlUZXh0LCBzdHlsZXMuc2Vjb25kYXJ5TGlua1dpdGhBcnJvd119XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2lnbk91dCgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dvdXQgPEFycm93UmlnaHRJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMudGV4dFByaW1hcnl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19 */"
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
