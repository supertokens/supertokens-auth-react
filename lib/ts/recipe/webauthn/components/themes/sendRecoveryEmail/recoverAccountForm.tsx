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

import { useState } from "react";
import STGeneralError from "supertokens-web-js/lib/build/error";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import { useUserContext } from "../../../../../usercontext";
import { Label } from "../../../../emailpassword/components/library";
import BackButton from "../../../../emailpassword/components/library/backButton";
import FormBase from "../../../../emailpassword/components/library/formBase";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { defaultEmailValidator } from "../../../../emailpassword/validators";

import type { RecoverFormProps } from "../../../types";

export const WebauthnRecoverAccountForm = withOverride(
    "WebauthnRecoverAccountForm",
    (
        props: RecoverFormProps & {
            setError: React.Dispatch<React.SetStateAction<string | undefined>>;
        }
    ): JSX.Element => {
        const userContext = useUserContext();

        return (
            <FormBase
                clearError={() => props.setError(undefined)}
                onFetchError={() => props.setError("WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR")}
                onError={() => props.setError("WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR")}
                formFields={[
                    {
                        id: "email",
                        label: "",
                        labelComponent: (
                            <div data-supertokens="formLabelWithLinkWrapper">
                                <Label value={"WEBAUTHN_SIGN_UP_LABEL"} data-supertokens="emailInputLabel" />
                            </div>
                        ),
                        optional: false,
                        autofocus: true,
                        placeholder: "",
                        autoComplete: "email",
                        // We are using the default validator that allows any string
                        validate: defaultEmailValidator,
                    },
                ]}
                buttonLabel={"WEBAUTHN_EMAIL_CONTINUE_BUTTON"}
                onSuccess={props.onSuccess}
                callAPI={async (formFields) => {
                    const email = formFields.find((field) => field.id === "email")?.value;
                    if (email === undefined) {
                        throw new STGeneralError("GENERAL_ERROR_EMAIL_UNDEFINED");
                    }
                    // Define code to make the API call to send reset email.
                    const res = await props.recipeImplementation.generateRecoverAccountToken({
                        email: email,
                        userContext: userContext,
                    });

                    if (res.status === "RECOVER_ACCOUNT_NOT_ALLOWED") {
                        props.setError("WEBAUTHN_ACCOUNT_RECOVERY_NOT_ALLOWED_LABEL");
                    }

                    return {
                        ...res,
                        email,
                    };
                }}
                validateOnBlur={false}
                showLabels={true}
            />
        );
    }
);

export const WebauthnRecoverAccount = withOverride("WebauthnRecoverAccount", (props: RecoverFormProps): JSX.Element => {
    const t = useTranslation();
    const [errorLabel, setErrorLabel] = useState<string | undefined>(undefined);

    return (
        <div data-supertokens="passkeyRecoverAccountFormContainer">
            <div data-supertokens="passkeyRecoverAccountFormHeaderWrapper">
                <div data-supertokens="passkeyRecoverAccountFormHeader headerTitle withBackButton">
                    <BackButton onClick={props.onBackClick} />
                    {t("WEBAUTHN_RECOVER_ACCOUNT_LABEL")}
                    <span data-supertokens="backButtonPlaceholder backButtonCommon">
                        {/* empty span for spacing the back button */}
                    </span>
                </div>
                <div data-supertokens="passkeyRecoverAccountFormSubHeader">
                    {t("WEBAUTHN_RECOVER_ACCOUNT_SUBHEADER_LABEL")}
                </div>
            </div>
            {errorLabel !== undefined && (
                <div data-supertokens="errorContainer">
                    <GeneralError error={errorLabel} />
                </div>
            )}
            <WebauthnRecoverAccountForm {...props} setError={setErrorLabel} />
        </div>
    );
});
