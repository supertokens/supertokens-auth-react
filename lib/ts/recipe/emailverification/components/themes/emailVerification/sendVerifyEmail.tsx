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
import { useContext, useEffect, useState } from "react";

import StyleContext from "../../../../../styles/styleContext";
import ArrowRightIcon from "../../../../../components/assets/arrowRightIcon";
import EmailLargeIcon from "../../../../../components/assets/emailLargeIcon";
import { SendVerifyEmailThemeProps } from "../../../types";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { useUserContext } from "../../../../../usercontext";
import STGeneralError from "supertokens-web-js/utils/error";

export const EmailVerificationSendVerifyEmail: React.FC<SendVerifyEmailThemeProps> = (props) => {
    const styles = useContext(StyleContext);
    const t = useTranslation();
    const userContext = useUserContext();
    const [status, setStatus] = useState("READY");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const resendEmail = async (): Promise<void> => {
        try {
            const response = await props.recipeImplementation.sendVerificationEmail({
                userContext,
            });

            if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
                await props.onEmailAlreadyVerified();
            } else if (response.status === "OK") {
                setStatus("EMAIL_RESENT");
            }
        } catch (e) {
            if (STGeneralError.isThisError(e)) {
                setErrorMessage(e.message);
            }

            setStatus("ERROR");
        }
    };

    useEffect(() => {
        const abort = new AbortController();
        void (async function () {
            try {
                // we send an email on load...
                const response = await props.recipeImplementation.sendVerificationEmail({
                    userContext,
                });
                if (abort.signal.aborted) {
                    return;
                }
                if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
                    await props.onEmailAlreadyVerified();
                }
            } catch (_) {
                /**
                 * In this case it would be strange for the user to land on a screen and see
                 * an error state. So we ignore the error here, if there is an error the user
                 * can use the resend button to trigger another email (resend has an error state
                 * if it fails)
                 */
            }
        })();

        return () => {
            abort.abort();
        };
    }, [props.recipeImplementation, props.onEmailAlreadyVerified, props.config, userContext]);

    const { signOut } = props;

    return (
        <div data-supertokens="container" css={styles.container}>
            <div data-supertokens="row" css={styles.row}>
                {status === "ERROR" && (
                    <GeneralError error={errorMessage === undefined ? "SOMETHING_WENT_WRONG_ERROR" : errorMessage} />
                )}
                {status === "EMAIL_RESENT" && (
                    <div data-supertokens="generalSuccess" css={styles.generalSuccess}>
                        {t("EMAIL_VERIFICATION_RESEND_SUCCESS")}
                    </div>
                )}
                <div data-supertokens="sendVerifyEmailIcon" css={styles.sendVerifyEmailIcon}>
                    <EmailLargeIcon />
                </div>
                <div data-supertokens="headerTitle headerTinyTitle" css={[styles.headerTitle, styles.headerTinyTitle]}>
                    {t("EMAIL_VERIFICATION_SEND_TITLE")}
                </div>
                <div
                    data-supertokens="primaryText sendVerifyEmailText"
                    css={[styles.primaryText, styles.sendVerifyEmailText]}>
                    {t("EMAIL_VERIFICATION_SEND_DESC_START")}
                    <strong>{t("EMAIL_VERIFICATION_SEND_DESC_STRONG")}</strong>
                    {t("EMAIL_VERIFICATION_SEND_DESC_END")}
                </div>
                {status !== "EMAIL_RESENT" && (
                    <div
                        data-supertokens="link sendVerifyEmailResend"
                        css={[styles.link, styles.sendVerifyEmailResend]}
                        onClick={resendEmail}>
                        {t("EMAIL_VERIFICATION_RESEND_BTN")}
                    </div>
                )}
                {
                    <div
                        data-supertokens="secondaryText secondaryLinkWithArrow"
                        css={[styles.secondaryText, styles.secondaryLinkWithArrow]}
                        onClick={() => signOut()}>
                        {t("EMAIL_VERIFICATION_LOGOUT")}
                        <ArrowRightIcon color={styles.palette.colors.textPrimary} />
                    </div>
                }
            </div>
        </div>
    );
};

export const SendVerifyEmail = withOverride("EmailVerificationSendVerifyEmail", EmailVerificationSendVerifyEmail);
