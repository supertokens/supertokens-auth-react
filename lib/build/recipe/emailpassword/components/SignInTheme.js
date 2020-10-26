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
exports["default"] = SignInTheme;

var React = _interopRequireWildcard(require("react"));

var _styles = require("../../../styles/styles");

var _core = require("@emotion/core");

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
 * Component.
 */
function SignInTheme(props) {
    /*
     * Props.
     */
    var callAPI = props.callAPI;
    /*
     * State.
     */

    var _useState = (0, React.useState)(
            props.formFields.map(function(field) {
                return _objectSpread(
                    _objectSpread({}, field),
                    {},
                    {
                        ref: (0, React.useRef)(null)
                    }
                );
            })
        ),
        _useState2 = _slicedToArray(_useState, 2),
        formFields = _useState2[0],
        setFormFields = _useState2[1];
    /*
     * Callbacks.
     */

    var onSignIn = (0, React.useCallback)(
        /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                var fields, res;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch ((_context.prev = _context.next)) {
                            case 0:
                                fields = formFields.map(function(field) {
                                    return {
                                        id: field.id,
                                        value: field.ref.current !== null ? field.ref.current.value : ""
                                    };
                                });
                                _context.next = 3;
                                return callAPI(fields);

                            case 3:
                                res = _context.sent;

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee);
            })
        ),
        [formFields, props.callAPI, setFormFields]
    );
    /*
     * Event Handlers.
     */

    var onFormSubmit = function onFormSubmit(e) {
        e.preventDefault();
        onSignIn();
    };
    /*
     * Render.
     */

    return (0, _core.jsx)(
        "div",
        {
            css: _styles.defaultStyles.container
        },
        (0, _core.jsx)(
            "div",
            {
                css: _styles.defaultStyles.row
            },
            (0, _core.jsx)(
                "div",
                {
                    css: styles.header
                },
                (0, _core.jsx)(
                    "div",
                    {
                        css: styles.headerTitle
                    },
                    "Sign In"
                ),
                (0, _core.jsx)(
                    "div",
                    {
                        css: styles.headerSubtitle
                    },
                    (0, _core.jsx)("div", null, "Not registered yet?"),
                    (0, _core.jsx)(
                        "a",
                        {
                            onClick: props.signUpClicked,
                            css: styles.signUpLink
                        },
                        "Sign up"
                    )
                )
            ),
            (0, _core.jsx)("div", {
                css: _styles.defaultStyles.divider
            }),
            (0, _core.jsx)(
                "form",
                {
                    onSubmit: onFormSubmit
                },
                formFields.map(function(field) {
                    return (0, _core.jsx)(
                        "div",
                        {
                            key: field.id
                        },
                        (0, _core.jsx)("label", null, field.label),
                        (0, _core.jsx)("input", {
                            type: field.id !== "password" ? "text" : "password",
                            name: field.id,
                            placeholder: field.placeholder,
                            ref: field.ref
                        })
                    );
                }),
                (0, _core.jsx)(
                    "button",
                    {
                        type: "submit"
                    },
                    " Sign In "
                ),
                (0, _core.jsx)("div", null, "Forgot password?")
            )
        )
    );
}
/*
 * Styles.
 */

var styles = {
    header: {
        height: "141px"
    },
    headerTitle: {
        paddingTop: "49px",
        fontSize: _styles.palette.fonts.size[1],
        lineHeight: "40px",
        letterSpacing: "0.28px",
        fontWeight: 700,
        fontFamily: _styles.palette.fonts.primary,
        color: _styles.palette.colors.primary
    },
    headerSubtitle: {
        fontSize: _styles.palette.fonts.size[0],
        fontWeight: 400,
        color: _styles.palette.colors.secondary,
        fontFamily: _styles.palette.fonts.primary
    },
    signUpLink: {
        color: "blue"
    }
};
