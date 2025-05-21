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

import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import SuperTokens from "../../../../../superTokens";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { ThemeBase } from "../themeBase";

import { AuthPageComponentList } from "./authPageComponentList";
import { AuthPageFooter } from "./authPageFooter";
import { AuthPageHeader } from "./authPageHeader";

import type { AuthPageThemeProps } from "../../../types";

export function AuthPageTheme(props: AuthPageThemeProps): JSX.Element {
    if (props.fullPageCompWithPreloadedInfo) {
        return (
            <>
                {props.fullPageCompWithPreloadedInfo.component({
                    ...props,
                    preloadInfo: props.fullPageCompWithPreloadedInfo.preloadInfo,
                    showBackButton: props.showBackButton,
                })}
            </>
        );
    }
    return (
        <div data-supertokens={`container authPage ${props.factorIds.length > 1 ? "multiFactor" : "singleFactor"}`}>
            <div data-supertokens="row">
                <AuthPageHeader
                    factorIds={props.factorIds}
                    isSignUp={props.isSignUp}
                    onSignInUpSwitcherClick={props.onSignInUpSwitcherClick}
                    hasSeparateSignUpView={props.hasSeparateSignUpView}
                    resetFactorList={props.resetFactorList}
                    showBackButton={props.showBackButton}
                    oauth2ClientInfo={props.oauth2ClientInfo}
                />
                {props.error !== undefined && <GeneralError error={props.error} />}
                <AuthPageComponentList {...props} />
                <AuthPageFooter
                    factorIds={props.factorIds}
                    isSignUp={props.isSignUp}
                    hasSeparateSignUpView={props.hasSeparateSignUpView}
                    privacyPolicyLink={props.privacyPolicyLink}
                    termsOfServiceLink={props.termsOfServiceLink}
                />
            </div>
            <SuperTokensBranding />
        </div>
    );
}

function AuthPageThemeWrapper(props: AuthPageThemeProps): JSX.Element {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase userStyles={[rootStyle]}>
                <AuthPageTheme {...props} />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default AuthPageThemeWrapper;
