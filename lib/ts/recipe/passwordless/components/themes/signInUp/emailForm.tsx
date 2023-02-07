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

import STGeneralError from "supertokens-web-js/utils/error";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useUserContext } from "../../../../../usercontext";
import FormBase from "../../../../emailpassword/components/library/formBase";
import { defaultValidate } from "../../../../emailpassword/validators";

import { SignInUpFooter } from "./signInUpFooter";

import type { SignInUpEmailFormProps } from "../../../types";

export const EmailForm = withOverride(
    "PasswordlessEmailForm",
    function PasswordlessEmailForm(props: SignInUpEmailFormProps): JSX.Element {
        const userContext = useUserContext();

        return (
            <FormBase
                clearError={props.clearError}
                onError={props.onError}
                formFields={[
                    {
                        id: "email",
                        label: "PWLESS_SIGN_IN_UP_EMAIL_LABEL",
                        optional: false,
                        autofocus: true,
                        placeholder: "",
                        // We are using the default validator that allows any string
                        validate: defaultValidate,
                    },
                ]}
                buttonLabel={"PWLESS_SIGN_IN_UP_CONTINUE_BUTTON"}
                onSuccess={props.onSuccess}
                callAPI={async (formFields) => {
                    const email = formFields.find((field) => field.id === "email")?.value;
                    if (email === undefined) {
                        throw new STGeneralError("GENERAL_ERROR_EMAIL_UNDEFINED");
                    }
                    const validationRes = await props.config.validateEmailAddress(email);
                    if (validationRes !== undefined) {
                        throw new STGeneralError(validationRes);
                    }

                    const response = await props.recipeImplementation.createCode({
                        email,
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
