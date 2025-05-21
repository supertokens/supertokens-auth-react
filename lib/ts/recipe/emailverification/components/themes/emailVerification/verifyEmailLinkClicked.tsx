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

import { useCallback, useState } from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import ArrowRightIcon from "../../../../../components/assets/arrowRightIcon";
import CheckedRoundIcon from "../../../../../components/assets/checkedRoundIcon";
import ErrorLargeIcon from "../../../../../components/assets/errorLargeIcon";
import SpinnerIcon from "../../../../../components/assets/spinnerIcon";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import { useUserContext } from "../../../../../usercontext";
import { useOnMountAPICall } from "../../../../../utils";
import { Button } from "../../../../emailpassword/components/library";
import useSessionContext from "../../../../session/useSessionContext";

import type { Awaited } from "../../../../../types";
import type { VerifyEmailLinkClickedThemeProps } from "../../../types";

export const EmailVerificationVerifyEmailLinkClicked: React.FC<VerifyEmailLinkClickedThemeProps> = (props) => {
    const t = useTranslation();
    const sessionContext = useSessionContext();
    const userContext = useUserContext();
    const [status, setStatus] = useState<
        "LOADING" | "INTERACTION_REQUIRED" | "INVALID" | "GENERAL_ERROR" | "SUCCESSFUL"
    >("LOADING");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [verifyLoading, setVerifyLoading] = useState(false);

    const verifyEmailOnMount = useCallback(async () => {
        if (sessionContext.loading === true) {
            // This callback should only be called if the session is already loaded
            throw new Error("Should never come here");
        }
        // If there is no active session we know that the verification was started elsewhere, since it requires a session
        // otherwise we assume it's the same session. The main purpose of this is to prevent mail scanners
        // from accidentally validating an email address
        if (!sessionContext.doesSessionExist) {
            return "INTERACTION_REQUIRED";
        }

        return props.recipeImplementation.verifyEmail({
            userContext,
        });
    }, [props.recipeImplementation, sessionContext]);

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
        (err: any) => {
            if (STGeneralError.isThisError(err)) {
                setErrorMessage(err.message);
            }

            setStatus("GENERAL_ERROR");
        },
        [setStatus, setErrorMessage]
    );
    useOnMountAPICall(verifyEmailOnMount, handleVerifyResp, handleError, sessionContext.loading === false);

    const { onTokenInvalidRedirect, onSuccess } = props;

    if (status === "LOADING") {
        return (
            <div data-supertokens="container">
                <div data-supertokens="row">
                    <div data-supertokens="spinner">
                        <SpinnerIcon />
                    </div>
                </div>
            </div>
        );
    }

    if (status === "INTERACTION_REQUIRED") {
        return (
            <div data-supertokens="container">
                <div data-supertokens="row noFormRow">
                    <div data-supertokens="headerTitle">{t("EMAIL_VERIFICATION_LINK_CLICKED_HEADER")}</div>
                    <div data-supertokens="headerSubtitle secondaryText">
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
            <div data-supertokens="container">
                <div data-supertokens="row noFormRow">
                    <CheckedRoundIcon />
                    <div data-supertokens="headerTitle headerTinyTitle">{t("EMAIL_VERIFICATION_SUCCESS")}</div>
                    <div data-supertokens="emailVerificationButtonWrapper">
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
            <div data-supertokens="container">
                <div data-supertokens="row noFormRow">
                    <div data-supertokens="headerTitle headerTinyTitle">{t("EMAIL_VERIFICATION_EXPIRED")}</div>
                    <div onClick={onTokenInvalidRedirect} data-supertokens="secondaryText secondaryLinkWithArrow">
                        {t("EMAIL_VERIFICATION_CONTINUE_LINK")}{" "}
                        <ArrowRightIcon color="rgb(var(--palette-textPrimary))" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div data-supertokens="container">
            <div data-supertokens="row noFormRow">
                <div data-supertokens="headerTitle error">
                    <ErrorLargeIcon />
                    {t("EMAIL_VERIFICATION_ERROR_TITLE")}
                </div>
                <div data-supertokens="primaryText">
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
