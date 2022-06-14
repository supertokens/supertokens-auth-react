"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailOrPhoneForm = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var formBase_1 = tslib_1.__importDefault(require("../../../../emailpassword/components/library/formBase"));
var phoneNumberInput_1 = require("./phoneNumberInput");
var validators_1 = require("../../../../emailpassword/validators");
var react_1 = require("react");
var error_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/error"));
var usercontext_1 = require("../../../../../usercontext");
var signInUpFooter_1 = require("./signInUpFooter");
exports.EmailOrPhoneForm = (0, withOverride_1.withOverride)(
    "PasswordlessEmailOrPhoneForm",
    function PasswordlessEmailOrPhoneForm(props) {
        var _this = this;
        var _a = (0, react_1.useState)(false),
            isPhoneNumber = _a[0],
            setIsPhoneNumber = _a[1];
        var userContext = (0, usercontext_1.useUserContext)();
        return (0, jsx_runtime_1.jsx)(formBase_1.default, {
            clearError: props.clearError,
            onError: props.onError,
            formFields: [
                {
                    id: "emailOrPhone",
                    label: "PWLESS_SIGN_IN_UP_EMAIL_OR_PHONE_LABEL",
                    inputComponent: isPhoneNumber
                        ? (0, phoneNumberInput_1.phoneNumberInputWithInjectedProps)({
                              defaultCountry: props.config.signInUpFeature.defaultCountry,
                          })
                        : undefined,
                    optional: false,
                    autofocus: true,
                    placeholder: "",
                    validate: validators_1.defaultValidate,
                },
            ],
            buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
            onSuccess: props.onSuccess,
            callAPI: function (formFields, setValue) {
                return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var emailOrPhone, emailValidationRes, response, phoneValidationRes, response, intPhoneNumber;
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                emailOrPhone =
                                    (_a = formFields.find(function (field) {
                                        return field.id === "emailOrPhone";
                                    })) === null || _a === void 0
                                        ? void 0
                                        : _a.value;
                                if (emailOrPhone === undefined) {
                                    throw new error_1.default("GENERAL_ERROR_EMAIL_OR_PHONE_UNDEFINED");
                                }
                                return [4 /*yield*/, (0, validators_1.defaultEmailValidator)(emailOrPhone)];
                            case 1:
                                if (!(_b.sent() === undefined)) return [3 /*break*/, 6];
                                return [4 /*yield*/, props.config.validateEmailAddress(emailOrPhone)];
                            case 2:
                                emailValidationRes = _b.sent();
                                if (!(emailValidationRes === undefined)) return [3 /*break*/, 4];
                                return [
                                    4 /*yield*/,
                                    props.recipeImplementation.createCode({
                                        email: emailOrPhone,
                                        userContext: userContext,
                                    }),
                                ];
                            case 3:
                                response = _b.sent();
                                return [2 /*return*/, response];
                            case 4:
                                throw new error_1.default(emailValidationRes);
                            case 5:
                                return [3 /*break*/, 11];
                            case 6:
                                return [4 /*yield*/, props.config.validatePhoneNumber(emailOrPhone)];
                            case 7:
                                phoneValidationRes = _b.sent();
                                if (!(phoneValidationRes === undefined)) return [3 /*break*/, 9];
                                return [
                                    4 /*yield*/,
                                    props.recipeImplementation.createCode({
                                        phoneNumber: emailOrPhone,
                                        userContext: userContext,
                                    }),
                                ];
                            case 8:
                                response = _b.sent();
                                return [2 /*return*/, response];
                            case 9:
                                return [
                                    4 /*yield*/,
                                    props.config.signInUpFeature.guessInternationPhoneNumberFromInputPhoneNumber(
                                        emailOrPhone,
                                        props.config.signInUpFeature.defaultCountry
                                    ),
                                ];
                            case 10:
                                intPhoneNumber = _b.sent();
                                if (intPhoneNumber && isPhoneNumber !== true) {
                                    setValue("emailOrPhone", intPhoneNumber);
                                    setIsPhoneNumber(true);
                                    throw new error_1.default("PWLESS_EMAIL_OR_PHONE_INVALID_INPUT_GUESS_PHONE_ERR");
                                } else {
                                    throw new error_1.default(phoneValidationRes);
                                }
                                _b.label = 11;
                            case 11:
                                return [2 /*return*/];
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
    }
);
