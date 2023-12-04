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

import React from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useUserContext } from "../../../../../usercontext";
import FormBase from "../../../../emailpassword/components/library/formBase";
import { userInputCodeValidate } from "../../../../passwordless/validators"; // TODO: fix

import type { TOTPMFACommonProps } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/totp";

export const CodeForm = withOverride(
    "TOTPCodeForm",
    function TOTPCodeForm(
        props: TOTPMFACommonProps & {
            onSuccess: () => void;
            clearError: () => void;
            onError: (err: string) => void;
            footer?: JSX.Element;
        }
    ): JSX.Element {
        const userContext = useUserContext();

        return (
            <React.Fragment>
                <FormBase
                    formDataSupertokens="totp-mfa codeForm"
                    clearError={props.clearError}
                    onError={props.onError}
                    formFields={[
                        {
                            id: "totp",
                            label: "TOTP_CODE_INPUT_LABEL",
                            autofocus: true,
                            optional: false,
                            clearOnSubmit: true,
                            autoComplete: "one-time-code",
                            placeholder: "",
                            validate: userInputCodeValidate,
                        },
                    ]}
                    onSuccess={props.onSuccess}
                    buttonLabel={"TOTP_CODE_CONTINUE_BUTTON"}
                    callAPI={async (formFields) => {
                        const totp = formFields.find((field) => field.id === "totp")?.value;
                        if (totp === undefined || totp.length === 0) {
                            throw new STGeneralError("GENERAL_ERROR_OTP_UNDEFINED");
                        }
                        let response: Awaited<
                            ReturnType<RecipeInterface["verifyCode"]> | ReturnType<RecipeInterface["verifyDevice"]>
                        >;
                        if (props.featureState.deviceInfo) {
                            response = await props.recipeImplementation.verifyDevice({
                                deviceName: props.featureState.deviceInfo!.deviceName,
                                totp,
                                userContext,
                            });
                        } else {
                            response = await props.recipeImplementation.verifyCode({
                                totp,
                                userContext,
                            });
                        }

                        // We can return these statuses, since they all cause a redirection
                        // and we don't really want to show anything
                        if (
                            response.status === "OK" ||
                            response.status === "UNKNOWN_DEVICE_ERROR" ||
                            response.status === "LIMIT_REACHED_ERROR"
                        ) {
                            return response;
                        }

                        throw new STGeneralError("SOMETHING_WENT_WRONG_ERROR");
                    }}
                    validateOnBlur={false}
                    showLabels={true}
                    footer={props.footer}
                />
            </React.Fragment>
        );
    }
);
