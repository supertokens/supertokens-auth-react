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
import React from "react";

import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import { hasFontDefined } from "../../../../../styles/styles";
import { useTranslation } from "../../../../../translation/translationContext";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { AccessDeniedScreen } from "../../../../session/prebuiltui";
import { ThemeBase } from "../themeBase";

import { BlockedScreen } from "./blockedScreen";
import { LoadingScreen } from "./loadingScreen";
import { CodeForm } from "./totpCodeForm";
import { CodeVerificationFooter } from "./totpCodeVerificationFooter";
import { CodeVerificationHeader } from "./totpCodeVerificationHeader";
import { DeviceInfoSection } from "./totpDeviceInfoSection";
import { DeviceSetupFooter } from "./totpDeviceSetupFooter";
import { DeviceSetupHeader } from "./totpDeviceSetupHeader";

import type { TranslationFunc } from "../../../../../translation/translationHelpers";
import type { TOTPMFAProps, TOTPMFAState } from "../../../types";

export enum TOTPMFAScreens {
    DeviceSetup,
    CodeVerification,
    Loading,
    Blocked,
    AccessDenied,
}

const TOTPMFATheme: React.FC<TOTPMFAProps & { activeScreen: TOTPMFAScreens }> = ({
    activeScreen,
    featureState,
    ...props
}) => {
    const t = useTranslation();
    const commonProps = {
        featureState,
        recipeImplementation: props.recipeImplementation,
        config: props.config,
        clearError: () => props.dispatch({ type: "setError", showAccessDenied: false, error: undefined }),
        onError: (error: string) => props.dispatch({ type: "setError", showAccessDenied: false, error }),
    };

    return activeScreen === TOTPMFAScreens.Blocked ? (
        <BlockedScreen
            nextRetryAt={featureState.nextRetryAt!}
            onRetry={props.onRetryClicked}
            onSignOutClicked={props.onSignOutClicked}
        />
    ) : activeScreen === TOTPMFAScreens.AccessDenied ? (
        <AccessDeniedScreen error={t(featureState.error!)} useShadowDom={false} />
    ) : activeScreen === TOTPMFAScreens.Loading ? (
        <LoadingScreen />
    ) : (
        <div data-supertokens="container totp-mfa">
            <div data-supertokens="row">
                {featureState.loaded && (
                    <React.Fragment>
                        {activeScreen === TOTPMFAScreens.DeviceSetup ? (
                            <DeviceSetupHeader
                                {...commonProps}
                                showBackButton={featureState.showBackButton}
                                onBackButtonClicked={props.onBackButtonClicked}
                            />
                        ) : (
                            <CodeVerificationHeader
                                {...commonProps}
                                showBackButton={featureState.showBackButton}
                                onBackButtonClicked={props.onBackButtonClicked}
                            />
                        )}
                        {activeScreen === TOTPMFAScreens.DeviceSetup && (
                            <DeviceInfoSection
                                {...commonProps}
                                deviceInfo={featureState.deviceInfo!}
                                showSecret={featureState.showSecret}
                                onShowSecretClicked={props.onShowSecretClicked}
                            />
                        )}
                        {featureState.error !== undefined && (
                            <GeneralError error={getErrorString(featureState.error, featureState, t)} />
                        )}
                        <CodeForm
                            {...commonProps}
                            onSuccess={props.onSuccess}
                            footer={
                                activeScreen === TOTPMFAScreens.DeviceSetup ? (
                                    <DeviceSetupFooter {...commonProps} onSignOutClicked={props.onSignOutClicked} />
                                ) : (
                                    <CodeVerificationFooter
                                        {...commonProps}
                                        onSignOutClicked={props.onSignOutClicked}
                                    />
                                )
                            }
                        />
                    </React.Fragment>
                )}
            </div>
            <SuperTokensBranding />
        </div>
    );
};

function TOTPMFAThemeWrapper(props: TOTPMFAProps): JSX.Element {
    const hasFont = hasFontDefined(props.config.rootStyle);

    const activeScreen = getActiveScreen(props);

    let activeStyle;
    if (activeScreen === TOTPMFAScreens.Blocked) {
        activeStyle = props.config.totpMFAScreen.blockedScreenStyle;
    } else if (activeScreen === TOTPMFAScreens.Loading) {
        activeStyle = props.config.totpMFAScreen.loadingScreenStyle;
    } else if (activeScreen === TOTPMFAScreens.DeviceSetup) {
        activeStyle = props.config.totpMFAScreen.setupScreenStyle;
    } else if (activeScreen === TOTPMFAScreens.CodeVerification) {
        activeStyle = props.config.totpMFAScreen.verificationScreenStyle;
    }

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase loadDefaultFont={!hasFont} userStyles={[props.config.rootStyle, activeStyle]}>
                <TOTPMFATheme {...props} activeScreen={activeScreen!} />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default TOTPMFAThemeWrapper;

export function getActiveScreen(props: Pick<TOTPMFAProps, "featureState" | "config">) {
    if (props.featureState.isBlocked) {
        return TOTPMFAScreens.Blocked;
    } else if (props.featureState.loaded === false) {
        return TOTPMFAScreens.Loading;
    } else if (props.featureState.showAccessDenied) {
        return TOTPMFAScreens.AccessDenied;
    } else if (props.featureState.deviceInfo) {
        return TOTPMFAScreens.DeviceSetup;
    } else {
        return TOTPMFAScreens.CodeVerification;
    }
}

function getErrorString(error: string, state: TOTPMFAState, t: TranslationFunc) {
    if (error !== "ERROR_TOTP_INVALID_CODE") {
        return error;
    }

    return (
        t(error) +
        " " +
        t("ERROR_TOTP_INVALID_CODE_RETRY_START") +
        (state.maxAttemptCount! - state.currAttemptCount! + 1) +
        t("ERROR_TOTP_INVALID_CODE_RETRY_END")
    );
}
