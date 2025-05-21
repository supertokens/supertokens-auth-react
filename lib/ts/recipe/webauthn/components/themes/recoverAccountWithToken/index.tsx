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

import { useState } from "react";
import { useEffect } from "react";

import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import SuperTokens from "../../../../../superTokens";
import { AuthPageFooter, AuthPageHeader } from "../../../../../ui";
import { useUserContext } from "../../../../../usercontext";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import { RecoverAccountScreen } from "../../../types";
import { PasskeyConfirmation } from "../signUp/confirmation";
import { ThemeBase } from "../themeBase";

import { PasskeyRecoverAccountSuccess } from "./success";

import type { RecoverAccountWithTokenThemeProps } from "../../../types";

function PasskeyRecoverAccountWithTokenTheme(props: RecoverAccountWithTokenThemeProps): JSX.Element {
    const stInstance = SuperTokens.getInstanceOrThrow();
    const rootStyle = stInstance.rootStyle;
    const userContext = useUserContext();

    const activeStyle = props.config.signInAndUpFeature.style;

    const privacyPolicyLink = stInstance.privacyPolicyLink;
    const termsOfServiceLink = stInstance.termsOfServiceLink;

    const onResetFactorList = () => {
        throw new Error("Should never come here as we don't have back functionality");
    };

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

    // Render the inner content based on the active screen
    const renderInnerContent = () => {
        if (props.activeScreen === RecoverAccountScreen.ContinueWithPasskey) {
            return (
                <PasskeyConfirmation
                    {...props}
                    email={props.registerOptions?.user.name || undefined}
                    onContinueClick={props.onContinueClick}
                    errorMessageLabel={props.errorMessageLabel || undefined}
                    isLoading={props.isLoading}
                    hideContinueWithoutPasskey
                    isContinueDisabled={props.registerOptions === null}
                    isPasskeySupported={isPasskeySupported}
                    showBackButton={false}
                />
            );
        } else if (props.activeScreen === RecoverAccountScreen.Success) {
            return <PasskeyRecoverAccountSuccess />;
        }
        return null;
    };

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle, activeStyle]}>
                <div data-supertokens="container authPage singleFactor">
                    <div data-supertokens="row">
                        {props.activeScreen !== RecoverAccountScreen.Success && (
                            <AuthPageHeader
                                factorIds={["webauthn"]}
                                isSignUp={true}
                                onSignInUpSwitcherClick={undefined}
                                hasSeparateSignUpView={true}
                                resetFactorList={onResetFactorList}
                                showBackButton={false}
                                oauth2ClientInfo={undefined}
                                headerLabel={
                                    props.activeScreen === RecoverAccountScreen.ContinueWithPasskey
                                        ? "WEBAUTHN_CREATE_A_PASSKEY_HEADER"
                                        : undefined
                                }
                                hideSignInSwitcher={true}
                            />
                        )}
                        {renderInnerContent()}
                        {props.activeScreen !== RecoverAccountScreen.Success && (
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

export default PasskeyRecoverAccountWithTokenTheme;
