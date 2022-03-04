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
import { SignInUpPhoneFormProps } from "../../../types";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import FormBase from "../../../../emailpassword/components/library/formBase";
import { phoneNumberInputWithInjectedProps } from "./phoneNumberInput";
import { defaultValidate } from "../../../../emailpassword/validators";
import { SignInUpFooter } from "./signInUpFooter";

export const PhoneForm = withOverride(
    "PasswordlessPhoneForm",
    function PasswordlessPhoneForm(props: SignInUpPhoneFormProps): JSX.Element {
        return (
            <FormBase
                clearError={props.clearError}
                onError={props.onError}
                formFields={[
                    {
                        id: "phoneNumber",
                        label: "PWLESS_SIGN_IN_UP_PHONE_LABEL",
                        inputComponent: phoneNumberInputWithInjectedProps({
                            defaultCountry: props.config.signInUpFeature.defaultCountry,
                        }),
                        optional: false,
                        autofocus: true,
                        placeholder: "",
                        validate: defaultValidate,
                    },
                ]}
                buttonLabel={"PWLESS_SIGN_IN_UP_CONTINUE_BUTTON"}
                onSuccess={props.onSuccess}
                callAPI={async (formFields) => {
                    const phoneNumber = formFields.find((field) => field.id === "phoneNumber")?.value;
                    if (phoneNumber === undefined) {
                        return {
                            status: "GENERAL_ERROR",
                            message: "GENERAL_ERROR_PHONE_UNDEFINED",
                        };
                    }
                    const validationRes = await props.config.validatePhoneNumber(phoneNumber);
                    if (validationRes !== undefined) {
                        return {
                            status: "GENERAL_ERROR",
                            message: validationRes,
                        };
                    }
                    const response = await props.recipeImplementation.createCode({
                        phoneNumber,
                        config: props.config,
                    });

                    return response;
                }}
                validateOnBlur={false}
                showLabels={true}
                footer={
                    <SignInUpFooter
                        privacyPolicyLink={props.config.signInUpFeature.privacyPolicyLink}
                        termsOfServiceLink={props.config.signInUpFeature.termsOfServiceLink}
                    />
                }
            />
        );
    }
);
