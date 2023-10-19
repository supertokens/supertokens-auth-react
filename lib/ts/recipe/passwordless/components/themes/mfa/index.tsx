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
/*
 * Imports.
 */
import React from "react";

import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import { hasFontDefined } from "../../../../../styles/styles";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { CloseTabScreen } from "../signInUp/closeTabScreen";
import { EmailForm } from "../signInUp/emailForm";
import { PhoneForm } from "../signInUp/phoneForm";
import { UserInputCodeForm } from "../signInUp/userInputCodeForm";
import { ThemeBase } from "../themeBase";

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
}

/*
 * Component.
 */
const MFATheme: React.FC<MFAProps & { activeScreen: MFAScreens }> = ({
    activeScreen,
    featureState,
    onBackButtonClicked,
    ...props
}) => {
    const commonProps = {
        recipeImplementation: props.recipeImplementation,
        config: props.config,
        clearError: () => props.dispatch({ type: "setError", error: undefined }),
        onError: (error: string) => props.dispatch({ type: "setError", error }),
        error: featureState.error,
    };

    return activeScreen === MFAScreens.CloseTab ? (
        <CloseTabScreen {...commonProps} />
    ) : (
        <div data-supertokens="container">
            <div data-supertokens="row">
                {featureState.loaded &&
                    /* TODO: this doesn't feel great */ (featureState.isSetupAllowed === true ||
                        featureState.loginAttemptInfo !== undefined) && (
                        <React.Fragment>
                            {activeScreen === MFAScreens.UserInputCodeForm ? (
                                <MFAOTPHeader
                                    {...commonProps}
                                    loginAttemptInfo={featureState.loginAttemptInfo!}
                                    isSetupAllowed={featureState.isSetupAllowed}
                                    onBackButtonClicked={() =>
                                        props.recipeImplementation.clearLoginAttemptInfo({
                                            userContext: props.userContext,
                                        })
                                    }
                                />
                            ) : (
                                <MFAHeader
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
                                            onFactorChooserButtonClicked={props.onFactorChooserButtonClicked}
                                            onSignOutClicked={props.onSignOutClicked}
                                            isSetupAllowed={featureState.isSetupAllowed}
                                        />
                                    }
                                />
                            ) : activeScreen === MFAScreens.PhoneForm ? (
                                <PhoneForm
                                    {...commonProps}
                                    footer={
                                        <MFAFooter
                                            {...commonProps}
                                            onFactorChooserButtonClicked={props.onFactorChooserButtonClicked}
                                            onSignOutClicked={props.onSignOutClicked}
                                            isSetupAllowed={featureState.isSetupAllowed}
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
                                            onFactorChooserButtonClicked={props.onFactorChooserButtonClicked}
                                            onSignOutClicked={props.onSignOutClicked}
                                            isSetupAllowed={featureState.isSetupAllowed}
                                            loginAttemptInfo={featureState.loginAttemptInfo!}
                                        />
                                    }
                                />
                            ) : null}
                        </React.Fragment>
                    )}
            </div>
            <SuperTokensBranding />
        </div>
    );
};

function MFAThemeWrapper(props: MFAProps): JSX.Element {
    const hasFont = hasFontDefined(props.config.rootStyle);

    const activeScreen = getActiveScreen(props);

    let activeStyle;
    if (activeScreen === MFAScreens.CloseTab) {
        activeStyle = props.config.signInUpFeature.closeTabScreenStyle;
    } else if (activeScreen === MFAScreens.UserInputCodeForm) {
        activeStyle = props.config.signInUpFeature.userInputCodeFormStyle;
    } else if (activeScreen === MFAScreens.EmailForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (activeScreen === MFAScreens.PhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    }

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase loadDefaultFont={!hasFont} userStyles={[props.config.rootStyle, activeStyle]}>
                <MFATheme {...props} activeScreen={activeScreen!} />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default MFAThemeWrapper;

export function getActiveScreen(props: Pick<MFAProps, "featureState" | "contactMethod">) {
    if (props.featureState.successInAnotherTab) {
        return MFAScreens.CloseTab;
    } else if (props.featureState.loginAttemptInfo) {
        return MFAScreens.UserInputCodeForm;
    } else if (props.contactMethod === "EMAIL") {
        return MFAScreens.EmailForm;
    } else if (props.contactMethod === "PHONE") {
        return MFAScreens.PhoneForm;
    }

    throw new Error("Couldn't choose active screen; Should never happen");
}
