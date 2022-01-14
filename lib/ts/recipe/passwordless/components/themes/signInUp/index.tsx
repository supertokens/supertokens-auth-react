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
import StyleContext, { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette, hasFontDefined } from "../../../../../styles/styles";
import { SignInUpProps } from "../../../types";
import { ThemeBase } from "../themeBase";
import { CloseTabScreen } from "./closeTabScreen";
import { EmailForm } from "./emailForm";
import { LinkSent } from "./linkSent";
import { PhoneForm } from "./phoneForm";
import { UserInputCodeFormFooter } from "./userInputCodeFormFooter";
import { UserInputCodeFormHeader } from "./userInputCodeFormHeader";
import { SignInUpFooter } from "./signInUpFooter";
import { SignInUpHeader } from "./signInUpHeader";
import { UserInputCodeForm } from "./userInputCodeForm";
import { getStyles } from "../styles";
import { EmailOrPhoneForm } from "./emailOrPhoneForm";

enum SignInUpScreens {
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
function SignInUpTheme({ activeScreen, ...props }: SignInUpProps & { activeScreen: SignInUpScreens }): JSX.Element {
    const styles = useContext(StyleContext);

    const recipeAndConfig = {
        recipeImplementation: props.recipeImplementation,
        config: props.config,
    };

    return (
        <React.Fragment>
            {activeScreen === SignInUpScreens.CloseTab ? (
                <CloseTabScreen {...props} />
            ) : activeScreen === SignInUpScreens.LinkSent ? (
                <LinkSent {...props} loginAttemptInfo={props.loginAttemptInfo!} />
            ) : (
                <div data-supertokens="container" css={styles.container}>
                    <div data-supertokens="row" css={styles.row}>
                        {props.loaded &&
                            (activeScreen === SignInUpScreens.EmailForm ? (
                                <EmailForm
                                    {...recipeAndConfig}
                                    error={props.error}
                                    header={<SignInUpHeader />}
                                    footer={
                                        <SignInUpFooter
                                            privacyPolicyLink={props.config.signInUpFeature.privacyPolicyLink}
                                            termsOfServiceLink={props.config.signInUpFeature.termsOfServiceLink}
                                        />
                                    }
                                />
                            ) : activeScreen === SignInUpScreens.PhoneForm ? (
                                <PhoneForm
                                    {...recipeAndConfig}
                                    error={props.error}
                                    header={<SignInUpHeader />}
                                    footer={
                                        <SignInUpFooter
                                            privacyPolicyLink={props.config.signInUpFeature.privacyPolicyLink}
                                            termsOfServiceLink={props.config.signInUpFeature.termsOfServiceLink}
                                        />
                                    }
                                />
                            ) : activeScreen === SignInUpScreens.EmailOrPhoneForm ? (
                                <EmailOrPhoneForm
                                    {...recipeAndConfig}
                                    error={props.error}
                                    header={<SignInUpHeader />}
                                    footer={
                                        <SignInUpFooter
                                            privacyPolicyLink={props.config.signInUpFeature.privacyPolicyLink}
                                            termsOfServiceLink={props.config.signInUpFeature.termsOfServiceLink}
                                        />
                                    }
                                />
                            ) : activeScreen === SignInUpScreens.UserInputCodeForm ? (
                                <UserInputCodeForm
                                    {...recipeAndConfig}
                                    loginAttemptInfo={props.loginAttemptInfo!}
                                    onSuccess={props.onSuccess}
                                    error={props.error}
                                    header={
                                        <UserInputCodeFormHeader
                                            {...recipeAndConfig}
                                            loginAttemptInfo={props.loginAttemptInfo!}
                                        />
                                    }
                                    footer={
                                        <UserInputCodeFormFooter
                                            {...recipeAndConfig}
                                            loginAttemptInfo={props.loginAttemptInfo!}
                                        />
                                    }
                                />
                            ) : undefined)}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

function SignInUpThemeWrapper(props: SignInUpProps): JSX.Element {
    const hasFont = hasFontDefined(props.config.rootStyle);

    let activeScreen: SignInUpScreens | undefined;
    let activeStyle;
    if (props.successInAnotherTab) {
        activeScreen = SignInUpScreens.CloseTab;
        activeStyle = props.config.signInUpFeature.closeTabScreenStyle;
    } else if (props.loginAttemptInfo && props.loginAttemptInfo.flowType === "MAGIC_LINK") {
        activeScreen = SignInUpScreens.LinkSent;
        activeStyle = props.config.signInUpFeature.linkSentScreenStyle;
    } else if (props.loginAttemptInfo) {
        activeScreen = SignInUpScreens.UserInputCodeForm;
        activeStyle = props.config.signInUpFeature.userInputCodeFormStyle;
    } else if (props.config.contactMethod === "EMAIL") {
        activeScreen = SignInUpScreens.EmailForm;
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (props.config.contactMethod === "PHONE") {
        activeScreen = SignInUpScreens.PhoneForm;
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (props.config.contactMethod === "EMAIL_OR_PHONE") {
        activeScreen = SignInUpScreens.EmailOrPhoneForm;
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
