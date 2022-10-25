"use strict";
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
exports.EmailOrPhoneForm = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var formBase_1 = __importDefault(require("../../../../emailpassword/components/library/formBase"));
var phoneNumberInput_1 = require("./phoneNumberInput");
var validators_1 = require("../../../validators");
var react_1 = require("react");
var error_1 = __importDefault(require("supertokens-web-js/utils/error"));
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
        var emailOrPhoneInput = (0, react_1.useMemo)(
            function () {
                return isPhoneNumber
                    ? (0, phoneNumberInput_1.phoneNumberInputWithInjectedProps)({
                          defaultCountry: props.config.signInUpFeature.defaultCountry,
                      })
                    : undefined;
            },
            [props.config.signInUpFeature.defaultCountry, isPhoneNumber]
        );
        return (0, jsx_runtime_1.jsx)(formBase_1.default, {
            clearError: props.clearError,
            onError: props.onError,
            formFields: [
                {
                    id: "emailOrPhone",
                    label: "PWLESS_SIGN_IN_UP_EMAIL_OR_PHONE_LABEL",
                    inputComponent: emailOrPhoneInput,
                    optional: false,
                    autofocus: true,
                    placeholder: "",
                    validate: validators_1.defaultValidate,
                },
            ],
            buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
            onSuccess: props.onSuccess,
            callAPI: function (formFields, setValue) {
                return __awaiter(_this, void 0, void 0, function () {
                    var emailOrPhone,
                        emailValidationRes,
                        response,
                        phoneValidationRes,
                        response,
                        intPhoneNumber,
                        phoneValidationResAfterGuess,
                        ex_1;
                    var _a;
                    return __generator(this, function (_b) {
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
                                return [3 /*break*/, 19];
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
                                if (!(intPhoneNumber && isPhoneNumber !== true)) return [3 /*break*/, 18];
                                return [4 /*yield*/, props.config.validatePhoneNumber(intPhoneNumber)];
                            case 11:
                                phoneValidationResAfterGuess = _b.sent();
                                if (!(phoneValidationResAfterGuess === undefined)) return [3 /*break*/, 16];
                                _b.label = 12;
                            case 12:
                                _b.trys.push([12, 14, , 15]);
                                return [
                                    4 /*yield*/,
                                    props.recipeImplementation.createCode({
                                        phoneNumber: intPhoneNumber,
                                        userContext: userContext,
                                    }),
                                ];
                            case 13:
                                return [2 /*return*/, _b.sent()];
                            case 14:
                                ex_1 = _b.sent();
                                // General errors from the API can make createCode throw but we want to switch to the phone UI anyway
                                setValue("emailOrPhone", intPhoneNumber);
                                setIsPhoneNumber(true);
                                throw ex_1;
                            case 15:
                                return [3 /*break*/, 17];
                            case 16:
                                // In this case we could get a phonenumber but not a completely valid one
                                // We want to switch to the phone UI and pre-fill the number
                                setValue("emailOrPhone", intPhoneNumber);
                                setIsPhoneNumber(true);
                                throw new error_1.default("PWLESS_EMAIL_OR_PHONE_INVALID_INPUT_GUESS_PHONE_ERR");
                            case 17:
                                return [3 /*break*/, 19];
                            case 18:
                                throw new error_1.default(phoneValidationRes);
                            case 19:
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
