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
import { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette, hasFontDefined } from "../../../../../styles/styles";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import { getStyles } from "../../../../emailpassword/components/themes/styles/styles";
import { ThemeBase } from "../../../../emailpassword/components/themes/themeBase";
import { EmailVerificationThemeProps } from "../../../types";
import { SendVerifyEmail } from "./sendVerifyEmail";
import { VerifyEmailLinkClicked } from "./verifyEmailLinkClicked";

/*
 * Component.
 */

export function EmailVerificationTheme(props: EmailVerificationThemeProps): JSX.Element {
    /*
     * Render.
     */

    // If no token, return SendVerifyEmail.
    if (props.verifyEmailLinkClickedScreen === undefined) {
        return (
            <StyleProvider
                rawPalette={props.config.palette}
                defaultPalette={defaultPalette}
                styleFromInit={props.sendVerifyEmailScreen.styleFromInit}
                rootStyleFromInit={props.config.rootStyle}
                getDefaultStyles={getStyles}>
                <SendVerifyEmail {...props.sendVerifyEmailScreen} />
            </StyleProvider>
        );
    }

    // Otherwise, return VerifyEmailLinkClicked.
    return (
        <StyleProvider
            rawPalette={props.config.palette}
            defaultPalette={defaultPalette}
            styleFromInit={props.verifyEmailLinkClickedScreen.styleFromInit}
            rootStyleFromInit={props.config.rootStyle}
            getDefaultStyles={getStyles}>
            <VerifyEmailLinkClicked {...props.verifyEmailLinkClickedScreen} />
        </StyleProvider>
    );
}

function EmailVerificationThemeWrapper(props: EmailVerificationThemeProps): JSX.Element {
    const hasFont = hasFontDefined(props.config.rootStyle);

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase loadDefaultFont={!hasFont}>
                <EmailVerificationTheme {...props} />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default EmailVerificationThemeWrapper;
