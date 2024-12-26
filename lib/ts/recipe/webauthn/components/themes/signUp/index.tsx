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

import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import SuperTokens from "../../../../../superTokens";
import { AuthPageFooter, AuthPageHeader } from "../../../../../ui";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { ThemeBase } from "../themeBase";

import { SignUpForm } from "./signUpForm";

import type { SignUpThemeProps } from "../../../types";

function SignUpTheme(props: SignUpThemeProps): JSX.Element {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;

    const activeStyle = props.config.signUpFeature.style;

    const stInstance = SuperTokens.getInstanceOrThrow();

    const privacyPolicyLink = stInstance.privacyPolicyLink;
    const termsOfServiceLink = stInstance.termsOfServiceLink;

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle, activeStyle]}>
                <div
                    data-supertokens={`container authPage ${
                        props.factorIds.length > 1 ? "multiFactor" : "singleFactor"
                    }`}>
                    <div data-supertokens="row">
                        <AuthPageHeader
                            factorIds={props.factorIds}
                            isSignUp={true}
                            onSignInUpSwitcherClick={props.onSignInUpSwitcherClick}
                            hasSeparateSignUpView={true}
                            resetFactorList={props.resetFactorList}
                            showBackButton={true}
                            oauth2ClientInfo={undefined}
                        />
                        {props.error !== undefined && <GeneralError error={props.error} />}
                        <SignUpForm {...props} />
                        <AuthPageFooter
                            factorIds={props.factorIds}
                            isSignUp={true}
                            hasSeparateSignUpView={true}
                            privacyPolicyLink={privacyPolicyLink}
                            termsOfServiceLink={termsOfServiceLink}
                        />
                    </div>
                    <SuperTokensBranding />
                </div>
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default SignUpTheme;
