"use strict";
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k];
                      },
                  };
              }
              Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
              o["default"] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInputCodeForm = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var formBase_1 = __importDefault(require("../../../../emailpassword/components/library/formBase"));
var validators_1 = require("../../../validators");
var library_1 = require("../../../../emailpassword/components/library");
var react_1 = __importStar(require("react"));
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var resendButton_1 = require("./resendButton");
var translationContext_1 = require("../../../../../translation/translationContext");
var error_1 = __importDefault(require("supertokens-web-js/utils/error"));
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
            return __awaiter(this, void 0, void 0, function () {
                var response, generalError, e_1, e_2;
                return __generator(this, function (_a) {
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
                        __assign(
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
                                __assign(
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
                        return __awaiter(_this, void 0, void 0, function () {
                            var userInputCode, response;
                            var _a;
                            return __generator(this, function (_b) {
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
                        __assign({}, props, { loginAttemptInfo: props.loginAttemptInfo })
                    ),
                }),
            ],
        });
    }
);
