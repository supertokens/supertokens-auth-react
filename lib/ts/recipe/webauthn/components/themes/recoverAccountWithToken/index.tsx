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

import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import SuperTokens from "../../../../../superTokens";
import { AuthPageFooter, AuthPageHeader } from "../../../../../ui";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import { PasskeyConfirmation } from "../signUp/confirmation";
import { ThemeBase } from "../themeBase";

import type { RecoverAccountWithTokenThemeProps } from "../../../types";
import { PasskeyRecoverAccountSuccess } from "./success";

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

    const [activeScreen, setActiveScreen] = useState<RecoverAccountScreen>(RecoverAccountScreen.ContinueWithPasskey);

    const onResetFactorList = () => {
        throw new Error("Should never come here as we don't have back functionality");
    };

    // TODO: Get the reset options as soon as the page loads and afterwards use the token
    // with the options.

    const onContinueClick = useCallback(() => {
        // TODO: Add support to make the network call and show the next screen based
        // on that result.
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
    }
) => {
    return props.activeScreen === RecoverAccountScreen.ContinueWithPasskey ? (
        <PasskeyConfirmation
            {...props}
            email={props.email || ""}
            onContinueClick={props.onContinueClick}
            // errorMessageLabel={showPasskeyConfirmationError ? "WEBAUTHN_PASSKEY_RECOVERABLE_ERROR" : undefined}
            isLoading={false}
            onFetchError={() => {}}
            hideContinueWithoutPasskey
        />
    ) : props.activeScreen === RecoverAccountScreen.Success ? (
        <PasskeyRecoverAccountSuccess />
    ) : null;
};

export default PasskeyRecoverAccountWithTokenTheme;
