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
import { handleFormSubmit } from "../../../../emailpassword/components/library/functions/form";
import { ContinueWithPasskeyTheme } from "../continueWithPasskey";
import { RecoverableError } from "../error/recoverableError";
import { ThemeBase } from "../themeBase";

import type { APIFormField } from "../../../../../types";
import type { SignInThemeProps } from "../../../types";

function PasskeySignInTheme(props: SignInThemeProps): JSX.Element {
    const userContext = useUserContext();
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const callAPI = React.useCallback(
        async (_: APIFormField[], __: (id: string, value: string) => any) => {
            const email = prompt("Enter email ID");
            if (email === null) {
                alert("Please enter an email");
                return;
            }

            const response = await props.recipeImplementation.authenticateCredentialWithSignIn({
                email: email,
                userContext,
            });

            if (response.status === "FAILED_TO_AUTHENTICATE_USER") {
                setError("Failed to authenticate user");
                return;
            }

            return response;
        },
        [props, userContext]
    );

    // Define the code to handle sign in properly through this component.
    const handleWebauthnSignInClick = async () => {
        await handleFormSubmit({
            callAPI: callAPI,
            clearError: () => setError(null),
            onError: (error) => setError(error),
            onFetchError: () => setError("Failed to fetch from upstream"),
            onSuccess: (payload) => console.warn("payload: ", payload),
            setIsLoading: setIsLoading,
        });
    };

    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;

    const activeStyle = props.config.signUpFeature.style;

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle, activeStyle]}>
                <div data-supertokens="passkeySignInContainer">
                    {error !== "" && error !== null && (
                        <RecoverableError errorMessageLabel="WEBAUTHN_PASSKEY_RECOVERABLE_ERROR" />
                    )}
                    <ContinueWithPasskeyTheme
                        {...props}
                        continueWithPasskeyClicked={handleWebauthnSignInClick}
                        config={props.config}
                        continueFor="SIGN_IN"
                        isLoading={isLoading}
                    />
                </div>
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default PasskeySignInTheme;
