"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneForm = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var formBase_1 = tslib_1.__importDefault(require("../../../../emailpassword/components/library/formBase"));
var phoneNumberInput_1 = require("./phoneNumberInput");
var validators_1 = require("../../../../emailpassword/validators");
var signInUpFooter_1 = require("./signInUpFooter");
var error_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/error"));
var usercontext_1 = require("../../../../../usercontext");
var react_1 = require("react");
exports.PhoneForm = (0, withOverride_1.withOverride)("PasswordlessPhoneForm", function PasswordlessPhoneForm(props) {
    var _this = this;
    var userContext = (0, usercontext_1.useUserContext)();
    var phoneInput = (0, react_1.useMemo)(
        function () {
            return (0, phoneNumberInput_1.phoneNumberInputWithInjectedProps)({
                defaultCountry: props.config.signInUpFeature.defaultCountry,
            });
        },
        [props.config.signInUpFeature.defaultCountry]
    );
    return (0, jsx_runtime_1.jsx)(formBase_1.default, {
        clearError: props.clearError,
        onError: props.onError,
        formFields: [
            {
                id: "phoneNumber",
                label: "PWLESS_SIGN_IN_UP_PHONE_LABEL",
                inputComponent: phoneInput,
                optional: false,
                autofocus: true,
                placeholder: "",
                validate: validators_1.defaultValidate,
            },
        ],
        buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var phoneNumber, validationRes, response;
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            phoneNumber =
                                (_a = formFields.find(function (field) {
                                    return field.id === "phoneNumber";
                                })) === null || _a === void 0
                                    ? void 0
                                    : _a.value;
                            if (phoneNumber === undefined) {
                                throw new error_1.default("GENERAL_ERROR_PHONE_UNDEFINED");
                            }
                            return [4 /*yield*/, props.config.validatePhoneNumber(phoneNumber)];
                        case 1:
                            validationRes = _b.sent();
                            if (validationRes !== undefined) {
                                throw new error_1.default(validationRes);
                            }
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.createCode({
                                    phoneNumber: phoneNumber,
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            response = _b.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        validateOnBlur: false,
        showLabels: true,
        footer: (0, jsx_runtime_1.jsx)(signInUpFooter_1.SignInUpFooter, {
            privacyPolicyLink: props.config.signInUpFeature.privacyPolicyLink,
            termsOfServiceLink: props.config.signInUpFeature.termsOfServiceLink,
        }),
    });
});
