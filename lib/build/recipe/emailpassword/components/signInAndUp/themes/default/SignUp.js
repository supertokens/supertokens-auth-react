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
exports["default"] = SignUpTheme;

var React = _interopRequireWildcard(require("react"));

var _styles = require("../../../../styles/styles");

var _constants = require("../../../../../../constants");

var _library = require("../../../library");

var _core = require("@emotion/core");

var _utils = require("../../../../../../utils");

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

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
    throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
}

function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
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

function _slicedToArray(arr, i) {
    return (
        _arrayWithHoles(arr) ||
        _iterableToArrayLimit(arr, i) ||
        _unsupportedIterableToArray(arr, i) ||
        _nonIterableRest()
    );
}

function _nonIterableRest() {
    throw new TypeError(
        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
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

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
}

function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally {
            if (_d) throw _e;
        }
    }
    return _arr;
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

/*
 * Styles.
 */
var styles = {
    headerTitle: {
        fontSize: _styles.palette.fonts.size[2],
        lineHeight: "40px",
        letterSpacing: "0.58px",
        fontWeight: 800,
        color: _styles.palette.colors.primary
    },
    headerSubTitle: {
        marginTop: "9px",
        marginBottom: "21px"
    }
};
/*
 * Component.
 */

function SignUpTheme(props) {
    /*
     * Props.
     */
    var callAPI = props.callAPI,
        privacyPolicyLink = props.privacyPolicyLink,
        termsAndConditionsLink = props.termsAndConditionsLink,
        onSuccess = props.onSuccess,
        signInClicked = props.signInClicked;
    var styleFromInit = props.styleFromInit || {};
    /*
     * States.
     */

    var emailPasswordOnly = props.formFields.length === 2;

    var _useState = (0, React.useState)(
            props.formFields.map(function(field) {
                return _objectSpread(
                    _objectSpread({}, field),
                    {},
                    {
                        ref: /*#__PURE__*/ (0, React.createRef)(),
                        validated: false,
                        showIsRequired: (function() {
                            // If email and password only, do not show required indicator (*).
                            if (emailPasswordOnly) {
                                return false;
                            } // Otherwise, show for all non optional fields (including email and password).

                            return field.optional === false;
                        })()
                    }
                );
            })
        ),
        _useState2 = _slicedToArray(_useState, 2),
        formFields = _useState2[0],
        setFormFields = _useState2[1];

    var _useState3 = (0, React.useState)(false),
        _useState4 = _slicedToArray(_useState3, 2),
        isLoading = _useState4[0],
        setIsLoading = _useState4[1];
    /*
     * Methods.
     */

    var onSignUp = /*#__PURE__*/ (function() {
        var _ref = _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                var fields, result, errorFields;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch ((_context.prev = _context.next)) {
                            case 0:
                                // Set isLoading to true.
                                setIsLoading(true); // Get the fields values from form.

                                fields = formFields.map(function(field) {
                                    return {
                                        id: field.id,
                                        value: field.ref.current !== null ? field.ref.current.value : ""
                                    };
                                }); // Call Sign Up API.

                                _context.next = 4;
                                return callAPI(fields);

                            case 4:
                                result = _context.sent;
                                // Set isLoading to false.
                                setIsLoading(false); // If successfully logged in.

                                if (result.status === _constants.API_RESPONSE_STATUS.OK) {
                                    // TODO: Show result in UI?
                                    // If onSuccess if exist, sleep for 2seconds and call it.
                                    if (onSuccess !== undefined) {
                                        setTimeout(function() {
                                            return onSuccess();
                                        }, 2000);
                                    }
                                } // If field error.

                                if (
                                    result.status === _constants.API_RESPONSE_STATUS.FIELD_ERROR &&
                                    result.fields !== undefined
                                ) {
                                    errorFields = result.fields; // Update formFields state with errors.

                                    setFormFields(
                                        formFields.map(function(field) {
                                            for (var i = 0; i < errorFields.length; i++) {
                                                if (field.id === errorFields[i].id) {
                                                    field.error = errorFields[i].error;
                                                }

                                                field.validated = true;
                                            }

                                            return field;
                                        })
                                    );
                                }

                            case 8:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee);
            })
        );

        return function onSignUp() {
            return _ref.apply(this, arguments);
        };
    })();

    var handleInputChange = (0, React.useCallback)(
        /*#__PURE__*/ (function() {
            var _ref2 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(field) {
                    var i;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch ((_context2.prev = _context2.next)) {
                                case 0:
                                    for (i = 0; i < formFields.length; i++) {
                                        if (field.id === formFields[i].id) {
                                            // remove error on input change.
                                            formFields[i].error = undefined;
                                            formFields[i].validated = false;
                                        }
                                    } // Slightly delay the error update to prevent UI glitches.

                                    setTimeout(function() {
                                        return setFormFields(_toConsumableArray(formFields));
                                    }, 300);

                                case 2:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2);
                })
            );

            return function(_x) {
                return _ref2.apply(this, arguments);
            };
        })(),
        [formFields, setFormFields]
    );
    /*
     * Event Handlers.
     */

    var onFormSubmit = function onFormSubmit(e) {
        e.preventDefault();
        onSignUp();
    };
    /*
     * Render.
     */

    return (0, _core.jsx)(
        "div",
        {
            css: [_styles.defaultStyles.container, styleFromInit.container]
        },
        (0, _core.jsx)(
            "div",
            {
                css: [_styles.defaultStyles.row, styleFromInit.row]
            },
            (0, _core.jsx)(
                "div",
                {
                    css: [styles.headerTitle, styleFromInit.headerTitle]
                },
                "Sign Up"
            ),
            (0, _core.jsx)(
                "div",
                {
                    css: [styles.headerSubTitle, styleFromInit.headerSubtitle]
                },
                (0, _core.jsx)(
                    "div",
                    {
                        css: [_styles.defaultStyles.secondaryText, styleFromInit.secondaryText]
                    },
                    "Already have an account?",
                    (0, _core.jsx)(
                        "span",
                        {
                            onClick: signInClicked,
                            css: [_styles.defaultStyles.link, styleFromInit.link]
                        },
                        "Sign In"
                    )
                )
            ),
            (0, _core.jsx)("div", {
                css: [_styles.defaultStyles.divider, styleFromInit.divider]
            }),
            (0, _core.jsx)(
                "form",
                {
                    autoComplete: "off",
                    noValidate: true,
                    onSubmit: onFormSubmit
                },
                formFields.map(function(field) {
                    var type = "text"; // If email or password, replace field type.

                    if (_constants.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id)) {
                        type = field.id;
                    }

                    return (0, _core.jsx)(
                        _library.FormRow,
                        {
                            style: {},
                            key: field.id
                        },
                        (0, _core.jsx)(
                            React.Fragment,
                            null,
                            (0, _core.jsx)(_library.Label, {
                                style: styleFromInit.label,
                                value: field.label,
                                showIsRequired: field.showIsRequired
                            }),
                            (0, _core.jsx)(_library.Input, {
                                style: styleFromInit.input,
                                errorStyle: styleFromInit.inputError,
                                type: type,
                                name: field.id,
                                placeholder: field.placeholder,
                                ref: field.ref,
                                onChange: handleInputChange,
                                hasError: field.error !== undefined,
                                validated: field.validated
                            }),
                            field.error &&
                                (0, _core.jsx)(_library.InputError, {
                                    style: styleFromInit.inputErrorMessage,
                                    error: field.error
                                })
                        )
                    );
                }),
                (0, _core.jsx)(
                    _library.FormRow,
                    {
                        style: styleFromInit.formRow,
                        key: "signin-button"
                    },
                    (0, _core.jsx)(_library.Button, {
                        style: styleFromInit.button,
                        disabled: isLoading,
                        isLoading: isLoading,
                        type: "submit",
                        label: "SIGN UP"
                    })
                ),
                (0, _core.jsx)(
                    "div",
                    {
                        css: [_styles.defaultStyles.secondaryText, styleFromInit.secondaryText]
                    },
                    "By signin up, you agree to our",
                    (0, _core.jsx)(
                        "span",
                        {
                            css: [_styles.defaultStyles.link, styleFromInit.link],
                            onClick: function onClick() {
                                return (0, _utils.openExternalLink)(termsAndConditionsLink);
                            }
                        },
                        "Terms of Service"
                    ),
                    "and",
                    (0, _core.jsx)(
                        "span",
                        {
                            css: [_styles.defaultStyles.link, styleFromInit.link],
                            onClick: function onClick() {
                                return (0, _utils.openExternalLink)(privacyPolicyLink);
                            }
                        },
                        "Privacy Policy"
                    )
                )
            )
        )
    );
}
