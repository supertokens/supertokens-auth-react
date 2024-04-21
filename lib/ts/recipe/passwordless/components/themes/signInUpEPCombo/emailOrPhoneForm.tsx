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
import { useTranslation } from "../../../../../translation/translationContext";
import { Label } from "../../../../emailpassword/components/library";
import FormBase, { useFormFields } from "../../../../emailpassword/components/library/formBase";
import EmailPassword from "../../../../emailpassword/recipe";
import { preloadPhoneNumberUtils } from "../../../phoneNumberUtils";
import { defaultValidate } from "../../../validators";
import { phoneNumberInputWithInjectedProps } from "../signInUp/phoneNumberInput";

import type { SignInUpEPComboEmailOrPhoneFormProps } from "../../../types";

export const EmailOrPhoneForm = withOverride(
    "PasswordlessEmailOrPhoneForm",
    function PasswordlessEmailOrPhoneForm(
        props: SignInUpEPComboEmailOrPhoneFormProps & {
            footer?: JSX.Element;
        }
    ): JSX.Element {
        const t = useTranslation();
        const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false);

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
                onFetchError={props.onFetchError}
                onError={props.onError}
                formFields={[
                    {
                        id: "emailOrPhone",
                        label: "PWLESS_SIGN_IN_UP_EMAIL_OR_PHONE_LABEL",
                        inputComponent: emailOrPhoneInput,
                        optional: false,
                        autofocus: true,
                        placeholder: "",
                        // We do not add an autocomplete prop in this case, since we do not really have any sensible option to set
                        // Setting them to either "tel" or "email" would give people the wrong impression since this could have either
                        // AFAIK we can't set them both at the same time
                        validate: defaultValidate,
                    },
                    {
                        id: "password",
                        hidden: !props.showPasswordField,
                        autofocus: false,
                        optional: false,
                        placeholder: "",
                        label: "",
                        validate: defaultValidate,
                        labelComponent: (
                            <div data-supertokens="formLabelWithLinkWrapper">
                                <Label value={"PWLESS_COMBO_PASSWORD_LABEL"} data-supertokens="passwordInputLabel" />
                                <a
                                    onClick={() =>
                                        EmailPassword.getInstanceOrThrow().redirect({ action: "RESET_PASSWORD" })
                                    }
                                    data-supertokens="forgotPasswordLink">
                                    {t("PWLESS_COMBO_FORGOT_PW_LINK")}{" "}
                                </a>
                            </div>
                        ),
                    },
                ]}
                buttonLabel={props.showPasswordField ? "PWLESS_COMBO_SIGN_IN" : "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON"}
                callAPI={async (formFields, setValue) => {
                    const emailOrPhone = formFields.find((field) => field.id === "emailOrPhone")?.value;
                    if (emailOrPhone === undefined) {
                        throw new STGeneralError("GENERAL_ERROR_EMAIL_OR_PHONE_UNDEFINED");
                    }
                    if (props.showPasswordField) {
                        return props.onPasswordSubmit(formFields);
                    } else {
                        return props.onContactInfoSubmit(emailOrPhone, (phoneNumber) => {
                            setValue("emailOrPhone", phoneNumber);
                            setIsPhoneNumber(true);
                        });
                    }
                }}
                validateOnBlur={false}
                showLabels={true}
                footer={
                    props.showContinueWithPasswordlessLink ? (
                        <ContinueWithPasswordlessFooter
                            onContinueWithPasswordlessClick={props.onContinueWithPasswordlessClick}
                            onError={props.onError}
                        />
                    ) : undefined
                }
            />
        );
    }
);

const ContinueWithPasswordlessFooter: React.FC<{
    onError: (err: string) => void;
    onContinueWithPasswordlessClick: (contactInfo: string) => void;
}> = ({ onError, onContinueWithPasswordlessClick }) => {
    const state = useFormFields();
    const t = useTranslation();

    return (
        <a
            onClick={() => {
                const emailOrPhone = state.find((field) => field.id === "emailOrPhone")?.value;
                if (emailOrPhone === undefined) {
                    onError("GENERAL_ERROR_EMAIL_OR_PHONE_UNDEFINED");
                } else {
                    onContinueWithPasswordlessClick(emailOrPhone);
                }
            }}>
            {" "}
            {t("PWLESS_COMBO_CONTINUE_WITH_PASSWORDLESS")}{" "}
        </a>
    );
};
