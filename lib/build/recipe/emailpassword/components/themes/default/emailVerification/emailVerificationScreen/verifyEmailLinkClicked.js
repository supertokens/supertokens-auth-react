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
                            "data-supertokens": "container",
                            css: styles.container
                        },
                        (0, _react2.jsx)(
                            "div",
                            {
                                "data-supertokens": "row",
                                css: styles.row
                            },
                            (0, _react2.jsx)(
                                "div",
                                {
                                    "data-supertokens": "spinner",
                                    css: styles.spinner
                                },
                                (0, _react2.jsx)(_spinnerIcon["default"], {
                                    color: styles.palette.colors.primary
                                })
                            )
                        )
                    );
                }

                if (status === _constants.VERIFY_EMAIL_LINK_CLICKED_STATUS.SUCCESSFUL) {
                    return (0, _react2.jsx)(
                        "div",
                        {
                            "data-supertokens": "container",
                            css: styles.container
                        },
                        (0, _react2.jsx)(
                            "div",
                            {
                                "data-supertokens": "row noFormRow",
                                css: [
                                    styles.row,
                                    styles.noFormRow,
                                    process.env.NODE_ENV === "production" ? "" : ";label:VerifyEmailLinkClickedTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vdmVyaWZ5RW1haWxMaW5rQ2xpY2tlZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOEYwRCIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L2VtYWlsVmVyaWZpY2F0aW9uL2VtYWlsVmVyaWZpY2F0aW9uU2NyZWVuL3ZlcmlmeUVtYWlsTGlua0NsaWNrZWQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiXG4vKiBDb3B5cmlnaHQgKGMpIDIwMjAsIFZSQUkgTGFicyBhbmQvb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiAqIFwiTGljZW5zZVwiKSBhcyBwdWJsaXNoZWQgYnkgdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLlxuICpcbiAqIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heVxuICogb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVRcbiAqIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZVxuICogTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lUHJvcHMsIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgU3Bpbm5lckljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9zcGlubmVySWNvblwiO1xuaW1wb3J0IHsgVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgRXJyb3JMYXJnZUljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9lcnJvckxhcmdlSWNvblwiO1xuaW1wb3J0IEFycm93UmlnaHRJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvYXJyb3dSaWdodEljb25cIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuLi8uLi8uLi8uLi9saWJyYXJ5XCI7XG5pbXBvcnQgQ2hlY2tlZFJvdW5kSWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NoZWNrZWRSb3VuZEljb25cIjtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWUgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFxuICAgIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVByb3BzLFxuICAgIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVN0YXRlXG4+IHtcbiAgICBzdGF0aWMgY29udGV4dFR5cGUgPSBTdHlsZUNvbnRleHQ7XG5cbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVQcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLkxPQURJTkdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvblN1Y2Nlc3MgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIHN0YXR1czogVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMuU1VDQ0VTU0ZVTFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWNjZXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TdWNjZXNzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wcm9wcy5jYWxsQVBJKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cblxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHsgcmVkaXJlY3RUb1ZlcmlmeUVtYWlsU2NyZWVuLCBvbkNvbnRpbnVlQ2xpY2tlZCB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5MT0FESU5HKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvd1wiIGNzcz17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJzcGlubmVyXCIgY3NzPXtzdHlsZXMuc3Bpbm5lcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNwaW5uZXJJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMucHJpbWFyeX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5TVUNDRVNTRlVMKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvdyBub0Zvcm1Sb3dcIiBjc3M9e1tzdHlsZXMucm93LCBzdHlsZXMubm9Gb3JtUm93XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tlZFJvdW5kSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnN1Y2Nlc3N9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbWFpbCB2ZXJpZmljYXRpb24gc3VjY2Vzc2Z1bCFcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyXCIgY3NzPXtzdHlsZXMuZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlzTG9hZGluZz17ZmFsc2V9IG9uQ2xpY2s9e29uQ29udGludWVDbGlja2VkfSB0eXBlPVwiYnV0dG9uXCIgbGFiZWw9e1wiQ09OVElOVUVcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5JTlZBTElEKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvdyBub0Zvcm1Sb3dcIiBjc3M9e1tzdHlsZXMucm93LCBzdHlsZXMubm9Gb3JtUm93XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZW1haWwgdmVyaWZpY2F0aW9uIGxpbmsgaGFzIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3JlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwic2Vjb25kYXJ5VGV4dCBzZWNvbmRhcnlMaW5rV2l0aEFycm93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuc2Vjb25kYXJ5VGV4dCwgc3R5bGVzLnNlY29uZGFyeUxpbmtXaXRoQXJyb3ddfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250aW51ZSA8QXJyb3dSaWdodEljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy50ZXh0UHJpbWFyeX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBlcnJvclwiIGNzcz17W3N0eWxlcy5oZWFkZXJUaXRsZSwgc3R5bGVzLmVycm9yXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXJyb3JMYXJnZUljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5lcnJvcn0gLz4gU29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInByaW1hcnlUZXh0XCIgY3NzPXtzdHlsZXMucHJpbWFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci4gUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBmb3IgYXNzaXN0YW5jZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                ]
                            },
                            (0, _react2.jsx)(_checkedRoundIcon["default"], {
                                color: styles.palette.colors.success
                            }),
                            (0, _react2.jsx)(
                                "div",
                                {
                                    "data-supertokens": "headerTitle headerTinyTitle",
                                    css: [
                                        styles.headerTitle,
                                        styles.headerTinyTitle,
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : ";label:VerifyEmailLinkClickedTheme;",
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vdmVyaWZ5RW1haWxMaW5rQ2xpY2tlZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0c0RSIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L2VtYWlsVmVyaWZpY2F0aW9uL2VtYWlsVmVyaWZpY2F0aW9uU2NyZWVuL3ZlcmlmeUVtYWlsTGlua0NsaWNrZWQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiXG4vKiBDb3B5cmlnaHQgKGMpIDIwMjAsIFZSQUkgTGFicyBhbmQvb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiAqIFwiTGljZW5zZVwiKSBhcyBwdWJsaXNoZWQgYnkgdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLlxuICpcbiAqIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heVxuICogb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVRcbiAqIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZVxuICogTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lUHJvcHMsIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgU3Bpbm5lckljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9zcGlubmVySWNvblwiO1xuaW1wb3J0IHsgVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgRXJyb3JMYXJnZUljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9lcnJvckxhcmdlSWNvblwiO1xuaW1wb3J0IEFycm93UmlnaHRJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvYXJyb3dSaWdodEljb25cIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuLi8uLi8uLi8uLi9saWJyYXJ5XCI7XG5pbXBvcnQgQ2hlY2tlZFJvdW5kSWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NoZWNrZWRSb3VuZEljb25cIjtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWUgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFxuICAgIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVByb3BzLFxuICAgIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVN0YXRlXG4+IHtcbiAgICBzdGF0aWMgY29udGV4dFR5cGUgPSBTdHlsZUNvbnRleHQ7XG5cbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVQcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLkxPQURJTkdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvblN1Y2Nlc3MgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIHN0YXR1czogVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMuU1VDQ0VTU0ZVTFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWNjZXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TdWNjZXNzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wcm9wcy5jYWxsQVBJKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cblxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHsgcmVkaXJlY3RUb1ZlcmlmeUVtYWlsU2NyZWVuLCBvbkNvbnRpbnVlQ2xpY2tlZCB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5MT0FESU5HKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvd1wiIGNzcz17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJzcGlubmVyXCIgY3NzPXtzdHlsZXMuc3Bpbm5lcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNwaW5uZXJJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMucHJpbWFyeX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5TVUNDRVNTRlVMKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvdyBub0Zvcm1Sb3dcIiBjc3M9e1tzdHlsZXMucm93LCBzdHlsZXMubm9Gb3JtUm93XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tlZFJvdW5kSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnN1Y2Nlc3N9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbWFpbCB2ZXJpZmljYXRpb24gc3VjY2Vzc2Z1bCFcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyXCIgY3NzPXtzdHlsZXMuZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlzTG9hZGluZz17ZmFsc2V9IG9uQ2xpY2s9e29uQ29udGludWVDbGlja2VkfSB0eXBlPVwiYnV0dG9uXCIgbGFiZWw9e1wiQ09OVElOVUVcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5JTlZBTElEKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvdyBub0Zvcm1Sb3dcIiBjc3M9e1tzdHlsZXMucm93LCBzdHlsZXMubm9Gb3JtUm93XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZW1haWwgdmVyaWZpY2F0aW9uIGxpbmsgaGFzIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3JlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwic2Vjb25kYXJ5VGV4dCBzZWNvbmRhcnlMaW5rV2l0aEFycm93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuc2Vjb25kYXJ5VGV4dCwgc3R5bGVzLnNlY29uZGFyeUxpbmtXaXRoQXJyb3ddfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250aW51ZSA8QXJyb3dSaWdodEljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy50ZXh0UHJpbWFyeX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBlcnJvclwiIGNzcz17W3N0eWxlcy5oZWFkZXJUaXRsZSwgc3R5bGVzLmVycm9yXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXJyb3JMYXJnZUljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5lcnJvcn0gLz4gU29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInByaW1hcnlUZXh0XCIgY3NzPXtzdHlsZXMucHJpbWFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci4gUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBmb3IgYXNzaXN0YW5jZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                    ]
                                },
                                "Email verification successful!"
                            ),
                            (0, _react2.jsx)(
                                "div",
                                {
                                    "data-supertokens": "emailVerificationButtonWrapper",
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
                            "data-supertokens": "container",
                            css: styles.container
                        },
                        (0, _react2.jsx)(
                            "div",
                            {
                                "data-supertokens": "row noFormRow",
                                css: [
                                    styles.row,
                                    styles.noFormRow,
                                    process.env.NODE_ENV === "production" ? "" : ";label:VerifyEmailLinkClickedTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vdmVyaWZ5RW1haWxMaW5rQ2xpY2tlZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOEcwRCIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L2VtYWlsVmVyaWZpY2F0aW9uL2VtYWlsVmVyaWZpY2F0aW9uU2NyZWVuL3ZlcmlmeUVtYWlsTGlua0NsaWNrZWQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiXG4vKiBDb3B5cmlnaHQgKGMpIDIwMjAsIFZSQUkgTGFicyBhbmQvb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiAqIFwiTGljZW5zZVwiKSBhcyBwdWJsaXNoZWQgYnkgdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLlxuICpcbiAqIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heVxuICogb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVRcbiAqIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZVxuICogTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lUHJvcHMsIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgU3Bpbm5lckljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9zcGlubmVySWNvblwiO1xuaW1wb3J0IHsgVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgRXJyb3JMYXJnZUljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9lcnJvckxhcmdlSWNvblwiO1xuaW1wb3J0IEFycm93UmlnaHRJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvYXJyb3dSaWdodEljb25cIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuLi8uLi8uLi8uLi9saWJyYXJ5XCI7XG5pbXBvcnQgQ2hlY2tlZFJvdW5kSWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NoZWNrZWRSb3VuZEljb25cIjtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWUgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFxuICAgIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVByb3BzLFxuICAgIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVN0YXRlXG4+IHtcbiAgICBzdGF0aWMgY29udGV4dFR5cGUgPSBTdHlsZUNvbnRleHQ7XG5cbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVQcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLkxPQURJTkdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvblN1Y2Nlc3MgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIHN0YXR1czogVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMuU1VDQ0VTU0ZVTFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWNjZXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TdWNjZXNzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wcm9wcy5jYWxsQVBJKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cblxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHsgcmVkaXJlY3RUb1ZlcmlmeUVtYWlsU2NyZWVuLCBvbkNvbnRpbnVlQ2xpY2tlZCB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5MT0FESU5HKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvd1wiIGNzcz17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJzcGlubmVyXCIgY3NzPXtzdHlsZXMuc3Bpbm5lcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNwaW5uZXJJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMucHJpbWFyeX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5TVUNDRVNTRlVMKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvdyBub0Zvcm1Sb3dcIiBjc3M9e1tzdHlsZXMucm93LCBzdHlsZXMubm9Gb3JtUm93XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tlZFJvdW5kSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnN1Y2Nlc3N9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbWFpbCB2ZXJpZmljYXRpb24gc3VjY2Vzc2Z1bCFcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyXCIgY3NzPXtzdHlsZXMuZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlzTG9hZGluZz17ZmFsc2V9IG9uQ2xpY2s9e29uQ29udGludWVDbGlja2VkfSB0eXBlPVwiYnV0dG9uXCIgbGFiZWw9e1wiQ09OVElOVUVcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5JTlZBTElEKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvdyBub0Zvcm1Sb3dcIiBjc3M9e1tzdHlsZXMucm93LCBzdHlsZXMubm9Gb3JtUm93XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZW1haWwgdmVyaWZpY2F0aW9uIGxpbmsgaGFzIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3JlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwic2Vjb25kYXJ5VGV4dCBzZWNvbmRhcnlMaW5rV2l0aEFycm93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuc2Vjb25kYXJ5VGV4dCwgc3R5bGVzLnNlY29uZGFyeUxpbmtXaXRoQXJyb3ddfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250aW51ZSA8QXJyb3dSaWdodEljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy50ZXh0UHJpbWFyeX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBlcnJvclwiIGNzcz17W3N0eWxlcy5oZWFkZXJUaXRsZSwgc3R5bGVzLmVycm9yXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXJyb3JMYXJnZUljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5lcnJvcn0gLz4gU29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInByaW1hcnlUZXh0XCIgY3NzPXtzdHlsZXMucHJpbWFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci4gUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBmb3IgYXNzaXN0YW5jZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                ]
                            },
                            (0, _react2.jsx)(
                                "div",
                                {
                                    "data-supertokens": "headerTitle headerTinyTitle",
                                    css: [
                                        styles.headerTitle,
                                        styles.headerTinyTitle,
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : ";label:VerifyEmailLinkClickedTheme;",
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vdmVyaWZ5RW1haWxMaW5rQ2xpY2tlZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0c0RSIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L2VtYWlsVmVyaWZpY2F0aW9uL2VtYWlsVmVyaWZpY2F0aW9uU2NyZWVuL3ZlcmlmeUVtYWlsTGlua0NsaWNrZWQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiXG4vKiBDb3B5cmlnaHQgKGMpIDIwMjAsIFZSQUkgTGFicyBhbmQvb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiAqIFwiTGljZW5zZVwiKSBhcyBwdWJsaXNoZWQgYnkgdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLlxuICpcbiAqIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heVxuICogb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVRcbiAqIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZVxuICogTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lUHJvcHMsIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgU3Bpbm5lckljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9zcGlubmVySWNvblwiO1xuaW1wb3J0IHsgVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgRXJyb3JMYXJnZUljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9lcnJvckxhcmdlSWNvblwiO1xuaW1wb3J0IEFycm93UmlnaHRJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvYXJyb3dSaWdodEljb25cIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuLi8uLi8uLi8uLi9saWJyYXJ5XCI7XG5pbXBvcnQgQ2hlY2tlZFJvdW5kSWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NoZWNrZWRSb3VuZEljb25cIjtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWUgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFxuICAgIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVByb3BzLFxuICAgIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVN0YXRlXG4+IHtcbiAgICBzdGF0aWMgY29udGV4dFR5cGUgPSBTdHlsZUNvbnRleHQ7XG5cbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVQcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLkxPQURJTkdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvblN1Y2Nlc3MgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIHN0YXR1czogVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMuU1VDQ0VTU0ZVTFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWNjZXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TdWNjZXNzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wcm9wcy5jYWxsQVBJKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cblxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHsgcmVkaXJlY3RUb1ZlcmlmeUVtYWlsU2NyZWVuLCBvbkNvbnRpbnVlQ2xpY2tlZCB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5MT0FESU5HKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvd1wiIGNzcz17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJzcGlubmVyXCIgY3NzPXtzdHlsZXMuc3Bpbm5lcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNwaW5uZXJJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMucHJpbWFyeX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5TVUNDRVNTRlVMKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvdyBub0Zvcm1Sb3dcIiBjc3M9e1tzdHlsZXMucm93LCBzdHlsZXMubm9Gb3JtUm93XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tlZFJvdW5kSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnN1Y2Nlc3N9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbWFpbCB2ZXJpZmljYXRpb24gc3VjY2Vzc2Z1bCFcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyXCIgY3NzPXtzdHlsZXMuZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlzTG9hZGluZz17ZmFsc2V9IG9uQ2xpY2s9e29uQ29udGludWVDbGlja2VkfSB0eXBlPVwiYnV0dG9uXCIgbGFiZWw9e1wiQ09OVElOVUVcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5JTlZBTElEKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvdyBub0Zvcm1Sb3dcIiBjc3M9e1tzdHlsZXMucm93LCBzdHlsZXMubm9Gb3JtUm93XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZW1haWwgdmVyaWZpY2F0aW9uIGxpbmsgaGFzIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3JlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwic2Vjb25kYXJ5VGV4dCBzZWNvbmRhcnlMaW5rV2l0aEFycm93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuc2Vjb25kYXJ5VGV4dCwgc3R5bGVzLnNlY29uZGFyeUxpbmtXaXRoQXJyb3ddfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250aW51ZSA8QXJyb3dSaWdodEljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy50ZXh0UHJpbWFyeX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBlcnJvclwiIGNzcz17W3N0eWxlcy5oZWFkZXJUaXRsZSwgc3R5bGVzLmVycm9yXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXJyb3JMYXJnZUljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5lcnJvcn0gLz4gU29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInByaW1hcnlUZXh0XCIgY3NzPXtzdHlsZXMucHJpbWFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci4gUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBmb3IgYXNzaXN0YW5jZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                                    ]
                                },
                                "The email verification link has expired"
                            ),
                            (0, _react2.jsx)(
                                "div",
                                {
                                    onClick: redirectToVerifyEmailScreen,
                                    "data-supertokens": "secondaryText secondaryLinkWithArrow",
                                    css: [
                                        styles.secondaryText,
                                        styles.secondaryLinkWithArrow,
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : ";label:VerifyEmailLinkClickedTheme;",
                                        process.env.NODE_ENV === "production"
                                            ? ""
                                            : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vdmVyaWZ5RW1haWxMaW5rQ2xpY2tlZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUg0QiIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L2VtYWlsVmVyaWZpY2F0aW9uL2VtYWlsVmVyaWZpY2F0aW9uU2NyZWVuL3ZlcmlmeUVtYWlsTGlua0NsaWNrZWQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiXG4vKiBDb3B5cmlnaHQgKGMpIDIwMjAsIFZSQUkgTGFicyBhbmQvb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiAqIFwiTGljZW5zZVwiKSBhcyBwdWJsaXNoZWQgYnkgdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLlxuICpcbiAqIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heVxuICogb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVRcbiAqIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZVxuICogTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lUHJvcHMsIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgU3Bpbm5lckljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9zcGlubmVySWNvblwiO1xuaW1wb3J0IHsgVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgRXJyb3JMYXJnZUljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9lcnJvckxhcmdlSWNvblwiO1xuaW1wb3J0IEFycm93UmlnaHRJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvYXJyb3dSaWdodEljb25cIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuLi8uLi8uLi8uLi9saWJyYXJ5XCI7XG5pbXBvcnQgQ2hlY2tlZFJvdW5kSWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NoZWNrZWRSb3VuZEljb25cIjtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWUgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFxuICAgIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVByb3BzLFxuICAgIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVN0YXRlXG4+IHtcbiAgICBzdGF0aWMgY29udGV4dFR5cGUgPSBTdHlsZUNvbnRleHQ7XG5cbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVQcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLkxPQURJTkdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvblN1Y2Nlc3MgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIHN0YXR1czogVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMuU1VDQ0VTU0ZVTFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWNjZXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TdWNjZXNzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wcm9wcy5jYWxsQVBJKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cblxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHsgcmVkaXJlY3RUb1ZlcmlmeUVtYWlsU2NyZWVuLCBvbkNvbnRpbnVlQ2xpY2tlZCB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5MT0FESU5HKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvd1wiIGNzcz17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJzcGlubmVyXCIgY3NzPXtzdHlsZXMuc3Bpbm5lcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNwaW5uZXJJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMucHJpbWFyeX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5TVUNDRVNTRlVMKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvdyBub0Zvcm1Sb3dcIiBjc3M9e1tzdHlsZXMucm93LCBzdHlsZXMubm9Gb3JtUm93XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tlZFJvdW5kSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnN1Y2Nlc3N9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbWFpbCB2ZXJpZmljYXRpb24gc3VjY2Vzc2Z1bCFcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyXCIgY3NzPXtzdHlsZXMuZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlzTG9hZGluZz17ZmFsc2V9IG9uQ2xpY2s9e29uQ29udGludWVDbGlja2VkfSB0eXBlPVwiYnV0dG9uXCIgbGFiZWw9e1wiQ09OVElOVUVcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5JTlZBTElEKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvdyBub0Zvcm1Sb3dcIiBjc3M9e1tzdHlsZXMucm93LCBzdHlsZXMubm9Gb3JtUm93XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZW1haWwgdmVyaWZpY2F0aW9uIGxpbmsgaGFzIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3JlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwic2Vjb25kYXJ5VGV4dCBzZWNvbmRhcnlMaW5rV2l0aEFycm93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuc2Vjb25kYXJ5VGV4dCwgc3R5bGVzLnNlY29uZGFyeUxpbmtXaXRoQXJyb3ddfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250aW51ZSA8QXJyb3dSaWdodEljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy50ZXh0UHJpbWFyeX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBlcnJvclwiIGNzcz17W3N0eWxlcy5oZWFkZXJUaXRsZSwgc3R5bGVzLmVycm9yXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXJyb3JMYXJnZUljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5lcnJvcn0gLz4gU29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInByaW1hcnlUZXh0XCIgY3NzPXtzdHlsZXMucHJpbWFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci4gUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBmb3IgYXNzaXN0YW5jZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
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
                        "data-supertokens": "container",
                        css: styles.container
                    },
                    (0, _react2.jsx)(
                        "div",
                        {
                            "data-supertokens": "row noFormRow",
                            css: [
                                styles.row,
                                styles.noFormRow,
                                process.env.NODE_ENV === "production" ? "" : ";label:VerifyEmailLinkClickedTheme;",
                                process.env.NODE_ENV === "production"
                                    ? ""
                                    : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vdmVyaWZ5RW1haWxMaW5rQ2xpY2tlZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0hzRCIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L2VtYWlsVmVyaWZpY2F0aW9uL2VtYWlsVmVyaWZpY2F0aW9uU2NyZWVuL3ZlcmlmeUVtYWlsTGlua0NsaWNrZWQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiXG4vKiBDb3B5cmlnaHQgKGMpIDIwMjAsIFZSQUkgTGFicyBhbmQvb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiAqIFwiTGljZW5zZVwiKSBhcyBwdWJsaXNoZWQgYnkgdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLlxuICpcbiAqIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heVxuICogb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVRcbiAqIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZVxuICogTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lUHJvcHMsIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgU3Bpbm5lckljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9zcGlubmVySWNvblwiO1xuaW1wb3J0IHsgVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgRXJyb3JMYXJnZUljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9lcnJvckxhcmdlSWNvblwiO1xuaW1wb3J0IEFycm93UmlnaHRJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvYXJyb3dSaWdodEljb25cIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuLi8uLi8uLi8uLi9saWJyYXJ5XCI7XG5pbXBvcnQgQ2hlY2tlZFJvdW5kSWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NoZWNrZWRSb3VuZEljb25cIjtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWUgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFxuICAgIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVByb3BzLFxuICAgIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVN0YXRlXG4+IHtcbiAgICBzdGF0aWMgY29udGV4dFR5cGUgPSBTdHlsZUNvbnRleHQ7XG5cbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVQcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLkxPQURJTkdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvblN1Y2Nlc3MgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIHN0YXR1czogVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMuU1VDQ0VTU0ZVTFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWNjZXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TdWNjZXNzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wcm9wcy5jYWxsQVBJKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cblxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHsgcmVkaXJlY3RUb1ZlcmlmeUVtYWlsU2NyZWVuLCBvbkNvbnRpbnVlQ2xpY2tlZCB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5MT0FESU5HKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvd1wiIGNzcz17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJzcGlubmVyXCIgY3NzPXtzdHlsZXMuc3Bpbm5lcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNwaW5uZXJJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMucHJpbWFyeX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5TVUNDRVNTRlVMKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvdyBub0Zvcm1Sb3dcIiBjc3M9e1tzdHlsZXMucm93LCBzdHlsZXMubm9Gb3JtUm93XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tlZFJvdW5kSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnN1Y2Nlc3N9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbWFpbCB2ZXJpZmljYXRpb24gc3VjY2Vzc2Z1bCFcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyXCIgY3NzPXtzdHlsZXMuZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlzTG9hZGluZz17ZmFsc2V9IG9uQ2xpY2s9e29uQ29udGludWVDbGlja2VkfSB0eXBlPVwiYnV0dG9uXCIgbGFiZWw9e1wiQ09OVElOVUVcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5JTlZBTElEKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvdyBub0Zvcm1Sb3dcIiBjc3M9e1tzdHlsZXMucm93LCBzdHlsZXMubm9Gb3JtUm93XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZW1haWwgdmVyaWZpY2F0aW9uIGxpbmsgaGFzIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3JlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwic2Vjb25kYXJ5VGV4dCBzZWNvbmRhcnlMaW5rV2l0aEFycm93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuc2Vjb25kYXJ5VGV4dCwgc3R5bGVzLnNlY29uZGFyeUxpbmtXaXRoQXJyb3ddfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250aW51ZSA8QXJyb3dSaWdodEljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy50ZXh0UHJpbWFyeX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBlcnJvclwiIGNzcz17W3N0eWxlcy5oZWFkZXJUaXRsZSwgc3R5bGVzLmVycm9yXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXJyb3JMYXJnZUljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5lcnJvcn0gLz4gU29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInByaW1hcnlUZXh0XCIgY3NzPXtzdHlsZXMucHJpbWFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci4gUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBmb3IgYXNzaXN0YW5jZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
                            ]
                        },
                        (0, _react2.jsx)(
                            "div",
                            {
                                "data-supertokens": "headerTitle error",
                                css: [
                                    styles.headerTitle,
                                    styles.error,
                                    process.env.NODE_ENV === "production" ? "" : ";label:VerifyEmailLinkClickedTheme;",
                                    process.env.NODE_ENV === "production"
                                        ? ""
                                        : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvZW1haWxWZXJpZmljYXRpb24vZW1haWxWZXJpZmljYXRpb25TY3JlZW4vdmVyaWZ5RW1haWxMaW5rQ2xpY2tlZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0k4RCIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90cy9yZWNpcGUvZW1haWxwYXNzd29yZC9jb21wb25lbnRzL3RoZW1lcy9kZWZhdWx0L2VtYWlsVmVyaWZpY2F0aW9uL2VtYWlsVmVyaWZpY2F0aW9uU2NyZWVuL3ZlcmlmeUVtYWlsTGlua0NsaWNrZWQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiXG4vKiBDb3B5cmlnaHQgKGMpIDIwMjAsIFZSQUkgTGFicyBhbmQvb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiAqIFwiTGljZW5zZVwiKSBhcyBwdWJsaXNoZWQgYnkgdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLlxuICpcbiAqIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heVxuICogb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVRcbiAqIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZVxuICogTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgVmVyaWZ5RW1haWxMaW5rQ2xpY2tlZFRoZW1lUHJvcHMsIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgU3Bpbm5lckljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9zcGlubmVySWNvblwiO1xuaW1wb3J0IHsgVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgRXJyb3JMYXJnZUljb24gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9lcnJvckxhcmdlSWNvblwiO1xuaW1wb3J0IEFycm93UmlnaHRJY29uIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9hc3NldHMvYXJyb3dSaWdodEljb25cIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuLi8uLi8uLi8uLi9saWJyYXJ5XCI7XG5pbXBvcnQgQ2hlY2tlZFJvdW5kSWNvbiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NoZWNrZWRSb3VuZEljb25cIjtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWUgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFxuICAgIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVByb3BzLFxuICAgIFZlcmlmeUVtYWlsTGlua0NsaWNrZWRUaGVtZVN0YXRlXG4+IHtcbiAgICBzdGF0aWMgY29udGV4dFR5cGUgPSBTdHlsZUNvbnRleHQ7XG5cbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBWZXJpZnlFbWFpbExpbmtDbGlja2VkVGhlbWVQcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IFZFUklGWV9FTUFJTF9MSU5LX0NMSUNLRURfU1RBVFVTLkxPQURJTkdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvblN1Y2Nlc3MgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIHN0YXR1czogVkVSSUZZX0VNQUlMX0xJTktfQ0xJQ0tFRF9TVEFUVVMuU1VDQ0VTU0ZVTFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWNjZXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TdWNjZXNzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wcm9wcy5jYWxsQVBJKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cblxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHsgcmVkaXJlY3RUb1ZlcmlmeUVtYWlsU2NyZWVuLCBvbkNvbnRpbnVlQ2xpY2tlZCB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5MT0FESU5HKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvd1wiIGNzcz17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJzcGlubmVyXCIgY3NzPXtzdHlsZXMuc3Bpbm5lcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNwaW5uZXJJY29uIGNvbG9yPXtzdHlsZXMucGFsZXR0ZS5jb2xvcnMucHJpbWFyeX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5TVUNDRVNTRlVMKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvdyBub0Zvcm1Sb3dcIiBjc3M9e1tzdHlsZXMucm93LCBzdHlsZXMubm9Gb3JtUm93XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tlZFJvdW5kSWNvbiBjb2xvcj17c3R5bGVzLnBhbGV0dGUuY29sb3JzLnN1Y2Nlc3N9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbWFpbCB2ZXJpZmljYXRpb24gc3VjY2Vzc2Z1bCFcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyXCIgY3NzPXtzdHlsZXMuZW1haWxWZXJpZmljYXRpb25CdXR0b25XcmFwcGVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlzTG9hZGluZz17ZmFsc2V9IG9uQ2xpY2s9e29uQ29udGludWVDbGlja2VkfSB0eXBlPVwiYnV0dG9uXCIgbGFiZWw9e1wiQ09OVElOVUVcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSBWRVJJRllfRU1BSUxfTElOS19DTElDS0VEX1NUQVRVUy5JTlZBTElEKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cImNvbnRhaW5lclwiIGNzcz17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInJvdyBub0Zvcm1Sb3dcIiBjc3M9e1tzdHlsZXMucm93LCBzdHlsZXMubm9Gb3JtUm93XX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBoZWFkZXJUaW55VGl0bGVcIiBjc3M9e1tzdHlsZXMuaGVhZGVyVGl0bGUsIHN0eWxlcy5oZWFkZXJUaW55VGl0bGVdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZW1haWwgdmVyaWZpY2F0aW9uIGxpbmsgaGFzIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3JlZGlyZWN0VG9WZXJpZnlFbWFpbFNjcmVlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXN1cGVydG9rZW5zPVwic2Vjb25kYXJ5VGV4dCBzZWNvbmRhcnlMaW5rV2l0aEFycm93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZXMuc2Vjb25kYXJ5VGV4dCwgc3R5bGVzLnNlY29uZGFyeUxpbmtXaXRoQXJyb3ddfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250aW51ZSA8QXJyb3dSaWdodEljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy50ZXh0UHJpbWFyeX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiY29udGFpbmVyXCIgY3NzPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJyb3cgbm9Gb3JtUm93XCIgY3NzPXtbc3R5bGVzLnJvdywgc3R5bGVzLm5vRm9ybVJvd119PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJoZWFkZXJUaXRsZSBlcnJvclwiIGNzcz17W3N0eWxlcy5oZWFkZXJUaXRsZSwgc3R5bGVzLmVycm9yXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXJyb3JMYXJnZUljb24gY29sb3I9e3N0eWxlcy5wYWxldHRlLmNvbG9ycy5lcnJvcn0gLz4gU29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1zdXBlcnRva2Vucz1cInByaW1hcnlUZXh0XCIgY3NzPXtzdHlsZXMucHJpbWFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci4gUGxlYXNlIGNvbnRhY3Qgc3VwcG9ydCBmb3IgYXNzaXN0YW5jZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ== */"
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
                                "data-supertokens": "primaryText",
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
