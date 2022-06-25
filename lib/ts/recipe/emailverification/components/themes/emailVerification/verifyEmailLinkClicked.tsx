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

import { useCallback, useContext, useState } from "react";
import ArrowRightIcon from "../../../../../components/assets/arrowRightIcon";
import CheckedRoundIcon from "../../../../../components/assets/checkedRoundIcon";
import ErrorLargeIcon from "../../../../../components/assets/errorLargeIcon";
import SpinnerIcon from "../../../../../components/assets/spinnerIcon";
import StyleContext from "../../../../../styles/styleContext";
import { Button } from "../../../../emailpassword/components/library";

import { VerifyEmailLinkClickedThemeProps } from "../../../types";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import { useUserContext } from "../../../../../usercontext";
import { useOnMountAPICall } from "../../../../../utils";
import { Awaited } from "../../../../../types";
import STGeneralError from "supertokens-web-js/utils/error";
import useSessionContext from "../../../../session/useSessionContext";

export const EmailVerificationVerifyEmailLinkClicked: React.FC<VerifyEmailLinkClickedThemeProps> = (props) => {
    const styles = useContext(StyleContext);
    const t = useTranslation();
    const sessionContext = useSessionContext();
    const userContext = useUserContext();
    const [status, setStatus] = useState<
        "LOADING" | "INTERACTION_REQUIRED" | "INVALID" | "GENERAL_ERROR" | "SUCCESSFUL"
    >("LOADING");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [verifyLoading, setVerifyLoading] = useState(false);

    const verifyEmailOnMount = useCallback(async () => {
        // If there is no active session we know that the verification was started elsewhere, since it requires a session
        // otherwise we assume it's the same session. The main purpose of this is to prevent mail scanners
        // from accidentally validating an email address
        if (sessionContext.loading === false && sessionContext.doesSessionExist) {
            return "INTERACTION_REQUIRED";
        }

        return props.recipeImplementation.verifyEmail({
            userContext,
        });
    }, [props.recipeImplementation]);

    const handleVerifyResp = useCallback(
        async (response: Awaited<ReturnType<typeof verifyEmailOnMount>>): Promise<void> => {
            if (response === "INTERACTION_REQUIRED") {
                setStatus("INTERACTION_REQUIRED");
            } else if (response.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
                setStatus("INVALID");
            } else {
                setStatus("SUCCESSFUL");
            }
        },
        [setStatus]
    );
    const handleError = useCallback(
        (err) => {
            if (STGeneralError.isThisError(err)) {
                setErrorMessage(err.message);
            }

            setStatus("GENERAL_ERROR");
        },
        [setStatus, setErrorMessage]
    );
    useOnMountAPICall(verifyEmailOnMount, handleVerifyResp, handleError);

    const { onTokenInvalidRedirect, onSuccess } = props;

    if (status === "LOADING") {
        return (
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row" css={styles.row}>
                    <div data-supertokens="spinner" css={styles.spinner}>
                        <SpinnerIcon color={styles.palette.colors.primary} />
                    </div>
                </div>
            </div>
        );
    }

    if (status === "INTERACTION_REQUIRED") {
        return (
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row noFormRow" css={[styles.row, styles.noFormRow]}>
                    <div data-supertokens="headerTitle" css={styles.headerTitle}>
                        {t("EMAIL_VERIFICATION_LINK_CLICKED_HEADER")}
                    </div>
                    <div
                        data-supertokens="headerSubtitle secondaryText"
                        css={[styles.headerSubtitle, styles.secondaryText]}>
                        {t("EMAIL_VERIFICATION_LINK_CLICKED_DESC")}
                    </div>
                    {/* We are not adding an emailVerificationButtonWrapper because headerSubtitle already has a margin */}
                    <Button
                        isLoading={verifyLoading}
                        onClick={async () => {
                            setVerifyLoading(true);
                            try {
                                const resp = await props.recipeImplementation.verifyEmail({
                                    userContext,
                                });
                                await handleVerifyResp(resp);
                            } catch (err) {
                                void handleError(err);
                            }
                        }}
                        type="button"
                        label={"EMAIL_VERIFICATION_LINK_CLICKED_CONTINUE_BUTTON"}
                    />
                </div>
            </div>
        );
    }

    if (status === "SUCCESSFUL") {
        return (
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row noFormRow" css={[styles.row, styles.noFormRow]}>
                    <CheckedRoundIcon color={styles.palette.colors.success} />
                    <div
                        data-supertokens="headerTitle headerTinyTitle"
                        css={[styles.headerTitle, styles.headerTinyTitle]}>
                        {t("EMAIL_VERIFICATION_SUCCESS")}
                    </div>
                    <div data-supertokens="emailVerificationButtonWrapper" css={styles.emailVerificationButtonWrapper}>
                        <Button
                            isLoading={false}
                            onClick={onSuccess}
                            type="button"
                            label={"EMAIL_VERIFICATION_CONTINUE_BTN"}
                        />
                    </div>
                </div>
            </div>
        );
    }

    if (status === "INVALID") {
        return (
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row noFormRow" css={[styles.row, styles.noFormRow]}>
                    <div
                        data-supertokens="headerTitle headerTinyTitle"
                        css={[styles.headerTitle, styles.headerTinyTitle]}>
                        {t("EMAIL_VERIFICATION_EXPIRED")}
                    </div>
                    <div
                        onClick={onTokenInvalidRedirect}
                        data-supertokens="secondaryText secondaryLinkWithArrow"
                        css={[styles.secondaryText, styles.secondaryLinkWithArrow]}>
                        {t("EMAIL_VERIFICATION_CONTINUE_LINK")}
                        <ArrowRightIcon color={styles.palette.colors.textPrimary} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div data-supertokens="container" css={styles.container}>
            <div data-supertokens="row noFormRow" css={[styles.row, styles.noFormRow]}>
                <div data-supertokens="headerTitle error" css={[styles.headerTitle, styles.error]}>
                    <ErrorLargeIcon color={styles.palette.colors.error} />
                    {t("EMAIL_VERIFICATION_ERROR_TITLE")}
                </div>
                <div data-supertokens="primaryText" css={styles.primaryText}>
                    {t(errorMessage === undefined ? "EMAIL_VERIFICATION_ERROR_DESC" : errorMessage)}
                </div>
            </div>
        </div>
    );
};

export const VerifyEmailLinkClicked = withOverride(
    "EmailVerificationVerifyEmailLinkClicked",
    EmailVerificationVerifyEmailLinkClicked
);
