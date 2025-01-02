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
import { ThemeBase } from "../themeBase";

import type { APIFormField } from "../../../../../types";
import type { SignInThemeProps } from "../../../types";

function PasskeySignInTheme(props: SignInThemeProps): JSX.Element {
    const userContext = useUserContext();

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

            return response;
        },
        [props, userContext]
    );

    // Define the code to handle sign in properly through this component.
    const handleWebauthnSignInClick = async () => {
        await handleFormSubmit({
            callAPI: callAPI,
            clearError: () => alert("Clear error"),
            onError: () => alert("Error"),
            onFetchError: () => alert("Fetch error"),
            onSuccess: (payload) => console.warn("payload: ", payload),
        });
    };

    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;

    const activeStyle = props.config.signUpFeature.style;

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle, activeStyle]}>
                <ContinueWithPasskeyTheme
                    {...props}
                    continueWithPasskeyClicked={handleWebauthnSignInClick}
                    config={props.config}
                    continueFor="SIGN_IN"
                />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default PasskeySignInTheme;
