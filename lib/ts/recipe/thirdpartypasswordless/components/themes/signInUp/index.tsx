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
import * as React from "react";
import {
    ThirdPartyPasswordlessSignInAndUpThemeProps,
    ThirdPartyPasswordlessSignInAndUpThemePropsWithActiveScreen,
} from "../../../types";
import { Header } from "./header";
import StyleContext, { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette, hasFontDefined } from "../../../../../styles/styles";
import { getStyles } from "../styles";
import { getActiveScreen, SignInUpScreens } from "../../../../passwordless/components/themes/signInUp";
import { ThemeBase } from "../themeBase";
import { useTranslation } from "../../../../..";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { ProvidersForm } from "../../../../thirdparty/components/themes/signInAndUp/providersForm";
import { CloseTabScreen } from "../../../../passwordless/components/themes/signInUp/closeTabScreen";
import { LinkSent } from "../../../../passwordless/components/themes/signInUp/linkSent";
import { UserInputCodeFormHeader } from "../../../../passwordless/components/themes/signInUp/userInputCodeFormHeader";
import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import { UserInputCodeForm } from "../../../../passwordless/components/themes/signInUp/userInputCodeForm";
import { EmailOrPhoneForm } from "../../../../passwordless/components/themes/signInUp/emailOrPhoneForm";
import { PhoneForm } from "../../../../passwordless/components/themes/signInUp/phoneForm";
import { EmailForm } from "../../../../passwordless/components/themes/signInUp/emailForm";
import { ChildProps } from "../../../../passwordless/types";

const SignInUpTheme: React.FC<ThirdPartyPasswordlessSignInAndUpThemePropsWithActiveScreen> = (props) => {
    const t = useTranslation();
    const styles = React.useContext(StyleContext);

    if (props.activeScreen === SignInUpScreens.CloseTab) {
        return <CloseTabScreen {...props.pwlessChildProps} />;
    } else if (props.activeScreen === SignInUpScreens.LinkSent) {
        return (
            <LinkSent
                {...getCommonPwlessProps(props.pwlessChildProps, props)}
                loginAttemptInfo={props.pwlessState.loginAttemptInfo!}
            />
        );
    }

    return (
        <div data-supertokens="container" css={styles.container}>
            <div data-supertokens="row" css={styles.row}>
                {(props.pwlessChildProps === undefined || props.pwlessState.loaded === true) && (
                    <React.Fragment>
                        {props.activeScreen === SignInUpScreens.UserInputCodeForm ? (
                            <UserInputCodeFormHeader
                                {...getCommonPwlessProps(props.pwlessChildProps, props)}
                                loginAttemptInfo={props.pwlessState.loginAttemptInfo!}
                            />
                        ) : (
                            <Header />
                        )}
                        {props.commonState.error && <GeneralError error={props.commonState.error} />}
                        {props.tpChildProps !== undefined &&
                            props.activeScreen !== SignInUpScreens.UserInputCodeForm && (
                                <ProvidersForm
                                    {...props.tpChildProps}
                                    featureState={props.tpState}
                                    dispatch={props.tpDispatch}
                                />
                            )}
                        {props.config.disablePasswordless !== true &&
                            props.thirdPartyRecipe !== undefined &&
                            props.activeScreen !== SignInUpScreens.UserInputCodeForm && (
                                <div
                                    data-supertokens="thirdPartyPasswordlessDivider"
                                    css={styles.thirdPartyPasswordlessDivider}>
                                    <div data-supertokens="divider" css={styles.divider}></div>
                                    <div
                                        data-supertokens="thirdPartyPasswordlessDividerOr"
                                        css={styles.thirdPartyPasswordlessDividerOr}>
                                        {t("THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_DIVIDER_OR")}
                                    </div>
                                    <div data-supertokens="divider" css={styles.divider}></div>
                                </div>
                            )}
                        {props.activeScreen === SignInUpScreens.EmailForm ? (
                            <EmailForm {...getCommonPwlessProps(props.pwlessChildProps, props)} />
                        ) : props.activeScreen === SignInUpScreens.PhoneForm ? (
                            <PhoneForm {...getCommonPwlessProps(props.pwlessChildProps, props)} />
                        ) : props.activeScreen === SignInUpScreens.EmailOrPhoneForm ? (
                            <EmailOrPhoneForm {...getCommonPwlessProps(props.pwlessChildProps, props)} />
                        ) : props.activeScreen === SignInUpScreens.UserInputCodeForm ? (
                            <UserInputCodeForm
                                {...getCommonPwlessProps(props.pwlessChildProps, props)}
                                loginAttemptInfo={props.pwlessState.loginAttemptInfo!}
                                onSuccess={props.pwlessChildProps.onSuccess}
                            />
                        ) : null}
                    </React.Fragment>
                )}
            </div>
            <SuperTokensBranding />
        </div>
    );
};

function SignInUpThemeWrapper(props: ThirdPartyPasswordlessSignInAndUpThemeProps): JSX.Element {
    const hasFont = hasFontDefined(props.config.rootStyle);
    const activeScreen =
        props.pwlessChildProps !== undefined
            ? getActiveScreen({
                  config: props.pwlessChildProps.config,
                  featureState: props.pwlessState,
              })
            : undefined;

    let activeStyle;
    if (activeScreen === SignInUpScreens.CloseTab) {
        activeStyle = props.config.signInUpFeature.closeTabScreenStyle;
    } else if (activeScreen === SignInUpScreens.LinkSent) {
        activeStyle = props.config.signInUpFeature.linkSentScreenStyle;
    } else if (activeScreen === SignInUpScreens.UserInputCodeForm) {
        activeStyle = props.config.signInUpFeature.userInputCodeFormStyle;
    } else if (activeScreen === SignInUpScreens.EmailForm) {
        activeStyle = props.config.signInUpFeature.providerAndEmailOrPhoneFormStyle;
    } else if (activeScreen === SignInUpScreens.PhoneForm) {
        activeStyle = props.config.signInUpFeature.providerAndEmailOrPhoneFormStyle;
    } else if (activeScreen === SignInUpScreens.EmailOrPhoneForm) {
        activeStyle = props.config.signInUpFeature.providerAndEmailOrPhoneFormStyle;
    }

    // This style provider will override the parent with the screen specific user config
    return (
        <ThemeBase loadDefaultFont={!hasFont}>
            <StyleProvider
                rawPalette={props.config.palette}
                defaultPalette={defaultPalette}
                styleFromInit={activeStyle}
                rootStyleFromInit={props.config.rootStyle}
                getDefaultStyles={getStyles}>
                <SignInUpTheme {...(props as any)} activeScreen={activeScreen} />
            </StyleProvider>
        </ThemeBase>
    );
}
export default SignInUpThemeWrapper;

// Simple convenience function
function getCommonPwlessProps(childProps: ChildProps, props: ThirdPartyPasswordlessSignInAndUpThemeProps) {
    return {
        recipeImplementation: childProps.recipeImplementation,
        config: childProps.config,
        clearError: () => props.pwlessDispatch({ type: "setError", error: undefined }),
        onError: (error: string) => props.pwlessDispatch({ type: "setError", error }),
        error: props.pwlessState.error,
    };
}
