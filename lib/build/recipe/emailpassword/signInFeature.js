"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _utils = require("../../utils");

var _constants = require("../../constants");

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

/*
 * Class.
 */
var SignInFeature = /*#__PURE__*/ (function() {
    /*
     * Instance attributes.
     */

    /*
     * Constructor.
     */
    function SignInFeature(defaultFormFields, config) {
        var _this = this;

        _classCallCheck(this, SignInFeature);

        this.getFormFields = function() {
            return _this.formFields;
        };

        this.getStyle = function() {
            return _this.style;
        };

        this.getResetPasswordURL = function() {
            return _this.resetPasswordURL;
        };

        var userFormFields = [];

        if (config !== undefined) {
            this.style = config.style || {};
            this.resetPasswordURL = config.resetPasswordURL;

            if (config.formFields) {
                userFormFields = config.formFields.reduce(function(acc, field) {
                    // Filter on email and password only.
                    if (!_constants.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id)) {
                        return acc;
                    }

                    return [].concat(_toConsumableArray(acc), [
                        _objectSpread(
                            _objectSpread({}, field),
                            {},
                            {
                                optional: false // Sign In fields are never optional.
                            }
                        )
                    ]);
                }, []);
            }
        }

        this.formFields = (0, _utils.mergeFormFields)(defaultFormFields, userFormFields);
    }
    /*
     * Instance methods.
     */

    _createClass(SignInFeature, [
        {
            key: "validate",
            value: (function() {
                var _validate = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(input) {
                        return regeneratorRuntime.wrap(
                            function _callee$(_context) {
                                while (1) {
                                    switch ((_context.prev = _context.next)) {
                                        case 0:
                                            return _context.abrupt(
                                                "return",
                                                (0, _utils.validateFormOrThrow)(input, this.formFields)
                                            );

                                        case 1:
                                        case "end":
                                            return _context.stop();
                                    }
                                }
                            },
                            _callee,
                            this
                        );
                    })
                );

                function validate(_x) {
                    return _validate.apply(this, arguments);
                }

                return validate;
            })()
        }
    ]);

    return SignInFeature;
})();

exports["default"] = SignInFeature;
