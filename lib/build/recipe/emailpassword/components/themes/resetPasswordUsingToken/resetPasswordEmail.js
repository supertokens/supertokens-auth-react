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
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var formBase_1 = __importDefault(require("../../library/formBase"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var translationContext_1 = require("../../../../../translation/translationContext");
var utils_1 = require("../../../../../utils");
var generalError_1 = __importDefault(require("../../library/generalError"));
var usercontext_1 = require("../../../../../usercontext");
var backButton_1 = __importDefault(require("../../library/backButton"));
var EmailPasswordResetPasswordEmail = function (props) {
    var styles = react_2.useContext(styleContext_1.default);
    var t = translationContext_1.useTranslation();
    var userContext = usercontext_1.useUserContext();
    var _a = react_2.useState("READY"),
        status = _a[0],
        setStatus = _a[1];
    var onSuccess = function () {
        setStatus("SENT");
    };
    var resend = function () {
        setStatus("READY");
    };
    var formFields = props.formFields;
    if (status === "SENT") {
        return react_1.jsx(
            "div",
            { "data-supertokens": "container", css: styles.container },
            react_1.jsx(
                "div",
                { "data-supertokens": "row", css: styles.row },
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "primaryText enterEmailSuccessMessage",
                        css: [styles.primaryText, styles.enterEmailSuccessMessage],
                    },
                    t("EMAIL_PASSWORD_RESET_SEND_SUCCESS"),
                    react_1.jsx(
                        "span",
                        { "data-supertokens": "link", css: styles.link, onClick: resend },
                        t("EMAIL_PASSWORD_RESET_RESEND_LINK")
                    )
                )
            )
        );
    }
    // Otherwise, return Form.
    return react_1.jsx(
        "div",
        { "data-supertokens": "container", css: styles.container },
        react_1.jsx(
            "div",
            { "data-supertokens": "row", css: styles.row },
            react_1.jsx(
                "div",
                {
                    "data-supertokens": "headerTitle resetPasswordHeaderTitle",
                    css: [styles.headerTitle, styles.resetPasswordHeaderTitle],
                },
                react_1.jsx(backButton_1.default, { onClick: props.handleBackButtonClick }),
                t("EMAIL_PASSWORD_RESET_HEADER_TITLE"),
                react_1.jsx("span", {
                    "data-supertokens": "backButtonPlaceholder backButtonCommon",
                    css: [styles.backButtonPlaceholder, styles.backButtonCommon],
                })
            ),
            react_1.jsx(
                "div",
                { "data-supertokens": "headerSubtitle", css: styles.headerSubtitle },
                react_1.jsx(
                    "div",
                    { "data-supertokens": "secondaryText", css: styles.secondaryText },
                    t("EMAIL_PASSWORD_RESET_HEADER_SUBTITLE")
                )
            ),
            props.error !== undefined && react_1.jsx(generalError_1.default, { error: props.error }),
            react_1.jsx(formBase_1.default, {
                clearError: props.clearError,
                onError: props.onError,
                formFields: formFields,
                buttonLabel: "EMAIL_PASSWORD_RESET_SEND_BTN",
                onSuccess: onSuccess,
                callAPI: function (formFields) {
                    return __awaiter(void 0, void 0, void 0, function () {
                        var validationErrors;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [
                                        4 /*yield*/,
                                        utils_1.validateForm(
                                            formFields,
                                            props.config.resetPasswordUsingTokenFeature.enterEmailForm.formFields
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
                                        4 /*yield*/,
                                        props.recipeImplementation.sendPasswordResetEmail({
                                            formFields: formFields,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 2:
                                    return [2 /*return*/, _a.sent()];
                            }
                        });
                    });
                },
                showLabels: true,
                validateOnBlur: true,
            })
        )
    );
};
exports.ResetPasswordEmail = withOverride_1.withOverride(
    "EmailPasswordResetPasswordEmail",
    EmailPasswordResetPasswordEmail
);
