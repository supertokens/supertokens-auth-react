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
import { useUserContext } from "../../../../../usercontext";
import { Label } from "../../../../emailpassword/components/library";
import FormBase from "../../../../emailpassword/components/library/formBase";
import { preloadPhoneNumberUtils } from "../../../phoneNumberUtils";
import { defaultValidate } from "../../../validators";

import { phoneNumberInputWithInjectedProps } from "./phoneNumberInput";

import type { SignInUpEmailOrPhoneFormProps } from "../../../types";

export const EmailOrPhoneForm = withOverride(
    "PasswordlessEmailOrPhoneForm",
    function PasswordlessEmailOrPhoneForm(
        props: SignInUpEmailOrPhoneFormProps & {
            footer?: JSX.Element;
        }
    ): JSX.Element {
        const t = useTranslation();
        const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false);
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
                onFetchError={props.onFetchError}
                onError={props.onError}
                formFields={
                    isPhoneNumber
                        ? [
                              {
                                  id: "phoneNumber",
                                  label: "",

                                  labelComponent: (
                                      <div data-supertokens="formLabelWithLinkWrapper">
                                          <Label value={"PWLESS_SIGN_IN_UP_PHONE_LABEL"} />
                                          <a
                                              onClick={() => setIsPhoneNumber(false)}
                                              data-supertokens="link linkButton formLabelLinkBtn contactMethodSwitcher">
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
                                          <Label
                                              value={
                                                  isPhoneNumber
                                                      ? "PWLESS_SIGN_IN_UP_PHONE_LABEL"
                                                      : "PWLESS_SIGN_IN_UP_EMAIL_LABEL"
                                              }
                                              data-supertokens="passwordInputLabel"
                                          />
                                          <a
                                              onClick={() => setIsPhoneNumber((v) => !v)}
                                              data-supertokens="link linkButton formLabelLinkBtn contactMethodSwitcher">
                                              {isPhoneNumber
                                                  ? t("PWLESS_SIGN_IN_UP_SWITCH_TO_EMAIL")
                                                  : t("PWLESS_SIGN_IN_UP_SWITCH_TO_PHONE")}
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
                          ]
                }
                buttonLabel={"PWLESS_SIGN_IN_UP_CONTINUE_BUTTON"}
                onSuccess={props.onSuccess}
                callAPI={async (formFields) => {
                    let contactInfo: { email: string } | { phoneNumber: string };
                    if (isPhoneNumber) {
                        const phoneNumber = formFields.find((field) => field.id === "phoneNumber")?.value;
                        if (phoneNumber === undefined) {
                            throw new STGeneralError("GENERAL_ERROR_PHONE_UNDEFINED");
                        }

                        const validationRes = await props.config.validatePhoneNumber(phoneNumber);
                        if (validationRes !== undefined) {
                            throw new STGeneralError(validationRes);
                        }
                        contactInfo = { phoneNumber };
                    } else {
                        const email = formFields.find((field) => field.id === "email")?.value;
                        if (email === undefined) {
                            throw new STGeneralError("GENERAL_ERROR_EMAIL_UNDEFINED");
                        }
                        const validationRes = await props.config.validateEmailAddress(email);
                        if (validationRes !== undefined) {
                            throw new STGeneralError(validationRes);
                        }
                        contactInfo = { email };
                    }

                    const response = await props.recipeImplementation.createCode({
                        ...contactInfo,
                        userContext,
                    });

                    if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
                        throw new STGeneralError(response.reason);
                    }

                    return response;
                }}
                validateOnBlur={false}
                showLabels={true}
                footer={props.footer}
            />
        );
    }
);
