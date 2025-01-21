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

import { redirectToAuth } from "../../../../..";
import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import SuperTokens from "../../../../../superTokens";
import { AuthPageFooter, AuthPageHeader } from "../../../../../ui";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import { PasskeyConfirmation } from "../signUp/confirmation";
import { ThemeBase } from "../themeBase";

import { PasskeyRecoverAccountSuccess } from "./success";

import type { RecoverAccountWithTokenThemeProps } from "../../../types";

export enum RecoverAccountScreen {
    ContinueWithPasskey,
    Success,
}

function PasskeyRecoverAccountWithTokenTheme(props: RecoverAccountWithTokenThemeProps): JSX.Element {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;

    const activeStyle = props.config.signUpFeature.style;
    const stInstance = SuperTokens.getInstanceOrThrow();

    const privacyPolicyLink = stInstance.privacyPolicyLink;
    const termsOfServiceLink = stInstance.termsOfServiceLink;

    type RegisterOptions = Extract<
        Awaited<ReturnType<typeof props.recipeImplementation.getRegisterOptions>>,
        { status: "OK" }
    >;
    const [errorMessageLabel, setErrorMessageLabel] = useState<string | null>(null);
    const [activeScreen, setActiveScreen] = useState<RecoverAccountScreen>(RecoverAccountScreen.ContinueWithPasskey);
    const [registerOptions, setRegisterOptions] = useState<RegisterOptions | null>(null);

    const onResetFactorList = () => {
        throw new Error("Should never come here as we don't have back functionality");
    };

    // Get the reset options as soon as the page loads and afterwards use the token
    // with the options.
    const fetchAndStoreRegisterOptions = useCallback(async () => {
        // If the page is loaded without a valid token, we want to redirect the user
        // back to the sign in page.
        if (props.token === null) {
            await redirectToAuth();
            return;
        }

        try {
            const registerOptions = await props.recipeImplementation.getRegisterOptions({
                userContext: props.userContext,
                recoverAccountToken: props.token,
            });
            if (registerOptions.status !== "OK") {
                switch (registerOptions.status) {
                    case "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR":
                        setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_TOKEN_INVALID_ERROR");
                        break;
                    case "INVALID_EMAIL_ERROR":
                        setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_EMAIL_ERROR");
                        break;
                    case "INVALID_GENERATED_OPTIONS_ERROR":
                        setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_GENERATED_OPTIONS_ERROR");
                        // TODO: Should we trigger an automatic retry here or will there
                        // be a separate expired token related error?
                        break;
                    default:
                        throw new Error("Should never come here");
                }

                return;
            }

            setRegisterOptions(registerOptions);
        } catch (err: any) {
            // This will likely be a fetch error.
            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_FETCH_ERROR");
        }
    }, [props]);

    useEffect(() => {
        void fetchAndStoreRegisterOptions();
    }, []);

    const onContinueClick = useCallback(async () => {
        // TODO: Add support to make the network call and show the next screen based
        // on that result.
        //
        // We will do the following things in the order when the user clicks on the continue
        // button.
        // 1. Check if the fetched register options have expired
        // 2. If not expired, we can continue and use the values to register the user.
        // 3. If expired, we will get new registerOptions and register the user.
        // 4. If registration fails with a token expiry error, we should following 3rd step.
        if (registerOptions === null) {
            // If it still stays null, which should never happen as the continue
            // button will be disabled if register options is null which would mean
            // an error.
            throw new Error("Should never come here");
        }

        const expiresAtDate = new Date(registerOptions.expiresAt);
        if (isNaN(expiresAtDate.getTime()) || new Date() > expiresAtDate) {
            // Fetch the options again as they have either expired or are invalid.
            await fetchAndStoreRegisterOptions();
        }

        // TODO: Do rest of the logic once recover flow is ready in core.
        setActiveScreen(RecoverAccountScreen.Success);
    }, [setActiveScreen]);

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle, activeStyle]}>
                <div data-supertokens="container authPage singleFactor">
                    <div data-supertokens="row">
                        {activeScreen !== RecoverAccountScreen.Success && (
                            <AuthPageHeader
                                factorIds={["webauthn"]}
                                isSignUp={true}
                                onSignInUpSwitcherClick={undefined}
                                hasSeparateSignUpView={true}
                                resetFactorList={onResetFactorList}
                                showBackButton={false}
                                oauth2ClientInfo={undefined}
                                headerLabel={
                                    activeScreen === RecoverAccountScreen.ContinueWithPasskey
                                        ? "WEBAUTHN_CREATE_A_PASSKEY_HEADER"
                                        : undefined
                                }
                                hideSignInSwitcher={true}
                            />
                        )}
                        <RecoverAccountThemeInner
                            {...props}
                            activeScreen={activeScreen}
                            onContinueClick={onContinueClick}
                            errorMessageLabel={errorMessageLabel}
                            email={registerOptions?.user.name || null}
                            isContinueDisabled={registerOptions === null}
                        />
                        {activeScreen !== RecoverAccountScreen.Success && (
                            <AuthPageFooter
                                factorIds={[]}
                                isSignUp={true}
                                hasSeparateSignUpView={true}
                                privacyPolicyLink={privacyPolicyLink}
                                termsOfServiceLink={termsOfServiceLink}
                            />
                        )}
                    </div>
                    <SuperTokensBranding />
                </div>
            </ThemeBase>
        </UserContextWrapper>
    );
}

const RecoverAccountThemeInner = (
    props: RecoverAccountWithTokenThemeProps & {
        activeScreen: RecoverAccountScreen;
        onContinueClick: () => void;
        errorMessageLabel: string | null;
        email: string | null;
        isContinueDisabled: boolean;
    }
) => {
    return props.activeScreen === RecoverAccountScreen.ContinueWithPasskey ? (
        <PasskeyConfirmation
            {...props}
            email={props.email || undefined}
            onContinueClick={props.onContinueClick}
            errorMessageLabel={props.errorMessageLabel || undefined}
            isLoading={false}
            hideContinueWithoutPasskey
            isContinueDisabled={props.isContinueDisabled}
        />
    ) : props.activeScreen === RecoverAccountScreen.Success ? (
        <PasskeyRecoverAccountSuccess />
    ) : null;
};

export default PasskeyRecoverAccountWithTokenTheme;
