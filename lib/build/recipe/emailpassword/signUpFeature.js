"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _utils = require("../../utils");

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/*
 * Class.
 */
var SignUpFeature =
    /*
     * Instance attributes.
     */

    /*
     * Constructor.
     */
    function SignUpFeature(config) {
        var _this = this;

        _classCallCheck(this, SignUpFeature);

        this.getFormFields = function() {
            return _this.formFields;
        };

        this.getPrivacyPolicyLink = function() {
            return _this.privacyPolicyLink;
        };

        this.getTermsAndConditionsLink = function() {
            return _this.termsAndConditionsLink;
        };

        this.getDefaultFormFields = function() {
            return [
                {
                    id: "email",
                    label: "Email",
                    placeholder: "youremail@example.com",
                    validate: _utils.validateEmail,
                    optional: false
                },
                {
                    id: "password",
                    label: "Password",
                    placeholder: "Enter your password",
                    validate: _utils.validatePassword,
                    optional: false
                }
            ];
        };

        var defaultFormFields = this.getDefaultFormFields();
        var userFormFields = [];

        if (config !== undefined) {
            this.privacyPolicyLink = config.privacyPolicyLink;
            this.termsAndConditionsLink = config.termsAndConditionsLink;

            if (config.formFields !== undefined) {
                userFormFields = config.formFields;
            }
        }

        this.formFields = (0, _utils.mergeFormFields)(defaultFormFields, userFormFields);
    };
/*
 * Instance methods.
 */
exports["default"] = SignUpFeature;
