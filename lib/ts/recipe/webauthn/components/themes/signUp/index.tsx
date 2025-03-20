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
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { ThemeBase } from "../themeBase";

import { SignUpForm, SignUpScreen } from "./signUpForm";

import type { SignUpThemeProps } from "../../../types";

function PasskeySignUpTheme(props: SignUpThemeProps): JSX.Element {
    const stInstance = SuperTokens.getInstanceOrThrow();
    const rootStyle = stInstance.rootStyle;
    const activeStyle = props.config.signInAndUpFeature.style;

    const privacyPolicyLink = stInstance.privacyPolicyLink;
    const termsOfServiceLink = stInstance.termsOfServiceLink;

    const [activeScreen, setActiveScreen] = useState<SignUpScreen>(SignUpScreen.SignUpForm);
    const onContinueClick = useCallback(() => {
        setActiveScreen(SignUpScreen.PasskeyConfirmation);
    }, [setActiveScreen]);

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle, activeStyle]}>
                <div
                    data-supertokens={`container authPage ${
                        props.factorIds.length > 1 ? "multiFactor" : "singleFactor"
                    }`}>
                    <div data-supertokens="row">
                        {![SignUpScreen.Error].includes(activeScreen) && (
                            <AuthPageHeader
                                factorIds={props.factorIds}
                                isSignUp={true}
                                onSignInUpSwitcherClick={props.onSignInUpSwitcherClick}
                                hasSeparateSignUpView={true}
                                resetFactorList={props.resetFactorList}
                                showBackButton={props.showBackButton}
                                oauth2ClientInfo={undefined}
                                headerLabel={
                                    activeScreen === SignUpScreen.PasskeyConfirmation
                                        ? "WEBAUTHN_CREATE_A_PASSKEY_HEADER"
                                        : undefined
                                }
                                hideSignInSwitcher={activeScreen === SignUpScreen.PasskeyConfirmation}
                            />
                        )}
                        {props.error !== undefined && <GeneralError error={props.error} />}
                        <SignUpForm
                            {...props}
                            onContinueClick={onContinueClick}
                            activeScreen={activeScreen}
                            setActiveScreen={setActiveScreen}
                        />
                        <AuthPageFooter
                            factorIds={props.factorIds}
                            isSignUp={true}
                            hasSeparateSignUpView={true}
                            privacyPolicyLink={privacyPolicyLink}
                            termsOfServiceLink={termsOfServiceLink}
                        />
                    </div>
                    <SuperTokensBranding />
                </div>
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default PasskeySignUpTheme;
