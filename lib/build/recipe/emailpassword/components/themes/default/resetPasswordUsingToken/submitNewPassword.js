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

var _library = require("../../../library");

var _formBase = _interopRequireDefault(require("../../../library/formBase"));

var _constants = require("../../../../constants");

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
                    status: _constants.SUBMIT_NEW_PASSWORD_STATUS.SUCCESS
                };
            });

            _this.props.onSuccess();
        };

        _this.state = {
            status: _constants.SUBMIT_NEW_PASSWORD_STATUS.READY
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
                var _this$props = this.props,
                    submitNewPasswordAPI = _this$props.submitNewPasswordAPI,
                    formFields = _this$props.formFields,
                    onSignInClicked = _this$props.onSignInClicked;
                var status = this.state.status;

                if (status === _constants.SUBMIT_NEW_PASSWORD_STATUS.SUCCESS) {
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
                                    "data-supertokens": "headerTitle",
                                    css: styles.headerTitle
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
                                            "data-supertokens": "primaryText submitNewPasswordSuccessMessage",
                                            css: [
                                                styles.primaryText,
                                                styles.submitNewPasswordSuccessMessage,
                                                process.env.NODE_ENV === "production"
                                                    ? ""
                                                    : ";label:SubmitNewPasswordTheme;",
                                                process.env.NODE_ENV === "production"
                                                    ? ""
                                                    : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvcmVzZXRQYXNzd29yZFVzaW5nVG9rZW4vc3VibWl0TmV3UGFzc3dvcmQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJFb0MiLCJmaWxlIjoiLi4vLi4vLi4vLi4vLi4vLi4vLi4vdHMvcmVjaXBlL2VtYWlscGFzc3dvcmQvY29tcG9uZW50cy90aGVtZXMvZGVmYXVsdC9yZXNldFBhc3N3b3JkVXNpbmdUb2tlbi9zdWJtaXROZXdQYXNzd29yZC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgKGMpIDIwMjEsIFZSQUkgTGFicyBhbmQvb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiAqIFwiTGljZW5zZVwiKSBhcyBwdWJsaXNoZWQgYnkgdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLlxuICpcbiAqIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heVxuICogb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVRcbiAqIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZVxuICogTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiAqIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qXG4gKiBJbXBvcnRzLlxuICovXG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCwgRnJhZ21lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdHlsZUNvbnRleHQgZnJvbSBcIi4uLy4uLy4uL3N0eWxlcy9zdHlsZUNvbnRleHRcIjtcblxuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IFN1Ym1pdE5ld1Bhc3N3b3JkVGhlbWVQcm9wcywgU3VibWl0TmV3UGFzc3dvcmRUaGVtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBGb3JtUm93LCBCdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vbGlicmFyeVwiO1xuaW1wb3J0IEZvcm1CYXNlIGZyb20gXCIuLi8uLi8uLi9saWJyYXJ5L2Zvcm1CYXNlXCI7XG5pbXBvcnQgeyBTVUJNSVRfTkVXX1BBU1NXT1JEX1NUQVRVUyB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb25zdGFudHNcIjtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWJtaXROZXdQYXNzd29yZFRoZW1lIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxcbiAgICBTdWJtaXROZXdQYXNzd29yZFRoZW1lUHJvcHMsXG4gICAgU3VibWl0TmV3UGFzc3dvcmRUaGVtZVN0YXRlXG4+IHtcbiAgICBzdGF0aWMgY29udGV4dFR5cGUgPSBTdHlsZUNvbnRleHQ7XG5cbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBTdWJtaXROZXdQYXNzd29yZFRoZW1lUHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc3RhdHVzOiBTVUJNSVRfTkVXX1BBU1NXT1JEX1NUQVRVUy5SRUFEWVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uU3VjY2VzcyA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoKSA9PiAoe1xuICAgICAgICAgICAgc3RhdHVzOiBTVUJNSVRfTkVXX1BBU1NXT1JEX1NUQVRVUy5TVUNDRVNTXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Y2Nlc3MoKTtcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBSZW5kZXIuXG4gICAgICovXG5cbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IHsgc3VibWl0TmV3UGFzc3dvcmRBUEksIGZvcm1GaWVsZHMsIG9uU2lnbkluQ2xpY2tlZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gU1VCTUlUX05FV19QQVNTV09SRF9TVEFUVVMuU1VDQ0VTUykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJjb250YWluZXJcIiBjc3M9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtc3VwZXJ0b2tlbnM9XCJyb3dcIiBjc3M9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiaGVhZGVyVGl0bGVcIiBjc3M9e3N0eWxlcy5oZWFkZXJUaXRsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU3VjY2VzcyFcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Sb3cga2V5PVwiZm9ybS1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJwcmltYXJ5VGV4dCBzdWJtaXROZXdQYXNzd29yZFN1Y2Nlc3NNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlcy5wcmltYXJ5VGV4dCwgc3R5bGVzLnN1Ym1pdE5ld1Bhc3N3b3JkU3VjY2Vzc01lc3NhZ2VdfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdXIgcGFzc3dvcmQgaGFzIGJlZW4gdXBkYXRlZCBzdWNjZXNzZnVsbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uU2lnbkluQ2xpY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXtcIlNJR04gSU5cIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0ZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtUm93PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZvcm1CYXNlXG4gICAgICAgICAgICAgICAgZm9ybUZpZWxkcz17Zm9ybUZpZWxkc31cbiAgICAgICAgICAgICAgICBidXR0b25MYWJlbD17XCJDaGFuZ2UgcGFzc3dvcmRcIn1cbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3M9e3RoaXMub25TdWNjZXNzfVxuICAgICAgICAgICAgICAgIHZhbGlkYXRlT25CbHVyPXt0cnVlfVxuICAgICAgICAgICAgICAgIGNhbGxBUEk9e3N1Ym1pdE5ld1Bhc3N3b3JkQVBJfVxuICAgICAgICAgICAgICAgIHNob3dMYWJlbHM9e3RydWV9XG4gICAgICAgICAgICAgICAgaGVhZGVyPXtcbiAgICAgICAgICAgICAgICAgICAgPEZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiaGVhZGVyVGl0bGVcIiBjc3M9e3N0eWxlcy5oZWFkZXJUaXRsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hhbmdlIHlvdXIgcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwiaGVhZGVyU3VidGl0bGVcIiBjc3M9e3N0eWxlcy5oZWFkZXJTdWJ0aXRsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXN1cGVydG9rZW5zPVwic2Vjb25kYXJ5VGV4dFwiIGNzcz17c3R5bGVzLnNlY29uZGFyeVRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbnRlciBhIG5ldyBwYXNzd29yZCBiZWxvdyB0byBjaGFuZ2UgeW91ciBwYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0= */"
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

                return (0, _react2.jsx)(_formBase["default"], {
                    formFields: formFields,
                    buttonLabel: "Change password",
                    onSuccess: this.onSuccess,
                    validateOnBlur: true,
                    callAPI: submitNewPasswordAPI,
                    showLabels: true,
                    header: (0, _react2.jsx)(
                        _react.Fragment,
                        null,
                        (0, _react2.jsx)(
                            "div",
                            {
                                "data-supertokens": "headerTitle",
                                css: styles.headerTitle
                            },
                            "Change your password"
                        ),
                        (0, _react2.jsx)(
                            "div",
                            {
                                "data-supertokens": "headerSubtitle",
                                css: styles.headerSubtitle
                            },
                            (0, _react2.jsx)(
                                "div",
                                {
                                    "data-supertokens": "secondaryText",
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
