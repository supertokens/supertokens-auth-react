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

import { useEffect, useMemo } from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useUserContext } from "../../../../../usercontext";
import FormBase from "../../../../emailpassword/components/library/formBase";
import { defaultValidate } from "../../../../emailpassword/validators";
import { preloadPhoneNumberUtils } from "../../../phoneNumberUtils";

import { phoneNumberInputWithInjectedProps } from "./phoneNumberInput";
import { SignInUpFooter } from "./signInUpFooter";

import type { SignInUpPhoneFormProps } from "../../../types";

export const PhoneForm = withOverride(
    "PasswordlessPhoneForm",
    function PasswordlessPhoneForm(props: SignInUpPhoneFormProps): JSX.Element {
        const userContext = useUserContext();

        useEffect(() => {
            // We preload this here, since it will be used almost for sure, but loading it
            void preloadPhoneNumberUtils();
        }, []);

        const phoneInput = useMemo(
            () =>
                phoneNumberInputWithInjectedProps({
                    defaultCountry: props.config.signInUpFeature.defaultCountry,
                }),
            [props.config.signInUpFeature.defaultCountry]
        );
        return (
            <FormBase
                clearError={props.clearError}
                onError={props.onError}
                formFields={[
                    {
                        id: "phoneNumber",
                        label: "PWLESS_SIGN_IN_UP_PHONE_LABEL",
                        inputComponent: phoneInput,
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
                        throw new STGeneralError("GENERAL_ERROR_PHONE_UNDEFINED");
                    }

                    const validationRes = await props.config.validatePhoneNumber(phoneNumber);
                    if (validationRes !== undefined) {
                        throw new STGeneralError(validationRes);
                    }

                    const response = await props.recipeImplementation.createCode({
                        phoneNumber,
                        userContext,
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
