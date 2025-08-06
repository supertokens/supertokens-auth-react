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

import { useMemo } from "react";
import { useEffect } from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import { getTenantIdFromQueryParams } from "../../../../../utils";
import { Label } from "../../../../emailpassword/components/library";
import FormBase from "../../../../emailpassword/components/library/formBase";
import EmailPassword from "../../../../emailpassword/recipe";
import { preloadPhoneNumberUtils } from "../../../phoneNumberUtils";
import { defaultValidate } from "../../../validators";
import { phoneNumberInputWithInjectedProps } from "../signInUp/phoneNumberInput";

import { ContinueWithPasswordlessFooter } from "./continueWithPasswordlessFooter";

import type { FormFieldThemeProps } from "../../../../emailpassword/types";
import type { SignInUpEPComboEmailOrPhoneFormProps } from "../../../types";

export const EPComboEmailOrPhoneForm = withOverride(
    "PasswordlessEPComboEmailOrPhoneForm",
    function PasswordlessEPComboEmailOrPhoneForm(
        props: SignInUpEPComboEmailOrPhoneFormProps & {
            footer?: JSX.Element;
        }
    ): JSX.Element {
        const t = useTranslation();

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
        const formFields: FormFieldThemeProps[] = props.isPhoneNumber
            ? [
                  {
                      id: "phoneNumber",
                      label: "",

                      labelComponent: (
                          <div data-supertokens="formLabelWithLinkWrapper">
                              <Label value={"PWLESS_SIGN_IN_UP_PHONE_LABEL"} />
                              <a
                                  onClick={() => props.setIsPhoneNumber(false)}
                                  data-supertokens="link linkButton formLabelLinkBtn contactMethodSwitcher"
                              >
                                  {t("PWLESS_SIGN_IN_UP_SWITCH_TO_EMAIL")}
                              </a>
                          </div>
                      ),
                      inputComponent: phoneInput,
                      optional: false,
                      autofocus: true,
                      placeholder: "",
                      autoComplete: "tel",
                      validate: defaultValidate,
                  },
              ]
            : [
                  {
                      id: "email",
                      label: "",

                      labelComponent: (
                          <div data-supertokens="formLabelWithLinkWrapper">
                              <Label value={"PWLESS_SIGN_IN_UP_EMAIL_LABEL"} />
                              <a
                                  onClick={() => props.setIsPhoneNumber(true)}
                                  data-supertokens="link linkButton formLabelLinkBtn contactMethodSwitcher"
                              >
                                  {t("PWLESS_SIGN_IN_UP_SWITCH_TO_PHONE")}
                              </a>
                          </div>
                      ),
                      inputComponent: undefined,
                      optional: false,
                      autofocus: true,
                      placeholder: "",
                      autoComplete: "email",
                      validate: defaultValidate,
                  },
              ];
        let footer = props.footer;
        if (!footer && props.showContinueWithPasswordlessLink) {
            footer = (
                <ContinueWithPasswordlessFooter
                    isPhoneNumber={false}
                    onContinueWithPasswordlessClick={props.onContinueWithPasswordlessClick}
                    onError={props.onError}
                    config={props.config}
                    validatePhoneNumber={props.validatePhoneNumber}
                />
            );
        }

        if (props.showPasswordField) {
            formFields.push({
                id: "password",
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
                                EmailPassword.getInstanceOrThrow().redirect(
                                    {
                                        action: "RESET_PASSWORD",
                                        tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                                    },
                                    props.navigate
                                )
                            }
                            data-supertokens="link linkButton formLabelLinkBtn forgotPasswordLink"
                        >
                            {t("PWLESS_COMBO_FORGOT_PW_LINK")}
                        </a>
                    </div>
                ),
            });
        }

        return (
            <FormBase
                clearError={props.clearError}
                onFetchError={props.onFetchError}
                onError={props.onError}
                formFields={formFields}
                buttonLabel={"PWLESS_SIGN_IN_UP_CONTINUE_BUTTON"}
                callAPI={async (formFields) => {
                    if (props.isPhoneNumber) {
                        const phoneNumber = formFields.find((field) => field.id === "phoneNumber")?.value;
                        if (phoneNumber === undefined) {
                            throw new STGeneralError("GENERAL_ERROR_PHONE_UNDEFINED");
                        }

                        const validationRes = await props.validatePhoneNumber(phoneNumber);
                        if (validationRes !== undefined) {
                            throw new STGeneralError(validationRes);
                        }

                        return props.onContactInfoSubmit(phoneNumber);
                    } else {
                        const email = formFields.find((field) => field.id === "email")?.value;
                        if (email === undefined) {
                            throw new STGeneralError("GENERAL_ERROR_EMAIL_UNDEFINED");
                        }
                        const validationRes = await props.config.validateEmailAddress(email);
                        if (validationRes !== undefined) {
                            throw new STGeneralError(validationRes);
                        }

                        if (props.showPasswordField) {
                            return props.onPasswordSubmit(formFields);
                        } else {
                            return props.onContactInfoSubmit(email);
                        }
                    }
                }}
                validateOnBlur={false}
                showLabels={true}
                onSuccess={props.onSuccess}
                footer={footer}
            />
        );
    }
);
