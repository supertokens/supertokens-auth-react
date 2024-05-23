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

import { useCallback, useEffect, useState } from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { hasFontDefined } from "../../../../../styles/styles";
import SuperTokens from "../../../../../superTokens";
import { useTranslation } from "../../../../../translation/translationContext";
import { useUserContext } from "../../../../../usercontext";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import { Label } from "../../../../emailpassword/components/library";
import FormBase from "../../../../emailpassword/components/library/formBase";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { userInputCodeValidate } from "../../../validators";
import { ResendButton } from "../signInUp/resendButton";
import { ThemeBase } from "../themeBase";

import { UserInputCodeFormFooter } from "./userInputCodeFormFooter";
import { UserInputCodeFormHeader } from "./userInputCodeFormHeader";

import type { UserContext } from "../../../../../types";
import type { SignInUpUserInputCodeFormProps } from "../../../types";

export const UserInputCodeFormScreen: React.FC<
    SignInUpUserInputCodeFormProps & {
        footer?: JSX.Element;
    }
> = (props) => {
    return (
        <div data-supertokens="container">
            <div data-supertokens="row">
                <UserInputCodeFormHeader {...props} />
                {props.error !== undefined && <GeneralError error={props.error} />}
                <UserInputCodeForm {...props} />
            </div>
        </div>
    );
};

export const UserInputCodeForm = withOverride(
    "PasswordlessUserInputCodeForm",
    (
        props: SignInUpUserInputCodeFormProps & {
            footer?: JSX.Element | undefined;
        }
    ) => {
        const t = useTranslation();
        const userContext = useUserContext();

        // We need this any because the node types are also loaded
        const [clearResendNotifTimeout, setClearResendNotifTimeout] = useState<any | undefined>();

        useEffect(() => {
            // This is just to clean up on unmount and if the clear timeout changes
            return () => {
                clearTimeout(clearResendNotifTimeout);
            };
        }, [clearResendNotifTimeout]);

        const resend = useCallback(
            async function resend() {
                try {
                    let response;
                    let generalError: STGeneralError | undefined;

                    try {
                        response = await props.recipeImplementation.resendCode({
                            userContext,
                        });
                    } catch (e) {
                        if (STGeneralError.isThisError(e)) {
                            generalError = e;
                        } else {
                            throw e;
                        }
                    }

                    if (generalError !== undefined) {
                        props.onError(generalError.message);
                    } else {
                        if (response === undefined) {
                            throw new Error("Should not come here");
                        }

                        if (response.status === "OK") {
                            setClearResendNotifTimeout(
                                setTimeout(() => {
                                    setClearResendNotifTimeout(undefined);
                                }, 2000)
                            );
                        }
                    }
                } catch (e) {
                    props.onError("SOMETHING_WENT_WRONG_ERROR");
                }
            },
            [setClearResendNotifTimeout, props.onError, props.recipeImplementation]
        );
        return (
            <>
                {clearResendNotifTimeout !== undefined && (
                    <div data-supertokens="generalSuccess">
                        {props.loginAttemptInfo.contactMethod === "EMAIL"
                            ? t("PWLESS_RESEND_SUCCESS_EMAIL")
                            : t("PWLESS_RESEND_SUCCESS_PHONE")}
                    </div>
                )}

                <FormBase
                    clearError={props.clearError}
                    onFetchError={props.onFetchError}
                    onError={props.onError}
                    formFields={[
                        {
                            id: "userInputCode",
                            label: "",
                            labelComponent: (
                                <div data-supertokens="formLabelWithLinkWrapper">
                                    <Label
                                        value={"PWLESS_USER_INPUT_CODE_INPUT_LABEL"}
                                        data-supertokens="codeInputLabel"
                                    />
                                    <ResendButton
                                        loginAttemptInfo={props.loginAttemptInfo}
                                        resendEmailOrSMSGapInSeconds={
                                            props.config.signInUpFeature.resendEmailOrSMSGapInSeconds
                                        }
                                        onClick={resend}
                                    />
                                </div>
                            ),
                            autofocus: true,
                            optional: false,
                            clearOnSubmit: true,
                            autoComplete: "one-time-code",
                            placeholder: "",
                            validate: userInputCodeValidate,
                        },
                    ]}
                    onSuccess={props.onSuccess}
                    buttonLabel={"PWLESS_SIGN_IN_UP_CONTINUE_BUTTON"}
                    callAPI={async (formFields) => {
                        const userInputCode = formFields.find((field) => field.id === "userInputCode")?.value;
                        if (userInputCode === undefined || userInputCode.length === 0) {
                            throw new STGeneralError("GENERAL_ERROR_OTP_UNDEFINED");
                        }
                        const response = await props.recipeImplementation.consumeCode({
                            userInputCode,
                            userContext,
                        });

                        // We can redirect these statuses, since they all cause a redirection
                        // and we don't really want to show anything
                        if (
                            response.status === "OK" ||
                            response.status === "RESTART_FLOW_ERROR" ||
                            response.status === "SIGN_IN_UP_NOT_ALLOWED"
                        ) {
                            return response;
                        }

                        if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
                            throw new STGeneralError("GENERAL_ERROR_OTP_INVALID");
                        }

                        if (response.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
                            throw new STGeneralError("GENERAL_ERROR_OTP_EXPIRED");
                        }

                        throw new STGeneralError("SOMETHING_WENT_WRONG_ERROR");
                    }}
                    validateOnBlur={false}
                    showLabels={true}
                    footer={
                        props.footer ?? <UserInputCodeFormFooter {...props} loginAttemptInfo={props.loginAttemptInfo} />
                    }
                />
            </>
        );
    }
);

function UserInputCodeFormScreenWrapper(
    props: SignInUpUserInputCodeFormProps & { userContext: UserContext }
): JSX.Element {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    const hasFont = hasFontDefined(rootStyle) || hasFontDefined(props.config.recipeRootStyle);

    const activeStyle = props.config.signInUpFeature.userInputCodeFormStyle;

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase loadDefaultFont={!hasFont} userStyles={[rootStyle, props.config.recipeRootStyle, activeStyle]}>
                <UserInputCodeFormScreen {...props} />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default UserInputCodeFormScreenWrapper;
