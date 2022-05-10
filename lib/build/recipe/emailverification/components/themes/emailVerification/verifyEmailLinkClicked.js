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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var arrowRightIcon_1 = __importDefault(require("../../../../../components/assets/arrowRightIcon"));
var checkedRoundIcon_1 = __importDefault(require("../../../../../components/assets/checkedRoundIcon"));
var errorLargeIcon_1 = __importDefault(require("../../../../../components/assets/errorLargeIcon"));
var spinnerIcon_1 = __importDefault(require("../../../../../components/assets/spinnerIcon"));
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var library_1 = require("../../../../emailpassword/components/library");
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var translationContext_1 = require("../../../../../translation/translationContext");
var utils_1 = require("../../../../../utils");
/*
 * Component.
 */
exports.EmailVerificationVerifyEmailLinkClicked = function (props) {
    var styles = react_2.useContext(styleContext_1.default);
    var t = translationContext_1.useTranslation();
    var _a = react_2.useState("LOADING"),
        status = _a[0],
        setStatus = _a[1];
    var verifyEmail = react_2.useCallback(
        function () {
            return props.recipeImplementation.verifyEmail({
                config: props.config,
                token: props.token,
            });
        },
        [props.token, props.config]
    );
    var handleVerifyResp = react_2.useCallback(
        function (response) {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (response.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
                        setStatus("INVALID");
                    } else {
                        setStatus("SUCCESSFUL");
                    }
                    return [2 /*return*/];
                });
            });
        },
        [setStatus]
    );
    var handleError = react_2.useCallback(
        function () {
            setStatus("GENERAL_ERROR");
        },
        [setStatus]
    );
    utils_1.useOnMountAPICall(verifyEmail, handleVerifyResp, handleError);
    var onTokenInvalidRedirect = props.onTokenInvalidRedirect,
        onContinueClicked = props.onContinueClicked;
    if (status === "LOADING") {
        return react_1.jsx(
            "div",
            { "data-supertokens": "container", css: styles.container },
            react_1.jsx(
                "div",
                { "data-supertokens": "row", css: styles.row },
                react_1.jsx(
                    "div",
                    { "data-supertokens": "spinner", css: styles.spinner },
                    react_1.jsx(spinnerIcon_1.default, { color: styles.palette.colors.primary })
                )
            )
        );
    }
    if (status === "SUCCESSFUL") {
        return react_1.jsx(
            "div",
            { "data-supertokens": "container", css: styles.container },
            react_1.jsx(
                "div",
                { "data-supertokens": "row noFormRow", css: [styles.row, styles.noFormRow] },
                react_1.jsx(checkedRoundIcon_1.default, { color: styles.palette.colors.success }),
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "headerTitle headerTinyTitle",
                        css: [styles.headerTitle, styles.headerTinyTitle],
                    },
                    t("EMAIL_VERIFICATION_SUCCESS")
                ),
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "emailVerificationButtonWrapper",
                        css: styles.emailVerificationButtonWrapper,
                    },
                    react_1.jsx(library_1.Button, {
                        isLoading: false,
                        onClick: onContinueClicked,
                        type: "button",
                        label: "EMAIL_VERIFICATION_CONTINUE_BTN",
                    })
                )
            )
        );
    }
    if (status === "INVALID") {
        return react_1.jsx(
            "div",
            { "data-supertokens": "container", css: styles.container },
            react_1.jsx(
                "div",
                { "data-supertokens": "row noFormRow", css: [styles.row, styles.noFormRow] },
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "headerTitle headerTinyTitle",
                        css: [styles.headerTitle, styles.headerTinyTitle],
                    },
                    t("EMAIL_VERIFICATION_EXPIRED")
                ),
                react_1.jsx(
                    "div",
                    {
                        onClick: onTokenInvalidRedirect,
                        "data-supertokens": "secondaryText secondaryLinkWithArrow",
                        css: [styles.secondaryText, styles.secondaryLinkWithArrow],
                    },
                    t("EMAIL_VERIFICATION_CONTINUE_LINK"),
                    react_1.jsx(arrowRightIcon_1.default, { color: styles.palette.colors.textPrimary })
                )
            )
        );
    }
    return react_1.jsx(
        "div",
        { "data-supertokens": "container", css: styles.container },
        react_1.jsx(
            "div",
            { "data-supertokens": "row noFormRow", css: [styles.row, styles.noFormRow] },
            react_1.jsx(
                "div",
                { "data-supertokens": "headerTitle error", css: [styles.headerTitle, styles.error] },
                react_1.jsx(errorLargeIcon_1.default, { color: styles.palette.colors.error }),
                t("EMAIL_VERIFICATION_ERROR_TITLE")
            ),
            react_1.jsx(
                "div",
                { "data-supertokens": "primaryText", css: styles.primaryText },
                t("EMAIL_VERIFICATION_ERROR_DESC")
            )
        )
    );
};
exports.VerifyEmailLinkClicked = withOverride_1.withOverride(
    "EmailVerificationVerifyEmailLinkClicked",
    exports.EmailVerificationVerifyEmailLinkClicked
);
