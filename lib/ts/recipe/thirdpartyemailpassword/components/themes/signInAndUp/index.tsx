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
import SuperTokens from "../../../../../superTokens";
import { useTranslation } from "../../../../../translation/translationContext";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { SignInFooter } from "../../../../emailpassword/components/themes/signInAndUp/signInFooter";
import { SignInForm } from "../../../../emailpassword/components/themes/signInAndUp/signInForm";
import { SignUpFooter } from "../../../../emailpassword/components/themes/signInAndUp/signUpFooter";
import { SignUpForm } from "../../../../emailpassword/components/themes/signInAndUp/signUpForm";
import MultiFactorAuth from "../../../../multifactorauth/recipe";
import { useDynamicLoginMethods } from "../../../../multitenancy/dynamicLoginMethodsContext";
import { ProvidersForm } from "../../../../thirdparty/components/themes/signInAndUp/providersForm";
import { ThemeBase } from "../themeBase";

import { Header } from "./header";

import type { UserContext } from "../../../../../types";
import type { GetLoginMethodsResponseNormalized } from "../../../../multitenancy/types";
import type { ThirdPartyEmailPasswordSignInAndUpThemeProps } from "../../../types";

const SignInAndUpTheme: React.FC<ThirdPartyEmailPasswordSignInAndUpThemeProps> = (props) => {
    const t = useTranslation();
    const usesDynamicLoginMethods = SuperTokens.usesDynamicLoginMethods;
    const dynamicLoginMethods = useDynamicLoginMethods();
    let loginMethods: GetLoginMethodsResponseNormalized | undefined;
    if (usesDynamicLoginMethods) {
        if (dynamicLoginMethods.loaded === false) {
            throw new Error("Component requiring dynamicLoginMethods rendered without FeatureWrapper.");
        } else {
            loginMethods = dynamicLoginMethods.loginMethods;
        }
    }
    const hasProviders = props.tpChildProps?.providers !== undefined && props.tpChildProps.providers.length > 0;
    const mfa = MultiFactorAuth.getInstance();
    let thirdPartyEnabled: boolean = hasProviders;
    let emailPasswordEnabled: boolean = props.emailPasswordRecipe !== undefined;

    if (usesDynamicLoginMethods) {
        thirdPartyEnabled =
            (loginMethods!.firstFactors === undefined
                ? loginMethods!.thirdparty.enabled
                : loginMethods!.firstFactors.includes("thirdparty")) && hasProviders;
        emailPasswordEnabled =
            (loginMethods!.firstFactors === undefined
                ? loginMethods!.emailpassword.enabled
                : loginMethods!.firstFactors.includes("emailpassword")) && props.emailPasswordRecipe !== undefined;
    } else if (mfa !== undefined) {
        thirdPartyEnabled = mfa.isFirstFactorEnabledOnClient("thirdparty") && hasProviders;
        emailPasswordEnabled =
            mfa.isFirstFactorEnabledOnClient("emailpassword") && props.emailPasswordRecipe !== undefined;
    }

    if (thirdPartyEnabled === false && emailPasswordEnabled === false) {
        return null;
    }

    return (
        <div data-supertokens="container">
            <div data-supertokens="row">
                <Header
                    isSignUp={props.epState.isSignUp}
                    setIsSignUp={(isSignUp) => props.epDispatch({ type: isSignUp ? "setSignUp" : "setSignIn" })}
                    emailPasswordEnabled={emailPasswordEnabled}
                />
                {props.commonState.error && <GeneralError error={props.commonState.error} />}
                {props.tpChildProps !== undefined && thirdPartyEnabled && (
                    <ProvidersForm {...props.tpChildProps} featureState={props.tpState} dispatch={props.tpDispatch} />
                )}
                {emailPasswordEnabled && thirdPartyEnabled && (
                    <div data-supertokens="thirdPartyEmailPasswordDivider">
                        <div data-supertokens="divider"></div>
                        <div data-supertokens="thirdPartyEmailPasswordDividerOr">
                            {t("THIRD_PARTY_EMAIL_PASSWORD_SIGN_IN_AND_UP_DIVIDER_OR")}
                        </div>
                        <div data-supertokens="divider"></div>
                    </div>
                )}
                {props.epChildProps !== undefined &&
                    emailPasswordEnabled &&
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
        userContext?: UserContext;
    }
): JSX.Element {
    const hasFont = hasFontDefined(props.config.rootStyle);

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase
                loadDefaultFont={!hasFont}
                userStyles={[props.config.rootStyle, props.config.signInAndUpFeature.style]}>
                <SignInAndUpTheme {...props} />
            </ThemeBase>
        </UserContextWrapper>
    );
}
