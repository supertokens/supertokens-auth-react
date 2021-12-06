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

import React, { useContext, useEffect, useState } from "react";
import StyleContext from "../../../../../styles/styleContext";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { LoginAttemptInfo } from "../../../types";

export const ResendButton = withOverride(
    "PasswordlessResendButton",
    function PasswordlessResendButton({
        loginAttemptInfo,
        resendCodeTimeGap,
        target,
        onClick,
    }: {
        loginAttemptInfo: LoginAttemptInfo;
        resendCodeTimeGap: number;
        target: string;
        onClick: () => void;
    }): JSX.Element | null {
        const styles = useContext(StyleContext);

        const [secsUntilResend, setSecsUntilResend] = useState<number | undefined>();

        useEffect(() => {
            // This runs every time the loginAttemptInfo, so after every resend
            const interval = setInterval(() => {
                const timer = loginAttemptInfo.lastResend + resendCodeTimeGap * 1000 - new Date().getTime();
                if (timer <= 0) {
                    setSecsUntilResend(undefined);
                    clearInterval(interval);
                } else {
                    setSecsUntilResend(Math.ceil(timer / 1000));
                }
            });

            return () => {
                // This can safely run twice
                clearInterval(interval);
            };
        }, [resendCodeTimeGap, loginAttemptInfo, setSecsUntilResend]);

        return (
            <button
                type="button"
                disabled={secsUntilResend !== undefined}
                onClick={onClick}
                css={[styles.link, styles.linkButton, styles.resendCodeBtn]}
                data-supertokens="link linkButton resendCodeBtn">
                {secsUntilResend !== undefined ? (
                    <React.Fragment>
                        Resend again in{" "}
                        <strong>
                            {Math.floor(secsUntilResend / 60)
                                .toString()
                                .padStart(2, "0")}
                            :{(secsUntilResend % 60).toString().padStart(2, "0")}
                        </strong>
                    </React.Fragment>
                ) : (
                    `Resend ${target}`
                )}
            </button>
        );
    }
);
