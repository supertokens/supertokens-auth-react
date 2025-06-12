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
import { Fragment, useState } from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import { useUserContext } from "../../../../../usercontext";
import { validateForm } from "../../../../../utils";
import { FormRow, Button } from "../../library";
import FormBase from "../../library/formBase";
import GeneralError from "../../library/generalError";

import type { SubmitNewPasswordProps, SubmitNewPasswordStatus } from "../../../types";

const EmailPasswordSubmitNewPassword: React.FC<
    SubmitNewPasswordProps & {
        footer?: JSX.Element;
    }
> = (props) => {
    const t = useTranslation();
    const userContext = useUserContext();
    const [status, setStatus] = useState<SubmitNewPasswordStatus>("READY");

    const onSuccess = (): void => {
        setStatus("SUCCESS");
    };

    const { formFields, onSignInClicked } = props;

    if (status === "SUCCESS") {
        return (
            <div data-supertokens="container">
                <div data-supertokens="row">
                    <div data-supertokens="headerTitle">{t("EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE")}</div>
                    <FormRow key="form-button">
                        <Fragment>
                            <div data-supertokens="primaryText submitNewPasswordSuccessMessage">
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
        <div data-supertokens="container resetPasswordPasswordForm">
            <div data-supertokens="row">
                <div data-supertokens="headerTitle">{t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE")}</div>
                <div data-supertokens="headerSubtitle secondaryText">
                    {t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE")}
                </div>
                {props.error !== undefined && <GeneralError error={props.error} />}
                <FormBase
                    formFields={formFields}
                    clearError={props.clearError}
                    onError={props.onError}
                    buttonLabel={"EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN"}
                    onSuccess={onSuccess}
                    validateOnBlur={true}
                    callAPI={async (fields) => {
                        const validationErrors = await validateForm(
                            fields,
                            props.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.formFields
                        );

                        if (validationErrors.length > 0) {
                            return {
                                status: "FIELD_ERROR",
                                formFields: validationErrors,
                            };
                        }

                        // Verify that both passwords match.
                        if (fields[0].value !== fields[1].value) {
                            return {
                                status: "FIELD_ERROR",
                                formFields: [
                                    {
                                        id: fields[1].id,
                                        error: "ERROR_CONFIRM_PASSWORD_NO_MATCH",
                                    },
                                ],
                            };
                        }

                        const response = await props.recipeImplementation.submitNewPassword({
                            formFields: fields,
                            userContext,
                        });
                        if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
                            throw new STGeneralError("EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR");
                        }

                        return response.status === "FIELD_ERROR"
                            ? response
                            : {
                                  status: "OK",
                              };
                    }}
                    showLabels={true}
                    footer={props.footer}
                />
            </div>
        </div>
    );
};

export const SubmitNewPassword = withOverride("EmailPasswordSubmitNewPassword", EmailPasswordSubmitNewPassword);
