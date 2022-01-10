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
import { SignInUpEmailOrPhoneFormProps } from "../../../types";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import FormBase from "../../../../emailpassword/components/library/formBase";
import { phoneNumberInputWithInjectedProps } from "./phoneNumberInput";
import { defaultEmailValidator, defaultValidate } from "../../../../emailpassword/validators";
import { useState } from "react";

export const EmailOrPhoneForm = withOverride(
    "PasswordlessEmailOrPhoneForm",
    function PasswordlessEmailOrPhoneForm(
        props: SignInUpEmailOrPhoneFormProps & {
            header?: JSX.Element;
            footer?: JSX.Element;
        }
    ): JSX.Element {
        const [phoneNumberVal, setPhoneNumberVal] = useState<string | undefined>();
        return (
            <FormBase
                formFields={[
                    {
                        id: "emailOrPhone",
                        label: "Your Email address or Phone number",
                        inputComponent: phoneNumberVal
                            ? phoneNumberInputWithInjectedProps({
                                  defaultCountry: props.config.signInUpFeature.defaultCountry || "HU",
                                  initialValue: phoneNumberVal,
                              })
                            : undefined,
                        optional: false,
                        placeholder: "Email address or Phone number",
                        validate: defaultValidate,
                    },
                ]}
                buttonLabel={"CONTINUE"}
                onSuccess={props.onSuccess}
                callAPI={async (formFields) => {
                    const emailOrPhone = formFields.find((field) => field.id === "emailOrPhone")?.value;
                    if (emailOrPhone === undefined) {
                        return {
                            status: "GENERAL_ERROR",
                            message: "Please add an email or phone number above.",
                        };
                    }

                    if ((await defaultEmailValidator(emailOrPhone)) === undefined) {
                        const emailValidationRes = await props.config.validateEmailAddress(emailOrPhone);
                        if (emailValidationRes === undefined) {
                            return await props.recipeImplementation.createCode({
                                email: emailOrPhone,
                                config: props.config,
                            });
                        } else {
                            return {
                                status: "GENERAL_ERROR",
                                message: emailValidationRes,
                            };
                        }
                    } else {
                        const phoneValidationRes = await props.config.validatePhoneNumber(emailOrPhone);
                        if (phoneValidationRes === undefined) {
                            return await props.recipeImplementation.createCode({
                                phoneNumber: emailOrPhone,
                                config: props.config,
                            });
                        }

                        const intPhoneNumber =
                            await props.config.signInUpFeature.guessInternationPhoneNumberFromInputPhoneNumber(
                                emailOrPhone,
                                props.config.signInUpFeature.defaultCountry
                            );

                        if (intPhoneNumber) {
                            setPhoneNumberVal(intPhoneNumber);
                            return {
                                status: "GENERAL_ERROR",
                                message: "Phone number must include the country code.",
                            };
                        } else {
                            return {
                                status: "GENERAL_ERROR",
                                message: phoneValidationRes,
                            };
                        }
                    }
                }}
                validateOnBlur={false}
                showLabels={true}
                header={props.header}
                footer={props.footer}
                error={props.error}
            />
        );
    }
);
