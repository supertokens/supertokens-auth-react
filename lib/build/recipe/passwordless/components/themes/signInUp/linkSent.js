"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkSent = void 0;
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
var react_1 = require("react");
var styleContext_1 = tslib_1.__importDefault(require("../../../../../styles/styleContext"));
var arrowLeftIcon_1 = tslib_1.__importDefault(require("../../../../../components/assets/arrowLeftIcon"));
var emailLargeIcon_1 = tslib_1.__importDefault(require("../../../../../components/assets/emailLargeIcon"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var resendButton_1 = require("./resendButton");
var smsLargeIcon_1 = tslib_1.__importDefault(require("../../../../../components/assets/smsLargeIcon"));
var translationContext_1 = require("../../../../../translation/translationContext");
var generalError_1 = tslib_1.__importDefault(require("../../../../emailpassword/components/library/generalError"));
var usercontext_1 = require("../../../../../usercontext");
var error_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/error"));
var PasswordlessLinkSent = function (props) {
    var styles = (0, react_1.useContext)(styleContext_1.default);
    var t = (0, translationContext_1.useTranslation)();
    var userContext = (0, usercontext_1.useUserContext)();
    var _a = (0, react_1.useState)(props.error !== undefined ? "ERROR" : "READY"),
        status = _a[0],
        setStatus = _a[1];
    // Any because node types are included here, messing with return type of setTimeout
    var resendNotifTimeout = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        return function () {
            // This can safely run even if it was cleared before
            if (resendNotifTimeout.current) {
                clearTimeout(resendNotifTimeout.current);
            }
        };
    }, []);
    var resendEmail = (0, react_1.useCallback)(
        function () {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var response, generalError, e_1, e_2;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            props.clearError();
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
                            if (response !== undefined && response.status === "OK") {
                                setStatus("LINK_RESENT");
                                resendNotifTimeout.current = setTimeout(function () {
                                    setStatus(function (status) {
                                        return status === "LINK_RESENT" ? "READY" : status;
                                    });
                                    resendNotifTimeout.current = undefined;
                                }, 2000);
                            } else {
                                setStatus("ERROR");
                                if (generalError !== undefined) {
                                    props.onError(generalError.message);
                                }
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            e_2 = _a.sent();
                            setStatus("ERROR");
                            return [3 /*break*/, 6];
                        case 6:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.recipeImplementation, props.loginAttemptInfo, props.config, setStatus]
    );
    var resendActive = status === "LINK_RESENT";
    return (0, jsx_runtime_1.jsx)(
        "div",
        tslib_1.__assign(
            { "data-supertokens": "container", css: styles.container },
            {
                children: (0, jsx_runtime_1.jsxs)(
                    "div",
                    tslib_1.__assign(
                        { "data-supertokens": "row", css: styles.row },
                        {
                            children: [
                                status === "ERROR" &&
                                    (0, jsx_runtime_1.jsx)(generalError_1.default, {
                                        error: props.error === undefined ? "SOMETHING_WENT_WRONG_ERROR" : props.error,
                                    }),
                                resendActive &&
                                    (0, jsx_runtime_1.jsx)(
                                        "div",
                                        tslib_1.__assign(
                                            { "data-supertokens": "generalSuccess", css: styles.generalSuccess },
                                            { children: t("PWLESS_LINK_SENT_RESEND_SUCCESS") }
                                        )
                                    ),
                                (0, jsx_runtime_1.jsx)(
                                    "div",
                                    tslib_1.__assign(
                                        { "data-supertokens": "sendCodeIcon", css: styles.sendCodeIcon },
                                        {
                                            children:
                                                props.loginAttemptInfo.contactMethod === "EMAIL"
                                                    ? (0, jsx_runtime_1.jsx)(emailLargeIcon_1.default, {})
                                                    : (0, jsx_runtime_1.jsx)(smsLargeIcon_1.default, {}),
                                        }
                                    )
                                ),
                                (0, jsx_runtime_1.jsx)(
                                    "div",
                                    tslib_1.__assign(
                                        {
                                            "data-supertokens": "headerTitle headerTinyTitle",
                                            css: [styles.headerTitle, styles.headerTinyTitle],
                                        },
                                        { children: t("PWLESS_LINK_SENT_RESEND_TITLE") }
                                    )
                                ),
                                (0, jsx_runtime_1.jsxs)(
                                    "div",
                                    tslib_1.__assign(
                                        {
                                            "data-supertokens": "primaryText sendCodeText",
                                            css: [styles.primaryText, styles.sendCodeText],
                                        },
                                        {
                                            children: [
                                                props.loginAttemptInfo.contactMethod === "EMAIL"
                                                    ? t("PWLESS_LINK_SENT_RESEND_DESC_START_EMAIL")
                                                    : t("PWLESS_LINK_SENT_RESEND_DESC_START_PHONE"),
                                                (0, jsx_runtime_1.jsx)("strong", {
                                                    children: props.loginAttemptInfo.contactInfo,
                                                }),
                                                props.loginAttemptInfo.contactMethod === "EMAIL"
                                                    ? t("PWLESS_LINK_SENT_RESEND_DESC_END_EMAIL")
                                                    : t("PWLESS_LINK_SENT_RESEND_DESC_END_PHONE"),
                                            ],
                                        }
                                    )
                                ),
                                (0, jsx_runtime_1.jsx)(resendButton_1.ResendButton, {
                                    loginAttemptInfo: props.loginAttemptInfo,
                                    resendEmailOrSMSGapInSeconds:
                                        props.config.signInUpFeature.resendEmailOrSMSGapInSeconds,
                                    onClick: resendEmail,
                                }),
                                (0, jsx_runtime_1.jsxs)(
                                    "div",
                                    tslib_1.__assign(
                                        {
                                            "data-supertokens": "secondaryText secondaryLinkWithLeftArrow",
                                            css: [styles.secondaryText, styles.secondaryLinkWithLeftArrow],
                                            onClick: function () {
                                                return props.recipeImplementation.clearLoginAttemptInfo({
                                                    userContext: userContext,
                                                });
                                            },
                                        },
                                        {
                                            children: [
                                                (0, jsx_runtime_1.jsx)(arrowLeftIcon_1.default, {
                                                    color: styles.palette.colors.textPrimary,
                                                }),
                                                props.loginAttemptInfo.contactMethod === "EMAIL"
                                                    ? t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL")
                                                    : t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE"),
                                            ],
                                        }
                                    )
                                ),
                            ],
                        }
                    )
                ),
            }
        )
    );
};
exports.LinkSent = (0, withOverride_1.withOverride)("PasswordlessLinkSent", PasswordlessLinkSent);
