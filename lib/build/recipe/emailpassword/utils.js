"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultEmailValidator = defaultEmailValidator;
exports.defaultPasswordValidator = defaultPasswordValidator;
exports.defaultLoginPasswordValidator = defaultLoginPasswordValidator;
exports.normaliseEmailPasswordConfig = normaliseEmailPasswordConfig;
exports.normaliseSignInAndUpFeature = normaliseSignInAndUpFeature;
exports.normaliseSignUpFormFeatureConfig = normaliseSignUpFormFeatureConfig;
exports.normaliseSignInFormFeatureConfig = normaliseSignInFormFeatureConfig;
exports.getDefaultFormFields = getDefaultFormFields;
exports.normaliseResetPasswordUsingTokenFeature = normaliseResetPasswordUsingTokenFeature;
exports.mergeFormFields = mergeFormFields;
exports.capitalize = capitalize;
exports.defaultValidate = defaultValidate;

var _normalisedURLPath = _interopRequireDefault(require("../../normalisedURLPath"));

var _constants = require("./constants");

var _styles = require("./styles/styles");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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

/*
 * defaultEmailValidator.
 */
function defaultEmailValidator(_x) {
    return _defaultEmailValidator.apply(this, arguments);
}
/*
 * defaultPasswordValidator.
 * min 8 characters.
 * Contains lowercase, uppercase, and numbers.
 */

function _defaultEmailValidator() {
    _defaultEmailValidator = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(value) {
            var defaultEmailValidatorRegexp;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            // eslint-disable-next-line no-useless-escape
                            defaultEmailValidatorRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // We check if the email syntax is correct
                            // As per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
                            // Regex from https://stackoverflow.com/a/46181/3867175

                            if (!(value.match(defaultEmailValidatorRegexp) === null)) {
                                _context.next = 3;
                                break;
                            }

                            return _context.abrupt("return", "Email is invalid");

                        case 3:
                            return _context.abrupt("return", undefined);

                        case 4:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );
    return _defaultEmailValidator.apply(this, arguments);
}

function defaultPasswordValidator(_x2) {
    return _defaultPasswordValidator.apply(this, arguments);
}
/*
 * defaultLoginPasswordValidator.
 * min 1 characters.
 */

function _defaultPasswordValidator() {
    _defaultPasswordValidator = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(value) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch ((_context2.prev = _context2.next)) {
                        case 0:
                            if (!(value.length < 8)) {
                                _context2.next = 2;
                                break;
                            }

                            return _context2.abrupt(
                                "return",
                                "Password must contain at least 8 characters, including a number"
                            );

                        case 2:
                            if (!(value.length >= 100)) {
                                _context2.next = 4;
                                break;
                            }

                            return _context2.abrupt("return", "Password's length must be lesser than 100 characters");

                        case 4:
                            if (!(value.match(/^.*[A-Za-z]+.*$/) === null)) {
                                _context2.next = 6;
                                break;
                            }

                            return _context2.abrupt("return", "Password must contain at least one alphabet");

                        case 6:
                            if (!(value.match(/^.*[0-9]+.*$/) === null)) {
                                _context2.next = 8;
                                break;
                            }

                            return _context2.abrupt("return", "Password must contain at least one number");

                        case 8:
                            return _context2.abrupt("return", undefined);

                        case 9:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2);
        })
    );
    return _defaultPasswordValidator.apply(this, arguments);
}

function defaultLoginPasswordValidator(_x3) {
    return _defaultLoginPasswordValidator.apply(this, arguments);
}

function _defaultLoginPasswordValidator() {
    _defaultLoginPasswordValidator = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(value) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch ((_context3.prev = _context3.next)) {
                        case 0:
                            if (!(value.length === 0)) {
                                _context3.next = 2;
                                break;
                            }

                            return _context3.abrupt("return", "Password must not be empty");

                        case 2:
                            return _context3.abrupt("return", undefined);

                        case 3:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3);
        })
    );
    return _defaultLoginPasswordValidator.apply(this, arguments);
}

function normaliseEmailPasswordConfig(config) {
    var signInAndUpFeature = normaliseSignInAndUpFeature(config.appInfo, config.signInAndUpFeature);
    var resetPasswordUsingTokenFeature = normaliseResetPasswordUsingTokenFeature(config.resetPasswordUsingTokenFeature);
    var palette = _styles.defaultPalette;

    if (config.palette !== undefined) {
        if (config.palette.colors !== undefined) {
            palette.colors = _objectSpread(_objectSpread({}, _styles.defaultPalette.colors), config.palette.colors);
        }
    }

    var useShadowDom = config.useShadowDom !== undefined ? config.useShadowDom === true : true;
    return {
        palette: palette,
        useShadowDom: useShadowDom,
        signInAndUpFeature: signInAndUpFeature,
        resetPasswordUsingTokenFeature: resetPasswordUsingTokenFeature
    };
}

function normaliseSignInAndUpFeature(appInfo, config) {
    if (config === undefined) {
        config = {};
    }

    var disableDefaultImplementation = config.disableDefaultImplementation === true;
    var onSuccessRedirectURL =
        config.onSuccessRedirectURL !== undefined
            ? new _normalisedURLPath["default"](config.onSuccessRedirectURL)
            : new _normalisedURLPath["default"]("/");
    var signUpForm = normaliseSignUpFormFeatureConfig(config.signUpForm);
    /*
     * Default Sign In corresponds to computed Sign Up fields filtered by email and password only.
     * i.e. If the user overrides sign Up fields, that is propagated to default sign In fields.
     * Exception made of the password validator which only verifies that the value is not empty for login.
     */

    var defaultSignInFields = signUpForm.formFields.reduce(function(signInFieldsAccumulator, field) {
        if (field.id === _constants.MANDATORY_FORM_FIELDS_ID.EMAIL) {
            return [].concat(_toConsumableArray(signInFieldsAccumulator), [field]);
        }

        if (field.id === _constants.MANDATORY_FORM_FIELDS_ID.PASSWORD) {
            return [].concat(_toConsumableArray(signInFieldsAccumulator), [
                _objectSpread(
                    _objectSpread({}, field),
                    {},
                    {
                        validate: defaultLoginPasswordValidator
                    }
                )
            ]);
        }

        return signInFieldsAccumulator;
    }, []);
    var signInForm = normaliseSignInFormFeatureConfig(appInfo, defaultSignInFields, config.signInForm);
    return {
        onSuccessRedirectURL: onSuccessRedirectURL,
        disableDefaultImplementation: disableDefaultImplementation,
        signUpForm: signUpForm,
        signInForm: signInForm
    };
}

function normaliseSignUpFormFeatureConfig(config) {
    if (config === undefined) {
        config = {};
    }

    var defaultFormFields = getDefaultFormFields();
    var userFormFields = [];

    if (config.formFields !== undefined) {
        userFormFields = config.formFields;
    }

    var formFields = mergeFormFields(defaultFormFields, userFormFields);
    var privacyPolicyLink = config.privacyPolicyLink;
    var termsAndConditionsLink = config.termsAndConditionsLink;
    var style = config.style || {};
    return {
        style: style,
        formFields: formFields,
        privacyPolicyLink: privacyPolicyLink,
        termsAndConditionsLink: termsAndConditionsLink
    };
}

function normaliseSignInFormFeatureConfig(appInfo, defaultFormFields, config) {
    if (config === undefined) {
        config = {};
    }

    var userFormFields = [];

    if (config.formFields !== undefined) {
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

    var formFields = mergeFormFields(defaultFormFields, userFormFields);
    var resetPasswordURL;

    if (config.resetPasswordURL) {
        resetPasswordURL = new _normalisedURLPath["default"](config.resetPasswordURL);
    } else {
        resetPasswordURL = new _normalisedURLPath["default"](
            "".concat(appInfo.websiteBasePath.getAsStringDangerous()).concat(_constants.DEFAULT_RESET_PASSWORD_PATH)
        );
    }

    var style = config.style || {};
    return {
        style: style,
        formFields: formFields,
        resetPasswordURL: resetPasswordURL
    };
}

function getDefaultFormFields() {
    return [getDefaultEmailFormField(), getDefaultPasswordFormField()];
}

function getDefaultEmailFormField() {
    return {
        id: "email",
        label: "Email",
        placeholder: "Email address",
        validate: defaultEmailValidator,
        optional: false
    };
}

function getDefaultPasswordFormField() {
    return {
        id: "password",
        label: "Password",
        placeholder: "Password",
        validate: defaultPasswordValidator,
        optional: false
    };
}

function normaliseResetPasswordUsingTokenFeature(config) {
    if (config === undefined) {
        config = {};
    }

    var disableDefaultImplementation = config.disableDefaultImplementation === true;
    var onSuccessRedirectURL =
        config.onSuccessRedirectURL !== undefined
            ? new _normalisedURLPath["default"](config.onSuccessRedirectURL)
            : new _normalisedURLPath["default"]("/");
    var submitNewPasswordFormStyle =
        config.submitNewPasswordForm !== undefined && config.submitNewPasswordForm.style !== undefined
            ? config.submitNewPasswordForm.style
            : {};
    var submitNewPasswordForm = {
        style: submitNewPasswordFormStyle,
        formFields: [
            Object.assign(
                {
                    label: "New password",
                    placeholder: "New password"
                },
                getDefaultPasswordFormField()
            ),
            {
                id: "confirm-password",
                label: "Confirm password",
                placeholder: "Confirm your password",
                validate: defaultPasswordValidator,
                optional: false
            }
        ]
    };
    var enterEmailFormStyle =
        config.enterEmailForm !== undefined && config.enterEmailForm.style !== undefined
            ? config.enterEmailForm.style
            : {};
    var enterEmailForm = {
        style: enterEmailFormStyle,
        formFields: [getDefaultEmailFormField()]
    };
    return {
        onSuccessRedirectURL: onSuccessRedirectURL,
        disableDefaultImplementation: disableDefaultImplementation,
        submitNewPasswordForm: submitNewPasswordForm,
        enterEmailForm: enterEmailForm
    };
}
/*
 * mergeFormFields by keeping the provided order, defaultFormFields or merged first, and unmerged userFormFields after.
 */

function mergeFormFields(defaultFormFields, userFormFields) {
    // Create a new array with default fields.
    var mergedFormFields = defaultFormFields; // Loop through user provided fields.

    for (var i = 0; i < userFormFields.length; i++) {
        var userField = userFormFields[i];
        var isNewField = true; // Loop through the merged fields array.

        for (var j = 0; j < mergedFormFields.length; j++) {
            var mergedField = mergedFormFields[j]; // If id is equal, merge the fields

            if (userField.id === mergedField.id) {
                // Make sure that email and password are kept mandatory.
                var optional = mergedField.optional; // Init with default value.
                // If user provided value, overwrite.

                if (userField.optional !== undefined) {
                    optional = userField.optional;
                } // If "email" or "password", always mandatory.

                if (_constants.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(userField.id)) {
                    optional = false;
                } // Merge.

                mergedFormFields[j] = _objectSpread(
                    _objectSpread(_objectSpread({}, mergedFormFields[j]), userField),
                    {},
                    {
                        optional: optional
                    }
                );
                isNewField = false;
                break;
            }
        } // If new field, push to mergeFormFields.

        if (isNewField) {
            mergedFormFields.push(
                _objectSpread(
                    {
                        optional: false,
                        placeholder: capitalize(userField.id),
                        validate: defaultValidate
                    },
                    userField
                )
            );
        }
    }

    return mergedFormFields;
}
/*
 * capitalize
 */

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
/*
 * defaultValidate
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

function defaultValidate(_x4) {
    return _defaultValidate.apply(this, arguments);
}

function _defaultValidate() {
    _defaultValidate = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee4(_) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch ((_context4.prev = _context4.next)) {
                        case 0:
                            return _context4.abrupt("return", undefined);

                        case 1:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4);
        })
    );
    return _defaultValidate.apply(this, arguments);
}
