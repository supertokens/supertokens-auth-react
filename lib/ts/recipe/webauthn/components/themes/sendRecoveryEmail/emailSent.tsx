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

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";

import type { EmailSentProps } from "../../../types";

export const PasskeyRecoveryEmailSent = withOverride(
    "WebauthnPasskeyRecoveryEmailSent",
    (props: EmailSentProps): JSX.Element => {
        const t = useTranslation();
        return (
            <div data-supertokens="passkeyEmailSentContainer">
                <div data-supertokens="headerTitle">{t("WEBAUTHN_EMAIL_SENT_LABEL")}</div>
                <div data-supertokens="emailSentDescription">
                    {t("WEBAUTHN_EMAIL_SENT_LABEL_PRE_EMAIL")}
                    {props.email}
                    {t("WEBAUTHN_EMAIL_SENT_LABEL_POST_EMAIL")}
                    <a
                        onClick={props.onEmailChangeClick}
                        data-supertokens="link linkButton formLabelLinkBtn changeEmailBtn">
                        {t("WEBAUTHN_RESEND_OR_CHANGE_EMAIL_LABEL")}
                    </a>
                </div>
            </div>
        );
    }
);
