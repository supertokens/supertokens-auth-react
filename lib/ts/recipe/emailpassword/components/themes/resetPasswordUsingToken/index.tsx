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
import { ResetPasswordUsingTokenThemeProps } from "../../../types";
import { ThemeBase } from "../themeBase";

import { ResetPasswordEmail } from "./resetPasswordEmail";
import { SubmitNewPassword } from "./submitNewPassword";
import { getStyles } from "../styles/styles";
import { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette, hasFontDefined } from "../../../../../styles/styles";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";

/*
 * Component.
 */

export function ResetPasswordUsingTokenTheme(props: ResetPasswordUsingTokenThemeProps): JSX.Element {
    /*
     * Render.
     */

    // If no token, return SubmitNewPassword.
    if (props.submitNewPasswordForm !== undefined) {
        return (
            <StyleProvider
                rawPalette={props.config.palette}
                defaultPalette={defaultPalette}
                styleFromInit={props.submitNewPasswordForm.styleFromInit}
                rootStyleFromInit={props.config.rootStyle}
                getDefaultStyles={getStyles}>
                <SubmitNewPassword {...props.submitNewPasswordForm} />
            </StyleProvider>
        );
    }

    // Otherwise, return EnterEmail.
    return (
        <StyleProvider
            rawPalette={props.config.palette}
            defaultPalette={defaultPalette}
            styleFromInit={props.enterEmailForm.styleFromInit}
            rootStyleFromInit={props.config.rootStyle}
            getDefaultStyles={getStyles}>
            <ResetPasswordEmail {...props.enterEmailForm} />
        </StyleProvider>
    );
}

function ResetPasswordUsingTokenThemeWrapper(props: ResetPasswordUsingTokenThemeProps): JSX.Element {
    const hasFont = hasFontDefined(props.config.rootStyle);

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase loadDefaultFont={!hasFont}>
                <ResetPasswordUsingTokenTheme {...props} />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default ResetPasswordUsingTokenThemeWrapper;
