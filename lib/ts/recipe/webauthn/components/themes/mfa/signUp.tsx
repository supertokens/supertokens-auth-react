import * as React from "react";
import { Fragment } from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import { Label } from "../../../../emailpassword/components/library";
import BackButton from "../../../../emailpassword/components/library/backButton";
import FormBase from "../../../../emailpassword/components/library/formBase";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { defaultEmailValidator } from "../../../../emailpassword/validators";

export type MFASignUpProps = {
    onContinueClick: (email: string) => void;
    clearError: () => void;
    email?: string;
    error?: string;
    onError: (error: string) => void;
    onFetchError?: (error: Response) => void;
    onRecoverAccountClick: () => void;
    onBackButtonClicked?: () => void;
};

export const WebauthnMFASignUp = withOverride(
    "WebauthnMFASignUp",
    function WebauthnMFASignUp(props: MFASignUpProps): JSX.Element {
        const t = useTranslation();

        const onSuccess = React.useCallback(
            ({ email }: { email: string }) => {
                props.onContinueClick(email);
            },
            [props.onContinueClick]
        );

        return (
            <Fragment>
                {props.onBackButtonClicked ? (
                    <div data-supertokens="headerTitle withBackButton webauthn-mfa">
                        <BackButton onClick={props.onBackButtonClicked} />
                        {t("WEBAUTHN_MFA_REGISTER_PASSKEY_TITLE")}
                        <span data-supertokens="backButtonPlaceholder backButtonCommon">
                            {/* empty span for spacing the back button */}
                        </span>
                    </div>
                ) : (
                    <div data-supertokens="headerTitle webauthn-mfa">{t("WEBAUTHN_MFA_REGISTER_PASSKEY_TITLE")}</div>
                )}
                {props.error !== undefined && <GeneralError error={props.error} />}
                <div data-supertokens="signUpFormInnerContainer">
                    <div data-supertokens="cautionMessage">{t("WEBAUTHN_SIGN_UP_CAUTION_MESSAGE_LABEL")}</div>
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
                                            onClick={props.onRecoverAccountClick}
                                            data-supertokens="link linkButton formLabelLinkBtn recoverAccountTrigger">
                                            {t("WEBAUTHN_RECOVER_ACCOUNT_LABEL")}
                                        </a>
                                    </div>
                                ),
                                optional: false,
                                autofocus: true,
                                placeholder: "",
                                getDefaultValue: () => props.email as string,
                                autoComplete: "email",
                                // We are using the default validator that allows any string
                                validate: defaultEmailValidator,
                            },
                        ]}
                        buttonLabel={"WEBAUTHN_EMAIL_CONTINUE_BUTTON"}
                        onSuccess={onSuccess}
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
                        footer={undefined}
                    />
                </div>
            </Fragment>
        );
    }
);
