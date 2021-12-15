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

/** @jsx jsx */
import { jsx } from "@emotion/react";
import { SignInUpUserInputCodeFormProps } from "../../../types";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import FormBase from "../../../../emailpassword/components/library/formBase";
import { userInputCodeValidate } from "../../../validators";
import { Label } from "../../../../emailpassword/components/library";
import React, { useContext, useEffect, useState } from "react";
import StyleContext from "../../../../../styles/styleContext";
import { SOMETHING_WENT_WRONG_ERROR } from "../../../../../constants";
import { ResendButton } from "./resendButton";

export const UserInputCodeForm = withOverride(
    "PasswordlessUserInputCodeForm",
    function PasswordlessUserInputCodeForm(
        props: SignInUpUserInputCodeFormProps & {
            header?: JSX.Element;
            footer?: JSX.Element;
        }
    ): JSX.Element {
        const styles = useContext(StyleContext);

        const [clearResendNotifTimeout, setClearResendNotifTimeout] = useState<any | undefined>();
        const [error, setError] = useState<string | undefined>();

        useEffect(() => {
            // This is just to clean u
            return () => {
                clearTimeout(clearResendNotifTimeout);
            };
        }, [clearResendNotifTimeout]);

        async function resend() {
            try {
                const response = await props.recipeImplementation.resendCode({
                    deviceId: props.loginAttemptInfo.deviceId,
                    preAuthSessionId: props.loginAttemptInfo.preAuthSessionId,
                    config: props.config,
                });

                if (response.status === "OK") {
                    setClearResendNotifTimeout(
                        setTimeout(() => {
                            setClearResendNotifTimeout(undefined);
                        }, 2000) // We need this cast because the node types are also loaded
                    );
                } else if (response.status === "GENERAL_ERROR") {
                    setError(response.message);
                }
            } catch (e) {
                setError(SOMETHING_WENT_WRONG_ERROR);
            }
        }

        const resendTarget =
            props.loginAttemptInfo.flowType === "USER_INPUT_CODE"
                ? "OTP"
                : props.loginAttemptInfo.contactMethod === "EMAIL"
                ? "Email"
                : "SMS";
        return (
            <React.Fragment>
                {props.header}
                {clearResendNotifTimeout !== undefined && (
                    <div
                        data-supertokens="generalSuccess resendSuccess"
                        css={[styles.generalSuccess, styles.resendSuccess]}>
                        {resendTarget} resent
                    </div>
                )}
                {error !== undefined && (
                    <div data-supertokens="generalError" css={[styles.generalError]}>
                        {error}
                    </div>
                )}
                <FormBase
                    formFields={[
                        {
                            id: "userInputCode",
                            label: "",
                            labelComponent: (
                                <div css={styles.codeInputLabelWrapper} data-supertokens="codeInputLabelWrapper">
                                    <Label value={"OTP"} data-supertokens="codeInputLabel" />
                                    <ResendButton
                                        loginAttemptInfo={props.loginAttemptInfo}
                                        resendCodeTimeGapInSeconds={props.config.resendCodeTimeGapInSeconds}
                                        target={resendTarget}
                                        onClick={resend}
                                    />
                                </div>
                            ),
                            optional: false,
                            placeholder: "A1223B",
                            validate: userInputCodeValidate,
                        },
                    ]}
                    onSuccess={props.onSuccess}
                    buttonLabel={"CONTINUE"}
                    callAPI={async (formFields) => {
                        const userInputCode = formFields.find((field) => field.id === "userInputCode")?.value;
                        if (userInputCode === undefined || userInputCode.length === 0) {
                            return {
                                status: "GENERAL_ERROR",
                                message: "Please fill your OTP",
                            };
                        }
                        const response = await props.recipeImplementation.consumeCode({
                            deviceId: props.loginAttemptInfo.deviceId,
                            preAuthSessionId: props.loginAttemptInfo.preAuthSessionId,
                            userInputCode,
                            config: props.config,
                        });

                        if (response.status === "OK") {
                            return response;
                        }

                        if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
                            return {
                                status: "FIELD_ERROR",
                                formFields: [
                                    {
                                        id: "userInputCode",
                                        error: `Invalid OTP. Attempts left: ${(
                                            response.maximumCodeInputAttempts - response.failedCodeInputAttemptCount
                                        )
                                            .toString()
                                            .padStart(2, "0")}`,
                                    },
                                ],
                            };
                        }

                        if (response.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
                            return {
                                status: "FIELD_ERROR",
                                formFields: [
                                    {
                                        id: "userInputCode",
                                        error: `Expired OTP. Attempts left: ${(
                                            response.maximumCodeInputAttempts - response.failedCodeInputAttemptCount
                                        )
                                            .toString()
                                            .padStart(2, "0")}`,
                                    },
                                ],
                            };
                        }

                        return {
                            status: "GENERAL_ERROR",
                            message: "Something went wrong, please try again.",
                        };
                    }}
                    validateOnBlur={false}
                    showLabels={true}
                    footer={props.footer}
                />
            </React.Fragment>
        );
    }
);
