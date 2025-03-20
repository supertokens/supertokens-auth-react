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

import * as React from "react";

import SuperTokens from "../../../../../superTokens";
import { useUserContext } from "../../../../../usercontext";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import { handleCallAPI } from "../../../../../utils";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { ContinueWithPasskeyTheme } from "../continueWithPasskey";
import { ThemeBase } from "../themeBase";

import type { APIFormField } from "../../../../../types";
import type { FieldState } from "../../../../emailpassword/components/library/formBase";
import type { SignInThemeProps } from "../../../types";

function PasskeySignInTheme(props: SignInThemeProps): JSX.Element {
    const userContext = useUserContext();
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const callAPI = React.useCallback(
        async (_: APIFormField[], __: (id: string, value: string) => any) => {
            const response = await props.recipeImplementation.authenticateCredentialWithSignIn({
                userContext,
            });

            switch (response.status) {
                case "INVALID_CREDENTIALS_ERROR":
                    setError("WEBAUTHN_PASSKEY_INVALID_CREDENTIALS_ERROR");
                    break;
                case "FAILED_TO_AUTHENTICATE_USER":
                case "INVALID_OPTIONS_ERROR":
                    setError("WEBAUTHN_PASSKEY_RECOVERABLE_ERROR");
                    break;
                case "WEBAUTHN_NOT_SUPPORTED":
                    setError("WEBAUTHN_NOT_SUPPORTED_ERROR");
                    break;
            }

            return response;
        },
        [props, userContext]
    );

    // Define the code to handle sign in properly through this component.
    const handleWebauthnSignInClick = async () => {
        const fieldUpdates: FieldState[] = [];
        setIsLoading(true);

        try {
            const { result, generalError, fetchError } = await handleCallAPI<any>({
                apiFields: [],
                fieldUpdates,
                callAPI: callAPI,
            });

            if (generalError !== undefined) {
                setError(generalError.message);
            } else if (fetchError !== undefined) {
                setError("Failed to fetch from upstream");
            } else {
                // If successful
                if (result.status === "OK") {
                    if (setIsLoading) {
                        setIsLoading(false);
                    }
                    setError(null);
                    if (props.onSuccess !== undefined) {
                        props.onSuccess(result);
                    }
                }
            }
        } catch (e) {
            setError("SOMETHING_WENT_WRONG_ERROR");
        } finally {
            if (setIsLoading) {
                setIsLoading(false);
            }
        }
    };

    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;

    const activeStyle = props.config.signInAndUpFeature.style;

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle, activeStyle]}>
                <div data-supertokens="passkeySignInContainer">
                    {error !== "" && error !== null && <GeneralError error={error} />}
                    <ContinueWithPasskeyTheme
                        {...props}
                        continueWithPasskeyClicked={handleWebauthnSignInClick}
                        config={props.config}
                        continueTo="SIGN_IN"
                        isLoading={isLoading}
                        isPasskeySupported={props.isPasskeySupported}
                    />
                </div>
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default PasskeySignInTheme;
