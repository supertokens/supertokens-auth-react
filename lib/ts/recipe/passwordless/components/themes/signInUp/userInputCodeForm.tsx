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

import { SignInUpUserInputCodeFormProps } from "../../../types";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import FormBase from "../../../../emailpassword/components/library/formBase";
import { userInputCodeValidate } from "../../../validators";
import { Label } from "../../../../emailpassword/components/library";
import React, { useContext, useEffect, useState } from "react";
import StyleContext from "../../../../../styles/styleContext";
import { ResendButton } from "./resendButton";
import { useTranslation } from "../../../../../translation/translationContext";
import STGeneralError from "supertokens-web-js/utils/error";
import { useUserContext } from "../../../../../usercontext";
import { UserInputCodeFormFooter } from "./userInputCodeFormFooter";

export const UserInputCodeForm = withOverride(
    "PasswordlessUserInputCodeForm",
    function PasswordlessUserInputCodeForm(
        props: SignInUpUserInputCodeFormProps & {
            header?: JSX.Element;
            footer?: JSX.Element;
        }
    ): JSX.Element {
        const styles = useContext(StyleContext);
        const t = useTranslation();
        const userContext = useUserContext();

        // We need this any because the node types are also loaded
        const [clearResendNotifTimeout, setClearResendNotifTimeout] = useState<any | undefined>();

        useEffect(() => {
            // This is just to clean up on unmount and if the clear timeout changes
            return () => {
                clearTimeout(clearResendNotifTimeout);
            };
        }, [clearResendNotifTimeout]);

        async function resend() {
            try {
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

                if (generalError !== undefined) {
                    props.onError(generalError.message);
                } else {
                    if (response === undefined) {
                        throw new Error("Should not come here");
                    }

                    if (response.status === "OK") {
                        setClearResendNotifTimeout(
                            setTimeout(() => {
                                setClearResendNotifTimeout(undefined);
                            }, 2000)
                        );
                    }
                }
            } catch (e) {
                props.onError("SOMETHING_WENT_WRONG_ERROR");
            }
        }

        return (
            <React.Fragment>
                {clearResendNotifTimeout !== undefined && (
                    <div data-supertokens="generalSuccess" css={[styles.generalSuccess]}>
                        {props.loginAttemptInfo.contactMethod === "EMAIL"
                            ? t("PWLESS_RESEND_SUCCESS_EMAIL")
                            : t("PWLESS_RESEND_SUCCESS_PHONE")}
                    </div>
                )}

                <FormBase
                    clearError={props.clearError}
                    onError={props.onError}
                    formFields={[
                        {
                            id: "userInputCode",
                            label: "",
                            labelComponent: (
                                <div css={styles.codeInputLabelWrapper} data-supertokens="codeInputLabelWrapper">
                                    <Label
                                        value={"PWLESS_USER_INPUT_CODE_INPUT_LABEL"}
                                        data-supertokens="codeInputLabel"
                                    />
                                    <ResendButton
                                        loginAttemptInfo={props.loginAttemptInfo}
                                        resendEmailOrSMSGapInSeconds={
                                            props.config.signInUpFeature.resendEmailOrSMSGapInSeconds
                                        }
                                        onClick={resend}
                                    />
                                </div>
                            ),
                            autofocus: true,
                            optional: false,
                            clearOnSubmit: true,
                            placeholder: "",
                            validate: userInputCodeValidate,
                        },
                    ]}
                    onSuccess={props.onSuccess}
                    buttonLabel={"PWLESS_SIGN_IN_UP_CONTINUE_BUTTON"}
                    callAPI={async (formFields) => {
                        const userInputCode = formFields.find((field) => field.id === "userInputCode")?.value;
                        if (userInputCode === undefined || userInputCode.length === 0) {
                            throw new STGeneralError("GENERAL_ERROR_OTP_UNDEFINED");
                        }
                        const response = await props.recipeImplementation.consumeCode({
                            deviceId: props.loginAttemptInfo.deviceId,
                            preAuthSessionId: props.loginAttemptInfo.preAuthSessionId,
                            userInputCode,
                            userContext,
                        });

                        if (response.status === "OK" || response.status === "RESTART_FLOW_ERROR") {
                            return response;
                        }

                        if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
                            throw new STGeneralError("GENERAL_ERROR_OTP_INVALID");
                        }

                        if (response.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
                            throw new STGeneralError("GENERAL_ERROR_OTP_EXPIRED");
                        }

                        throw new STGeneralError("SOMETHING_WENT_WRONG_ERROR");
                    }}
                    validateOnBlur={false}
                    showLabels={true}
                    footer={<UserInputCodeFormFooter {...props} loginAttemptInfo={props.loginAttemptInfo} />}
                />
            </React.Fragment>
        );
    }
);
