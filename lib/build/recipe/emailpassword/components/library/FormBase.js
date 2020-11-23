"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _ = require(".");

var _core = require("@emotion/core");

var _constants = require("../../constants");

var _styleContext = require("../styles/styleContext");

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

        _this.handleInputChange = /*#__PURE__*/ (function() {
            var _ref = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee(field) {
                    var formFields, i;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch ((_context.prev = _context.next)) {
                                case 0:
                                    formFields = _this.state.formFields;

                                    for (i = 0; i < formFields.length; i++) {
                                        if (field.id === formFields[i].id) {
                                            // remove error on input change.
                                            formFields[i].error = undefined;
                                            formFields[i].validated = false;
                                        }
                                    } // Slightly delay the error update to prevent UI glitches.

                                    setTimeout(function() {
                                        return _this.setState(function(oldState) {
                                            return _objectSpread(
                                                _objectSpread({}, oldState),
                                                {},
                                                {
                                                    formFields: _toConsumableArray(formFields)
                                                }
                                            );
                                        });
                                    }, 300);

                                case 3:
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

        _this.onFormSubmit = /*#__PURE__*/ (function() {
            var _ref2 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(e) {
                    var fields, result, errorFields, formFields;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch ((_context2.prev = _context2.next)) {
                                case 0:
                                    // Prevent default event propagation.
                                    e.preventDefault(); // Set isLoading to true.

                                    _this.setState(function(oldState) {
                                        return _objectSpread(
                                            _objectSpread({}, oldState),
                                            {},
                                            {
                                                generalError: undefined,
                                                isLoading: true
                                            }
                                        );
                                    }); // Get the fields values from form.

                                    fields = _this.state.formFields.map(function(field) {
                                        return {
                                            id: field.id,
                                            value: field.ref.current !== null ? field.ref.current.value : ""
                                        };
                                    }); // Call Sign In API.

                                    _context2.next = 5;
                                    return _this.props.callAPI(fields);

                                case 5:
                                    result = _context2.sent;

                                    // Set isLoading to false.
                                    _this.setState(function(oldState) {
                                        return _objectSpread(
                                            _objectSpread({}, oldState),
                                            {},
                                            {
                                                isLoading: false
                                            }
                                        );
                                    }); // If successfully logged in.

                                    if (!(result.status === _constants.API_RESPONSE_STATUS.OK)) {
                                        _context2.next = 10;
                                        break;
                                    }

                                    if (_this.props.onSuccess !== undefined) {
                                        _this.props.onSuccess();
                                    }

                                    return _context2.abrupt("return");

                                case 10:
                                    if (!(result.status === _constants.API_RESPONSE_STATUS.FIELD_ERROR)) {
                                        _context2.next = 15;
                                        break;
                                    }

                                    errorFields = result.formFields; // Update formFields state with errors.

                                    formFields = _this.state.formFields.map(function(field) {
                                        for (var i = 0; i < errorFields.length; i++) {
                                            if (field.id === errorFields[i].id) {
                                                field.error = errorFields[i].error;
                                            } // Indicate to inputs that the value was submitted for validation, adding the input adornment icon
                                            // Skip empty optional fields.

                                            if (
                                                field.ref.current !== null &&
                                                field.ref.current.value.length !== 0 &&
                                                field.error === undefined
                                            ) {
                                                field.validated = true;
                                            } else if (field.error !== undefined) {
                                                field.validated = true;
                                            }
                                        }

                                        return field;
                                    });

                                    _this.setState(function(oldState) {
                                        return _objectSpread(
                                            _objectSpread({}, oldState),
                                            {},
                                            {
                                                formFields: formFields
                                            }
                                        );
                                    });

                                    return _context2.abrupt("return");

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
                                                    generalError: result.message
                                                }
                                            );
                                        });
                                    }

                                case 16:
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

        _this.state = {
            formFields: props.formFields,
            generalError: undefined,
            isLoading: false
        };
        return _this;
    }
    /*
     * Methods.
     */

    _createClass(FormBase, [
        {
            key: "render",

            /*
             * Render.
             */
            value: function render() {
                var _this2 = this;

                var _this$props = this.props,
                    header = _this$props.header,
                    footer = _this$props.footer,
                    buttonLabel = _this$props.buttonLabel,
                    showLabels = _this$props.showLabels;
                var _this$state = this.state,
                    generalError = _this$state.generalError,
                    formFields = _this$state.formFields,
                    isLoading = _this$state.isLoading;
                return (0, _core.jsx)(_styleContext.StyleConsumer, null, function(styles) {
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
                            generalError &&
                                (0, _core.jsx)(
                                    "div",
                                    {
                                        className: "generalError",
                                        css: styles.generalError
                                    },
                                    generalError
                                ),
                            (0, _core.jsx)(
                                "form",
                                {
                                    autoComplete: "on",
                                    noValidate: true,
                                    onSubmit: _this2.onFormSubmit
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
                                            key: field.id
                                        },
                                        (0, _core.jsx)(
                                            React.Fragment,
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
                                                onChange: _this2.handleInputChange,
                                                hasError: field.error !== undefined,
                                                validated: field.validated
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
                                        React.Fragment,
                                        null,
                                        (0, _core.jsx)(_.Button, {
                                            disabled: isLoading,
                                            isLoading: isLoading,
                                            type: "submit",
                                            label: buttonLabel
                                        }),
                                        footer
                                    )
                                )
                            )
                        )
                    );
                });
            }
        }
    ]);

    return FormBase;
})(React.PureComponent);

exports["default"] = FormBase;
