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
import { defaultPalette } from "../../../../../styles/styles";
import { SignInUpProps } from "../../../../passwordless/types";
import { CloseTabScreen } from "../../../../passwordless/components/themes/signInUp/closeTabScreen";
import { EmailForm } from "../../../../passwordless/components/themes/signInUp/emailForm";
import { LinkSent } from "../../../../passwordless/components/themes/signInUp/linkSent";
import { PhoneForm } from "../../../../passwordless/components/themes/signInUp/phoneForm";
import { UserInputCodeFormFooter } from "../../../../passwordless/components/themes/signInUp/userInputCodeFormFooter";
import { UserInputCodeFormHeader } from "../../../../passwordless/components/themes/signInUp/userInputCodeFormHeader";
import { SignInUpFooter } from "../../../../passwordless/components/themes/signInUp/signInUpFooter";
import { SignInUpHeader } from "../../../../passwordless/components/themes/signInUp/signInUpHeader";
import { UserInputCodeForm } from "../../../../passwordless/components/themes/signInUp/userInputCodeForm";
import { EmailOrPhoneForm } from "../../../../passwordless/components/themes/signInUp/emailOrPhoneForm";
import { getStyles } from "../styles";
import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";

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
function SignInUpTheme({
    activeScreen,
    header,
    ...props
}: SignInUpProps & { activeScreen: SignInUpScreens; header: JSX.Element }): JSX.Element {
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
                        {props.loaded && header}
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
                    <SuperTokensBranding />
                </div>
            )}
        </React.Fragment>
    );
}

function SignInUpThemeWrapper(props: SignInUpProps & { header: JSX.Element }): JSX.Element {
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

    // This style provider will override the parent with the screen specific user config
    return (
        <StyleProvider
            rawPalette={props.config.palette}
            defaultPalette={defaultPalette}
            styleFromInit={activeStyle}
            rootStyleFromInit={props.config.rootStyle}
            getDefaultStyles={getStyles}>
            <SignInUpTheme {...props} activeScreen={activeScreen!} />
        </StyleProvider>
    );
}

export default SignInUpThemeWrapper;
