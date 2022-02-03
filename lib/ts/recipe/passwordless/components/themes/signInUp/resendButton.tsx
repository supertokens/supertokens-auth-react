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
/** @jsx jsx */
import { jsx } from "@emotion/react";

import React, { useCallback, useContext, useEffect, useState } from "react";
import StyleContext from "../../../../../styles/styleContext";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { LoginAttemptInfo } from "../../../types";
import { useTranslation } from "../../../../../translation/translationContext";

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
        const styles = useContext(StyleContext);

        const getTimeLeft = useCallback(() => {
            const timeLeft = loginAttemptInfo.lastResend + resendEmailOrSMSGapInSeconds * 1000 - new Date().getTime();
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
                css={[styles.link, styles.linkButton, styles.resendCodeBtn]}
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
                ) : (
                    t("PWLESS_RESEND_BTN")
                )}
            </button>
        );
    }
);
