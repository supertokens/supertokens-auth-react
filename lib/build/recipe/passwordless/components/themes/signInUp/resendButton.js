"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendButton = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
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
/*
 * Imports.
 */
var react_1 = tslib_1.__importStar(require("react"));
var styleContext_1 = tslib_1.__importDefault(require("../../../../../styles/styleContext"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var translationContext_1 = require("../../../../../translation/translationContext");
exports.ResendButton = (0, withOverride_1.withOverride)(
    "PasswordlessResendButton",
    function PasswordlessResendButton(_a) {
        var loginAttemptInfo = _a.loginAttemptInfo,
            resendEmailOrSMSGapInSeconds = _a.resendEmailOrSMSGapInSeconds,
            onClick = _a.onClick;
        var t = (0, translationContext_1.useTranslation)();
        var styles = (0, react_1.useContext)(styleContext_1.default);
        var getTimeLeft = (0, react_1.useCallback)(
            function () {
                var timeLeft = loginAttemptInfo.lastResend + resendEmailOrSMSGapInSeconds * 1000 - Date.now();
                return timeLeft < 0 ? undefined : Math.ceil(timeLeft / 1000);
            },
            [loginAttemptInfo, resendEmailOrSMSGapInSeconds]
        );
        var _b = (0, react_1.useState)(getTimeLeft()),
            secsUntilResend = _b[0],
            setSecsUntilResend = _b[1];
        (0, react_1.useEffect)(
            function () {
                // This runs every time the loginAttemptInfo updates, so after every resend
                var interval = setInterval(function () {
                    var timeLeft = getTimeLeft();
                    if (timeLeft === undefined) {
                        clearInterval(interval);
                    }
                    setSecsUntilResend(timeLeft);
                }, 500);
                return function () {
                    // This can safely run twice
                    clearInterval(interval);
                };
            },
            [getTimeLeft, setSecsUntilResend]
        );
        return (0, jsx_runtime_1.jsx)(
            "button",
            tslib_1.__assign(
                {
                    type: "button",
                    disabled: secsUntilResend !== undefined,
                    onClick: onClick,
                    css: [styles.link, styles.linkButton, styles.resendCodeBtn],
                    "data-supertokens": "link linkButton resendCodeBtn",
                },
                {
                    children:
                        secsUntilResend !== undefined
                            ? (0, jsx_runtime_1.jsxs)(react_1.default.Fragment, {
                                  children: [
                                      t("PWLESS_RESEND_BTN_DISABLED_START"),
                                      (0, jsx_runtime_1.jsxs)("strong", {
                                          children: [
                                              Math.floor(secsUntilResend / 60)
                                                  .toString()
                                                  .padStart(2, "0"),
                                              ":",
                                              (secsUntilResend % 60).toString().padStart(2, "0"),
                                          ],
                                      }),
                                      t("PWLESS_RESEND_BTN_DISABLED_END"),
                                  ],
                              })
                            : loginAttemptInfo.contactMethod === "EMAIL"
                            ? t("PWLESS_RESEND_BTN_EMAIL")
                            : t("PWLESS_RESEND_BTN_PHONE"),
                }
            )
        );
    }
);
