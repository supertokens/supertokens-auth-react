"use strict";
/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
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
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var react_1 = require("@emotion/react");
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var formBase_1 = __importDefault(require("../../../../emailpassword/components/library/formBase"));
var validators_1 = require("../../../validators");
var library_1 = require("../../../../emailpassword/components/library");
var react_2 = __importStar(require("react"));
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var constants_1 = require("../../../../../constants");
var resendButton_1 = require("./resendButton");
exports.UserInputCodeForm = withOverride_1.withOverride(
    "PasswordlessUserInputCodeForm",
    function PasswordlessUserInputCodeForm(props) {
        var _this = this;
        var styles = react_2.useContext(styleContext_1.default);
        var _a = react_2.useState(),
            clearResendNotifTimeout = _a[0],
            setClearResendNotifTimeout = _a[1];
        var _b = react_2.useState(),
            error = _b[0],
            setError = _b[1];
        react_2.useEffect(
            function () {
                // This is just to clean u
                return function () {
                    clearTimeout(clearResendNotifTimeout);
                };
            },
            [clearResendNotifTimeout]
        );
        function resend() {
            return __awaiter(this, void 0, void 0, function () {
                var response, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.resendCode({
                                    deviceId: props.loginAttemptInfo.deviceId,
                                    preAuthSessionId: props.loginAttemptInfo.preAuthSessionId,
                                    config: props.config,
                                }),
                            ];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                setClearResendNotifTimeout(
                                    setTimeout(function () {
                                        setClearResendNotifTimeout(undefined);
                                    }, 2000) // We need this cast because the node types are also loaded
                                );
                            } else if (response.status === "GENERAL_ERROR") {
                                setError(response.message);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            setError(constants_1.SOMETHING_WENT_WRONG_ERROR);
                            return [3 /*break*/, 3];
                        case 3:
                            return [2 /*return*/];
                    }
                });
            });
        }
        return react_1.jsx(
            react_2.default.Fragment,
            null,
            props.header,
            clearResendNotifTimeout !== undefined &&
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "generalSuccess resendSuccess",
                        css: [styles.generalSuccess, styles.resendSuccess],
                    },
                    "Code resent"
                ),
            error !== undefined &&
                react_1.jsx("div", { "data-supertokens": "generalError", css: [styles.generalError] }, error),
            react_1.jsx(formBase_1.default, {
                formFields: [
                    {
                        id: "userInputCode",
                        label: "",
                        labelComponent: react_1.jsx(
                            "div",
                            { css: styles.codeInputLabelWrapper, "data-supertokens": "codeInputLabelWrapper" },
                            react_1.jsx(library_1.Label, { value: "Code", "data-supertokens": "codeInputLabel" }),
                            react_1.jsx(resendButton_1.ResendButton, {
                                loginAttemptInfo: props.loginAttemptInfo,
                                resendCodeTimeGapInSeconds: props.config.resendCodeTimeGapInSeconds,
                                target: "OTP",
                                onClick: resend,
                            })
                        ),
                        optional: false,
                        placeholder: "A1223B",
                        validate: validators_1.userInputCodeValidate,
                    },
                ],
                onSuccess: props.onSuccess,
                buttonLabel: "CONTINUE",
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
                                        return [
                                            2 /*return*/,
                                            {
                                                status: "GENERAL_ERROR",
                                                message: "Please fill your OTP",
                                            },
                                        ];
                                    }
                                    return [
                                        4 /*yield*/,
                                        props.recipeImplementation.consumeCode({
                                            deviceId: props.loginAttemptInfo.deviceId,
                                            preAuthSessionId: props.loginAttemptInfo.preAuthSessionId,
                                            userInputCode: userInputCode,
                                            config: props.config,
                                        }),
                                    ];
                                case 1:
                                    response = _b.sent();
                                    if (response.status === "OK") {
                                        return [2 /*return*/, response];
                                    }
                                    if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
                                        return [
                                            2 /*return*/,
                                            {
                                                status: "FIELD_ERROR",
                                                formFields: [
                                                    {
                                                        id: "userInputCode",
                                                        error:
                                                            "Invalid OTP. Attempts left: " +
                                                            (
                                                                response.maximumCodeInputAttempts -
                                                                response.failedCodeInputAttemptCount
                                                            )
                                                                .toString()
                                                                .padStart(2, "0"),
                                                    },
                                                ],
                                            },
                                        ];
                                    }
                                    if (response.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
                                        return [
                                            2 /*return*/,
                                            {
                                                status: "FIELD_ERROR",
                                                formFields: [
                                                    {
                                                        id: "userInputCode",
                                                        error:
                                                            "Expired OTP. Attempts left: " +
                                                            (
                                                                response.maximumCodeInputAttempts -
                                                                response.failedCodeInputAttemptCount
                                                            )
                                                                .toString()
                                                                .padStart(2, "0"),
                                                    },
                                                ],
                                            },
                                        ];
                                    }
                                    return [
                                        2 /*return*/,
                                        {
                                            status: "GENERAL_ERROR",
                                            message: "Something went wrong, please try again.",
                                        },
                                    ];
                            }
                        });
                    });
                },
                validateOnBlur: false,
                showLabels: true,
                footer: props.footer,
            })
        );
    }
);
