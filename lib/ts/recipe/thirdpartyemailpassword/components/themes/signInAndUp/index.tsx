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
import { ThirdPartyEmailPasswordSignInAndUpThemeProps } from "../../../types";
import { ThemeBase } from "../themeBase";
import { Header } from "./header";
import { ProvidersForm } from "../../../../thirdparty/components/themes/signInAndUp/providersForm";
import { defaultPalette, hasFontDefined } from "../../../../../styles/styles";
import { getStyles } from "../styles";
import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import { useTranslation } from "../../../../../translation/translationContext";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { SignUpFooter } from "../../../../emailpassword/components/themes/signInAndUp/signUpFooter";
import { SignInForm } from "../../../../emailpassword/components/themes/signInAndUp/signInForm";
import { SignUpForm } from "../../../../emailpassword/components/themes/signInAndUp/signUpForm";
import { SignInFooter } from "../../../../emailpassword/components/themes/signInAndUp/signInFooter";
import UserContextWrapper from "../../../../../usercontext/userContextThemeWrapper";

const SignInAndUpTheme: React.FC<ThirdPartyEmailPasswordSignInAndUpThemeProps> = (props) => {
    const t = useTranslation();
    const styles = useContext(StyleContext);

    return (
        <div data-supertokens="container" css={styles.container}>
            <div data-supertokens="row" css={styles.row}>
                <Header
                    isSignUp={props.epState.isSignUp}
                    setIsSignUp={(isSignUp) => props.epDispatch({ type: isSignUp ? "setSignUp" : "setSignIn" })}
                />
                {props.commonState.error && <GeneralError error={props.commonState.error} />}
                {props.tpChildProps !== undefined && (
                    <ProvidersForm {...props.tpChildProps} featureState={props.tpState} dispatch={props.tpDispatch} />
                )}
                {props.config.disableEmailPassword !== true && props.thirdPartyRecipe !== undefined && (
                    <div data-supertokens="thirdPartyEmailPasswordDivider" css={styles.thirdPartyEmailPasswordDivider}>
                        <div data-supertokens="divider" css={styles.divider}></div>
                        <div
                            data-supertokens="thirdPartyEmailPasswordDividerOr"
                            css={styles.thirdPartyEmailPasswordDividerOr}>
                            {t("THIRD_PARTY_EMAIL_PASSWORD_SIGN_IN_AND_UP_DIVIDER_OR")}
                        </div>
                        <div data-supertokens="divider" css={styles.divider}></div>
                    </div>
                )}
                {props.epChildProps !== undefined &&
                    (props.epState.isSignUp ? (
                        <SignUpForm
                            {...props.epChildProps.signUpForm}
                            footer={
                                <SignUpFooter
                                    privacyPolicyLink={
                                        props.epChildProps.config.signInAndUpFeature.signUpForm.privacyPolicyLink
                                    }
                                    termsOfServiceLink={
                                        props.epChildProps.config.signInAndUpFeature.signUpForm.termsOfServiceLink
                                    }
                                />
                            }
                        />
                    ) : (
                        <SignInForm
                            {...props.epChildProps.signInForm}
                            footer={<SignInFooter onClick={props.epChildProps.signInForm.forgotPasswordClick} />}
                        />
                    ))}
            </div>
            <SuperTokensBranding />
        </div>
    );
};

export default function SignInAndUpThemeWrapper(
    props: ThirdPartyEmailPasswordSignInAndUpThemeProps & {
        userContext?: any;
    }
): JSX.Element {
    const hasFont = hasFontDefined(props.config.rootStyle);

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase loadDefaultFont={!hasFont}>
                <StyleProvider
                    rawPalette={props.config.palette}
                    defaultPalette={defaultPalette}
                    styleFromInit={props.config.signInAndUpFeature.style}
                    rootStyleFromInit={props.config.rootStyle}
                    getDefaultStyles={getStyles}>
                    <SignInAndUpTheme {...props} />
                </StyleProvider>
            </ThemeBase>
        </UserContextWrapper>
    );
}
