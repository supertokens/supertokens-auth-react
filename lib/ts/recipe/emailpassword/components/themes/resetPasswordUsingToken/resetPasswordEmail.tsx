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
import { useContext, useState } from "react";
import StyleContext from "../../../../../styles/styleContext";

import { EnterEmailProps, EnterEmailStatus } from "../../../types";

import FormBase from "../../library/formBase";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import { validateForm } from "../../../../../utils";
import GeneralError from "../../library/generalError";
import { useUserContext } from "../../../../../usercontext";
import BackToSignInButton from "../../library/backToSignInButton";
import BackButton from "../../library/backButton";

const EmailPasswordResetPasswordEmail: React.FC<EnterEmailProps> = (props) => {
    const styles = useContext(StyleContext);
    const t = useTranslation();
    const userContext = useUserContext();
    const [status, setStatus] = useState<EnterEmailStatus>("READY");
    const [emailFieldValue, setEmailFieldValue] = useState<string>("");

    const onSuccess = (): void => {
        setStatus("SENT");
    };

    const resend = (): void => {
        setStatus("READY");
    };
    const { formFields } = props;

    const emailSuccessText =
        t("EMAIL_PASSWORD_RESET_SEND_BEFORE_EMAIL") +
        (emailFieldValue !== undefined && emailFieldValue.length > 0
            ? emailFieldValue
            : t("EMAIL_PASSWORD_RESET_SEND_FALLBACK_EMAIL")) +
        t("EMAIL_PASSWORD_RESET_SEND_AFTER_EMAIL");

    if (status === "SENT") {
        return (
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row" css={styles.row}>
                    <div
                        data-supertokens="primaryText enterEmailSuccessMessage"
                        css={[styles.primaryText, styles.enterEmailSuccessMessage]}>
                        {emailSuccessText}
                        <span
                            data-supertokens="link resendEmailLink"
                            css={[styles.link, styles.resendEmailLink]}
                            onClick={resend}>
                            {t("EMAIL_PASSWORD_RESET_RESEND_LINK")}
                        </span>
                    </div>
                    <BackToSignInButton onClick={props.onBackButtonClicked} />
                </div>
            </div>
        );
    }

    // Otherwise, return Form.
    return (
        <div data-supertokens="container" css={styles.container}>
            <div data-supertokens="row" css={styles.row}>
                <div
                    data-supertokens="headerTitle resetPasswordHeaderTitle"
                    css={[styles.headerTitle, styles.resetPasswordHeaderTitle]}>
                    <BackButton onClick={props.onBackButtonClicked} />
                    {t("EMAIL_PASSWORD_RESET_HEADER_TITLE")}
                    <span
                        data-supertokens="backButtonPlaceholder backButtonCommon"
                        css={[styles.backButtonPlaceholder, styles.backButtonCommon]}>
                        {/* empty span for spacing the back button */}
                    </span>
                </div>
                <div data-supertokens="headerSubtitle" css={styles.headerSubtitle}>
                    <div data-supertokens="secondaryText" css={styles.secondaryText}>
                        {t("EMAIL_PASSWORD_RESET_HEADER_SUBTITLE")}
                    </div>
                </div>
                {props.error !== undefined && <GeneralError error={props.error} />}
                <FormBase
                    clearError={props.clearError}
                    onError={props.onError}
                    formFields={formFields}
                    buttonLabel={"EMAIL_PASSWORD_RESET_SEND_BTN"}
                    onSuccess={onSuccess}
                    callAPI={async (formFields) => {
                        const validationErrors = await validateForm(
                            formFields,
                            props.config.resetPasswordUsingTokenFeature.enterEmailForm.formFields
                        );

                        if (validationErrors.length > 0) {
                            return {
                                status: "FIELD_ERROR",
                                formFields: validationErrors,
                            };
                        }

                        const emailField = formFields.find((field) => {
                            return field.id === "email";
                        });

                        if (emailField !== undefined) {
                            setEmailFieldValue(emailField.value);
                        }

                        return await props.recipeImplementation.sendPasswordResetEmail({
                            formFields,
                            userContext,
                        });
                    }}
                    showLabels={true}
                    validateOnBlur={true}
                />
            </div>
        </div>
    );
};

export const ResetPasswordEmail = withOverride("EmailPasswordResetPasswordEmail", EmailPasswordResetPasswordEmail);
