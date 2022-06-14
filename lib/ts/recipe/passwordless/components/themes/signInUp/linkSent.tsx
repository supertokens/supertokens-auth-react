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

import { useCallback, useContext, useEffect, useRef, useState } from "react";

import StyleContext from "../../../../../styles/styleContext";
import ArrowLeftIcon from "../../../../../components/assets/arrowLeftIcon";
import EmailLargeIcon from "../../../../../components/assets/emailLargeIcon";
import { LinkSentThemeProps } from "../../../types";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { ResendButton } from "./resendButton";
import SMSLargeIcon from "../../../../../components/assets/smsLargeIcon";
import { useTranslation } from "../../../../../translation/translationContext";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { useUserContext } from "../../../../../usercontext";
import STGeneralError from "supertokens-web-js/utils/error";

const PasswordlessLinkSent: React.FC<LinkSentThemeProps> = (props) => {
    const styles = useContext(StyleContext);
    const t = useTranslation();
    const userContext = useUserContext();
    const [status, setStatus] = useState(props.error !== undefined ? "ERROR" : "READY");

    // Any because node types are included here, messing with return type of setTimeout
    const resendNotifTimeout = useRef<any>();

    useEffect(() => {
        return () => {
            // This can safely run even if it was cleared before
            if (resendNotifTimeout.current) {
                clearTimeout(resendNotifTimeout.current);
            }
        };
    }, []);

    const resendEmail = useCallback(async () => {
        try {
            props.clearError();
            let response;
            let generalError: STGeneralError | undefined;

            try {
                response = await props.recipeImplementation.resendCode({
                    deviceId: props.loginAttemptInfo.deviceId,
                    preAuthSessionId: props.loginAttemptInfo.preAuthSessionId,
                    userContext,
                });
            } catch (e) {
                if (STGeneralError.isThisError(e)) {
                    generalError = e;
                } else {
                    throw e;
                }
            }

            if (response !== undefined && response.status === "OK") {
                setStatus("LINK_RESENT");
                resendNotifTimeout.current = setTimeout(() => {
                    setStatus((status) => (status === "LINK_RESENT" ? "READY" : status));
                    resendNotifTimeout.current = undefined;
                }, 2000);
            } else {
                setStatus("ERROR");

                if (generalError !== undefined) {
                    props.onError(generalError.message);
                }
            }
        } catch (e) {
            setStatus("ERROR");
        }
    }, [props.recipeImplementation, props.loginAttemptInfo, props.config, setStatus]);

    const resendActive = status === "LINK_RESENT";

    return (
        <div data-supertokens="container" css={styles.container}>
            <div data-supertokens="row" css={styles.row}>
                {status === "ERROR" && (
                    <GeneralError error={props.error === undefined ? "SOMETHING_WENT_WRONG_ERROR" : props.error} />
                )}
                {resendActive && (
                    <div data-supertokens="generalSuccess" css={styles.generalSuccess}>
                        {t("PWLESS_LINK_SENT_RESEND_SUCCESS")}
                    </div>
                )}
                <div data-supertokens="sendCodeIcon" css={styles.sendCodeIcon}>
                    {props.loginAttemptInfo.contactMethod === "EMAIL" ? <EmailLargeIcon /> : <SMSLargeIcon />}
                </div>
                <div data-supertokens="headerTitle headerTinyTitle" css={[styles.headerTitle, styles.headerTinyTitle]}>
                    {t("PWLESS_LINK_SENT_RESEND_TITLE")}
                </div>
                <div data-supertokens="primaryText sendCodeText" css={[styles.primaryText, styles.sendCodeText]}>
                    {props.loginAttemptInfo.contactMethod === "EMAIL"
                        ? t("PWLESS_LINK_SENT_RESEND_DESC_START_EMAIL")
                        : t("PWLESS_LINK_SENT_RESEND_DESC_START_PHONE")}
                    <strong>{props.loginAttemptInfo.contactInfo}</strong>
                    {props.loginAttemptInfo.contactMethod === "EMAIL"
                        ? t("PWLESS_LINK_SENT_RESEND_DESC_END_EMAIL")
                        : t("PWLESS_LINK_SENT_RESEND_DESC_END_PHONE")}
                </div>
                <ResendButton
                    loginAttemptInfo={props.loginAttemptInfo}
                    resendEmailOrSMSGapInSeconds={props.config.signInUpFeature.resendEmailOrSMSGapInSeconds}
                    onClick={resendEmail}
                />
                {
                    <div
                        data-supertokens="secondaryText secondaryLinkWithLeftArrow"
                        css={[styles.secondaryText, styles.secondaryLinkWithLeftArrow]}
                        onClick={() =>
                            props.recipeImplementation.clearLoginAttemptInfo({
                                userContext,
                            })
                        }>
                        <ArrowLeftIcon color={styles.palette.colors.textPrimary} />
                        {props.loginAttemptInfo.contactMethod === "EMAIL"
                            ? t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL")
                            : t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE")}
                    </div>
                }
            </div>
        </div>
    );
};

export const LinkSent = withOverride("PasswordlessLinkSent", PasswordlessLinkSent);
