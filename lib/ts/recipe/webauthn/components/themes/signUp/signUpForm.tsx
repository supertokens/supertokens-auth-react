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

import { useCallback, useState } from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import { useUserContext } from "../../../../../usercontext";
import { Label } from "../../../../emailpassword/components/library";
import FormBase from "../../../../emailpassword/components/library/formBase";
import { handleFormSubmit } from "../../../../emailpassword/components/library/functions/form";
import { defaultEmailValidator } from "../../../../emailpassword/validators";

import { PasskeyConfirmation } from "./confirmation";
import { ContinueWithoutPasskey } from "./continueWithoutPasskey";

import type { APIFormField } from "../../../../../types";
import type { ContinueOnSuccessParams, SignUpFormProps } from "../../../types";

export enum SignUpScreen {
    SignUpForm,
    PasskeyConfirmation,
}

export const SignUpFormInner = withOverride(
    "PasskeySignUpForm",
    function PasskeyEmailForm(
        props: SignUpFormProps & {
            footer?: JSX.Element;
            onContinueClick: (params: ContinueOnSuccessParams) => void;
        }
    ): JSX.Element {
        const t = useTranslation();
        const defaultFooter = <ContinueWithoutPasskey onClick={props.resetFactorList} />;

        const onEmailContinueSuccess = useCallback(
            (params: ContinueOnSuccessParams) => {
                props.onContinueClick(params);
            },
            [props]
        );

        return (
            <FormBase
                clearError={props.clearError}
                onFetchError={props.onFetchError}
                onError={props.onError}
                formFields={[
                    {
                        id: "email",
                        label: "",
                        labelComponent: (
                            <div data-supertokens="formLabelWithLinkWrapper">
                                <Label value={"WEBAUTHN_SIGN_UP_LABEL"} data-supertokens="emailInputLabel" />
                                <a
                                    onClick={() => alert("That is not defined yet!")}
                                    data-supertokens="link linkButton formLabelLinkBtn recoverAccountTrigger">
                                    {t("WEBAUTHN_RECOVER_ACCOUNT_LABEL")}
                                </a>
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
                onSuccess={onEmailContinueSuccess}
                callAPI={async (formFields) => {
                    const email = formFields.find((field) => field.id === "email")?.value;
                    if (email === undefined) {
                        throw new STGeneralError("GENERAL_ERROR_EMAIL_UNDEFINED");
                    }

                    // We do not want the form to make the API call since we have
                    // an intermediary step here so we will just mock an OK status
                    // to render the next step.
                    return {
                        status: "OK",
                        email,
                    };
                }}
                validateOnBlur={false}
                showLabels={true}
                footer={props.footer || defaultFooter}
            />
        );
    }
);

export const SignUpForm = (
    props: SignUpFormProps & {
        footer?: JSX.Element;
        onContinueClick: (params: ContinueOnSuccessParams) => void;
        activeScreen: SignUpScreen;
    }
): JSX.Element | null => {
    const [continueClickResponse, setContinueClickResponse] = useState<ContinueOnSuccessParams | null>(null);
    const userContext = useUserContext();
    const [showPasskeyConfirmationError, setShowPasskeyConfirmationError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onContinueClickCallback = useCallback(
        (params: ContinueOnSuccessParams) => {
            setContinueClickResponse(params);
            props.onContinueClick(params);
        },
        [setContinueClickResponse, props]
    );

    const callAPI = useCallback(
        async (_: APIFormField[], __: (id: string, value: string) => any) => {
            if (continueClickResponse === null) {
                throw props.onError("EMAIL_INPUT_NOT_POPULATED_ERROR");
            }

            return await props.recipeImplementation.registerCredentialWithSignUp({
                email: continueClickResponse.email,
                userContext,
            });
        },
        [continueClickResponse, props, userContext]
    );

    const onConfirmationClick = useCallback(async () => {
        await handleFormSubmit({
            callAPI: callAPI,
            clearError: () => setShowPasskeyConfirmationError(false),
            onError: () => setShowPasskeyConfirmationError(true),
            onFetchError: () => setShowPasskeyConfirmationError(true),
            onSuccess: (payload) => console.warn("payload: ", payload),
            setIsLoading: setIsLoading,
        });
    }, [callAPI]);

    return props.activeScreen === SignUpScreen.SignUpForm ? (
        <SignUpFormInner {...props} onContinueClick={onContinueClickCallback} />
    ) : props.activeScreen === SignUpScreen.PasskeyConfirmation ? (
        <PasskeyConfirmation
            {...props}
            email={continueClickResponse?.email || ""}
            onContinueClick={onConfirmationClick}
            errorMessageLabel={showPasskeyConfirmationError ? "WEBAUTHN_PASSKEY_RECOVERABLE_ERROR" : undefined}
            isLoading={isLoading}
        />
    ) : null;
};
