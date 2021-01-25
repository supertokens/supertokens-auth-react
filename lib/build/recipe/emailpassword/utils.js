"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.normaliseEmailPasswordConfig = normaliseEmailPasswordConfig;
exports.normaliseSignInAndUpFeature = normaliseSignInAndUpFeature;
exports.normaliseSignUpFormFeatureConfig = normaliseSignUpFormFeatureConfig;
exports.normaliseSignInFormFeatureConfig = normaliseSignInFormFeatureConfig;
exports.getDefaultFormFields = getDefaultFormFields;
exports.normaliseResetPasswordUsingTokenFeature = normaliseResetPasswordUsingTokenFeature;
exports.normaliseEmailVerificationFeature = normaliseEmailVerificationFeature;
exports.mergeFormFields = mergeFormFields;
exports.getFormattedFormField = getFormattedFormField;

var _normalisedURLPath = _interopRequireDefault(require("../../normalisedURLPath"));

var _utils = require("../../utils");

var _constants = require("./constants");

var _validators = require("./validators");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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

function normaliseEmailPasswordConfig(config) {
    var signInAndUpFeature = normaliseSignInAndUpFeature(config.appInfo, config.signInAndUpFeature);
    var signUpPasswordField = signInAndUpFeature.signUpForm.formFields.find(function(field) {
        return field.id === _constants.MANDATORY_FORM_FIELDS_ID.PASSWORD;
    });
    var signUpEmailField = signInAndUpFeature.signUpForm.formFields.find(function(field) {
        return field.id === _constants.MANDATORY_FORM_FIELDS_ID.EMAIL;
    });
    var resetPasswordUsingTokenFeature = normaliseResetPasswordUsingTokenFeature(
        signUpPasswordField.validate,
        signUpEmailField,
        config.resetPasswordUsingTokenFeature
    );
    var emailVerificationFeature = normaliseEmailVerificationFeature(config.emailVerificationFeature);
    var palette = config.palette !== undefined ? config.palette : {};
    var useShadowDom = getShouldUseShadowDom(config.useShadowDom);
    return {
        palette: palette,
        useShadowDom: useShadowDom,
        signInAndUpFeature: signInAndUpFeature,
        resetPasswordUsingTokenFeature: resetPasswordUsingTokenFeature,
        emailVerificationFeature: emailVerificationFeature
    };
}

function normaliseSignInAndUpFeature(appInfo, config) {
    if (config === undefined) {
        config = {};
    }

    var disableDefaultImplementation = config.disableDefaultImplementation === true;
    var signUpForm = normaliseSignUpFormFeatureConfig(config.signUpForm);
    var defaultToSignUp = config.defaultToSignUp !== undefined ? config.defaultToSignUp : true;
    /*
     * Default Sign In corresponds to computed Sign Up fields filtered by email and password only.
     * i.e. If the user overrides sign Up fields, that is propagated to default sign In fields.
     * Exception made of the password validator which only verifies that the value is not empty for login
     * https://github.com/supertokens/supertokens-auth-react/issues/21
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
                        autoComplete: "current-password",
                        validate: _validators.defaultLoginPasswordValidator
                    }
                )
            ]);
        }

        return signInFieldsAccumulator;
    }, []);
    var signInForm = normaliseSignInFormFeatureConfig(appInfo, defaultSignInFields, config.signInForm);
    return {
        disableDefaultImplementation: disableDefaultImplementation,
        defaultToSignUp: defaultToSignUp,
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
    var termsOfServiceLink = config.termsOfServiceLink;
    var style = config.style !== undefined ? config.style : {};
    return {
        style: style,
        formFields: formFields,
        privacyPolicyLink: privacyPolicyLink,
        termsOfServiceLink: termsOfServiceLink
    };
}

function normaliseSignInFormFeatureConfig(appInfo, defaultFormFields, config) {
    if (config === undefined) {
        config = {};
    }

    var userFormFields = [];

    if (config.formFields !== undefined) {
        userFormFields = config.formFields // Filter on email and password only.
            .filter(function(field) {
                return _constants.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id);
            }) // Sign In fields are never optional.
            .map(function(field) {
                return _objectSpread(
                    _objectSpread({}, field),
                    {},
                    {
                        optional: false
                    }
                );
            });
    }

    var formFields = mergeFormFields(defaultFormFields, userFormFields);
    var resetPasswordURL;

    if (config.resetPasswordURL !== undefined) {
        resetPasswordURL = new _normalisedURLPath["default"](config.resetPasswordURL);
    } else {
        resetPasswordURL = new _normalisedURLPath["default"](
            "".concat(appInfo.websiteBasePath.getAsStringDangerous()).concat(_constants.DEFAULT_RESET_PASSWORD_PATH)
        );
    }

    var style = config.style !== undefined ? config.style : {};
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
        validate: _validators.defaultEmailValidator,
        optional: false,
        autoComplete: "email"
    };
}

function getDefaultPasswordFormField() {
    return {
        id: "password",
        label: "Password",
        placeholder: "Password",
        validate: _validators.defaultPasswordValidator,
        optional: false,
        autoComplete: "new-password"
    };
}

function normaliseResetPasswordUsingTokenFeature(signUpPasswordFieldValidate, signUpEmailField, config) {
    if (config === undefined) {
        config = {};
    }

    var disableDefaultImplementation = config.disableDefaultImplementation === true;
    var submitNewPasswordFormStyle =
        config.submitNewPasswordForm !== undefined && config.submitNewPasswordForm.style !== undefined
            ? config.submitNewPasswordForm.style
            : {};
    var submitNewPasswordForm = {
        style: submitNewPasswordFormStyle,
        formFields: [
            {
                id: "password",
                label: "New password",
                placeholder: "New password",
                validate: signUpPasswordFieldValidate,
                optional: false,
                autoComplete: "new-password"
            },
            {
                id: "confirm-password",
                label: "Confirm password",
                placeholder: "Confirm your password",
                validate: signUpPasswordFieldValidate,
                optional: false,
                autoComplete: "new-password"
            }
        ]
    };
    var enterEmailFormStyle =
        config.enterEmailForm !== undefined && config.enterEmailForm.style !== undefined
            ? config.enterEmailForm.style
            : {};
    var enterEmailForm = {
        style: enterEmailFormStyle,
        formFields: [signUpEmailField]
    };
    return {
        disableDefaultImplementation: disableDefaultImplementation,
        submitNewPasswordForm: submitNewPasswordForm,
        enterEmailForm: enterEmailForm
    };
}

function normaliseEmailVerificationFeature(config) {
    if (config === undefined) {
        config = {};
    }

    var disableDefaultImplementation = config.disableDefaultImplementation === true;
    var mode = _constants.EMAIL_VERIFICATION_MODE.OFF;

    if (config.mode === "REQUIRED") {
        mode = _constants.EMAIL_VERIFICATION_MODE.REQUIRED;
    }

    var sendVerifyEmailScreenStyle =
        config.sendVerifyEmailScreen !== undefined && config.sendVerifyEmailScreen.style !== undefined
            ? config.sendVerifyEmailScreen.style
            : {};
    var sendVerifyEmailScreen = {
        style: sendVerifyEmailScreenStyle
    };
    var verifyEmailLinkClickedScreenStyle =
        config.verifyEmailLinkClickedScreen !== undefined && config.verifyEmailLinkClickedScreen.style !== undefined
            ? config.verifyEmailLinkClickedScreen.style
            : {};
    var verifyEmailLinkClickedScreen = {
        style: verifyEmailLinkClickedScreenStyle
    };
    return {
        disableDefaultImplementation: disableDefaultImplementation,
        mode: mode,
        sendVerifyEmailScreen: sendVerifyEmailScreen,
        verifyEmailLinkClickedScreen: verifyEmailLinkClickedScreen
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
                        placeholder: userField.label,
                        validate: _validators.defaultValidate
                    },
                    userField
                )
            );
        }
    }

    return mergedFormFields.map(function(field) {
        return getFormattedFormField(field);
    });
}

function getFormattedFormField(field) {
    return _objectSpread(
        _objectSpread({}, field),
        {},
        {
            validate: (function() {
                var _validate = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(value) {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch ((_context.prev = _context.next)) {
                                    case 0:
                                        if (!(value === "" && field.optional === false)) {
                                            _context.next = 2;
                                            break;
                                        }

                                        return _context.abrupt("return", "Field is not optional");

                                    case 2:
                                        _context.next = 4;
                                        return field.validate(value);

                                    case 4:
                                        return _context.abrupt("return", _context.sent);

                                    case 5:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee);
                    })
                );

                function validate(_x) {
                    return _validate.apply(this, arguments);
                }

                return validate;
            })()
        }
    );
}

function getShouldUseShadowDom(useShadowDom) {
    /*
     * Detect if browser is IE
     * In order to disable unsupported shadowDom
     * https://github.com/supertokens/supertokens-auth-react/issues/99
     */
    var isIE = (0, _utils.getWindowOrThrow)().document.documentMode !== undefined; // If browser is Internet Explorer, always disable shadow dom.

    if (isIE === true) {
        return false;
    } // Otherwise, use provided config or default to true.

    return useShadowDom !== undefined ? useShadowDom : true;
}
