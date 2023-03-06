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
import * as React from "react";

import { useTranslation } from "../../../../..";
import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import { hasFontDefined } from "../../../../../styles/styles";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { getActiveScreen, SignInUpScreens } from "../../../../passwordless/components/themes/signInUp";
import { CloseTabScreen } from "../../../../passwordless/components/themes/signInUp/closeTabScreen";
import { EmailForm } from "../../../../passwordless/components/themes/signInUp/emailForm";
import { EmailOrPhoneForm } from "../../../../passwordless/components/themes/signInUp/emailOrPhoneForm";
import { LinkSent } from "../../../../passwordless/components/themes/signInUp/linkSent";
import { PhoneForm } from "../../../../passwordless/components/themes/signInUp/phoneForm";
import { UserInputCodeForm } from "../../../../passwordless/components/themes/signInUp/userInputCodeForm";
import { UserInputCodeFormHeader } from "../../../../passwordless/components/themes/signInUp/userInputCodeFormHeader";
import { ProvidersForm } from "../../../../thirdparty/components/themes/signInAndUp/providersForm";
import { ThemeBase } from "../themeBase";

import { Header } from "./header";

import type { SignInUpChildProps as PwlessSignInUpChildProps } from "../../../../passwordless/types";
import type {
    ThirdPartyPasswordlessSignInAndUpThemeProps,
    ThirdPartyPasswordlessSignInAndUpThemePropsWithActiveScreen,
} from "../../../types";

const SignInUpTheme: React.FC<ThirdPartyPasswordlessSignInAndUpThemePropsWithActiveScreen> = (props) => {
    const t = useTranslation();

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
        <div data-supertokens="container">
            <div data-supertokens="row">
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
                        {props.thirdPartyRecipe !== undefined &&
                            props.passwordlessRecipe !== undefined &&
                            props.activeScreen !== SignInUpScreens.UserInputCodeForm && (
                                <div data-supertokens="thirdPartyPasswordlessDivider">
                                    <div data-supertokens="divider"></div>
                                    <div data-supertokens="thirdPartyPasswordlessDividerText">
                                        {t("THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_DIVIDER_OR")}
                                    </div>
                                    <div data-supertokens="divider"></div>
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

function SignInUpThemeWrapper(props: ThirdPartyPasswordlessSignInAndUpThemeProps) {
    const hasFont = hasFontDefined(props.config.rootStyle);

    // By defining it in a single object here TSC can deduce the connection between props
    const childProps =
        props.passwordlessRecipe !== undefined && props.pwlessChildProps !== undefined
            ? {
                  ...props,
                  activeScreen: getActiveScreen({
                      config: props.pwlessChildProps.config,
                      featureState: props.pwlessState,
                  }),
                  pwlessChildProps: props.pwlessChildProps,
                  passwordlessRecipe: props.passwordlessRecipe,
              }
            : {
                  ...props,
                  activeScreen: undefined,
                  passwordlessRecipe: undefined,
                  pwlessChildProps: undefined,
              };

    let activeStyle;
    if (childProps.activeScreen === SignInUpScreens.CloseTab) {
        activeStyle = props.passwordlessRecipe!.config.signInUpFeature.closeTabScreenStyle;
    } else if (childProps.activeScreen === SignInUpScreens.LinkSent) {
        activeStyle = props.passwordlessRecipe!.config.signInUpFeature.linkSentScreenStyle;
    } else if (childProps.activeScreen === SignInUpScreens.UserInputCodeForm) {
        activeStyle = props.passwordlessRecipe!.config.signInUpFeature.userInputCodeFormStyle;
    } else {
        // This case also includes undefined which means that passwordless is disabled
        activeStyle = props.config.thirdPartyProviderAndEmailOrPhoneFormStyle;
    }

    // This style provider will override the parent with the screen specific user config
    return (
        <ThemeBase loadDefaultFont={!hasFont} userStyles={[props.config.rootStyle, activeStyle]}>
            <SignInUpTheme {...childProps} />
        </ThemeBase>
    );
}
export default SignInUpThemeWrapper;

// Simple convenience function
function getCommonPwlessProps(
    childProps: PwlessSignInUpChildProps,
    props: ThirdPartyPasswordlessSignInAndUpThemeProps
) {
    return {
        recipeImplementation: childProps.recipeImplementation,
        config: childProps.config,
        clearError: () => props.pwlessDispatch({ type: "setError", error: undefined }),
        onError: (error: string) => props.pwlessDispatch({ type: "setError", error }),
        error: props.pwlessState.error,
    };
}
