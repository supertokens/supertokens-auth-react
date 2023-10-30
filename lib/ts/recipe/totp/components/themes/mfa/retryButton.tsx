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

export const RetryButton = withOverride(
    "TOTPRetryButton",
    function TOTPRetryButton({
        nextRetryAt,
        onClick,
    }: {
        nextRetryAt: number;
        onClick: () => void;
    }): JSX.Element | null {
        const t = useTranslation();

        const getTimeLeft = useCallback(() => {
            const timeLeft = nextRetryAt - Date.now();
            return timeLeft < 0 ? undefined : Math.ceil(timeLeft / 1000);
        }, [nextRetryAt]);

        const [secsUntilRetry, setSecsUntilRetry] = useState<number | undefined>(getTimeLeft());

        useEffect(() => {
            // This runs every time the loginAttemptInfo updates, so after every resend
            const interval = setInterval(() => {
                const timeLeft = getTimeLeft();

                if (timeLeft === undefined) {
                    clearInterval(interval);
                }

                setSecsUntilRetry(timeLeft);
            }, 500);

            return () => {
                // This can safely run twice
                clearInterval(interval);
            };
        }, [getTimeLeft, setSecsUntilRetry]);

        return (
            <button
                type="button"
                disabled={secsUntilRetry !== undefined}
                onClick={onClick}
                data-supertokens="button retryCodeBtn">
                {secsUntilRetry !== undefined ? (
                    <React.Fragment>
                        {t("TOTP_MFA_BLOCKED_TIMER_START")}
                        <strong>
                            {Math.floor(secsUntilRetry / 60)
                                .toString()
                                .padStart(2, "0")}
                            :{(secsUntilRetry % 60).toString().padStart(2, "0")}
                        </strong>
                        {t("TOTP_MFA_BLOCKED_TIMER_END")}
                    </React.Fragment>
                ) : (
                    t("TOTP_MFA_BLOCKED_RETRY")
                )}
            </button>
        );
    }
);
