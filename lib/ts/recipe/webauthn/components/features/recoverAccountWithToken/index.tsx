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
import { useCallback } from "react";
import { useState } from "react";

import { redirectToAuth } from "../../../../..";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import { getQueryParams, handleCallAPI, useOnMountAPICall } from "../../../../../utils";
import { RecoverAccountScreen } from "../../../types";
import RecoverAccountWithToken from "../../themes/recoverAccountWithToken";
import { defaultTranslationsWebauthn } from "../../themes/translations";

import type { FieldState } from "../../../../emailpassword/components/library/formBase";
import type { RecoverAccountWithTokenProps, RegisterOptions } from "../../../types";

export const RecoverAccountUsingToken: React.FC<RecoverAccountWithTokenProps> = (props): JSX.Element => {
    const token = getQueryParams("token");
    let userContext;
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    const [error, setError] = React.useState<string>();
    const [errorMessageLabel, setErrorMessageLabel] = useState<string | null>(null);
    const [preloadedRegisterOptions, setPreloadedRegisterOptions] = useState<RegisterOptions | null>(null);
    const [activeScreen, setActiveScreen] = useState<RecoverAccountScreen>(RecoverAccountScreen.ContinueWithPasskey);
    const [isLoading, setLoading] = useState(false);

    // Get the reset options as soon as the page loads and afterwards use the token
    // with the options.
    const fetchAndStoreRegisterOptions = useCallback(async () => {
        // If the page is loaded without a valid token, we want to redirect the user
        // back to the sign in page.
        if (token === null) {
            await redirectToAuth();
            return { status: "MISSING_TOKEN" as const };
        }

        return props.recipe.webJSRecipe.getRegisterOptions({
            userContext: props.userContext,
            recoverAccountToken: token,
        });
    }, [props.recipe.webJSRecipe, props.userContext, token]);

    useOnMountAPICall(
        fetchAndStoreRegisterOptions,
        async (registerOptions) => {
            if (registerOptions.status === "MISSING_TOKEN") {
                return;
            }

            if (registerOptions.status !== "OK") {
                switch (registerOptions.status) {
                    case "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR":
                        setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_TOKEN_INVALID_ERROR");
                        break;
                    case "INVALID_EMAIL_ERROR":
                        setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_EMAIL_ERROR");
                        break;
                    case "INVALID_OPTIONS_ERROR":
                        setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_GENERATED_OPTIONS_ERROR");
                        break;
                    default:
                        throw new Error("Should never come here");
                }

                return;
            }

            setPreloadedRegisterOptions(registerOptions);
        },
        (err) => {
            // This will likely be a fetch error.
            console.error("error", err);
            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_FETCH_ERROR");
        }
    );

    const callAPI = useCallback(async () => {
        // We will do the following things in the order when the user clicks on the continue
        // button.
        // 1. Check if the fetched register options have expired
        // 2. If not expired, we can continue and use the values to register the user.
        // 3. If expired, we will get new registerOptions and register the user.
        // 4. If registration fails with a token expiry error, we should following 3rd step.
        if (token === null) {
            // The token should not be null because while fetching the register options
            // we already checked for null and redirected to the sign in page if it is null.
            throw new Error("Should never come here");
        }

        const registerOptions =
            preloadedRegisterOptions !== null && new Date(preloadedRegisterOptions.expiresAt) > new Date()
                ? preloadedRegisterOptions
                : await props.recipe.webJSRecipe.getRegisterOptions({
                      userContext: props.userContext,
                      recoverAccountToken: token,
                  });
        if (registerOptions.status !== "OK") {
            switch (registerOptions.status) {
                case "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR":
                    setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_TOKEN_INVALID_ERROR");
                    break;
                case "INVALID_EMAIL_ERROR":
                    setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_EMAIL_ERROR");
                    break;
                case "INVALID_OPTIONS_ERROR":
                    setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_GENERATED_OPTIONS_ERROR");
                    break;
                default:
                    throw new Error("Should never come here");
            }

            return;
        }

        // Use the register options to register the credential and recover the account.
        // We should have received a valid registration options response.
        const registerCredentialResponse = await props.recipe.webJSRecipe.registerCredential({
            registrationOptions: registerOptions,
            userContext: props.userContext,
        });
        if (registerCredentialResponse.status !== "OK") {
            return registerCredentialResponse;
        }

        const recoverAccountResponse = await props.recipe.webJSRecipe.recoverAccount({
            token: token,
            webauthnGeneratedOptionsId: registerOptions.webauthnGeneratedOptionsId,
            credential: registerCredentialResponse.registrationResponse,
            userContext: props.userContext,
        });

        return recoverAccountResponse;
    }, [props, preloadedRegisterOptions, token, fetchAndStoreRegisterOptions]);

    const onContinueClick = useCallback(async () => {
        const fieldUpdates: FieldState[] = [];
        setLoading(true);

        try {
            const { result, generalError, fetchError } = await handleCallAPI<any>({
                apiFields: [],
                fieldUpdates,
                callAPI: callAPI,
            });

            if (generalError !== undefined || fetchError !== undefined) {
                setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR");
            } else {
                // If successful
                if (result.status === "OK") {
                    setLoading(false);
                    setActiveScreen(RecoverAccountScreen.Success);
                } else {
                    switch (result.status) {
                        case "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR":
                            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_TOKEN_INVALID_ERROR");
                            break;
                        case "GENERAL_ERROR":
                            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR");
                            break;
                        case "INVALID_OPTIONS_ERROR":
                            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_GENERATED_OPTIONS_ERROR");
                            break;
                        case "INVALID_CREDENTIALS_ERROR":
                            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_CREDENTIALS_ERROR");
                            break;
                        case "OPTIONS_NOT_FOUND_ERROR":
                            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_GENERATED_OPTIONS_NOT_FOUND_ERROR");
                            break;
                        case "INVALID_AUTHENTICATOR_ERROR":
                            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_AUTHENTICATOR_ERROR");
                            break;
                        case "WEBAUTHN_NOT_SUPPORTED":
                            setErrorMessageLabel("WEBAUTHN_NOT_SUPPORTED_ERROR");
                            break;
                        default:
                            throw new Error("Should never come here");
                    }
                    return;
                }
            }
        } catch (e) {
            console.error("error", e);
            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR");
        } finally {
            setLoading(false);
        }
    }, [callAPI]);

    const childProps = {
        config: props.recipe.config,
        error: error,
        onError: (error: string) => setError(error),
        clearError: () => setError(undefined),
        recipeImplementation: props.recipe.webJSRecipe,
        token,
        useComponentOverride: props.useComponentOverrides,
        userContext,
        registerOptions: preloadedRegisterOptions,
        errorMessageLabel,
        isLoading,
        activeScreen,
        onContinueClick,
    };
    const recipeComponentOverrides = props.useComponentOverrides();

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={SuperTokens.getInstanceOrThrow().useShadowDom}
                defaultStore={defaultTranslationsWebauthn}>
                <React.Fragment>
                    {/* No custom theme, use default. */}
                    {props.children === undefined && <RecoverAccountWithToken {...childProps} />}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {props.children &&
                        React.Children.map(props.children, (child) => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, childProps);
                            }

                            return child;
                        })}
                </React.Fragment>
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};
