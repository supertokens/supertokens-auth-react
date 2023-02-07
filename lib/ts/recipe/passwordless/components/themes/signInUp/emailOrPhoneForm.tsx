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

import { useMemo, useState } from "react";
import { useEffect } from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useUserContext } from "../../../../../usercontext";
import FormBase from "../../../../emailpassword/components/library/formBase";
import { preloadPhoneNumberUtils } from "../../../phoneNumberUtils";
import { defaultEmailValidator, defaultValidate } from "../../../validators";

import { phoneNumberInputWithInjectedProps } from "./phoneNumberInput";
import { SignInUpFooter } from "./signInUpFooter";

import type { SignInUpEmailOrPhoneFormProps } from "../../../types";

export const EmailOrPhoneForm = withOverride(
    "PasswordlessEmailOrPhoneForm",
    function PasswordlessEmailOrPhoneForm(props: SignInUpEmailOrPhoneFormProps): JSX.Element {
        const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false);
        const userContext = useUserContext();

        useEffect(() => {
            // We preload this here, since it will be used almost for sure, but loading it
            void preloadPhoneNumberUtils();
        }, []);
        const emailOrPhoneInput = useMemo(
            () =>
                isPhoneNumber
                    ? phoneNumberInputWithInjectedProps({
                          defaultCountry: props.config.signInUpFeature.defaultCountry,
                      })
                    : undefined,
            [props.config.signInUpFeature.defaultCountry, isPhoneNumber]
        );
        return (
            <FormBase
                clearError={props.clearError}
                onError={props.onError}
                formFields={[
                    {
                        id: "emailOrPhone",
                        label: "PWLESS_SIGN_IN_UP_EMAIL_OR_PHONE_LABEL",
                        inputComponent: emailOrPhoneInput,
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
                                userContext,
                            });

                            return response;
                        } else {
                            throw new STGeneralError(emailValidationRes);
                        }
                    } else {
                        const phoneValidationRes = await props.config.validatePhoneNumber(emailOrPhone);
                        if (phoneValidationRes === undefined) {
                            const response = await props.recipeImplementation.createCode({
                                phoneNumber: emailOrPhone,
                                userContext,
                            });

                            return response;
                        }

                        const intPhoneNumber =
                            await props.config.signInUpFeature.guessInternationPhoneNumberFromInputPhoneNumber(
                                emailOrPhone,
                                props.config.signInUpFeature.defaultCountry
                            );

                        if (intPhoneNumber && isPhoneNumber !== true) {
                            const phoneValidationResAfterGuess = await props.config.validatePhoneNumber(intPhoneNumber);
                            if (phoneValidationResAfterGuess === undefined) {
                                try {
                                    return await props.recipeImplementation.createCode({
                                        phoneNumber: intPhoneNumber,
                                        userContext,
                                    });
                                } catch (ex) {
                                    // General errors from the API can make createCode throw but we want to switch to the phone UI anyway
                                    setValue("emailOrPhone", intPhoneNumber);
                                    setIsPhoneNumber(true);
                                    throw ex;
                                }
                            } else {
                                // In this case we could get a phonenumber but not a completely valid one
                                // We want to switch to the phone UI and pre-fill the number

                                setValue("emailOrPhone", intPhoneNumber);
                                setIsPhoneNumber(true);
                                throw new STGeneralError("PWLESS_EMAIL_OR_PHONE_INVALID_INPUT_GUESS_PHONE_ERR");
                            }
                        } else {
                            throw new STGeneralError(phoneValidationRes);
                        }
                    }
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
