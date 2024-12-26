/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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
// import { useUserContext } from "../../../../../usercontext";
import FormBase from "../../../../emailpassword/components/library/formBase";
import { defaultValidate } from "../../../../emailpassword/validators";

import type { SignUpFormProps } from "../../../types";

export const SignUpForm = withOverride(
    "PasskeySignUpForm",
    function PasswordlessEmailForm(
        props: SignUpFormProps & {
            footer?: JSX.Element;
        }
    ): JSX.Element {
        // const userContext = useUserContext();

        return (
            <FormBase
                clearError={props.clearError}
                onFetchError={props.onFetchError}
                onError={props.onError}
                formFields={[
                    {
                        id: "email",
                        label: "WEBAUTHN_SIGN_UP_LABEL",
                        optional: false,
                        autofocus: true,
                        placeholder: "",
                        autoComplete: "email",
                        // We are using the default validator that allows any string
                        validate: defaultValidate,
                    },
                ]}
                buttonLabel={"WEBAUTHN_EMAIL_CONTINUE_BUTTON"}
                onSuccess={props.onSuccess}
                callAPI={async (formFields) => {
                    const email = formFields.find((field) => field.id === "email")?.value;
                    if (email === undefined) {
                        throw new STGeneralError("GENERAL_ERROR_EMAIL_UNDEFINED");
                    }
                    return null;
                }}
                validateOnBlur={false}
                showLabels={true}
                footer={props.footer}
            />
        );
    }
);
