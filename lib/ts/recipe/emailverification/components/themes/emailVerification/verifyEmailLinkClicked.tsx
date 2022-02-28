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
import ArrowRightIcon from "../../../../../components/assets/arrowRightIcon";
import CheckedRoundIcon from "../../../../../components/assets/checkedRoundIcon";
import ErrorLargeIcon from "../../../../../components/assets/errorLargeIcon";
import SpinnerIcon from "../../../../../components/assets/spinnerIcon";
import StyleContext from "../../../../../styles/styleContext";
import { Button } from "../../../../emailpassword/components/library";

import { VerifyEmailLinkClickedThemeProps } from "../../../types";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";

/*
 * Component.
 */

export const EmailVerificationVerifyEmailLinkClicked: React.FC<VerifyEmailLinkClickedThemeProps> = (props) => {
    const styles = useContext(StyleContext);
    const t = useTranslation();
    const [status, setStatus] = useState<"LOADING" | "INVALID" | "GENERAL_ERROR" | "SUCCESSFUL">("LOADING");

    useEffect(() => {
        const abortController = new AbortController();
        void (async () => {
            try {
                // TODO NEMI: handle user context for pre built UI
                const response = await props.recipeImplementation.verifyEmail({
                    config: props.recipe.webJsRecipe.config,
                    userContext: {},
                });
                if (abortController.signal.aborted) {
                    return;
                }

                if (response.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
                    setStatus("INVALID");
                } else {
                    setStatus("SUCCESSFUL");
                }
            } catch (e) {
                setStatus("GENERAL_ERROR");
            }
        })();

        return () => {
            abortController.abort();
        };
    }, [props.recipeImplementation, props.config, props.token]);

    const { onTokenInvalidRedirect, onContinueClicked } = props;

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
                            onClick={onContinueClicked}
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
                    {t("EMAIL_VERIFICATION_ERROR_DESC")}
                </div>
            </div>
        </div>
    );
};

export const VerifyEmailLinkClicked = withOverride(
    "EmailVerificationVerifyEmailLinkClicked",
    EmailVerificationVerifyEmailLinkClicked
);
