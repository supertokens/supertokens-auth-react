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
import { hasFontDefined } from "../../../../../styles/styles";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import { ThemeBase } from "../themeBase";

import { ResetPasswordEmail } from "./resetPasswordEmail";
import { SubmitNewPassword } from "./submitNewPassword";

import type { ResetPasswordUsingTokenThemeProps } from "../../../types";

/*
 * Component.
 */

export function ResetPasswordUsingTokenTheme(props: ResetPasswordUsingTokenThemeProps): JSX.Element {
    /*
     * Render.
     */

    // If no token, return SubmitNewPassword.
    if (props.submitNewPasswordForm !== undefined) {
        return <SubmitNewPassword {...props.submitNewPasswordForm} />;
    }

    // Otherwise, return EnterEmail.
    return <ResetPasswordEmail {...props.enterEmailForm} />;
}

function ResetPasswordUsingTokenThemeWrapper(props: ResetPasswordUsingTokenThemeProps): JSX.Element {
    const hasFont = hasFontDefined(props.config.rootStyle);
    const userStyles = props.submitNewPasswordForm
        ? props.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.style
        : props.config.resetPasswordUsingTokenFeature.enterEmailForm.style;
    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase loadDefaultFont={!hasFont} userStyles={[props.config.rootStyle, userStyles]}>
                <ResetPasswordUsingTokenTheme {...props} />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default ResetPasswordUsingTokenThemeWrapper;
