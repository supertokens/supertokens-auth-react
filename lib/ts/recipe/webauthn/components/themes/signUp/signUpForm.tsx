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

import { useCallback, useEffect, useState } from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import { useUserContext } from "../../../../../usercontext";
import { handleCallAPI } from "../../../../../utils";
import { Label } from "../../../../emailpassword/components/library";
import FormBase from "../../../../emailpassword/components/library/formBase";
import { defaultEmailValidator } from "../../../../emailpassword/validators";

import { PasskeyConfirmation } from "./confirmation";
import { ContinueWithoutPasskey } from "./continueWithoutPasskey";
import { SignUpSomethingWentWrong } from "./somethingWentWrong";

import type { APIFormField } from "../../../../../types";
import type { FieldState } from "../../../../emailpassword/components/library/formBase";
import type { ContinueOnSuccessParams, SignUpFormProps } from "../../../types";

export enum SignUpScreen {
    SignUpForm,
    PasskeyConfirmation,
    Error,
}

export const SignUpFormInner = withOverride(
    "WebauthnPasskeySignUpForm",
    function PasskeyEmailForm(
        props: SignUpFormProps & {
            footer?: JSX.Element;
            onContinueClick: (params: ContinueOnSuccessParams) => void;
            setActiveScreen: React.Dispatch<React.SetStateAction<SignUpScreen>>;
            onRecoverAccountClick: () => void;
        }
    ): JSX.Element {
        const t = useTranslation();
        const defaultFooter =
            props.resetFactorList !== undefined && props.showBackButton ? (
                <ContinueWithoutPasskey onClick={props.resetFactorList} />
            ) : undefined;

        const onEmailContinueSuccess = useCallback(
            (params: ContinueOnSuccessParams) => {
                props.onContinueClick(params);
            },
            [props]
        );

        const onError = useCallback(
            (error: string) => {
                if (error === "EMAIL_INPUT_NOT_POPULATED_ERROR") {
                    props.onError("WEBAUTHN_EMAIL_INPUT_NOT_POPULATED_ERROR");
                } else {
                    props.onError(t("WEBAUTHN_ACCOUNT_RECOVERY_FETCH_ERROR"));
                }
            },
            [props, t]
        );

        return (
            <div data-supertokens="signUpFormInnerContainer">
                <div data-supertokens="cautionMessage">{t("WEBAUTHN_SIGN_UP_CAUTION_MESSAGE_LABEL")}</div>
                <FormBase
                    clearError={props.clearError}
                    onFetchError={props.onFetchError}
                    onError={onError}
                    formFields={[
                        {
                            id: "email",
                            label: "",
                            labelComponent: (
                                <div data-supertokens="formLabelWithLinkWrapper">
                                    <Label value={"WEBAUTHN_SIGN_UP_LABEL"} data-supertokens="emailInputLabel" />
                                    <a
                                        onClick={props.onRecoverAccountClick}
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

                        if (email === "") {
                            throw new STGeneralError("EMAIL_INPUT_NOT_POPULATED_ERROR");
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
            </div>
        );
    }
);

export const SignUpForm = (
    props: SignUpFormProps & {
        footer?: JSX.Element;
        onContinueClick: (params: ContinueOnSuccessParams) => void;
        activeScreen: SignUpScreen;
        setActiveScreen: React.Dispatch<React.SetStateAction<SignUpScreen>>;
        onRecoverAccountClick: () => void;
    }
): JSX.Element | null => {
    const [continueClickResponse, setContinueClickResponse] = useState<ContinueOnSuccessParams | null>(null);
    const userContext = useUserContext();
    const [errorLabel, setErrorLabel] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isPasskeySupported, setIsPasskeySupported] = useState(false);

    useEffect(() => {
        void (async () => {
            const browserSupportsWebauthn = await props.recipeImplementation.doesBrowserSupportWebAuthn({
                userContext: userContext,
            });
            if (browserSupportsWebauthn.status !== "OK") {
                console.error(browserSupportsWebauthn.error);
                return;
            }

            setIsPasskeySupported(browserSupportsWebauthn.browserSupportsWebauthn);
        })();
    }, [props.recipeImplementation]);

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

            const response = await props.recipeImplementation.registerCredentialWithSignUp({
                email: continueClickResponse.email,
                userContext,
            });

            // If it is an error related to passkey, we need to handle it.
            if (response.status !== "OK") {
                setErrorLabel("WEBAUTHN_PASSKEY_RECOVERABLE_ERROR");
            }

            if (response.status === "EMAIL_ALREADY_EXISTS_ERROR") {
                setErrorLabel("WEBAUTHN_EMAIL_ALREADY_EXISTS_ERROR");
            }

            if (response.status === "WEBAUTHN_NOT_SUPPORTED") {
                setErrorLabel("WEBAUTHN_NOT_SUPPORTED_ERROR");
            }

            return response;
        },
        [continueClickResponse, props, userContext]
    );

    const onConfirmationClick = useCallback(async () => {
        const fieldUpdates: FieldState[] = [];
        setIsLoading(true);

        try {
            const { result, generalError, fetchError } = await handleCallAPI<any>({
                apiFields: [],
                fieldUpdates,
                callAPI: callAPI,
            });

            if (generalError !== undefined) {
                props.setActiveScreen(SignUpScreen.Error);
            } else if (fetchError !== undefined) {
                setErrorLabel("WEBAUTHN_PASSKEY_RECOVERABLE_ERROR");
            } else {
                // If successful
                if (result.status === "OK") {
                    if (setIsLoading) {
                        setIsLoading(false);
                    }
                    setErrorLabel(undefined);
                    if (props.onSuccess !== undefined) {
                        props.onSuccess(result);
                    }
                }
            }
        } catch (e) {
            console.error("error", e);
            props.setActiveScreen(SignUpScreen.Error);
        } finally {
            if (setIsLoading) {
                setIsLoading(false);
            }
        }
    }, [callAPI, props]);

    return props.activeScreen === SignUpScreen.SignUpForm ? (
        <SignUpFormInner {...props} onContinueClick={onContinueClickCallback} />
    ) : props.activeScreen === SignUpScreen.PasskeyConfirmation ? (
        <PasskeyConfirmation
            {...props}
            email={continueClickResponse?.email || ""}
            onContinueClick={onConfirmationClick}
            errorMessageLabel={errorLabel}
            isLoading={isLoading}
            isPasskeySupported={isPasskeySupported}
        />
    ) : props.activeScreen === SignUpScreen.Error ? (
        <SignUpSomethingWentWrong onClick={() => props.setActiveScreen(SignUpScreen.SignUpForm)} />
    ) : null;
};
