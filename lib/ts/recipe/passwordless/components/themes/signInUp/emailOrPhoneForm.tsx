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
import STGeneralError from "supertokens-web-js/lib/build/error";
import { useUserContext } from "../../../../../usercontext";

export const EmailOrPhoneForm = withOverride(
    "PasswordlessEmailOrPhoneForm",
    function PasswordlessEmailOrPhoneForm(
        props: SignInUpEmailOrPhoneFormProps & {
            header?: JSX.Element;
            footer?: JSX.Element;
        }
    ): JSX.Element {
        const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false);
        const userContext = useUserContext();

        return (
            <FormBase
                clearError={props.clearError}
                onError={props.onError}
                formFields={[
                    {
                        id: "emailOrPhone",
                        label: "PWLESS_SIGN_IN_UP_EMAIL_OR_PHONE_LABEL",
                        inputComponent: isPhoneNumber
                            ? phoneNumberInputWithInjectedProps({
                                  defaultCountry: props.config.signInUpFeature.defaultCountry,
                              })
                            : undefined,
                        optional: false,
                        autofocus: true,
                        placeholder: "",
                        validate: defaultValidate,
                    },
                ]}
                buttonLabel={"PWLESS_SIGN_IN_UP_CONTINUE_BUTTON"}
                onSuccess={props.onSuccess}
                callAPI={async (formFields, setValue) => {
                    const emailOrPhone = formFields.find((field) => field.id === "emailOrPhone")?.value;
                    if (emailOrPhone === undefined) {
                        throw new STGeneralError("GENERAL_ERROR_EMAIL_OR_PHONE_UNDEFINED");
                    }

                    // We check if it looks like an email by default. Even if this fails (e.g., the user mistyped the @ symbol),
                    // the guessInternationPhoneNumberFromInputPhoneNumber can decide to not change to the phone UI.
                    // By default it stays on the combined input in 2 cases:
                    // - if the input contains the @ symbol
                    // - if less than half of the input looks like a phone number
                    if ((await defaultEmailValidator(emailOrPhone)) === undefined) {
                        const emailValidationRes = await props.config.validateEmailAddress(emailOrPhone);
                        if (emailValidationRes === undefined) {
                            const response = await props.recipeImplementation.createCode({
                                email: emailOrPhone,
                                config: props.config,
                                userContext,
                            });

                            if (response.status === "GENERAL_ERROR") {
                                throw new STGeneralError(response.message);
                            }

                            return response;
                        } else {
                            throw new STGeneralError(emailValidationRes);
                        }
                    } else {
                        const phoneValidationRes = await props.config.validatePhoneNumber(emailOrPhone);
                        if (phoneValidationRes === undefined) {
                            const response = await props.recipeImplementation.createCode({
                                phoneNumber: emailOrPhone,
                                config: props.config,
                                userContext,
                            });

                            if (response.status === "GENERAL_ERROR") {
                                throw new STGeneralError(response.message);
                            }

                            return response;
                        }

                        const intPhoneNumber =
                            await props.config.signInUpFeature.guessInternationPhoneNumberFromInputPhoneNumber(
                                emailOrPhone,
                                props.config.signInUpFeature.defaultCountry
                            );

                        if (intPhoneNumber && isPhoneNumber !== true) {
                            setValue("emailOrPhone", intPhoneNumber);
                            setIsPhoneNumber(true);
                            throw new STGeneralError("PWLESS_EMAIL_OR_PHONE_INVALID_INPUT_GUESS_PHONE_ERR");
                        } else {
                            throw new STGeneralError(phoneValidationRes);
                        }
                    }
                }}
                validateOnBlur={false}
                showLabels={true}
                footer={props.footer}
            />
        );
    }
);
