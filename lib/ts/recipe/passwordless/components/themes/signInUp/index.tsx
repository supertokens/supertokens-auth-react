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

import { hasFontDefined } from "../../../../../styles/styles";
import SuperTokens from "../../../../../superTokens";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import { FactorIds } from "../../../../multifactorauth";
import { ThemeBase } from "../themeBase";

import { EmailForm } from "./emailForm";
import { EmailOrPhoneForm } from "./emailOrPhoneForm";
import { PhoneForm } from "./phoneForm";

import type { SignInUpProps } from "../../../types";

export enum SignInUpScreens {
    EmailForm,
    PhoneForm,
    EmailOrPhoneForm,
}

/*
 * Component.
 */
const SignInUpTheme: React.FC<SignInUpProps & { activeScreen: SignInUpScreens }> = ({ activeScreen, ...props }) => {
    const commonProps = {
        recipeImplementation: props.recipeImplementation,
        config: props.config,
        clearError: props.clearError,
        onError: props.onError,
        onFetchError: props.onFetchError,
        error: props.error,
        validatePhoneNumber: props.validatePhoneNumber,
    };

    return activeScreen === SignInUpScreens.EmailForm ? (
        <EmailForm {...commonProps} />
    ) : activeScreen === SignInUpScreens.PhoneForm ? (
        <PhoneForm {...commonProps} />
    ) : activeScreen === SignInUpScreens.EmailOrPhoneForm ? (
        <EmailOrPhoneForm {...commonProps} />
    ) : null;
};

function SignInUpThemeWrapper(props: SignInUpProps): JSX.Element {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    const hasFont = hasFontDefined(rootStyle) || hasFontDefined(props.config.recipeRootStyle);

    const activeScreen = getActiveScreen(props.factorIds);

    let activeStyle;
    if (activeScreen === SignInUpScreens.EmailForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (activeScreen === SignInUpScreens.PhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (activeScreen === SignInUpScreens.EmailOrPhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    }

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase loadDefaultFont={!hasFont} userStyles={[rootStyle, props.config.recipeRootStyle, activeStyle]}>
                <SignInUpTheme {...props} activeScreen={activeScreen!} />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default SignInUpThemeWrapper;

export function getActiveScreen(factorIds: string[]) {
    if (factorIds.includes(FactorIds.LINK_EMAIL) || factorIds.includes(FactorIds.OTP_EMAIL)) {
        if (factorIds.includes(FactorIds.OTP_PHONE) || factorIds.includes(FactorIds.LINK_PHONE)) {
            return SignInUpScreens.EmailOrPhoneForm;
        } else {
            return SignInUpScreens.EmailForm;
        }
    } else {
        return SignInUpScreens.PhoneForm;
    }
}
