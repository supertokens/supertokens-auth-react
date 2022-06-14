"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpForm = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var formBase_1 = tslib_1.__importDefault(require("../../library/formBase"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var utils_1 = require("../../../../../utils");
var usercontext_1 = require("../../../../../usercontext");
/*
 * Component.
 */
exports.SignUpForm = (0, withOverride_1.withOverride)(
    "EmailPasswordSignUpForm",
    function EmailPasswordSignUpForm(props) {
        var _this = this;
        var userContext = (0, usercontext_1.useUserContext)();
        return (0, jsx_runtime_1.jsx)(formBase_1.default, {
            formFields: props.formFields,
            clearError: props.clearError,
            onError: props.onError,
            buttonLabel: "EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN",
            onSuccess: props.onSuccess,
            callAPI: function (formFields) {
                return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var validationErrors;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    (0, utils_1.validateForm)(
                                        formFields,
                                        props.config.signInAndUpFeature.signUpForm.formFields
                                    ),
                                ];
                            case 1:
                                validationErrors = _a.sent();
                                if (validationErrors.length > 0) {
                                    return [
                                        2 /*return*/,
                                        {
                                            status: "FIELD_ERROR",
                                            formFields: validationErrors,
                                        },
                                    ];
                                }
                                return [
                                    2 /*return*/,
                                    props.recipeImplementation.signUp({
                                        formFields: formFields,
                                        userContext: userContext,
                                    }),
                                ];
                        }
                    });
                });
            },
            validateOnBlur: true,
            showLabels: true,
            footer: props.footer,
        });
    }
);
