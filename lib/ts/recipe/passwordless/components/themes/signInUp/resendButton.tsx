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

import React, { useCallback, useEffect, useState } from "react";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";

import type { LoginAttemptInfo } from "../../../types";

export const ResendButton = withOverride(
    "PasswordlessResendButton",
    function PasswordlessResendButton({
        loginAttemptInfo,
        resendEmailOrSMSGapInSeconds,
        onClick,
    }: {
        loginAttemptInfo: LoginAttemptInfo;
        resendEmailOrSMSGapInSeconds: number;
        onClick: () => void;
    }): JSX.Element | null {
        const t = useTranslation();

        const getTimeLeft = useCallback(() => {
            const timeLeft = loginAttemptInfo.lastResend + resendEmailOrSMSGapInSeconds * 1000 - Date.now();
            return timeLeft < 0 ? undefined : Math.ceil(timeLeft / 1000);
        }, [loginAttemptInfo, resendEmailOrSMSGapInSeconds]);

        const [secsUntilResend, setSecsUntilResend] = useState<number | undefined>(getTimeLeft());

        useEffect(() => {
            // This runs every time the loginAttemptInfo updates, so after every resend
            const interval = setInterval(() => {
                const timeLeft = getTimeLeft();

                if (timeLeft === undefined) {
                    clearInterval(interval);
                }

                setSecsUntilResend(timeLeft);
            }, 500);

            return () => {
                // This can safely run twice
                clearInterval(interval);
            };
        }, [getTimeLeft, setSecsUntilResend]);

        return (
            <button
                type="button"
                disabled={secsUntilResend !== undefined}
                onClick={onClick}
                data-supertokens="link linkButton resendCodeBtn">
                {secsUntilResend !== undefined ? (
                    <React.Fragment>
                        {t("PWLESS_RESEND_BTN_DISABLED_START")}
                        <strong>
                            {Math.floor(secsUntilResend / 60)
                                .toString()
                                .padStart(2, "0")}
                            :{(secsUntilResend % 60).toString().padStart(2, "0")}
                        </strong>
                        {t("PWLESS_RESEND_BTN_DISABLED_END")}
                    </React.Fragment>
                ) : loginAttemptInfo.contactMethod === "EMAIL" ? (
                    t("PWLESS_RESEND_BTN_EMAIL")
                ) : (
                    t("PWLESS_RESEND_BTN_PHONE")
                )}
            </button>
        );
    }
);
