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

import SuperTokens from "../../../../../superTokens";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import { FactorIds } from "../../../../multifactorauth";
import { ThemeBase } from "../themeBase";

import { EPComboEmailForm } from "./emailForm";
import { EPComboEmailOrPhoneForm } from "./emailOrPhoneForm";

import type { SignInUpEPComboChildProps } from "../../../types";

export enum SignInUpEPComboScreens {
    EmailForm,
    EmailOrPhoneForm,
}

/*
 * Component.
 */
const SignInUpTheme: React.FC<SignInUpEPComboChildProps & { activeScreen: SignInUpEPComboScreens }> = ({
    activeScreen,
    ...props
}) => {
    const commonProps = {
        ...props,
    };

    return activeScreen === SignInUpEPComboScreens.EmailForm ? (
        <EPComboEmailForm {...commonProps} />
    ) : activeScreen === SignInUpEPComboScreens.EmailOrPhoneForm ? (
        <EPComboEmailOrPhoneForm {...commonProps} />
    ) : null;
};

function SignInUpThemeWrapper(props: SignInUpEPComboChildProps): JSX.Element {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;

    const activeScreen = getActiveScreen(props.factorIds);

    const activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle, activeStyle]}>
                <SignInUpTheme {...props} activeScreen={activeScreen!} />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default SignInUpThemeWrapper;

function getActiveScreen(factorIds: string[]) {
    if (factorIds.includes(FactorIds.OTP_PHONE) || factorIds.includes(FactorIds.LINK_PHONE)) {
        return SignInUpEPComboScreens.EmailOrPhoneForm;
    } else {
        return SignInUpEPComboScreens.EmailForm;
    }
}
