"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInputCodeForm = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var formBase_1 = tslib_1.__importDefault(require("../../../../emailpassword/components/library/formBase"));
var validators_1 = require("../../../validators");
var library_1 = require("../../../../emailpassword/components/library");
var react_1 = tslib_1.__importStar(require("react"));
var styleContext_1 = tslib_1.__importDefault(require("../../../../../styles/styleContext"));
var resendButton_1 = require("./resendButton");
var translationContext_1 = require("../../../../../translation/translationContext");
var error_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/error"));
var usercontext_1 = require("../../../../../usercontext");
var userInputCodeFormFooter_1 = require("./userInputCodeFormFooter");
exports.UserInputCodeForm = (0, withOverride_1.withOverride)(
    "PasswordlessUserInputCodeForm",
    function PasswordlessUserInputCodeForm(props) {
        var _this = this;
        var styles = (0, react_1.useContext)(styleContext_1.default);
        var t = (0, translationContext_1.useTranslation)();
        var userContext = (0, usercontext_1.useUserContext)();
        // We need this any because the node types are also loaded
        var _a = (0, react_1.useState)(),
            clearResendNotifTimeout = _a[0],
            setClearResendNotifTimeout = _a[1];
        (0, react_1.useEffect)(
            function () {
                // This is just to clean up on unmount and if the clear timeout changes
                return function () {
                    clearTimeout(clearResendNotifTimeout);
                };
            },
            [clearResendNotifTimeout]
        );
        function resend() {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var response, generalError, e_1, e_2;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            response = void 0;
                            generalError = void 0;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.resendCode({
                                    deviceId: props.loginAttemptInfo.deviceId,
                                    preAuthSessionId: props.loginAttemptInfo.preAuthSessionId,
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            response = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            if (error_1.default.isThisError(e_1)) {
                                generalError = e_1;
                            } else {
                                throw e_1;
                            }
                            return [3 /*break*/, 4];
                        case 4:
                            if (generalError !== undefined) {
                                props.onError(generalError.message);
                            } else {
                                if (response === undefined) {
                                    throw new Error("Should not come here");
                                }
                                if (response.status === "OK") {
                                    setClearResendNotifTimeout(
                                        setTimeout(function () {
                                            setClearResendNotifTimeout(undefined);
                                        }, 2000)
                                    );
                                }
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            e_2 = _a.sent();
                            props.onError("SOMETHING_WENT_WRONG_ERROR");
                            return [3 /*break*/, 6];
                        case 6:
                            return [2 /*return*/];
                    }
                });
            });
        }
        return (0, jsx_runtime_1.jsxs)(react_1.default.Fragment, {
            children: [
                clearResendNotifTimeout !== undefined &&
                    (0, jsx_runtime_1.jsx)(
                        "div",
                        tslib_1.__assign(
                            { "data-supertokens": "generalSuccess", css: [styles.generalSuccess] },
                            {
                                children:
                                    props.loginAttemptInfo.contactMethod === "EMAIL"
                                        ? t("PWLESS_RESEND_SUCCESS_EMAIL")
                                        : t("PWLESS_RESEND_SUCCESS_PHONE"),
                            }
                        )
                    ),
                (0, jsx_runtime_1.jsx)(formBase_1.default, {
                    clearError: props.clearError,
                    onError: props.onError,
                    formFields: [
                        {
                            id: "userInputCode",
                            label: "",
                            labelComponent: (0, jsx_runtime_1.jsxs)(
                                "div",
                                tslib_1.__assign(
                                    { css: styles.codeInputLabelWrapper, "data-supertokens": "codeInputLabelWrapper" },
                                    {
                                        children: [
                                            (0, jsx_runtime_1.jsx)(library_1.Label, {
                                                value: "PWLESS_USER_INPUT_CODE_INPUT_LABEL",
                                                "data-supertokens": "codeInputLabel",
                                            }),
                                            (0, jsx_runtime_1.jsx)(resendButton_1.ResendButton, {
                                                loginAttemptInfo: props.loginAttemptInfo,
                                                resendEmailOrSMSGapInSeconds:
                                                    props.config.signInUpFeature.resendEmailOrSMSGapInSeconds,
                                                onClick: resend,
                                            }),
                                        ],
                                    }
                                )
                            ),
                            autofocus: true,
                            optional: false,
                            clearOnSubmit: true,
                            placeholder: "",
                            validate: validators_1.userInputCodeValidate,
                        },
                    ],
                    onSuccess: props.onSuccess,
                    buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
                    callAPI: function (formFields) {
                        return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var userInputCode, response;
                            var _a;
                            return tslib_1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        userInputCode =
                                            (_a = formFields.find(function (field) {
                                                return field.id === "userInputCode";
                                            })) === null || _a === void 0
                                                ? void 0
                                                : _a.value;
                                        if (userInputCode === undefined || userInputCode.length === 0) {
                                            throw new error_1.default("GENERAL_ERROR_OTP_UNDEFINED");
                                        }
                                        return [
                                            4 /*yield*/,
                                            props.recipeImplementation.consumeCode({
                                                deviceId: props.loginAttemptInfo.deviceId,
                                                preAuthSessionId: props.loginAttemptInfo.preAuthSessionId,
                                                userInputCode: userInputCode,
                                                userContext: userContext,
                                            }),
                                        ];
                                    case 1:
                                        response = _b.sent();
                                        if (response.status === "OK" || response.status === "RESTART_FLOW_ERROR") {
                                            return [2 /*return*/, response];
                                        }
                                        if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
                                            throw new error_1.default("GENERAL_ERROR_OTP_INVALID");
                                        }
                                        if (response.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
                                            throw new error_1.default("GENERAL_ERROR_OTP_EXPIRED");
                                        }
                                        throw new error_1.default("SOMETHING_WENT_WRONG_ERROR");
                                }
                            });
                        });
                    },
                    validateOnBlur: false,
                    showLabels: true,
                    footer: (0, jsx_runtime_1.jsx)(
                        userInputCodeFormFooter_1.UserInputCodeFormFooter,
                        tslib_1.__assign({}, props, { loginAttemptInfo: props.loginAttemptInfo })
                    ),
                }),
            ],
        });
    }
);
