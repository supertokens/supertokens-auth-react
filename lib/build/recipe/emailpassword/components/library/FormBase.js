"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styleContext = _interopRequireDefault(require("../styles/styleContext"));

var _ = require(".");

var _core = require("@emotion/core");

var _constants = require("../../constants");

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

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
    }
    return target;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
    throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
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
var FormBase = /*#__PURE__*/ (function(_PureComponent) {
    _inherits(FormBase, _PureComponent);

    var _super = _createSuper(FormBase);

    /*
     * Constructor.
     */
    function FormBase(props) {
        var _this;

        _classCallCheck(this, FormBase);

        _this = _super.call(this, props);

        _this.handleInputFocus = /*#__PURE__*/ (function() {
            var _ref = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee(field) {
                    var formFields, i, status;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch ((_context.prev = _context.next)) {
                                case 0:
                                    formFields = _this.state.formFields;

                                    for (i = 0; i < formFields.length; i++) {
                                        if (field.id === formFields[i].id) {
                                            // remove error on input change.
                                            formFields[i].error = undefined;
                                        }
                                    }

                                    status = _this.getNewStatus(formFields, "focus"); // Slightly delay the error update to prevent UI glitches.

                                    setTimeout(function() {
                                        return _this.setState(function() {
                                            return {
                                                status: status,
                                                formFields: _toConsumableArray(formFields)
                                            };
                                        });
                                    }, 300);

                                case 4:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee);
                })
            );

            return function(_x) {
                return _ref.apply(this, arguments);
            };
        })();

        _this.handleInputBlur = /*#__PURE__*/ (function() {
            var _ref2 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(field) {
                    var formFields, i, validateOnBlurOnly, status;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch ((_context2.prev = _context2.next)) {
                                case 0:
                                    formFields = _this.state.formFields;
                                    i = 0;

                                case 2:
                                    if (!(i < formFields.length)) {
                                        _context2.next = 15;
                                        break;
                                    }

                                    if (!(field.id === formFields[i].id)) {
                                        _context2.next = 12;
                                        break;
                                    }

                                    _context2.next = 6;
                                    return formFields[i].validate(field.value);

                                case 6:
                                    formFields[i].error = _context2.sent;
                                    validateOnBlurOnly = formFields[i].validateOnBlurOnly;

                                    if (!(formFields[i].error === undefined && validateOnBlurOnly !== undefined)) {
                                        _context2.next = 12;
                                        break;
                                    }

                                    _context2.next = 11;
                                    return validateOnBlurOnly(field.value);

                                case 11:
                                    formFields[i].error = _context2.sent;

                                case 12:
                                    i++;
                                    _context2.next = 2;
                                    break;

                                case 15:
                                    status = _this.getNewStatus(formFields, "blur"); // Slightly delay the update to prevent UI glitches.

                                    setTimeout(function() {
                                        return _this.setState(function(oldState) {
                                            // Do not update status asynchronously on blur if backend error already came in.
                                            if (oldState.status === "GENERAL_ERROR") {
                                                return oldState;
                                            }

                                            return {
                                                status: status,
                                                formFields: _toConsumableArray(formFields)
                                            };
                                        });
                                    }, 300);

                                case 17:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2);
                })
            );

            return function(_x2) {
                return _ref2.apply(this, arguments);
            };
        })();

        _this.onFormSubmit = /*#__PURE__*/ (function() {
            var _ref3 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(e) {
                    var fields, result, errorFields, formFields;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch ((_context3.prev = _context3.next)) {
                                case 0:
                                    // Prevent default event propagation.
                                    e.preventDefault(); // Set loading state.

                                    _this.setState(function(oldState) {
                                        return _objectSpread(
                                            _objectSpread({}, oldState),
                                            {},
                                            {
                                                status: "LOADING"
                                            }
                                        );
                                    }); // Get the fields values from form.

                                    fields = _this.state.formFields.map(function(field) {
                                        return {
                                            id: field.id,
                                            value: field.ref.current !== null ? field.ref.current.value : ""
                                        };
                                    }); // Call API.

                                    _context3.next = 5;
                                    return _this.props.callAPI(fields);

                                case 5:
                                    result = _context3.sent;

                                    if (!(result.status === _constants.API_RESPONSE_STATUS.OK)) {
                                        _context3.next = 10;
                                        break;
                                    }

                                    if (_this.props.onSuccess !== undefined) {
                                        _this.props.onSuccess();
                                    } // Set Success state.

                                    _this.setState(function(oldState) {
                                        return _objectSpread(
                                            _objectSpread({}, oldState),
                                            {},
                                            {
                                                status: "SUCCESS"
                                            }
                                        );
                                    });

                                    return _context3.abrupt("return");

                                case 10:
                                    if (!(result.status === _constants.API_RESPONSE_STATUS.FIELD_ERROR)) {
                                        _context3.next = 15;
                                        break;
                                    }

                                    errorFields = result.formFields; // Update formFields state with errors.

                                    formFields = _this.state.formFields.map(function(field) {
                                        for (var i = 0; i < errorFields.length; i++) {
                                            if (field.id === errorFields[i].id) {
                                                field.error = errorFields[i].error;
                                            }
                                        }

                                        return field;
                                    });

                                    _this.setState(function() {
                                        return {
                                            status: "FIELD_ERRORS",
                                            formFields: formFields
                                        };
                                    });

                                    return _context3.abrupt("return");

                                case 15:
                                    // Otherwise if message, set generalError
                                    if (
                                        result.status === _constants.API_RESPONSE_STATUS.GENERAL_ERROR ||
                                        result.status === _constants.API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR
                                    ) {
                                        _this.setState(function(oldState) {
                                            return _objectSpread(
                                                _objectSpread({}, oldState),
                                                {},
                                                {
                                                    status: "GENERAL_ERROR",
                                                    generalError: result.message
                                                }
                                            );
                                        });
                                    }

                                case 16:
                                case "end":
                                    return _context3.stop();
                            }
                        }
                    }, _callee3);
                })
            );

            return function(_x3) {
                return _ref3.apply(this, arguments);
            };
        })();

        _this.state = {
            formFields: props.formFields,
            status: "IN_PROGRESS"
        };
        return _this;
    }
    /*
     * Methods.
     */

    _createClass(FormBase, [
        {
            key: "getNewStatus",
            value: function getNewStatus(formFields, type) {
                var newStatus = "READY";
                var isNotLastRequiredFieldEmpty = false;

                for (var i in formFields) {
                    var field = formFields[i];

                    if (field.error !== undefined) {
                        newStatus = "FIELD_ERRORS";
                        break;
                    }

                    if (field.optional === false) {
                        var value = field.ref.current !== null ? field.ref.current.value : "";

                        if (value.length === 0) {
                            if (type === "blur") {
                                newStatus = "IN_PROGRESS";
                            } else {
                                /*
                                 * In case of input focus event type,
                                 * Leave the benefice of the doubt if last empty field to re-enable Submit button even if input is still focused.
                                 */
                                if (isNotLastRequiredFieldEmpty === false) {
                                    // On empty value, do not update status ot in progress if it is the only empty field on focus.
                                    isNotLastRequiredFieldEmpty = true;
                                } else {
                                    // If is not last required field empty, then set status to in progress.
                                    newStatus = "IN_PROGRESS";
                                }
                            }
                        }
                    }
                }

                return newStatus;
            }
        },
        {
            key: "render",

            /*
             * Render.
             */
            value: function render() {
                var _this2 = this;

                var styles = this.context;
                var _this$props = this.props,
                    header = _this$props.header,
                    footer = _this$props.footer,
                    buttonLabel = _this$props.buttonLabel,
                    showLabels = _this$props.showLabels,
                    noValidateOnBlur = _this$props.noValidateOnBlur;
                var formFields = this.state.formFields;
                var onInputBlur = noValidateOnBlur === true ? undefined : this.handleInputBlur;
                return (0, _core.jsx)(
                    "div",
                    {
                        className: "container",
                        css: styles.container
                    },
                    (0, _core.jsx)(
                        "div",
                        {
                            className: "row",
                            css: styles.row
                        },
                        header,
                        this.state.status === "GENERAL_ERROR" &&
                            (0, _core.jsx)(
                                "div",
                                {
                                    className: "generalError",
                                    css: styles.generalError
                                },
                                this.state.generalError
                            ),
                        (0, _core.jsx)(
                            "form",
                            {
                                autoComplete: "on",
                                noValidate: true,
                                onSubmit: this.onFormSubmit
                            },
                            formFields.map(function(field) {
                                var type = "text"; // If email or password, replace field type.

                                if (_constants.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id)) {
                                    type = field.id;
                                }

                                if (field.id === "confirm-password") {
                                    type = "password";
                                }

                                return (0, _core.jsx)(
                                    _.FormRow,
                                    {
                                        key: field.id,
                                        hasError: field.error !== undefined
                                    },
                                    (0, _core.jsx)(
                                        _react.Fragment,
                                        null,
                                        showLabels &&
                                            (0, _core.jsx)(_.Label, {
                                                value: field.label,
                                                showIsRequired: field.showIsRequired
                                            }),
                                        (0, _core.jsx)(_.Input, {
                                            type: type,
                                            name: field.id,
                                            placeholder: field.placeholder,
                                            ref: field.ref,
                                            autoComplete: field.autoComplete,
                                            onInputFocus: _this2.handleInputFocus,
                                            onInputBlur: onInputBlur,
                                            hasError: field.error !== undefined
                                        }),
                                        field.error &&
                                            (0, _core.jsx)(_.InputError, {
                                                error: field.error
                                            })
                                    )
                                );
                            }),
                            (0, _core.jsx)(
                                _.FormRow,
                                {
                                    key: "form-button"
                                },
                                (0, _core.jsx)(
                                    _react.Fragment,
                                    null,
                                    (0, _core.jsx)(_.Button, {
                                        disabled: ["READY", "GENERAL_ERROR"].includes(this.state.status) !== true,
                                        isLoading: this.state.status === "LOADING",
                                        type: "submit",
                                        label: buttonLabel
                                    }),
                                    footer
                                )
                            )
                        )
                    )
                );
            }
        }
    ]);

    return FormBase;
})(_react.PureComponent);

exports["default"] = FormBase;
FormBase.contextType = _styleContext["default"];
