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
import { Fragment, useContext, useState } from "react";
import StyleContext from "../../../../../styles/styleContext";

import { SubmitNewPasswordProps, SubmitNewPasswordStatus } from "../../../types";
import { FormRow, Button } from "../../library";
import FormBase from "../../library/formBase";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";

const EmailPasswordSubmitNewPassword: React.FC<SubmitNewPasswordProps> = (props) => {
    const styles = useContext(StyleContext);
    const t = useTranslation();
    const [status, setStatus] = useState<SubmitNewPasswordStatus>("READY");

    const onSuccess = (): void => {
        setStatus("SUCCESS");
    };

    const { formFields, onSignInClicked } = props;

    if (status === "SUCCESS") {
        return (
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row" css={styles.row}>
                    <div data-supertokens="headerTitle" css={styles.headerTitle}>
                        {t("EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE")}
                    </div>
                    <FormRow key="form-button">
                        <Fragment>
                            <div
                                data-supertokens="primaryText submitNewPasswordSuccessMessage"
                                css={[styles.primaryText, styles.submitNewPasswordSuccessMessage]}>
                                {t("EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC")}
                            </div>
                            <Button
                                disabled={false}
                                isLoading={false}
                                type="button"
                                onClick={onSignInClicked}
                                label={"EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN"}
                            />
                        </Fragment>
                    </FormRow>
                </div>
            </div>
        );
    }

    return (
        <div data-supertokens="container" css={styles.container}>
            <div data-supertokens="row" css={styles.row}>
                <FormBase
                    formFields={formFields}
                    buttonLabel={"EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN"}
                    onSuccess={onSuccess}
                    validateOnBlur={true}
                    callAPI={async (fields) => {
                        const response = await props.recipeImplementation.submitNewPassword({
                            formFields: fields,
                            token: props.token,
                            config: props.config,
                        });
                        if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
                            return {
                                status: "GENERAL_ERROR",
                                message: "EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR",
                            };
                        }
                        return response.status === "FIELD_ERROR"
                            ? response
                            : {
                                  status: "OK",
                              };
                    }}
                    showLabels={true}
                    header={
                        <Fragment>
                            <div data-supertokens="headerTitle" css={styles.headerTitle}>
                                {t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE")}
                            </div>
                            <div data-supertokens="headerSubtitle" css={styles.headerSubtitle}>
                                <div data-supertokens="secondaryText" css={styles.secondaryText}>
                                    {t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE")}
                                </div>
                            </div>
                        </Fragment>
                    }
                />
            </div>
        </div>
    );
};

export const SubmitNewPassword = withOverride("EmailPasswordSubmitNewPassword", EmailPasswordSubmitNewPassword);
