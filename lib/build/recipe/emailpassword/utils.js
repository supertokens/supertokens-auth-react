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
exports.mergeFormFields = mergeFormFields;

var _normalisedURLPath = _interopRequireDefault(require("../../normalisedURLPath"));

var _constants = require("./constants");

var _styles = require("./styles/styles");

var _validators = require("./validators");

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

function normaliseEmailPasswordConfig(config) {
    var signInAndUpFeature = normaliseSignInAndUpFeature(config.appInfo, config.signInAndUpFeature);
    var signUpPasswordField = signInAndUpFeature.signUpForm.formFields.find(function(field) {
        return field.id === _constants.MANDATORY_FORM_FIELDS_ID.PASSWORD;
    });
    var resetPasswordUsingTokenFeature = normaliseResetPasswordUsingTokenFeature(
        signUpPasswordField.validate,
        config.resetPasswordUsingTokenFeature
    );
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
    var onSuccessRedirectURL = config.onSuccessRedirectURL !== undefined ? config.onSuccessRedirectURL : "/";
    var signUpForm = normaliseSignUpFormFeatureConfig(config.signUpForm);
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
                        validate: _validators.defaultLoginPasswordValidator
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
    var style = config.style !== undefined ? config.style : {};
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
        optional: false
    };
}

function getDefaultPasswordFormField() {
    return {
        id: "password",
        label: "Password",
        placeholder: "Password",
        validate: _validators.defaultPasswordValidator,
        optional: false
    };
}

function normaliseResetPasswordUsingTokenFeature(signUpPasswordFieldValidate, config) {
    if (config === undefined) {
        config = {};
    }

    var disableDefaultImplementation = config.disableDefaultImplementation === true;
    var onSuccessRedirectURL = config.onSuccessRedirectURL !== undefined ? config.onSuccessRedirectURL : "/";
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
                optional: false
            },
            {
                id: "confirm-password",
                label: "Confirm password",
                placeholder: "Confirm your password",
                validate: signUpPasswordFieldValidate,
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
                        placeholder: userField.label,
                        validate: _validators.defaultValidate
                    },
                    userField
                )
            );
        }
    }

    return mergedFormFields;
}
