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
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useContext } from "react";
import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import StyleContext, { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette, hasFontDefined } from "../../../../../styles/styles";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { SignInUpProps } from "../../../types";
import { getStyles } from "../styles";
import { ThemeBase } from "../themeBase";
import { CloseTabScreen } from "./closeTabScreen";
import { EmailForm } from "./emailForm";
import { EmailOrPhoneForm } from "./emailOrPhoneForm";
import { LinkSent } from "./linkSent";
import { PhoneForm } from "./phoneForm";
import { SignInUpHeader } from "./signInUpHeader";
import { UserInputCodeForm } from "./userInputCodeForm";
import { UserInputCodeFormHeader } from "./userInputCodeFormHeader";

export enum SignInUpScreens {
    CloseTab,
    LinkSent,
    EmailForm,
    PhoneForm,
    EmailOrPhoneForm,
    UserInputCodeForm,
}

/*
 * Component.
 */
const SignInUpTheme: React.FC<SignInUpProps & { activeScreen: SignInUpScreens }> = ({
    activeScreen,
    featureState,
    ...props
}) => {
    const styles = useContext(StyleContext);

    const commonProps = {
        recipeImplementation: props.recipeImplementation,
        config: props.config,
        clearError: () => props.dispatch({ type: "setError", error: undefined }),
        onError: (error: string) => props.dispatch({ type: "setError", error }),
        error: featureState.error,
    };

    return activeScreen === SignInUpScreens.CloseTab ? (
        <CloseTabScreen {...commonProps} />
    ) : activeScreen === SignInUpScreens.LinkSent ? (
        <LinkSent {...commonProps} loginAttemptInfo={featureState.loginAttemptInfo!} />
    ) : (
        <div data-supertokens="container" css={styles.container}>
            <div data-supertokens="row" css={styles.row}>
                {featureState.loaded && (
                    <React.Fragment>
                        {activeScreen === SignInUpScreens.UserInputCodeForm ? (
                            <UserInputCodeFormHeader
                                {...commonProps}
                                loginAttemptInfo={featureState.loginAttemptInfo!}
                            />
                        ) : (
                            <SignInUpHeader />
                        )}
                        {featureState.error !== undefined && <GeneralError error={featureState.error} />}
                        {activeScreen === SignInUpScreens.EmailForm ? (
                            <EmailForm {...commonProps} />
                        ) : activeScreen === SignInUpScreens.PhoneForm ? (
                            <PhoneForm {...commonProps} />
                        ) : activeScreen === SignInUpScreens.EmailOrPhoneForm ? (
                            <EmailOrPhoneForm {...commonProps} />
                        ) : activeScreen === SignInUpScreens.UserInputCodeForm ? (
                            <UserInputCodeForm
                                {...commonProps}
                                loginAttemptInfo={featureState.loginAttemptInfo!}
                                onSuccess={props.onSuccess}
                            />
                        ) : null}
                    </React.Fragment>
                )}
            </div>
            <SuperTokensBranding />
        </div>
    );
};

function SignInUpThemeWrapper(props: SignInUpProps): JSX.Element {
    const hasFont = hasFontDefined(props.config.rootStyle);

    const activeScreen = getActiveScreen(props);

    let activeStyle;
    if (activeScreen === SignInUpScreens.CloseTab) {
        activeStyle = props.config.signInUpFeature.closeTabScreenStyle;
    } else if (activeScreen === SignInUpScreens.LinkSent) {
        activeStyle = props.config.signInUpFeature.linkSentScreenStyle;
    } else if (activeScreen === SignInUpScreens.UserInputCodeForm) {
        activeStyle = props.config.signInUpFeature.userInputCodeFormStyle;
    } else if (activeScreen === SignInUpScreens.EmailForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (activeScreen === SignInUpScreens.PhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (activeScreen === SignInUpScreens.EmailOrPhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    }

    return (
        <ThemeBase loadDefaultFont={!hasFont}>
            <StyleProvider
                rawPalette={props.config.palette}
                defaultPalette={defaultPalette}
                styleFromInit={activeStyle}
                rootStyleFromInit={props.config.rootStyle}
                getDefaultStyles={getStyles}>
                <SignInUpTheme {...props} activeScreen={activeScreen!} />
            </StyleProvider>
        </ThemeBase>
    );
}

export default SignInUpThemeWrapper;

export function getActiveScreen(props: Pick<SignInUpProps, "featureState" | "config">) {
    if (props.featureState.successInAnotherTab) {
        return SignInUpScreens.CloseTab;
    } else if (props.featureState.loginAttemptInfo && props.featureState.loginAttemptInfo.flowType === "MAGIC_LINK") {
        return SignInUpScreens.LinkSent;
    } else if (props.featureState.loginAttemptInfo) {
        return SignInUpScreens.UserInputCodeForm;
    } else if (props.config.contactMethod === "EMAIL") {
        return SignInUpScreens.EmailForm;
    } else if (props.config.contactMethod === "PHONE") {
        return SignInUpScreens.PhoneForm;
    } else if (props.config.contactMethod === "EMAIL_OR_PHONE") {
        return SignInUpScreens.EmailOrPhoneForm;
    }
    throw new Error("Couldn't choose active screen; Should never happen");
}
