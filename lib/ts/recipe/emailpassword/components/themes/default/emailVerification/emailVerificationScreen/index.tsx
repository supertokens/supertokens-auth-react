/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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
import { StyleProvider } from "../../../../styles/styleContext";
import { EmailVerificationThemeProps } from "../../../../../types";
import { ThemeBase } from "../../ThemeBase";

import SendVerifyEmail from "./sendVerifyEmail";
import VerifyEmailLinkClicked from "./verifyEmailLinkClicked";
import { defaultPalette, getDefaultStyles } from "../../styles/styles";

/*
 * Component.
 */

export function EmailVerificationTheme(props: EmailVerificationThemeProps): JSX.Element {
    /*
     * Render.
     */

    // If no token, return SendVerifyEmail.
    if (props.hasToken === false) {
        return (
            <StyleProvider
                defaultPalette={defaultPalette}
                styleFromInit={props.sendVerifyEmailScreen.styleFromInit}
                getDefaultStyles={getDefaultStyles}>
                <SendVerifyEmail {...props.sendVerifyEmailScreen} />
            </StyleProvider>
        );
    }

    // Otherwise, return VerifyEmailLinkClicked.
    return (
        <StyleProvider
            defaultPalette={defaultPalette}
            styleFromInit={props.verifyEmailLinkClickedScreen.styleFromInit}
            getDefaultStyles={getDefaultStyles}>
            <VerifyEmailLinkClicked {...props.verifyEmailLinkClickedScreen} />
        </StyleProvider>
    );
}

function EmailVerificationThemeWrapper(props: EmailVerificationThemeProps): JSX.Element {
    return (
        <ThemeBase>
            <EmailVerificationTheme {...props} />
        </ThemeBase>
    );
}

export default EmailVerificationThemeWrapper;
