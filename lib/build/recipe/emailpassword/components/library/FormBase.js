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

var _styleContext = _interopRequireDefault(require("../styles/styleContext"));

var _ = require(".");

var _react2 = require("@emotion/react");

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
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch ((_context.prev = _context.next)) {
                                case 0:
                                    _this.setState(function(oldState) {
                                        return _this.getNewState(oldState.formFields, field, "focus", undefined);
                                    });

                                case 1:
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
                    var formFields, error, i;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch ((_context2.prev = _context2.next)) {
                                case 0:
                                    formFields = _this.state.formFields;
                                    error = undefined;
                                    i = 0;

                                case 3:
                                    if (!(i < formFields.length)) {
                                        _context2.next = 13;
                                        break;
                                    }

                                    if (!(field.id === formFields[i].id)) {
                                        _context2.next = 10;
                                        break;
                                    }

                                    if (!(field.value !== "")) {
                                        _context2.next = 9;
                                        break;
                                    }

                                    _context2.next = 8;
                                    return formFields[i].validate(field.value);

                                case 8:
                                    error = _context2.sent;

                                case 9:
                                    return _context2.abrupt("break", 13);

                                case 10:
                                    i++;
                                    _context2.next = 3;
                                    break;

                                case 13:
                                    _this.setState(function(oldState) {
                                        // Do not update status asynchronously on blur if backend error already came in.
                                        if (oldState.status === _constants.FORM_BASE_STATUS.GENERAL_ERROR) {
                                            return oldState;
                                        }

                                        return _this.getNewState(oldState.formFields, field, "blur", error);
                                    });

                                case 14:
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
                                                status: _constants.FORM_BASE_STATUS.LOADING
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
                                                status: _constants.FORM_BASE_STATUS.SUCCESS
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
                                            status: _constants.FORM_BASE_STATUS.FIELD_ERRORS,
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
                                                    status: _constants.FORM_BASE_STATUS.GENERAL_ERROR,
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
            formFields: props.formFields.map(function(field) {
                return _objectSpread(
                    _objectSpread({}, field),
                    {},
                    {
                        validated: false,
                        ref: /*#__PURE__*/ (0, _react.createRef)()
                    }
                );
            }),
            status: _constants.FORM_BASE_STATUS.IN_PROGRESS
        };
        return _this;
    }
    /*
     * Methods.
     */

    _createClass(FormBase, [
        {
            key: "getNewState",
            value: function getNewState(formFields, field, event, error) {
                // Add error to formFields array for corresponding field.
                formFields = formFields.map(function(formField) {
                    if (formField.id !== field.id) {
                        return formField;
                    }

                    return _objectSpread(
                        _objectSpread({}, formField),
                        {},
                        {
                            validated: event === "blur" && error === undefined && field.value.length !== 0,
                            error: error
                        }
                    );
                });
                var status = _constants.FORM_BASE_STATUS.READY;

                for (var i in formFields) {
                    var _field = formFields[i];

                    if (_field.error !== undefined) {
                        status = _constants.FORM_BASE_STATUS.FIELD_ERRORS;
                        break;
                    }

                    if (_field.optional === false) {
                        var value = _field.ref.current !== null ? _field.ref.current.value : "";

                        if (value.length === 0) {
                            var isFocused = _field.ref.current !== null ? _field.ref.current.isFocused : false;

                            if (isFocused !== true) {
                                status = _constants.FORM_BASE_STATUS.IN_PROGRESS;
                            }
                        }
                    }
                }

                return {
                    status: status,
                    formFields: formFields
                };
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
                    validateOnBlur = _this$props.validateOnBlur;
                var formFields = this.state.formFields;
                var onInputBlur = validateOnBlur === true ? this.handleInputBlur : undefined;
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
                        header,
                        this.state.status === _constants.FORM_BASE_STATUS.GENERAL_ERROR &&
                            (0, _react2.jsx)(
                                "div",
                                {
                                    className: "generalError",
                                    css: styles.generalError
                                },
                                this.state.generalError
                            ),
                        (0, _react2.jsx)(
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

                                return (0, _react2.jsx)(
                                    _.FormRow,
                                    {
                                        key: field.id,
                                        hasError: field.error !== undefined
                                    },
                                    (0, _react2.jsx)(
                                        _react.Fragment,
                                        null,
                                        showLabels &&
                                            (0, _react2.jsx)(_.Label, {
                                                value: field.label,
                                                showIsRequired: field.showIsRequired
                                            }),
                                        (0, _react2.jsx)(_.Input, {
                                            type: type,
                                            name: field.id,
                                            validated: field.validated,
                                            placeholder: field.placeholder,
                                            ref: field.ref,
                                            autoComplete: field.autoComplete,
                                            onInputFocus: _this2.handleInputFocus,
                                            onInputBlur: onInputBlur,
                                            hasError: field.error !== undefined
                                        }),
                                        field.error &&
                                            (0, _react2.jsx)(_.InputError, {
                                                error: field.error
                                            })
                                    )
                                );
                            }),
                            (0, _react2.jsx)(
                                _.FormRow,
                                {
                                    key: "form-button"
                                },
                                (0, _react2.jsx)(
                                    _react.Fragment,
                                    null,
                                    (0, _react2.jsx)(_.Button, {
                                        disabled: this.state.status === _constants.FORM_BASE_STATUS.LOADING,
                                        isLoading: this.state.status === _constants.FORM_BASE_STATUS.LOADING,
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
