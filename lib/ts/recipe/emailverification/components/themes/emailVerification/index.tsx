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
import SuperTokens from "../../../../../superTokens";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import { ThemeBase } from "../../../../emailpassword/components/themes/themeBase";
import { useSessionContext } from "../../../../session";

import { SendVerifyEmail } from "./sendVerifyEmail";
import { VerifyEmailLinkClicked } from "./verifyEmailLinkClicked";

import type { EmailVerificationThemeProps } from "../../../types";

export function EmailVerificationTheme(props: EmailVerificationThemeProps): JSX.Element {
    const sessionContext = useSessionContext();

    // If we have a token, return VerifyEmailLinkClicked.
    if (props.verifyEmailLinkClickedScreen !== undefined) {
        return <VerifyEmailLinkClicked {...props.verifyEmailLinkClickedScreen} />;
    }

    // If we have an active session, we want to send the verification email
    if (sessionContext.loading === false && sessionContext.doesSessionExist === true) {
        return <SendVerifyEmail {...props.sendVerifyEmailScreen} />;
    }

    // Otherwise, return an empty screen, waiting for the feature component to redirection to complete.
    return <></>;
}

function EmailVerificationThemeWrapper(props: EmailVerificationThemeProps): JSX.Element {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    const hasFont = hasFontDefined(rootStyle) || hasFontDefined(props.config.recipeRootStyle);

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase
                loadDefaultFont={!hasFont}
                userStyles={[
                    props.config.recipeRootStyle,
                    props.verifyEmailLinkClickedScreen === undefined
                        ? props.config.sendVerifyEmailScreen.style
                        : props.config.verifyEmailLinkClickedScreen.style,
                ]}>
                <EmailVerificationTheme {...props} />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default EmailVerificationThemeWrapper;
