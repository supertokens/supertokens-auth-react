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
import React from "react";

import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import { hasFontDefined } from "../../../../../styles/styles";
import SuperTokens from "../../../../../superTokens";
import { useTranslation } from "../../../../../translation/translationContext";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { AccessDeniedScreen } from "../../../../session/prebuiltui";
import { EmailForm } from "../signInUp/emailForm";
import { PhoneForm } from "../signInUp/phoneForm";
import { ThemeBase } from "../themeBase";
import { UserInputCodeForm } from "../userInputCodeForm/userInputCodeFormScreen";

import { LoadingScreen } from "./loadingScreen";
import { MFAFooter } from "./mfaFooter";
import { MFAHeader } from "./mfaHeader";
import { MFAOTPFooter } from "./mfaOTPFooter";
import { MFAOTPHeader } from "./mfaOTPHeader";

import type { MFAProps } from "../../../types";

export enum MFAScreens {
    CloseTab,
    EmailForm,
    PhoneForm,
    UserInputCodeForm,
    AccessDenied,
}

const MFATheme: React.FC<MFAProps & { activeScreen: MFAScreens }> = ({
    activeScreen,
    featureState,
    onBackButtonClicked,
    ...props
}) => {
    const t = useTranslation();
    const commonProps = {
        recipeImplementation: props.recipeImplementation,
        config: props.config,
        clearError: () => props.dispatch({ type: "setError", showAccessDenied: false, error: undefined }),
        onError: (error: string) => props.dispatch({ type: "setError", showAccessDenied: false, error }),
        onFetchError: props.onFetchError,
        error: featureState.error,
    };

    if (!featureState.loaded) {
        return <LoadingScreen />;
    }

    return activeScreen === MFAScreens.AccessDenied ? (
        <AccessDeniedScreen
            useShadowDom={false /* We set this to false, because we are already inside a shadowDom (if required) */}
            error={t(featureState.error!)}
        />
    ) : (
        <div data-supertokens="container pwless-mfa">
            <div data-supertokens="row">
                {
                    <React.Fragment>
                        {activeScreen === MFAScreens.UserInputCodeForm ? (
                            <MFAOTPHeader
                                {...commonProps}
                                showBackButton={featureState.showBackButton}
                                loginAttemptInfo={featureState.loginAttemptInfo!}
                                canChangeEmail={featureState.canChangeEmail}
                                onBackButtonClicked={onBackButtonClicked}
                            />
                        ) : (
                            <MFAHeader
                                {...commonProps}
                                showBackButton={featureState.showBackButton}
                                onBackButtonClicked={onBackButtonClicked}
                                contactMethod={activeScreen === MFAScreens.EmailForm ? "EMAIL" : "PHONE"}
                            />
                        )}
                        {featureState.error !== undefined && <GeneralError error={featureState.error} />}
                        {activeScreen === MFAScreens.EmailForm ? (
                            <EmailForm
                                {...commonProps}
                                footer={
                                    <MFAFooter
                                        {...commonProps}
                                        onSignOutClicked={props.onSignOutClicked}
                                        canChangeEmail={featureState.canChangeEmail}
                                    />
                                }
                            />
                        ) : activeScreen === MFAScreens.PhoneForm ? (
                            <PhoneForm
                                {...commonProps}
                                footer={
                                    <MFAFooter
                                        {...commonProps}
                                        onSignOutClicked={props.onSignOutClicked}
                                        canChangeEmail={featureState.canChangeEmail}
                                    />
                                }
                            />
                        ) : activeScreen === MFAScreens.UserInputCodeForm ? (
                            <UserInputCodeForm
                                {...commonProps}
                                loginAttemptInfo={featureState.loginAttemptInfo!}
                                onSuccess={props.onSuccess}
                                footer={
                                    <MFAOTPFooter
                                        {...commonProps}
                                        onSignOutClicked={props.onSignOutClicked}
                                        canChangeEmail={featureState.canChangeEmail}
                                        loginAttemptInfo={featureState.loginAttemptInfo!}
                                    />
                                }
                            />
                        ) : null}
                    </React.Fragment>
                }
            </div>
            <SuperTokensBranding />
        </div>
    );
};

function MFAThemeWrapper(props: MFAProps): JSX.Element {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    const hasFont = hasFontDefined(rootStyle) || hasFontDefined(props.config.recipeRootStyle);

    const activeScreen = getActiveScreen(props);

    let activeStyle;
    if (activeScreen === MFAScreens.UserInputCodeForm) {
        activeStyle = props.config.signInUpFeature.userInputCodeFormStyle;
    } else if (activeScreen === MFAScreens.EmailForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (activeScreen === MFAScreens.PhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else {
        activeStyle = ""; // styling the access denied screen is handled through the session recipe
    }

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase
                loadDefaultFont={!hasFont}
                userStyles={[rootStyle, props.config.recipeRootStyle, activeStyle, props.config.mfaFeature.style]}>
                <MFATheme {...props} activeScreen={activeScreen!} />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default MFAThemeWrapper;

export function getActiveScreen(props: Pick<MFAProps, "featureState" | "contactMethod">) {
    if (props.featureState.showAccessDenied) {
        return MFAScreens.AccessDenied;
    } else if (props.featureState.loginAttemptInfo) {
        return MFAScreens.UserInputCodeForm;
    } else if (props.contactMethod === "EMAIL") {
        return MFAScreens.EmailForm;
    } else if (props.contactMethod === "PHONE") {
        return MFAScreens.PhoneForm;
    }

    throw new Error("Couldn't choose active screen; Should never happen");
}
