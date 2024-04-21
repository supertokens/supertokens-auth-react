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
import { useMemo } from "react";

import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import { hasFontDefined } from "../../../../../styles/styles";
import SuperTokens from "../../../../../superTokens";
import { useTranslation } from "../../../../../translation/translationContext";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { ThemeBase } from "../themeBase";

import { AuthPageFooter } from "./authPageFooter";
import { AuthPageHeader } from "./authPageHeader";

import type { AuthPageThemeProps } from "../../../types";

export function AuthPageTheme(props: AuthPageThemeProps): JSX.Element {
    const t = useTranslation();

    const authCompList = useMemo(() => {
        if (props.fullPageCompWithPreloadedInfo) {
            return [];
        }

        const list = [props.authComponents[0]];
        for (let i = 1; i < props.authComponents.length; ++i) {
            list.push(() => (
                <div key={`divider-${i}`} data-supertokens="dividerWithOr">
                    <div data-supertokens="divider"></div>
                    <div data-supertokens="dividerText">{t("DIVIDER_OR")}</div>
                    <div data-supertokens="divider"></div>
                </div>
            ));
            list.push(props.authComponents[i]);
        }
        return (
            <div data-supertokens="authComponentList">
                {list.map((i) =>
                    i({
                        ...props,
                    })
                )}
            </div>
        );
    }, [props.authComponents]);

    if (props.fullPageCompWithPreloadedInfo) {
        return (
            <>
                {props.fullPageCompWithPreloadedInfo.component({
                    ...props,
                    preloadInfo: props.fullPageCompWithPreloadedInfo.preloadInfo,
                })}
            </>
        );
    }
    return (
        <div data-supertokens="container auth-page">
            <div data-supertokens="row">
                <AuthPageHeader
                    factorIds={props.factorIds}
                    isSignUp={props.isSignUp}
                    onSignInUpSwitcherClick={props.onSignInUpSwitcherClick}
                    hasSeparateSignUpView={props.hasSeparateSignUpView}
                />
                {props.error !== undefined && <GeneralError error={props.error} />}
                {authCompList}
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
    const hasFont = hasFontDefined(rootStyle);

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase loadDefaultFont={!hasFont} userStyles={[rootStyle]}>
                <AuthPageTheme {...props} />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default AuthPageThemeWrapper;
